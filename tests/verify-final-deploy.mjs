import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = process.env.TEST_URL || 'https://antjeworr.ing'
const outDir = 'tests/audit-snapshots/final-deploy'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
let pass = true

// ---- Home page: BUILDING THE FUTURE position ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(800)

  const positions = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('h2, h3, h4'))
    const find = (text) => all.find((el) => el.textContent?.toUpperCase().includes(text.toUpperCase()))
    const buildingFuture = find('BUILDING THE FUTURE')
    const subscribeBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent?.includes('SUBSCRIBE'))
    const foodGallery = document.querySelector('[alt="Spring Chicken with Red Pepper"]')
    const footer = document.querySelector('footer')
    return {
      buildingFutureY: buildingFuture?.getBoundingClientRect().top + window.scrollY,
      subscribeY: subscribeBtn?.getBoundingClientRect().top + window.scrollY,
      foodGalleryY: foodGallery?.getBoundingClientRect().top + window.scrollY,
      footerY: footer?.getBoundingClientRect().top + window.scrollY,
      pageHeight: document.body.scrollHeight,
    }
  })
  console.log('Home page section Y positions:')
  console.log(`  Subscribe button:  ${Math.round(positions.subscribeY)}`)
  console.log(`  Food gallery:      ${Math.round(positions.foodGalleryY)}`)
  console.log(`  BUILDING FUTURE:   ${Math.round(positions.buildingFutureY)}`)
  console.log(`  Footer:            ${Math.round(positions.footerY)}`)
  console.log(`  Total page:        ${positions.pageHeight}`)

  const afterFoodGallery = positions.buildingFutureY > positions.foodGalleryY
  const beforeFooter = positions.buildingFutureY < positions.footerY
  console.log(`  BUILDING FUTURE is after food gallery: ${afterFoodGallery}`)
  console.log(`  BUILDING FUTURE is before footer:      ${beforeFooter}`)
  if (!afterFoodGallery || !beforeFooter) pass = false

  // Scroll into view + screenshot
  await page.evaluate((y) => window.scrollTo(0, y - 100), positions.buildingFutureY)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${outDir}/home-building-future.png` })

  await ctx.close()
}

// ---- Work page: removed items ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(`${url}/work`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1000)

  const items = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('h3, h4')).map((el) => el.textContent?.trim() || '')
    return {
      hasTrainingFree: titles.some((t) => t === 'Training-Free GRPO'),
      hasHighDim: titles.some((t) => t === 'High-Dimensional Embedding Spaces'),
    }
  })
  console.log(`\n/work titles:`)
  console.log(`  Training-Free GRPO present: ${items.hasTrainingFree}`)
  console.log(`  High-Dim Embedding present: ${items.hasHighDim}`)
  if (items.hasTrainingFree || items.hasHighDim) pass = false

  await page.screenshot({ path: `${outDir}/work.png`, fullPage: true })
  await ctx.close()
}

await browser.close()
console.log(`\n${pass ? 'PASS' : 'FAIL'}: snapshots in ${outDir}`)
process.exit(pass ? 0 : 1)
