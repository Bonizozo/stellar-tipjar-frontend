import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('navbar links are present on homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('navigates to /explore', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /explore/i }).first().click()
    await expect(page).toHaveURL('/explore')
  })

  test('navigates to /tips', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /send a tip/i }).first().click()
    await expect(page).toHaveURL('/tips')
  })

  test('mobile viewport renders navbar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.getByRole('navigation')).toBeVisible()
  })
})
