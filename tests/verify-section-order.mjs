import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = 'http://127.0.0.1:3000'
await mkdir('tests/press-snapshots', { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto(url + '?v=' + Date.now(), { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(1500)

// Get y positions of press grid, model families h2, grass image
const positions = await page.evaluate(() => {
  const grid = document.querySelector('.press-grid-desktop')
  const h2s = Array.from(document.querySelectorAll('h2'))
  const families = h2s.find((h) => h.textContent?.toLowerCase().includes('model families'))
  const grass = document.querySelector('img[alt="Antje lying on grass"]')
  const familyH3s = Array.from(document.querySelectorAll('h3')).filter((h) => ['Zen','Zoo','Hanzo'].includes(h.textContent?.trim() || ''))
  return {
    pressGridY: grid ? Math.round(grid.getBoundingClientRect().bottom + window.scrollY) : null,
    familiesY: families ? Math.round(families.getBoundingClientRect().top + window.scrollY) : null,
    grassY: grass ? Math.round(grass.getBoundingClientRect().top + window.scrollY) : null,
    familyFonts: familyH3s.map((h) => ({ name: h.textContent?.trim(), font: window.getComputedStyle(h).fontFamily })),
  }
})

console.log('Press grid bottom:', positions.pressGridY)
console.log('Model families top:', positions.familiesY)
console.log('Grass image top:   ', positions.grassY)
console.log('Order correct:', positions.familiesY < positions.grassY ? 'YES' : 'NO')
console.log('Family fonts:', JSON.stringify(positions.familyFonts, null, 2))

// Scroll-capture the families + grass area
await page.evaluate((y) => window.scrollTo(0, y - 100), positions.familiesY)
await page.waitForTimeout(800)
await page.screenshot({ path: 'tests/press-snapshots/families-then-grass.png', fullPage: false })
await ctx.close()
await browser.close()
