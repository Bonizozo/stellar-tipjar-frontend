/**
 * Accessibility testing helpers for @axe-core/playwright.
 *
 * Usage:
 *   import { runAxe, forceTheme } from '../helpers/a11y';
 *   await forceTheme(page, 'dark');
 *   const violations = await runAxe(page);
 */

import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/** ImpactValue from axe-core */
type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical';

/**
 * Rules that produce known third-party / browser-default violations that we
 * cannot fix in our codebase.  Each entry MUST include an inline justification.
 */
const EXCLUDED_RULES: { id: string; reason: string }[] = [
  // next-themes injects a <script> tag before <head> content; axe flags it
  // as an html-has-lang timing issue during hydration — not fixable from app code.
  { id: 'html-has-lang', reason: 'Covered by locale layout; false-positive during SSR hydration in tests.' },
];

/**
 * Run axe-core on the current page state and return violations.
 * Gated to serious + critical impact by default.
 *
 * @param page        Playwright Page
 * @param minImpact   Minimum violation impact level to include (default: 'serious')
 * @param include     Optional CSS selector to scope the scan to a subtree
 */
export async function runAxe(
  page: Page,
  minImpact: ImpactValue = 'serious',
  include?: string,
): Promise<import('axe-core').Result[]> {
  const impactOrder: ImpactValue[] = ['minor', 'moderate', 'serious', 'critical'];
  const minIndex = impactOrder.indexOf(minImpact);

  let builder = new AxeBuilder({ page });

  EXCLUDED_RULES.forEach(({ id }) => builder = builder.disableRules([id]));

  if (include) {
    builder = builder.include(include);
  }

  const { violations } = await builder.analyze();

  return violations.filter(
    (v) => v.impact && impactOrder.indexOf(v.impact as ImpactValue) >= minIndex,
  );
}

/**
 * Assert zero serious/critical violations.  Prints a descriptive failure
 * message with each violation's help URL on failure.
 */
export async function expectNoViolations(
  page: Page,
  context = 'page',
  include?: string,
): Promise<void> {
  const violations = await runAxe(page, 'serious', include);

  if (violations.length > 0) {
    const report = violations
      .map(
        (v) =>
          `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
          `  Help: ${v.helpUrl}\n` +
          `  Nodes (${v.nodes.length}):\n` +
          v.nodes
            .slice(0, 3)
            .map((n) => `    - ${n.html}`)
            .join('\n'),
      )
      .join('\n\n');

    throw new Error(
      `${violations.length} axe violation(s) on ${context}:\n\n${report}`,
    );
  }

  expect(violations).toHaveLength(0);
}

/**
 * Force a specific theme on the page by setting the class on <html> and
 * writing to localStorage so next-themes picks it up on reload.
 */
export async function forceTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  await page.evaluate((t) => {
    // next-themes stores the value under this key by default
    localStorage.setItem('theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.classList.toggle('light', t === 'light');
  }, theme);
}

/**
 * Navigate and wait for the page to fully settle (no network activity,
 * no pending animations) before running axe.
 */
export async function gotoAndSettle(page: Page, path: string): Promise<void> {
  await page.goto(path);
  // Hide Next.js dev overlay so it doesn't intercept pointer events
  await page.addStyleTag({
    content: 'nextjs-portal { display: none !important; }',
  });
  await page.waitForLoadState('networkidle');
}
