import { chromium } from 'playwright';

async function checkFood() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Scroll to SF Secret Menu section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.85));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: './food-grid.png', fullPage: false });
  console.log('Captured food grid: food-grid.png');

  await browser.close();
}

checkFood().catch(console.error);
