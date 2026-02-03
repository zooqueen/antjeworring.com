import { chromium } from 'playwright';

async function checkPressResponsive() {
  const browser = await chromium.launch();

  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 1366, height: 768, name: 'laptop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 812, name: 'mobile' },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Scroll to press section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.8));
    await page.waitForTimeout(500);

    await page.screenshot({ path: `./press-${vp.name}.png`, fullPage: false });
    console.log(`Captured ${vp.name}: press-${vp.name}.png`);
    await page.close();
  }

  await browser.close();
}

checkPressResponsive().catch(console.error);
