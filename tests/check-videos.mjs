import { chromium } from 'playwright';

async function checkVideos() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  // Scroll to video section (after karma bikinis photo gallery)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 4.5));
  await page.waitForTimeout(2000);

  await page.screenshot({ path: './video-grid.png', fullPage: false });
  console.log('Captured video grid: video-grid.png');

  await browser.close();
}

checkVideos().catch(console.error);
