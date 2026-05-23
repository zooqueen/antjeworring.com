import { chromium } from 'playwright'
const url = 'http://127.0.0.1:3000'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto(url + '?v=' + Date.now(), { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const data = await page.evaluate(() => {
  const h2 = Array.from(document.querySelectorAll('h2')).find((h) => h.textContent?.toLowerCase().includes('foundational'))
  const exploreBtn = Array.from(document.querySelectorAll('a')).find((a) => a.textContent?.includes('Explore research'))
  const grassSection = document.querySelector('img[alt="Antje lying on grass"]')?.closest('section')
  const grassImg = document.querySelector('img[alt="Antje lying on grass"]')
  return {
    h2Text: h2?.textContent?.trim() || null,
    exploreBottom: exploreBtn ? Math.round(exploreBtn.getBoundingClientRect().bottom + window.scrollY) : null,
    grassTop: grassImg ? Math.round(grassImg.getBoundingClientRect().top + window.scrollY) : null,
    grassSectionBorderTop: grassSection ? window.getComputedStyle(grassSection).borderTopWidth : null,
  }
})

console.log('H2 text:                 ', data.h2Text)
console.log('Explore button bottom:   ', data.exploreBottom)
console.log('Grass image top:         ', data.grassTop)
console.log('Gap between them:        ', data.grassTop - data.exploreBottom, 'px')
console.log('Grass section border-top:', data.grassSectionBorderTop)

await page.evaluate((y) => window.scrollTo(0, y - 200), data.exploreBottom)
await page.waitForTimeout(800)
await page.screenshot({ path: 'tests/press-snapshots/foundational-then-grass.png', fullPage: false })
await ctx.close()
await browser.close()
