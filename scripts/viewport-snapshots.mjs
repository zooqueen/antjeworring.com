import { chromium } from 'playwright'

const url = process.env.TEST_URL || 'http://127.0.0.1:3001'
const outDir = process.env.SNAPSHOT_DIR || 'playwright-snapshots'

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
]

const ensureDir = async (path) => {
  const { mkdir } = await import('node:fs/promises')
  await mkdir(path, { recursive: true })
}

const run = async () => {
  await ensureDir(outDir)
  const browser = await chromium.launch()
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
    const page = await context.newPage()
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(750)
    await page.screenshot({ path: `${outDir}/home-${viewport.name}.png`, fullPage: false })
    await context.close()
  }
  await browser.close()
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
