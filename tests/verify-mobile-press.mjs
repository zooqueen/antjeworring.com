import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = 'http://127.0.0.1:3000'
const outDir = 'tests/press-snapshots'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

// Bust browser cache by reloading
await page.goto(url + '?v=' + Date.now(), { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(1500)

const grid = page.locator('.press-grid-desktop')
await grid.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)

const box = await grid.boundingBox()
console.log(`grid box: ${Math.round(box.width)}x${Math.round(box.height)} at y=${Math.round(box.y)}`)

// Capture position info for every cell
const info = await page.$$eval('.press-cell, .press-magazine-left, .press-magazine-right', (cells) => cells.map((c, idx) => {
  const r = c.getBoundingClientRect()
  const img = c.querySelector('img')
  const cs = window.getComputedStyle(c)
  return {
    idx: idx + 1,
    cls: c.className,
    alt: img?.alt || '(none)',
    x: Math.round(r.x),
    y: Math.round(r.y),
    w: Math.round(r.width),
    h: Math.round(r.height),
    gridCol: cs.gridColumn,
    gridRow: cs.gridRow,
  }
}))

console.log('\n=== Cell positions on mobile (390px) ===')
for (const i of info) {
  console.log(`#${i.idx} ${i.alt.padEnd(22)} ${i.w}x${i.h} @(${i.x},${i.y}) col=${i.gridCol} row=${i.gridRow}`)
}

await page.screenshot({
  path: `${outDir}/press-mobile-390-final.png`,
  clip: { x: 0, y: box.y, width: 390, height: Math.min(box.height + 40, 1200) },
})

// Also capture the grass image
const grass = page.locator('img[alt="Antje lying on grass"]')
await grass.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
const gbox = await grass.boundingBox()
console.log(`\ngrass image: ${Math.round(gbox.width)}x${Math.round(gbox.height)}`)
await page.screenshot({
  path: `${outDir}/grass-mobile-390.png`,
  clip: { x: 0, y: gbox.y, width: 390, height: Math.min(gbox.height + 20, 800) },
})

await ctx.close()
await browser.close()
console.log('\nScreenshots written to', outDir)
