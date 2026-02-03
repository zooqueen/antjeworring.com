import { chromium } from 'playwright';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
];

async function captureScreenshots() {
  const browser = await chromium.launch();
  
  for (const viewport of viewports) {
    console.log(`Capturing ${viewport.name} (${viewport.width}x${viewport.height})...`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3001', { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(3000); // Wait for animations and videos
    
    // Full page screenshot
    await page.screenshot({ 
      path: `spacing-${viewport.name}.png`, 
      fullPage: true 
    });
    
    console.log(`  Saved spacing-${viewport.name}.png`);
    await context.close();
  }
  
  await browser.close();
  console.log('Done! All screenshots saved.');
}

captureScreenshots();
