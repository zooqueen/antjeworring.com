import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Antje Worring/)
  })

  test('navigation is visible after scroll', async ({ page }) => {
    await page.goto('/')
    // Navigation appears after scrolling 100px on homepage
    await page.evaluate(() => window.scrollTo(0, 200))
    await expect(page.locator('nav')).toBeVisible()
  })

  test('main content renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main')).toBeVisible()
  })
})
