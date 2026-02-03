import { chromium } from 'playwright';

async function checkKarma() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Scroll to karma bikinis photo gallery
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: './karma-grid.png', fullPage: false });
  console.log('Captured karma grid: karma-grid.png');

  await browser.close();
}

checkKarma().catch(console.error);
