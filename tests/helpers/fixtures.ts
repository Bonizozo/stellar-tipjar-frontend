import type { Page } from '@playwright/test'

export const MOCK_CREATOR = {
  username: 'testuser',
  displayName: 'Test User',
  bio: 'A test creator',
  preferredAsset: 'XLM',
}

/** Intercept the creator profile API and return mock data */
export async function mockCreatorProfile(page: Page, username = MOCK_CREATOR.username) {
  await page.route(`**/api/creators/${username}`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_CREATOR),
    })
  )
}

/** Intercept the tip submission API */
export async function mockTipSubmit(page: Page, success = true) {
  await page.route('**/api/tips', (route) =>
    route.fulfill({
      status: success ? 200 : 500,
      contentType: 'application/json',
      body: JSON.stringify(success ? { id: 'tip_123', status: 'completed' } : { error: 'Failed' }),
    })
  )
}
