import { chromium } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } })
const page = await ctx.newPage()
await page.goto('http://127.0.0.1:3000?v=' + Date.now(), { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const info = await page.evaluate(async () => {
  const v = document.querySelector('video[src*="imhotforai"]')
  if (!v) return { found: false }
  await new Promise((r) => v.readyState >= 1 ? r() : v.addEventListener('loadedmetadata', r, { once: true }))
  return { found: true, src: v.currentSrc, duration: v.duration, w: v.videoWidth, h: v.videoHeight }
})
console.log(info)
await browser.close()
