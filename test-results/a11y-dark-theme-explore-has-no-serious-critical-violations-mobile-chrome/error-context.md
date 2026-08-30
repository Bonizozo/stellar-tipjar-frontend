# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> explore has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 1 axe violation(s) on dark theme > explore:

[SERIOUS] document-title: Ensure each HTML document contains a non-empty <title> element
  Help: https://dequeuniversity.com/rules/axe/4.10/document-title?application=playwright
  Nodes (1):
    - <html class="dark" style="color-scheme: light;" id="__next_error__">
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - region "Explore Creators" [ref=e3]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - heading "Explore Creators" [level=1] [ref=e7]
          - paragraph [ref=e8]: Discover amazing builders, artists, and community leaders on Stellar. Support your favorites and help the ecosystem grow.
        - link "Compare Creators" [ref=e9] [cursor=pointer]:
          - /url: /compare
          - img [ref=e10]
          - text: Compare Creators
    - generic [ref=e13]:
      - generic [ref=e15]:
        - img [ref=e17]
        - searchbox "Search creators" [ref=e19]
      - 'button "Sort by: Most Popular" [ref=e22]':
        - generic [ref=e23]:
          - generic [ref=e24]: "Sort by:"
          - text: Most Popular
        - img [ref=e25]
    - generic [ref=e27]:
      - complementary [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30]:
            - heading "Filters" [level=2] [ref=e31]
            - button "Clear All" [ref=e32]
          - generic [ref=e33]:
            - heading "Status" [level=3] [ref=e34]
            - generic [ref=e35]:
              - checkbox "Verified Only" [ref=e37]
              - text: Verified Only
          - generic [ref=e38]:
            - heading "Categories" [level=3] [ref=e39]
            - generic [ref=e40]:
              - generic [ref=e41]:
                - checkbox "art" [ref=e42]
                - text: art
              - generic [ref=e43]:
                - checkbox "tech" [ref=e44]
                - text: tech
              - generic [ref=e45]:
                - checkbox "community" [ref=e46]
                - text: community
              - generic [ref=e47]:
                - checkbox "education" [ref=e48]
                - text: education
              - generic [ref=e49]:
                - checkbox "music" [ref=e50]
                - text: music
              - generic [ref=e51]:
                - checkbox "gaming" [ref=e52]
                - text: gaming
              - generic [ref=e53]:
                - checkbox "crypto" [ref=e54]
                - text: crypto
              - generic [ref=e55]:
                - checkbox "nft" [ref=e56]
                - text: nft
              - generic [ref=e57]:
                - checkbox "defi" [ref=e58]
                - text: defi
              - generic [ref=e59]:
                - checkbox "dao" [ref=e60]
                - text: dao
          - generic [ref=e61]:
            - heading "Location" [level=3] [ref=e62]
            - generic [ref=e63]:
              - generic [ref=e64]:
                - checkbox "Amsterdam, NL" [ref=e65]
                - text: Amsterdam, NL
              - generic [ref=e66]:
                - checkbox "Austin, US" [ref=e67]
                - text: Austin, US
              - generic [ref=e68]:
                - checkbox "Barcelona, ES" [ref=e69]
                - text: Barcelona, ES
              - generic [ref=e70]:
                - checkbox "Berlin, DE" [ref=e71]
                - text: Berlin, DE
              - generic [ref=e72]:
                - checkbox "Boston, US" [ref=e73]
                - text: Boston, US
              - generic [ref=e74]:
                - checkbox "Chicago, US" [ref=e75]
                - text: Chicago, US
              - generic [ref=e76]:
                - checkbox "Copenhagen, DK" [ref=e77]
                - text: Copenhagen, DK
              - generic [ref=e78]:
                - checkbox "Dublin, IE" [ref=e79]
                - text: Dublin, IE
              - generic [ref=e80]:
                - checkbox "Lisbon, PT" [ref=e81]
                - text: Lisbon, PT
              - generic [ref=e82]:
                - checkbox "London, UK" [ref=e83]
                - text: London, UK
              - generic [ref=e84]:
                - checkbox "Los Angeles, US" [ref=e85]
                - text: Los Angeles, US
              - generic [ref=e86]:
                - checkbox "Mexico City, MX" [ref=e87]
                - text: Mexico City, MX
              - generic [ref=e88]:
                - checkbox "Milan, IT" [ref=e89]
                - text: Milan, IT
              - generic [ref=e90]:
                - checkbox "New York, US" [ref=e91]
                - text: New York, US
              - generic [ref=e92]:
                - checkbox "Paris, FR" [ref=e93]
                - text: Paris, FR
              - generic [ref=e94]:
                - checkbox "San Francisco, US" [ref=e95]
                - text: San Francisco, US
              - generic [ref=e96]:
                - checkbox "Seoul, KR" [ref=e97]
                - text: Seoul, KR
              - generic [ref=e98]:
                - checkbox "Singapore, SG" [ref=e99]
                - text: Singapore, SG
              - generic [ref=e100]:
                - checkbox "Stockholm, SE" [ref=e101]
                - text: Stockholm, SE
              - generic [ref=e102]:
                - checkbox "Sydney, AU" [ref=e103]
                - text: Sydney, AU
              - generic [ref=e104]:
                - checkbox "Tokyo, JP" [ref=e105]
                - text: Tokyo, JP
              - generic [ref=e106]:
                - checkbox "Toronto, CA" [ref=e107]
                - text: Toronto, CA
              - generic [ref=e108]:
                - checkbox "Zurich, CH" [ref=e109]
                - text: Zurich, CH
      - generic [ref=e110]:
        - paragraph [ref=e112]: Found 25 creators
        - list "Creator list" [ref=e113]:
          - generic [ref=e114]:
            - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e116] [cursor=pointer]:
              - /url: /creator/nft-creator
              - img [ref=e119]
              - generic [ref=e121]:
                - generic [ref=e123]: NC
                - generic [ref=e124]:
                  - paragraph [ref=e125]: art
                  - heading "NFT Creator" [level=3] [ref=e126]
                  - paragraph [ref=e127]: "@nft-creator"
                - paragraph [ref=e128]: Minting experiences that transcend the digital realm.
                - generic [ref=e129]:
                  - img [ref=e130]
                  - text: Sydney, AU
                - generic [ref=e133]:
                  - generic [ref=e134]:
                    - paragraph [ref=e135]: 4,200
                    - paragraph [ref=e136]: Followers
                  - generic [ref=e137]:
                    - paragraph [ref=e138]: $15,000
                    - paragraph [ref=e139]: Earnings
            - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e141] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - img [ref=e144]
              - generic [ref=e146]:
                - generic [ref=e148]: PD
                - generic [ref=e149]:
                  - paragraph [ref=e150]: tech
                  - heading "Protocol Dev" [level=3] [ref=e151]
                  - paragraph [ref=e152]: "@protocol-dev"
                - paragraph [ref=e153]: Optimizing the core protocols for maximum efficiency.
                - generic [ref=e154]:
                  - img [ref=e155]
                  - text: Chicago, US
                - generic [ref=e158]:
                  - generic [ref=e159]:
                    - paragraph [ref=e160]: 4,100
                    - paragraph [ref=e161]: Followers
                  - generic [ref=e162]:
                    - paragraph [ref=e163]: $16,000
                    - paragraph [ref=e164]: Earnings
            - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e166] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - img [ref=e169]
              - generic [ref=e171]:
                - generic [ref=e173]: SD
                - generic [ref=e174]:
                  - paragraph [ref=e175]: tech
                  - heading "Solidity Dev" [level=3] [ref=e176]
                  - paragraph [ref=e177]: "@solidity-dev"
                - paragraph [ref=e178]: Forging bulletproof smart contracts for the world's applications.
                - generic [ref=e179]:
                  - img [ref=e180]
                  - text: San Francisco, US
                - generic [ref=e183]:
                  - generic [ref=e184]:
                    - paragraph [ref=e185]: 3,900
                    - paragraph [ref=e186]: Followers
                  - generic [ref=e187]:
                    - paragraph [ref=e188]: $14,500
                    - paragraph [ref=e189]: Earnings
            - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e191] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - img [ref=e194]
              - generic [ref=e196]:
                - generic [ref=e198]: SC
                - generic [ref=e199]:
                  - paragraph [ref=e200]: tech
                  - heading "Smart Contract Dev" [level=3] [ref=e201]
                  - paragraph [ref=e202]: "@smart-contract-dev"
                - paragraph [ref=e203]: Writing secure, efficient code for the on-chain economy.
                - generic [ref=e204]:
                  - img [ref=e205]
                  - text: Boston, US
                - generic [ref=e208]:
                  - generic [ref=e209]:
                    - paragraph [ref=e210]: 3,800
                    - paragraph [ref=e211]: Followers
                  - generic [ref=e212]:
                    - paragraph [ref=e213]: $14,000
                    - paragraph [ref=e214]: Earnings
          - generic [ref=e217]: Loading more creators…
  - generic [ref=e218]:
    - img [ref=e220]
    - button "Open Tanstack query devtools" [ref=e268] [cursor=pointer]:
      - img [ref=e269]
  - alert [ref=e317]
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
      |           ^ Error: 1 axe violation(s) on dark theme > explore:
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