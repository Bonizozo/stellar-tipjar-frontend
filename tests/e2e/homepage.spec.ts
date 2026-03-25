import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/stellar tip jar/i).first()).toBeVisible()
  })

  test('has working navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /explore creators/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /send a tip/i })).toBeVisible()
  })

  test('navigates to explore page', async ({ page }) => {
    await page.getByRole('link', { name: /explore creators/i }).first().click()
    await expect(page).toHaveURL('/explore')
  })
})
