import { chromium } from 'playwright'
const url = 'http://127.0.0.1:3000'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } })
const page = await ctx.newPage()

const errors = []
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`) })

await page.goto(url + '?v=' + Date.now(), { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(2000)

const videoInfo = await page.evaluate(async () => {
  const video = document.querySelector('video[src*="loud.mp4"]')
  if (!video) return { found: false }
  await new Promise((r) => {
    if (video.readyState >= 1) r()
    else video.addEventListener('loadedmetadata', r, { once: true })
  })
  return {
    found: true,
    duration: video.duration,
    src: video.currentSrc,
    width: video.videoWidth,
    height: video.videoHeight,
    initialTime: video.currentTime,
  }
})

console.log('Video info:', JSON.stringify(videoInfo, null, 2))

if (videoInfo.found) {
  // Scroll into view and capture currentTime at multiple positions
  const sectionTop = await page.evaluate(() => {
    const sect = document.querySelector('video[src*="loud.mp4"]')?.closest('section')
    return sect ? sect.getBoundingClientRect().top + window.scrollY : null
  })
  console.log('Section top y:', sectionTop)

  for (const offset of [0, 200, 400, 600, 800]) {
    await page.evaluate((y) => window.scrollTo(0, y), sectionTop - 768 + offset)
    await page.waitForTimeout(800)
    const t = await page.evaluate(() => document.querySelector('video[src*="loud.mp4"]')?.currentTime)
    console.log(`scroll ${offset}px past section -> currentTime: ${t?.toFixed(3)}s`)
  }
}

if (errors.length) console.log('Errors:', errors)
await ctx.close()
await browser.close()
