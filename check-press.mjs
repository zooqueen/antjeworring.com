import { chromium } from 'playwright';

async function checkPress() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Scroll down slightly to show press section
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.9));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: './press-check.png', fullPage: false });
  console.log('Captured press section screenshot: press-check.png');

  await browser.close();
}

checkPress().catch(console.error);
