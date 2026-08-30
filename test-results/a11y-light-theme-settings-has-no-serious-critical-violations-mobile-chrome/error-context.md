# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> light theme >> settings has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 2 axe violation(s) on light theme > settings:

[SERIOUS] document-title: Ensure each HTML document contains a non-empty <title> element
  Help: https://dequeuniversity.com/rules/axe/4.10/document-title?application=playwright
  Nodes (1):
    - <html class="light" id="__next_error__" style="color-scheme: light;">

[CRITICAL] label: Ensure every form element has a label
  Help: https://dequeuniversity.com/rules/axe/4.10/label?application=playwright
  Nodes (8):
    - <input role="switch" class="sr-only peer" id="email-tips" type="checkbox" checked="">
    - <input role="switch" class="sr-only peer" id="email-security" type="checkbox" checked="">
    - <input role="switch" class="sr-only peer" id="email-digest" type="checkbox">
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - heading "Settings" [level=1] [ref=e5]
      - paragraph [ref=e6]: Manage your account and preferences
    - region "Settings" [ref=e7]:
      - generic [ref=e9]:
        - link "Profile Edit your public creator profile and avatar" [ref=e10] [cursor=pointer]:
          - /url: /profile
          - generic [ref=e11]:
            - img [ref=e13]
            - generic [ref=e15]:
              - paragraph [ref=e16]: Profile
              - paragraph [ref=e17]: Edit your public creator profile and avatar
          - img [ref=e18]
        - link "Notifications Control how and when you're notified" [ref=e20] [cursor=pointer]:
          - /url: /settings/notifications
          - generic [ref=e21]:
            - img [ref=e23]
            - generic [ref=e25]:
              - paragraph [ref=e26]: Notifications
              - paragraph [ref=e27]: Control how and when you're notified
          - img [ref=e28]
      - generic [ref=e31]:
        - heading "Email preferences" [level=2] [ref=e32]:
          - img [ref=e33]
          - text: Email preferences
        - generic [ref=e35]:
          - generic [ref=e36]:
            - generic [ref=e37]:
              - paragraph [ref=e38]: Tip notifications
              - paragraph [ref=e39]: Email when you receive a tip
            - switch [checked] [ref=e43]
          - generic [ref=e44]:
            - generic [ref=e45]:
              - paragraph [ref=e46]: Security alerts
              - paragraph [ref=e47]: Login attempts and account changes
            - switch [checked] [ref=e51]
          - generic [ref=e52]:
            - generic [ref=e53]:
              - paragraph [ref=e54]: Weekly digest
              - paragraph [ref=e55]: Summary of your creator activity
            - switch [ref=e59]
          - generic [ref=e60]:
            - generic [ref=e61]:
              - paragraph [ref=e62]: Product updates
              - paragraph [ref=e63]: News and feature announcements
            - switch [ref=e67]
        - button "Save" [ref=e69]
      - generic [ref=e71]:
        - heading "Sound Preferences" [level=3] [ref=e72]
        - generic [ref=e73]:
          - text: Notification sounds
          - switch "Notification sounds" [checked] [ref=e74]: Disable sounds
        - generic [ref=e75]:
          - generic [ref=e76]:
            - text: Volume
            - generic [ref=e77]: 50%
          - slider "Notification sound volume" [ref=e78]: "0.5"
        - button "Preview sound" [ref=e79]
      - generic [ref=e81]:
        - heading "Privacy" [level=2] [ref=e82]:
          - img [ref=e83]
          - text: Privacy
        - generic [ref=e85]:
          - generic [ref=e86]:
            - generic [ref=e87]:
              - paragraph [ref=e88]: Public profile
              - paragraph [ref=e89]: Anyone can view your creator page
            - switch [checked] [ref=e93]
          - generic [ref=e94]:
            - generic [ref=e95]:
              - paragraph [ref=e96]: Show tip count
              - paragraph [ref=e97]: Display total tips received publicly
            - switch [checked] [ref=e101]
          - generic [ref=e102]:
            - generic [ref=e103]:
              - paragraph [ref=e104]: Show supporters
              - paragraph [ref=e105]: List supporters on your profile
            - switch [ref=e109]
        - button "Save" [ref=e111]
      - generic [ref=e113]:
        - heading "Security" [level=2] [ref=e114]:
          - img [ref=e115]
          - text: Security
        - generic [ref=e117]:
          - generic [ref=e118]:
            - paragraph [ref=e119]: Two-factor authentication
            - paragraph [ref=e120]: Add an extra layer of security to your account
          - switch [ref=e124]
      - generic [ref=e126]:
        - heading "Help" [level=2] [ref=e127]:
          - img [ref=e128]
          - text: Help
        - paragraph [ref=e130]: Take a guided walkthrough of the key features in Stellar Tip Jar.
        - button "Replay product tour" [ref=e131]
      - generic [ref=e133]:
        - heading "Danger zone" [level=2] [ref=e134]:
          - img [ref=e135]
          - text: Danger zone
        - paragraph [ref=e137]: Permanently delete your account and all associated data. This action cannot be undone.
        - button "Delete account" [ref=e138]
  - generic [ref=e139]:
    - img [ref=e141]
    - button "Open Tanstack query devtools" [ref=e189] [cursor=pointer]:
      - img [ref=e190]
  - alert [ref=e238]
