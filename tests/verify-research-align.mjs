import { chromium } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto('http://127.0.0.1:3000/research?v=' + Date.now(), { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const align = await page.evaluate(() => {
  const h1 = document.querySelector('h1')
  const heroP = h1?.parentElement?.querySelector('p')
  const grids = Array.from(document.querySelectorAll('div[style*="grid"]'))
  const ctaText = Array.from(document.querySelectorAll('p')).find((p) => p.textContent?.includes('Research lives alongside'))
  return {
    h1Align: h1 ? window.getComputedStyle(h1).textAlign : null,
    heroPAlign: heroP ? window.getComputedStyle(heroP).textAlign : null,
    ctaTextAlign: ctaText ? window.getComputedStyle(ctaText.parentElement).textAlign : null,
  }
})

console.log('Hero h1 textAlign:', align.h1Align)
console.log('Hero p  textAlign:', align.heroPAlign)
console.log('CTA     textAlign:', align.ctaTextAlign)

await page.screenshot({ path: 'tests/press-snapshots/research-align.png', fullPage: true })
await browser.close()
