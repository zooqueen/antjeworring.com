import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = process.env.TEST_URL || 'http://127.0.0.1:3000'
const outDir = 'tests/audit-snapshots/services-align'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]

let pass = true

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(500)

  await page.evaluate(() => {
    const hits = Array.from(document.querySelectorAll('h2'))
    const el = hits.find((h) => h.textContent?.toLowerCase().includes('solutions architect'))
    el?.scrollIntoView({ block: 'start' })
  })
  await page.waitForTimeout(500)

  const headerLeft = await page.evaluate(() => {
    const hits = Array.from(document.querySelectorAll('h2'))
    const el = hits.find((h) => h.textContent?.toLowerCase().includes('solutions architect'))
    return el ? el.getBoundingClientRect().x : -1
  })
  const firstCardLeft = await page.evaluate(() => {
    const card = document.querySelector('.service-card')
    return card ? card.getBoundingClientRect().x : -1
  })
  const diff = Math.round(firstCardLeft - headerLeft)
  const aligned = Math.abs(diff) <= 2
  console.log(`[${vp.name.padEnd(14)}] header.x=${Math.round(headerLeft).toString().padStart(4)}  card.x=${Math.round(firstCardLeft).toString().padStart(4)}  diff=${diff.toString().padStart(4)}  ${aligned ? 'ALIGNED' : 'MISALIGNED'}`)
  if (!aligned) pass = false

  await page.screenshot({ path: `${outDir}/services-${vp.name}.png` })
  await ctx.close()
}

await browser.close()
console.log(`\n${pass ? 'PASS' : 'FAIL'}: snapshots in ${outDir}`)
process.exit(pass ? 0 : 1)