```

# Test source

```ts
  1   | /**
  2   |  * Accessibility testing helpers for @axe-core/playwright.
  3   |  *
  4   |  * Usage:
  5   |  *   import { runAxe, forceTheme } from '../helpers/a11y';
  6   |  *   await forceTheme(page, 'dark');
  7   |  *   const violations = await runAxe(page);
  8   |  */
  9   | 
  10  | import AxeBuilder from '@axe-core/playwright';
  11  | import type { Page } from '@playwright/test';
  12  | import { expect } from '@playwright/test';
  13  | 
  14  | /** ImpactValue from axe-core */
  15  | type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical';
  16  | 
  17  | /**
  18  |  * Rules that produce known third-party / browser-default violations that we
  19  |  * cannot fix in our codebase.  Each entry MUST include an inline justification.
  20  |  */
  21  | const EXCLUDED_RULES: { id: string; reason: string }[] = [
  22  |   // next-themes injects a <script> tag before <head> content; axe flags it
  23  |   // as an html-has-lang timing issue during hydration — not fixable from app code.
  24  |   { id: 'html-has-lang', reason: 'Covered by locale layout; false-positive during SSR hydration in tests.' },
  25  | ];
  26  | 
  27  | /**
  28  |  * Run axe-core on the current page state and return violations.
  29  |  * Gated to serious + critical impact by default.
  30  |  *
  31  |  * @param page        Playwright Page
  32  |  * @param minImpact   Minimum violation impact level to include (default: 'serious')
  33  |  * @param include     Optional CSS selector to scope the scan to a subtree
  34  |  */
  35  | export async function runAxe(
  36  |   page: Page,
  37  |   minImpact: ImpactValue = 'serious',
  38  |   include?: string,
  39  | ): Promise<import('axe-core').Result[]> {
  40  |   const impactOrder: ImpactValue[] = ['minor', 'moderate', 'serious', 'critical'];
  41  |   const minIndex = impactOrder.indexOf(minImpact);
  42  | 
  43  |   let builder = new AxeBuilder({ page });
  44  | 
  45  |   EXCLUDED_RULES.forEach(({ id }) => builder = builder.disableRules([id]));
  46  | 
  47  |   if (include) {
  48  |     builder = builder.include(include);
  49  |   }
  50  | 
  51  |   const { violations } = await builder.analyze();
  52  | 
  53  |   return violations.filter(
  54  |     (v) => v.impact && impactOrder.indexOf(v.impact as ImpactValue) >= minIndex,
  55  |   );
  56  | }
  57  | 
  58  | /**
  59  |  * Assert zero serious/critical violations.  Prints a descriptive failure
  60  |  * message with each violation's help URL on failure.
  61  |  */
  62  | export async function expectNoViolations(
  63  |   page: Page,
  64  |   context = 'page',
  65  |   include?: string,
  66  | ): Promise<void> {
  67  |   const violations = await runAxe(page, 'serious', include);
  68  | 
  69  |   if (violations.length > 0) {
  70  |     const report = violations
  71  |       .map(
  72  |         (v) =>
  73  |           `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
  74  |           `  Help: ${v.helpUrl}\n` +
  75  |           `  Nodes (${v.nodes.length}):\n` +
  76  |           v.nodes
  77  |             .slice(0, 3)
  78  |             .map((n) => `    - ${n.html}`)
  79  |             .join('\n'),
  80  |       )
  81  |       .join('\n\n');
  82  | 
> 83  |     throw new Error(
      |           ^ Error: 2 axe violation(s) on light theme > settings:
  84  |       `${violations.length} axe violation(s) on ${context}:\n\n${report}`,
  85  |     );
  86  |   }
  87  | 
  88  |   expect(violations).toHaveLength(0);
  89  | }
  90  | 
  91  | /**
  92  |  * Force a specific theme on the page by setting the class on <html> and
  93  |  * writing to localStorage so next-themes picks it up on reload.
  94  |  */
  95  | export async function forceTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  96  |   await page.evaluate((t) => {
  97  |     // next-themes stores the value under this key by default
  98  |     localStorage.setItem('theme', t);
  99  |     document.documentElement.classList.toggle('dark', t === 'dark');
  100 |     document.documentElement.classList.toggle('light', t === 'light');
  101 |   }, theme);
  102 | }
  103 | 
  104 | /**
  105 |  * Navigate and wait for the page to fully settle (no network activity,
  106 |  * no pending animations) before running axe.
  107 |  */
  108 | export async function gotoAndSettle(page: Page, path: string): Promise<void> {
  109 |   await page.goto(path);
  110 |   // Hide Next.js dev overlay so it doesn't intercept pointer events
  111 |   await page.addStyleTag({
  112 |     content: 'nextjs-portal { display: none !important; }',
  113 |   });
  114 |   await page.waitForLoadState('networkidle');
  115 | }
  116 | 
```