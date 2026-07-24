// tests/e2e/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoViolations, forceTheme, gotoAndSettle } from '../helpers/a11y';
import { mockCreatorProfile, mockTipSubmit, MOCK_CREATOR } from '../helpers/fixtures';

const ROUTES = [
  { name: 'home', path: '/en/' },
  { name: 'explore', path: '/en/explore' },
  { name: 'tips', path: '/en/tips' },
  { name: 'dashboard', path: '/en/dashboard' },
  { name: 'settings', path: '/en/settings' },
  { name: 'search', path: '/en/search' },
  { name: 'creator profile', path: `/en/creator/${MOCK_CREATOR.username}` },
];

const THEMES = ['light', 'dark'] as const;

for (const theme of THEMES) {
  test.describe(`${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      // set theme before navigation so it applies immediately
      await page.goto('/en/');
      await forceTheme(page, theme);
    });

    for (const route of ROUTES) {
      test(`${route.name} has no serious/critical violations`, async ({ page }) => {
        if (route.name === 'creator profile') {
          await mockCreatorProfile(page);
          await mockTipSubmit(page);
        }
        await gotoAndSettle(page, route.path);
        await forceTheme(page, theme);
        await expectNoViolations(page, `${theme} theme > ${route.name}`);
      });
    }

    test('creator profile — tip form section has no serious/critical violations', async ({ page }) => {
      await mockCreatorProfile(page);
      await mockTipSubmit(page);
      await gotoAndSettle(page, `/en/creator/${MOCK_CREATOR.username}`);
      await forceTheme(page, theme);
      // scan specifically the tip form area
      await expectNoViolations(page, `${theme} theme > creator tip form`, '[aria-label*="Send a tip"], [data-tour="tip-form"]');
    });

    test('export modal has no serious/critical violations when open', async ({ page }) => {
      await gotoAndSettle(page, '/en/tips');
      await forceTheme(page, theme);
      // Try to open an export modal by clicking the Export button
      const exportBtn = page.getByRole('button', { name: /export/i });
      if (await exportBtn.isVisible()) {
        await exportBtn.click();
        await page.waitForSelector('[role="dialog"]', { timeout: 3000 }).catch(() => {});
        await expectNoViolations(page, `${theme} theme > tips export modal`);
      } else {
        test.skip();
      }
    });
  });
}
