import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = process.env.TEST_URL || 'http://127.0.0.1:3000'
const outDir = 'tests/press-snapshots'
await mkdir(outDir, { recursive: true })

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]

const browser = await chromium.launch()

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(800)

  // Locate the press grid
  const grid = page.locator('.press-grid-desktop')
  await grid.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)

  // Box of the grid
  const box = await grid.boundingBox()
  if (!box) { console.log(`${vp.name}: no grid found`); await ctx.close(); continue }

  // Measure logo sizes within their cells
  const cellInfo = await page.$$eval('.press-cell', (cells) => cells.map((c) => {
    const img = c.querySelector('img')
    const cellRect = c.getBoundingClientRect()
    const imgRect = img?.getBoundingClientRect()
    return {
      cellW: Math.round(cellRect.width),
      cellH: Math.round(cellRect.height),
      imgW: imgRect ? Math.round(imgRect.width) : 0,
      imgH: imgRect ? Math.round(imgRect.height) : 0,
      ratio: imgRect && cellRect.width > 0 ? Math.round((imgRect.width / cellRect.width) * 100) : 0,
      alt: img?.alt || '(no img)',
    }
  }))

  // Screenshot of just the press grid section
  await page.screenshot({
    path: `${outDir}/press-${vp.name}.png`,
    clip: { x: 0, y: box.y, width: vp.width, height: Math.min(box.height, 1000) },
  })

  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`)
  console.log(`Grid box: ${Math.round(box.width)}x${Math.round(box.height)}`)
  for (const ci of cellInfo) {
    console.log(`  ${ci.alt.padEnd(20)} cell ${ci.cellW}x${ci.cellH}  img ${ci.imgW}x${ci.imgH}  (${ci.ratio}% of cell)`)
  }

  await ctx.close()
}

await browser.close()
console.log(`\nScreenshots saved to ${outDir}`)
