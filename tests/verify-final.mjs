import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = process.env.TEST_URL || 'http://127.0.0.1:3000'
const outDir = 'tests/audit-snapshots/final'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'desktop-1440', width: 1440, height: 900 },
]

let pass = true

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => { console.log(`[${vp.name}] pageerror:`, e.message); pass = false })
  page.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('favicon')) {
      console.log(`[${vp.name}] HTTP ${r.status()} ${r.url()}`)
    }
  })

  // ---- Home page ----
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(800)

  // Check Kickstarter overlay
  const overlay = await page.locator('text=My 16 year old self, pitching on Kickstarter.').first()
  const overlayVisible = await overlay.isVisible().catch(() => false)
  console.log(`[${vp.name}] Kickstarter overlay visible: ${overlayVisible}`)
  if (!overlayVisible) pass = false

  // Scroll to impact-focused section and screenshot
  await page.evaluate(() => {
    const hits = Array.from(document.querySelectorAll('h3'))
    const el = hits.find((h) => h.textContent?.toLowerCase().includes('impact focused'))
    el?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${outDir}/home-impact-${vp.name}.png` })

  // Scroll to creative services section
  await page.evaluate(() => {
    const hits = Array.from(document.querySelectorAll('h2'))
    const el = hits.find((h) => h.textContent?.toLowerCase().includes('solutions architect'))
    el?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(800)

  // Measure card sizes in services carousel
  const cardSizes = await page.$$eval('.service-card', (cards) => cards.slice(0, 6).map((c) => {
    const r = c.getBoundingClientRect()
    const title = c.querySelector('h3')?.textContent || ''
    return { title, w: Math.round(r.width), h: Math.round(r.height) }
  }))
  console.log(`[${vp.name}] First 6 service card sizes:`)
  for (const c of cardSizes) console.log(`  ${c.title.padEnd(30)} ${c.w}x${c.h}`)
  const allSameH = cardSizes.length > 0 && cardSizes.every((c) => c.h === cardSizes[0].h)
  console.log(`[${vp.name}] All cards same height: ${allSameH}`)
  if (!allSameH) pass = false

  // Verify first 4 cards are AI Engineering
  const firstFourCategories = await page.$$eval('.service-card', (cards) => cards.slice(0, 4).map((c) => c.querySelector('p')?.textContent?.trim() || ''))
  console.log(`[${vp.name}] First 4 categories: ${firstFourCategories.join(' | ')}`)
  const allAI = firstFourCategories.every((cat) => cat === 'AI Engineering')
  console.log(`[${vp.name}] First 4 cards are AI Engineering: ${allAI}`)
  if (!allAI) pass = false

  await page.screenshot({ path: `${outDir}/home-services-${vp.name}.png` })

  // ---- Research page (model families centering) ----
  await page.goto(`${url}/research`, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(500)
  await page.evaluate(() => {
    const hits = Array.from(document.querySelectorAll('h2'))
    const el = hits.find((h) => h.textContent?.toLowerCase().includes('model families'))
    el?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(400)

  // Measure ventures-grid horizontal centering
  const venturesGrid = await page.locator('.ventures-grid').first().boundingBox()
  console.log(`[${vp.name}] /research ventures-grid: ${venturesGrid ? `x=${Math.round(venturesGrid.x)} w=${Math.round(venturesGrid.width)}` : 'not found'}`)
  if (venturesGrid && vp.width >= 1024) {
    const leftMargin = venturesGrid.x
    const rightMargin = vp.width - (venturesGrid.x + venturesGrid.width)
    const symmetric = Math.abs(leftMargin - rightMargin) < 30
    console.log(`[${vp.name}] /research model families centered: ${symmetric} (left=${Math.round(leftMargin)} right=${Math.round(rightMargin)})`)
    if (!symmetric) pass = false
  }
  await page.screenshot({ path: `${outDir}/research-models-${vp.name}.png` })

  // ---- About page (image source) ----
  await page.goto(`${url}/about`, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(500)
  const aboutImg = await page.evaluate(() => {
    const img = document.querySelector('.about-image img')
    return img?.getAttribute('src') || '(no img)'
  })
  console.log(`[${vp.name}] about page img src: ${aboutImg}`)
  const restored = aboutImg.includes('chef-antje')
  console.log(`[${vp.name}] about photo restored: ${restored}`)
  if (!restored) pass = false
  await page.screenshot({ path: `${outDir}/about-${vp.name}.png` })

  await ctx.close()
}

await browser.close()
console.log(`\n${pass ? 'PASS' : 'FAIL'}: snapshots in ${outDir}`)
process.exit(pass ? 0 : 1)
