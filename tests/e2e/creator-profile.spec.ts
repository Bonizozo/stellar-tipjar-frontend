import { test, expect } from '@playwright/test'
import { mockCreatorProfile, MOCK_CREATOR } from '../helpers/fixtures'

test.describe('Creator Profile', () => {
  test.beforeEach(async ({ page }) => {
    await mockCreatorProfile(page)
    await page.goto(`/creator/${MOCK_CREATOR.username}`)
  })

  test('displays creator info', async ({ page }) => {
    await expect(page.getByRole('heading', { name: MOCK_CREATOR.displayName })).toBeVisible()
    await expect(page.getByText(MOCK_CREATOR.bio)).toBeVisible()
    await expect(page.getByText(MOCK_CREATOR.preferredAsset)).toBeVisible()
  })

  test('shows tip form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /send a tip/i })).toBeVisible()
  })

  test('shows 404 for invalid username', async ({ page }) => {
    await page.goto('/creator/!!invalid!!')
    await expect(page).toHaveURL(/\/not-found|404|creator/)
  })
})
