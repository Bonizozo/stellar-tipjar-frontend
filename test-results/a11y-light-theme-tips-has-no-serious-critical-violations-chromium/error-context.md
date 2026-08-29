# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> light theme >> tips has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 1 axe violation(s) on light theme > tips:

[SERIOUS] document-title: Ensure each HTML document contains a non-empty <title> element
  Help: https://dequeuniversity.com/rules/axe/4.10/document-title?application=playwright
  Nodes (1):
    - <html class="light" style="color-scheme: light;" id="__next_error__">
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Tip History" [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - heading "Tip History" [level=1] [ref=e5]
        - paragraph [ref=e6]: View and manage all your tip transactions. Filter by date, amount, or status.
      - generic [ref=e7]:
        - link "Timeline view" [ref=e8] [cursor=pointer]:
          - /url: /tips/timeline
        - button "Export" [ref=e9]:
          - img [ref=e10]
          - text: Export
    - generic [ref=e12]:
      - generic [ref=e13]:
        - paragraph [ref=e14]: Total Tips
        - paragraph [ref=e15]: "8"
      - generic [ref=e16]:
        - paragraph [ref=e17]: Total Amount
        - paragraph [ref=e18]: 365 XLM
      - generic [ref=e19]:
        - paragraph [ref=e20]: Filtered Results
        - paragraph [ref=e21]: "8"
    - generic [ref=e22]:
      - heading "Send a Tip" [level=2] [ref=e23]
      - form "Send a tip" [ref=e24]:
        - generic [ref=e25]:
          - text: Creator Username
          - textbox "Creator Username" [ref=e26]:
            - /placeholder: alice
          - paragraph [ref=e27]: The username of the creator you want to tip
        - generic [ref=e29]:
          - text: Amount
          - spinbutton "Amount" [ref=e30]
          - paragraph [ref=e31]: Amount in Stellar Lumens (XLM)
        - generic [ref=e33]:
          - text: Message (Optional)
          - textbox "Message (Optional)" [ref=e34]:
            - /placeholder: Thanks for the great content!
          - paragraph [ref=e35]: A short message for the creator (max 200 characters)
        - generic [ref=e37]:
          - text: Transaction Hash (Optional)
          - textbox "Transaction Hash (Optional)" [ref=e38]:
            - /placeholder: 64-character hex string
        - button "Submit tip" [ref=e41]: Send Tip
    - button "Advanced Filters" [ref=e43]:
      - generic [ref=e44]:
        - img [ref=e45]
        - text: Advanced Filters
      - img [ref=e47]
    - table [ref=e51]:
      - rowgroup [ref=e52]:
        - row "Date Amount Recipient Status Memo Transaction Actions" [ref=e53]:
          - columnheader "Date" [ref=e54]:
            - button "Date" [ref=e55]:
              - text: Date
              - img [ref=e56]
          - columnheader "Amount" [ref=e58]:
            - button "Amount" [ref=e59]:
              - text: Amount
              - img [ref=e60]
          - columnheader "Recipient" [ref=e62]:
            - button "Recipient" [ref=e63]:
              - text: Recipient
              - img [ref=e64]
          - columnheader "Status" [ref=e66]:
            - button "Status" [ref=e67]:
              - text: Status
              - img [ref=e68]
          - columnheader "Memo" [ref=e70]
          - columnheader "Transaction" [ref=e71]
          - columnheader "Actions" [ref=e72]
      - rowgroup [ref=e73]:
        - row "Mar 20, 2024, 04:00 PM 50 XLM @alice Completed Great content! abc123... Receipt" [ref=e74]:
          - cell "Mar 20, 2024, 04:00 PM" [ref=e75]
          - cell "50 XLM" [ref=e76]
          - cell "@alice" [ref=e77]:
            - link "@alice" [ref=e78] [cursor=pointer]:
              - /url: /creator/alice
          - cell "Completed" [ref=e79]
          - cell "Great content!" [ref=e80]
          - cell "abc123..." [ref=e81]:
            - link "abc123..." [ref=e82] [cursor=pointer]:
              - /url: https://stellar.expert/explorer/public/tx/abc123
          - cell "Receipt" [ref=e83]:
            - button "Receipt" [ref=e84]:
              - img [ref=e85]
              - text: Receipt
        - row "Mar 19, 2024, 09:15 PM 25 XLM @stellar-dev Completed - def456... Receipt" [ref=e87]:
          - cell "Mar 19, 2024, 09:15 PM" [ref=e88]
          - cell "25 XLM" [ref=e89]
          - cell "@stellar-dev" [ref=e90]:
            - link "@stellar-dev" [ref=e91] [cursor=pointer]:
              - /url: /creator/stellar-dev
          - cell "Completed" [ref=e92]
          - cell "-" [ref=e93]
          - cell "def456..." [ref=e94]:
            - link "def456..." [ref=e95] [cursor=pointer]:
              - /url: https://stellar.expert/explorer/public/tx/def456
          - cell "Receipt" [ref=e96]:
            - button "Receipt" [ref=e97]:
              - img [ref=e98]
              - text: Receipt
        - row "Mar 18, 2024, 02:45 PM 100 XLM @pixelmaker Pending - - Receipt" [ref=e100]:
          - cell "Mar 18, 2024, 02:45 PM" [ref=e101]
          - cell "100 XLM" [ref=e102]
          - cell "@pixelmaker" [ref=e103]:
            - link "@pixelmaker" [ref=e104] [cursor=pointer]:
              - /url: /creator/pixelmaker
          - cell "Pending" [ref=e105]
          - cell "-" [ref=e106]
          - cell "-" [ref=e107]
          - cell "Receipt" [ref=e108]:
            - button "Receipt" [ref=e109]:
              - img [ref=e110]
              - text: Receipt
        - row "Mar 17, 2024, 07:50 PM 15 XLM @crypto-artist Completed - ghi789... Receipt" [ref=e112]:
          - cell "Mar 17, 2024, 07:50 PM" [ref=e113]
          - cell "15 XLM" [ref=e114]
          - cell "@crypto-artist" [ref=e115]:
            - link "@crypto-artist" [ref=e116] [cursor=pointer]:
              - /url: /creator/crypto-artist
          - cell "Completed" [ref=e117]
          - cell "-" [ref=e118]
          - cell "ghi789..." [ref=e119]:
            - link "ghi789..." [ref=e120] [cursor=pointer]:
              - /url: https://stellar.expert/explorer/public/tx/ghi789
          - cell "Receipt" [ref=e121]:
            - button "Receipt" [ref=e122]:
              - img [ref=e123]
              - text: Receipt
        - row "Mar 16, 2024, 04:30 PM 75 XLM @blockchain-edu Failed - - Receipt" [ref=e125]:
          - cell "Mar 16, 2024, 04:30 PM" [ref=e126]
          - cell "75 XLM" [ref=e127]
          - cell "@blockchain-edu" [ref=e128]:
            - link "@blockchain-edu" [ref=e129] [cursor=pointer]:
              - /url: /creator/blockchain-edu
          - cell "Failed" [ref=e130]
          - cell "-" [ref=e131]
          - cell "-" [ref=e132]
          - cell "Receipt" [ref=e133]:
            - button "Receipt" [ref=e134]:
              - img [ref=e135]
              - text: Receipt
        - row "Mar 15, 2024, 10:00 PM 30 XLM @community-lab Completed - jkl012... Receipt" [ref=e137]:
          - cell "Mar 15, 2024, 10:00 PM" [ref=e138]
          - cell "30 XLM" [ref=e139]
          - cell "@community-lab" [ref=e140]:
            - link "@community-lab" [ref=e141] [cursor=pointer]:
              - /url: /creator/community-lab
          - cell "Completed" [ref=e142]
          - cell "-" [ref=e143]
          - cell "jkl012..." [ref=e144]:
            - link "jkl012..." [ref=e145] [cursor=pointer]:
              - /url: https://stellar.expert/explorer/public/tx/jkl012
          - cell "Receipt" [ref=e146]:
            - button "Receipt" [ref=e147]:
              - img [ref=e148]
              - text: Receipt
        - row "Mar 14, 2024, 07:15 PM 200 XLM @nft-creator Completed Amazing work! mno345... Receipt" [ref=e150]:
          - cell "Mar 14, 2024, 07:15 PM" [ref=e151]
          - cell "200 XLM" [ref=e152]
          - cell "@nft-creator" [ref=e153]:
            - link "@nft-creator" [ref=e154] [cursor=pointer]:
              - /url: /creator/nft-creator
          - cell "Completed" [ref=e155]
          - cell "Amazing work!" [ref=e156]
          - cell "mno345..." [ref=e157]:
            - link "mno345..." [ref=e158] [cursor=pointer]:
              - /url: https://stellar.expert/explorer/public/tx/mno345
          - cell "Receipt" [ref=e159]:
            - button "Receipt" [ref=e160]:
              - img [ref=e161]
              - text: Receipt
        - row "Mar 13, 2024, 03:40 PM 45 XLM @defi-expert Completed - pqr678... Receipt" [ref=e163]:
          - cell "Mar 13, 2024, 03:40 PM" [ref=e164]
          - cell "45 XLM" [ref=e165]
          - cell "@defi-expert" [ref=e166]:
            - link "@defi-expert" [ref=e167] [cursor=pointer]:
              - /url: /creator/defi-expert
          - cell "Completed" [ref=e168]
          - cell "-" [ref=e169]
          - cell "pqr678..." [ref=e170]:
            - link "pqr678..." [ref=e171] [cursor=pointer]:
              - /url: https://stellar.expert/explorer/public/tx/pqr678
          - cell "Receipt" [ref=e172]:
            - button "Receipt" [ref=e173]:
              - img [ref=e174]
              - text: Receipt
    - generic [ref=e177]:
      - text: "Show:"
      - combobox "Show:" [ref=e178]:
        - option "10" [selected]
        - option "25"
        - option "50"
      - text: per page
  - generic [ref=e179]:
    - img [ref=e181]
    - button "Open Tanstack query devtools" [ref=e229] [cursor=pointer]:
      - img [ref=e230]
  - alert [ref=e278]
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
      |           ^ Error: 1 axe violation(s) on light theme > tips:
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