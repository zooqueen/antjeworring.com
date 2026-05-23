import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const url = process.env.TEST_URL || 'http://127.0.0.1:3000'
const outDir = process.env.SNAPSHOT_DIR || 'tests/audit-snapshots'

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]

const pages = [
  { slug: '', name: 'home' },
  { slug: '/about', name: 'about' },
  { slug: '/work', name: 'work' },
  { slug: '/research', name: 'research' },
  { slug: '/press', name: 'press' },
  { slug: '/contact', name: 'contact' },
]

const issues = []

const run = async () => {
  await mkdir(outDir, { recursive: true })
  const browser = await chromium.launch()

  for (const viewport of viewports) {
    const vpDir = `${outDir}/${viewport.name}`
    await mkdir(vpDir, { recursive: true })

    for (const pageDef of pages) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 2,
      })
      const page = await context.newPage()

      const consoleErrors = []
      const pageErrors = []
      const failedRequests = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text())
      })
      page.on('pageerror', (e) => pageErrors.push(String(e)))
      page.on('requestfailed', (req) => failedRequests.push({ url: req.url(), error: req.failure()?.errorText }))

      const target = `${url}${pageDef.slug}`
      try {
        await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 })
        await page.waitForTimeout(800)

        // Check for horizontal overflow
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth
          const winWidth = window.innerWidth
          const items = []
          if (docWidth > winWidth) {
            const all = document.querySelectorAll('*')
            for (const el of all) {
              const r = el.getBoundingClientRect()
              if (r.right > winWidth + 1) {
                items.push({
                  tag: el.tagName,
                  cls: el.className?.toString?.().slice(0, 80) || '',
                  right: Math.round(r.right),
                  width: Math.round(r.width),
                })
                if (items.length >= 6) break
              }
            }
          }
          return { overflow: docWidth > winWidth, docWidth, winWidth, offenders: items }
        })

        // Check for broken images
        const brokenImgs = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'))
          return imgs
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => ({ src: img.src, alt: img.alt }))
        })

        // Take a full-page screenshot
        await page.screenshot({
          path: `${vpDir}/${pageDef.name}.png`,
          fullPage: true,
        })

        // Take viewport-only screenshot of header area
        await page.screenshot({
          path: `${vpDir}/${pageDef.name}-viewport.png`,
          fullPage: false,
        })

        if (overflow.overflow || brokenImgs.length || consoleErrors.length || pageErrors.length || failedRequests.length) {
          issues.push({
            viewport: viewport.name,
            page: pageDef.name,
            url: target,
            overflow,
            brokenImgs,
            consoleErrors,
            pageErrors,
            failedRequests: failedRequests.slice(0, 10),
          })
        }
      } catch (e) {
        issues.push({
          viewport: viewport.name,
          page: pageDef.name,
          url: target,
          fatalError: String(e),
        })
      }

      await context.close()
    }
  }

  await browser.close()
  await writeFile(`${outDir}/issues.json`, JSON.stringify(issues, null, 2))
  console.log(`Captured ${viewports.length * pages.length} screenshots`)
  console.log(`Issues found: ${issues.length}`)
  for (const i of issues) {
    console.log(
      `  - ${i.viewport} ${i.page}: ${[
        i.overflow?.overflow && `overflow ${i.overflow.docWidth}/${i.overflow.winWidth}`,
        i.brokenImgs?.length && `${i.brokenImgs.length} broken imgs`,
        i.consoleErrors?.length && `${i.consoleErrors.length} console errors`,
        i.pageErrors?.length && `${i.pageErrors.length} page errors`,
        i.failedRequests?.length && `${i.failedRequests.length} failed reqs`,
        i.fatalError && 'FATAL',
      ]
        .filter(Boolean)
        .join(', ')}`,
    )
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
