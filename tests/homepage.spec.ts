import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Antje Worring/)
  })

  test('navigation is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
  })

  test('main content renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main')).toBeVisible()
  })
})
