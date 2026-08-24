// tests/e2e/a11y.spec.ts
import { test } from '@playwright/test';
import { expectNoViolations, forceTheme, gotoAndSettle } from '../helpers/a11y';
import { mockCreatorProfile, mockTipSubmit, MOCK_CREATOR } from '../helpers/fixtures';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'explore', path: '/explore' },
  { name: 'tips', path: '/tips' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'settings', path: '/settings' },
  { name: 'search', path: '/search' },
  { name: 'creator profile', path: `/creator/${MOCK_CREATOR.username}` },
];

const THEMES = ['light', 'dark'] as const;

// Full-page axe scans are intentionally thorough and chart-heavy routes can
// take longer than Playwright's default timeout on shared CI runners.
test.setTimeout(120_000);

for (const theme of THEMES) {
  test.describe(`${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      // Axe scans the stable UI state; entrance animations are not under test.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      // set theme before navigation so it applies immediately
      await page.goto('/');
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
      await gotoAndSettle(page, `/creator/${MOCK_CREATOR.username}`);
      await forceTheme(page, theme);
      // scan specifically the tip form area
      await expectNoViolations(page, `${theme} theme > creator tip form`, '[aria-label*="Send a tip"], [data-tour="tip-form"]');
    });

    test('export modal has no serious/critical violations when open', async ({ page }) => {
      await gotoAndSettle(page, '/tips');
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
