# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> tips has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/en/tips", waiting until "load"

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
        - link "Timeline view" [ref=e8]:
          - /url: /tips/timeline
        - button "Export" [disabled] [ref=e9]:
          - img [ref=e10]
          - text: Export
    - generic [ref=e12]:
      - generic [ref=e13]:
        - paragraph [ref=e14]: Total Tips
        - paragraph [ref=e15]: "0"
      - generic [ref=e16]:
        - paragraph [ref=e17]: Total Amount
        - paragraph [ref=e18]: 0 XLM
      - generic [ref=e19]:
        - paragraph [ref=e20]: Filtered Results
        - paragraph [ref=e21]: "0"
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
  - button "Open Next.js Dev Tools" [ref=e54] [cursor=pointer]:
    - img [ref=e55]
```

# Test source

```ts
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
  83  |     throw new Error(
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
> 109 |   await page.goto(path);
      |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  110 |   // Hide Next.js dev overlay so it doesn't intercept pointer events
  111 |   await page.addStyleTag({
  112 |     content: 'nextjs-portal { display: none !important; }',
  113 |   });
  114 |   await page.waitForLoadState('networkidle');
  115 | }
  116 | 
```