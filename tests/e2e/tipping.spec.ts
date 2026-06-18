import { test, expect } from '@playwright/test'
import { mockCreatorProfile, mockTipSubmit, MOCK_CREATOR } from '../helpers/fixtures'

test.describe('Tipping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await mockCreatorProfile(page)
    await mockTipSubmit(page)
    await page.goto(`/creator/${MOCK_CREATOR.username}`)
    // Hide Next.js dev overlay to prevent pointer events interception
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' })
  })

  test('submits a tip successfully', async ({ page }) => {
    await page.getByLabel('Amount').fill('10')
    await page.getByLabel('Asset Code').fill('XLM')
    await page.getByRole('button', { name: /create tip intent/i }).click()
    await expect(page.getByText(/tip intent created/i)).toBeVisible()
  })

  test('shows validation error for invalid amount', async ({ page }) => {
    await page.getByLabel('Amount').fill('0')
    await page.getByLabel('Amount').blur()
    await expect(page.getByRole('alert').or(page.locator('[aria-invalid="true"]')).first()).toBeVisible()
  })

  test('shows error on API failure', async ({ page }) => {
    await mockTipSubmit(page, false)
    await page.getByLabel('Amount').fill('5')
    await page.getByRole('button', { name: /create tip intent/i }).click()
    await expect(page.getByRole('alert').first()).toBeVisible()
  })
})
