import { chromium } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } })
const page = await ctx.newPage()
await page.goto('http://127.0.0.1:3000/about?v=' + Date.now(), { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const src = await page.$eval('img[alt="Antje Worring"]', (img) => img.currentSrc)
console.log('about page image src:', src)
await browser.close()
