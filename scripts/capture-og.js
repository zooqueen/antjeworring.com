#!/usr/bin/env node
/**
 * OG Image Capture Script
 *
 * Captures the hero section at OG image dimensions (1200x630)
 * with CSS overrides to hide non-OG elements.
 *
 * Usage:
 *   node scripts/capture-og.js                     # default (pink room frame)
 *   node scripts/capture-og.js --wait 1500         # custom wait time (ms)
 *   node scripts/capture-og.js --frame 0           # video frame in seconds
 *   node scripts/capture-og.js --url http://...    # custom URL
 *   node scripts/capture-og.js --out path.jpg      # custom output path
 *   node scripts/capture-og.js --scale 2           # device scale factor
 */

const { chromium } = require(require('path').join(process.cwd(), 'node_modules', 'playwright'))

const OG_WIDTH = 1200
const OG_HEIGHT = 630

// CSS overrides for OG capture — edit these to dial in the look
const OG_CSS = `
  /* Hide scroll indicator and bio text */
  .scroll-indicator-text,
  [data-og-hide],
  nav,
  footer {
    display: none !important;
  }

  /* Hide ALL fixed-position overlays (PiP player, Next.js devtools, etc.) */
  div[style*="position: fixed"],
  div[style*="position:fixed"],
  nextjs-portal,
  [data-nextjs-toast],
  [data-next-hide-fouc],
  #__next-build-indicator,
  #__next_css__DO_NOT_USE__ {
    display: none !important;
  }

  /* Scale up me + chairs slightly with drop shadow */
  .hero-me-container {
    transform: scale(1.15) translateY(3%) !important;
    filter: drop-shadow(0 8px 30px rgba(0,0,0,0.5)) !important;
  }

  /* Move DESIGNER subtitle down */
  .hero-subtitle {
    transform: translateY(40px) !important;
  }
`

async function captureOG() {
  const args = process.argv.slice(2)
  const getArg = (flag, fallback) => {
    const idx = args.indexOf(flag)
    return idx !== -1 ? args[idx + 1] : fallback
  }

  const url = getArg('--url', 'http://localhost:3000')
  const wait = parseInt(getArg('--wait', '1500'))
  const frame = getArg('--frame', '0')
  const output = getArg('--out', 'public/og-image.jpg')
  const quality = parseInt(getArg('--quality', '90'))
  const scale = parseInt(getArg('--scale', '2'))

  console.log(`Capturing OG image...`)
  console.log(`  URL:     ${url}`)
  console.log(`  Frame:   ${frame}s`)
  console.log(`  Wait:    ${wait}ms`)
  console.log(`  Output:  ${output}`)
  console.log(`  Size:    ${OG_WIDTH}x${OG_HEIGHT} @${scale}x`)

  const captureHeight = parseInt(getArg('--viewport-height', '850'))

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: OG_WIDTH, height: captureHeight },
    deviceScaleFactor: scale,
  })

  await page.goto(url, { waitUntil: 'networkidle' })

  // Inject OG-specific CSS
  await page.addStyleTag({ content: OG_CSS })

  // Hide elements by text content
  await page.evaluate(() => {
    document.querySelectorAll('p, span, div, a, button, motion').forEach(el => {
      const text = (el.textContent || '').trim()
      if (
        text === 'scroll to explore' ||
        text === '↓' ||
        text.startsWith('From child athlete')
      ) {
        el.style.setProperty('display', 'none', 'important')
      }
    })
    // Hide PiP player N button
    document.querySelectorAll('button').forEach(b => {
      if (b.textContent?.trim() === 'N') {
        const wrapper = b.closest('div[style*="fixed"]') || b.parentElement
        if (wrapper) wrapper.style.setProperty('display', 'none', 'important')
        b.style.setProperty('display', 'none', 'important')
      }
    })
  })

  // Wait for hero animations to complete
  await page.waitForTimeout(wait)

  // Pause video and seek to desired frame
  const frameTime = parseFloat(frame)
  await page.evaluate((t) => {
    document.querySelectorAll('video').forEach(v => {
      v.pause()
      v.currentTime = t
    })
  }, frameTime)

  // Let the frame render
  await page.waitForTimeout(300)

  // Crop from taller viewport - bias toward top to keep DESIGNER text
  const cropY = Math.max(0, Math.floor((captureHeight - OG_HEIGHT) * 0.35))
  await page.screenshot({
    path: output,
    type: 'jpeg',
    quality,
    clip: { x: 0, y: cropY, width: OG_WIDTH, height: OG_HEIGHT },
  })

  console.log(`\n  ✓ Saved ${output}`)

  await browser.close()
}

captureOG().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
