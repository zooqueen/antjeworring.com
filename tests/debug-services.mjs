import { chromium } from 'playwright'

const url = process.env.TEST_URL || 'http://127.0.0.1:3000'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.evaluate(() => {
  const hits = Array.from(document.querySelectorAll('h2'))
  const el = hits.find((h) => h.textContent?.toLowerCase().includes('solutions architect'))
  el?.scrollIntoView({ block: 'start' })
})
await page.waitForTimeout(500)

const info = await page.evaluate(() => {
  const carousel = document.querySelector('.services-carousel')
  const card = document.querySelector('.service-card')
  const cardWrapper = card?.parentElement
  const carouselStyles = carousel ? getComputedStyle(carousel) : null
  return {
    carouselX: carousel?.getBoundingClientRect().x,
    carouselPaddingLeft: carouselStyles?.paddingLeft,
    carouselWidth: carousel?.getBoundingClientRect().width,
    cardWrapperX: cardWrapper?.getBoundingClientRect().x,
    cardX: card?.getBoundingClientRect().x,
    cardClass: card?.className,
    cardOuterHTML: cardWrapper?.outerHTML?.slice(0, 200),
    carouselScrollLeft: carousel?.scrollLeft,
    carouselScrollWidth: carousel?.scrollWidth,
  }
})
console.log(JSON.stringify(info, null, 2))

await browser.close()
