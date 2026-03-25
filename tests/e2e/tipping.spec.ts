import { test, expect } from '@playwright/test'
import { mockCreatorProfile, mockTipSubmit, MOCK_CREATOR } from '../helpers/fixtures'

test.describe('Tipping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await mockCreatorProfile(page)
    await mockTipSubmit(page)
    await page.goto(`/creator/${MOCK_CREATOR.username}`)
  })

  test('submits a tip successfully', async ({ page }) => {
    await page.getByLabel('Amount').fill('10')
    await page.getByLabel('Asset Code').fill('XLM')
    await page.getByRole('button', { name: /create tip intent/i }).click()
    await expect(page.getByRole('status')).toContainText(/tip intent created/i)
  })

  test('shows validation error for invalid amount', async ({ page }) => {
    await page.getByLabel('Amount').fill('0')
    await page.getByLabel('Amount').blur()
    await expect(page.getByRole('alert').or(page.locator('[aria-invalid="true"]'))).toBeVisible()
  })

  test('shows error on API failure', async ({ page }) => {
    await mockTipSubmit(page, false)
    await page.getByLabel('Amount').fill('5')
    await page.getByRole('button', { name: /create tip intent/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
  })
})
