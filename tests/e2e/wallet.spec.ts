import { test, expect } from '@playwright/test'

test.describe('Wallet Connection', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Freighter extension as unavailable (default browser env)
    await page.addInitScript(() => {
      // Ensure window.freighter is undefined to simulate no extension
      Object.defineProperty(window, 'freighter', { value: undefined, writable: true })
    })
    await page.goto('/')
  })

  test('shows connect wallet button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /connect.*wallet/i })
    ).toBeVisible()
  })

  test('shows error when wallet extension is not available', async ({ page }) => {
    await page.getByRole('button', { name: /connect.*wallet/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
  })

  test('connect button is accessible', async ({ page }) => {
    const btn = page.getByRole('button', { name: /connect.*wallet/i })
    await expect(btn).toHaveAttribute('aria-label')
  })
})
