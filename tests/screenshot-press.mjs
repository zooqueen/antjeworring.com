import { chromium } from 'playwright';

async function capturePress() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Scroll to press section
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: './press-section.png', fullPage: false });
  console.log('Captured press section');

  await browser.close();
}

capturePress().catch(console.error);
