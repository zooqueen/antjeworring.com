import { chromium } from 'playwright'

const url = process.env.TEST_URL || 'http://127.0.0.1:3000'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } })
const page = await ctx.newPage()

const checks = []
const ok = (name) => checks.push({ name, status: 'PASS' })
const fail = (name, detail) => checks.push({ name, status: 'FAIL', detail })

// Contact page: should not have duplicate "contact" h2 in footer
await page.goto(`${url}/contact`, { waitUntil: 'networkidle' })
const contactH2s = await page.$$eval('h2', (els) =>
  els.filter((e) => e.textContent?.toLowerCase().trim() === 'contact').length
)
contactH2s === 0 ? ok('contact: no duplicate "contact" h2 in footer') : fail('contact: duplicate "contact" h2 still present', { count: contactH2s })

const contactH1 = await page.$eval('h1', (e) => e.textContent?.trim() ?? '')
contactH1.toLowerCase() === 'contact' ? ok('contact: h1 = "contact"') : fail('contact: h1 missing/wrong', { h1: contactH1 })

// Press page: should have h1
await page.goto(`${url}/press`, { waitUntil: 'networkidle' })
const pressH1 = await page.$eval('h1', (e) => e.textContent?.trim() ?? '').catch(() => null)
pressH1 ? ok(`press: h1 present ("${pressH1}")`) : fail('press: missing h1')

// Work page: should have h1
await page.goto(`${url}/work`, { waitUntil: 'networkidle' })
const workH1 = await page.$eval('h1', (e) => e.textContent?.trim() ?? '').catch(() => null)
workH1 ? ok(`work: h1 present ("${workH1}")`) : fail('work: missing h1')

// Footer nav: PRESS link should be removed
await page.goto(`${url}/about`, { waitUntil: 'networkidle' })
const footerLinks = await page.$$eval('.footer-nav a', (els) => els.map((e) => e.textContent?.trim()))
const hasPress = footerLinks.includes('PRESS')
!hasPress ? ok(`footer: PRESS removed (links: ${footerLinks.join(', ')})`) : fail('footer: PRESS still present', { links: footerLinks })

// Home page: should not contain github.com/zoolabs
await page.goto(`${url}/`, { waitUntil: 'networkidle' })
const zoolabsLinks = await page.$$eval('a[href*="github.com/zoolabs"]', (els) => els.map((e) => e.getAttribute('href')))
zoolabsLinks.length === 0 ? ok('home: no github.com/zoolabs links') : fail('home: zoolabs links remain', { links: zoolabsLinks })

// Contact page: email should be a mailto link
await page.goto(`${url}/contact`, { waitUntil: 'networkidle' })
const mailto = await page.$('a[href="mailto:hello@antjeworring.com"]')
mailto ? ok('contact: email is a mailto link') : fail('contact: email not mailto')

// Twitter link on contact page
const twitterHref = await page.$eval('a[href*="twitter.com"]', (e) => e.getAttribute('href'))
twitterHref?.includes('antje_worring') ? ok(`contact: twitter is antje_worring (${twitterHref})`) : fail('contact: twitter wrong', { href: twitterHref })

// Copyright year should be 2026
const copyright = await page.$eval('footer p:last-child', (e) => e.textContent?.trim() ?? '').catch(() => '')
copyright.includes('2026') ? ok(`footer: copyright updated (${copyright})`) : fail('footer: copyright not 2026', { copyright })

// Future-dated projects gone from /work
await page.goto(`${url}/work`, { waitUntil: 'networkidle' })
const has2026 = await page.$$eval('button', (btns) => btns.map((b) => b.textContent?.trim()).filter((t) => t === '2026').length)
has2026 === 0 ? ok('work: no 2026 filter button') : fail('work: 2026 still in filters', { count: has2026 })

// Print results
console.log('\n=== Verification Results ===')
const passed = checks.filter((c) => c.status === 'PASS').length
const failed = checks.filter((c) => c.status === 'FAIL').length
for (const c of checks) {
  const icon = c.status === 'PASS' ? '[OK]' : '[FAIL]'
  console.log(`${icon} ${c.name}${c.detail ? '  ' + JSON.stringify(c.detail) : ''}`)
}
console.log(`\n${passed}/${checks.length} passed, ${failed} failed`)

await browser.close()
process.exit(failed > 0 ? 1 : 0)
