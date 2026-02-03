import { chromium } from 'playwright';

async function checkVentures() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Scroll to ventures section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.75));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: './ventures-grid.png', fullPage: false });
  console.log('Captured ventures: ventures-grid.png');

  await browser.close();
}

checkVentures().catch(console.error);
