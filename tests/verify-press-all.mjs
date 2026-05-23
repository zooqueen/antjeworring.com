import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = 'http://127.0.0.1:3000'
const outDir = 'tests/press-snapshots'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()

const viewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1366', width: 1366, height: 768 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(url + '?v=' + Date.now(), { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1500)

  const grid = page.locator('.press-grid-desktop')
  await grid.scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  const box = await grid.boundingBox()

  const info = await page.$$eval('.press-cell, .press-magazine-left, .press-magazine-right', (cells) => cells.map((c, idx) => {
    const r = c.getBoundingClientRect()
    const img = c.querySelector('img')
    const cs = window.getComputedStyle(c)
    return { idx: idx+1, alt: img?.alt || '(none)', x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), gc: cs.gridColumn, gr: cs.gridRow }
  }))

  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`)
  console.log(`grid: ${Math.round(box.width)}x${Math.round(box.height)}`)
  for (const i of info) {
    console.log(`  #${i.idx} ${i.alt.padEnd(22)} ${i.w}x${i.h} @(${i.x},${i.y}) col=${i.gc} row=${i.gr}`)
  }

  await page.screenshot({
    path: `${outDir}/press-${vp.name}-v3.png`,
    clip: { x: 0, y: box.y, width: vp.width, height: Math.min(box.height + 40, 1400) },
  })
  await ctx.close()
}

await browser.close()
console.log('\nDone.')
