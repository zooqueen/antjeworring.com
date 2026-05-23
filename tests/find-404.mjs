import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
const page = await ctx.newPage()
const all = []
page.on('response', (r) => {
  if (r.status() >= 400) all.push({ status: r.status(), url: r.url() })
})
await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(1500)
console.log(JSON.stringify(all, null, 2))
await browser.close()
