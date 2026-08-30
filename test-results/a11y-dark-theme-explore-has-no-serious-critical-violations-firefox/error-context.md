# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> explore has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 2 axe violation(s) on dark theme > explore:

[CRITICAL] aria-required-children: Ensure elements with an ARIA role that require child roles contain them
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-required-children?application=playwright
  Nodes (1):
    - <div role="list" aria-label="Creator list" style="position: relative; height: 17250.2px;">

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
            - link "NFT Creator art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e116] [cursor=pointer]:
              - /url: /creator/nft-creator
              - img [ref=e119]
              - generic [ref=e121]:
                - img "NFT Creator" [ref=e122]
                - generic [ref=e123]:
                  - paragraph [ref=e124]: art
                  - heading "NFT Creator" [level=3] [ref=e125]
                  - paragraph [ref=e126]: "@nft-creator"
                - paragraph [ref=e127]: Minting experiences that transcend the digital realm.
                - generic [ref=e128]:
                  - img [ref=e129]
                  - text: Sydney, AU
                - generic [ref=e132]:
                  - generic [ref=e133]:
                    - paragraph [ref=e134]: 4,200
                    - paragraph [ref=e135]: Followers
                  - generic [ref=e136]:
                    - paragraph [ref=e137]: $15,000
                    - paragraph [ref=e138]: Earnings
            - link "Protocol Dev tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e140] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - img [ref=e143]
              - generic [ref=e145]:
                - img "Protocol Dev" [ref=e146]
                - generic [ref=e147]:
                  - paragraph [ref=e148]: tech
                  - heading "Protocol Dev" [level=3] [ref=e149]
                  - paragraph [ref=e150]: "@protocol-dev"
                - paragraph [ref=e151]: Optimizing the core protocols for maximum efficiency.
                - generic [ref=e152]:
                  - img [ref=e153]
                  - text: Chicago, US
                - generic [ref=e156]:
                  - generic [ref=e157]:
                    - paragraph [ref=e158]: 4,100
                    - paragraph [ref=e159]: Followers
                  - generic [ref=e160]:
                    - paragraph [ref=e161]: $16,000
                    - paragraph [ref=e162]: Earnings
            - link "Solidity Dev tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e164] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - img [ref=e167]
              - generic [ref=e169]:
                - img "Solidity Dev" [ref=e170]
                - generic [ref=e171]:
                  - paragraph [ref=e172]: tech
                  - heading "Solidity Dev" [level=3] [ref=e173]
                  - paragraph [ref=e174]: "@solidity-dev"
                - paragraph [ref=e175]: Forging bulletproof smart contracts for the world's applications.
                - generic [ref=e176]:
                  - img [ref=e177]
                  - text: San Francisco, US
                - generic [ref=e180]:
                  - generic [ref=e181]:
                    - paragraph [ref=e182]: 3,900
                    - paragraph [ref=e183]: Followers
                  - generic [ref=e184]:
                    - paragraph [ref=e185]: $14,500
                    - paragraph [ref=e186]: Earnings
            - link "Smart Contract Dev tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e188] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - img [ref=e191]
              - generic [ref=e193]:
                - img "Smart Contract Dev" [ref=e194]
                - generic [ref=e195]:
                  - paragraph [ref=e196]: tech
                  - heading "Smart Contract Dev" [level=3] [ref=e197]
                  - paragraph [ref=e198]: "@smart-contract-dev"
                - paragraph [ref=e199]: Writing secure, efficient code for the on-chain economy.
                - generic [ref=e200]:
                  - img [ref=e201]
                  - text: Boston, US
                - generic [ref=e204]:
                  - generic [ref=e205]:
                    - paragraph [ref=e206]: 3,800
                    - paragraph [ref=e207]: Followers
                  - generic [ref=e208]:
                    - paragraph [ref=e209]: $14,000
                    - paragraph [ref=e210]: Earnings
            - link "Crypto Educator education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e212] [cursor=pointer]:
              - /url: /creator/crypto-educator
              - img [ref=e215]
              - generic [ref=e217]:
                - img "Crypto Educator" [ref=e218]
                - generic [ref=e219]:
                  - paragraph [ref=e220]: education
                  - heading "Crypto Educator" [level=3] [ref=e221]
                  - paragraph [ref=e222]: "@crypto-educator"
                - paragraph [ref=e223]: Helping the world understand the power of crypto.
                - generic [ref=e224]:
                  - img [ref=e225]
                  - text: Austin, US
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - paragraph [ref=e230]: 3,500
                    - paragraph [ref=e231]: Followers
                  - generic [ref=e232]:
                    - paragraph [ref=e233]: $10,500
                    - paragraph [ref=e234]: Earnings
            - link "Stellar Dev tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e236] [cursor=pointer]:
              - /url: /creator/stellar-dev
              - img [ref=e239]
              - generic [ref=e241]:
                - img "Stellar Dev" [ref=e242]
                - generic [ref=e243]:
                  - paragraph [ref=e244]: tech
                  - heading "Stellar Dev" [level=3] [ref=e245]
                  - paragraph [ref=e246]: "@stellar-dev"
                - paragraph [ref=e247]: Building the future of open finance on Stellar.
                - generic [ref=e248]:
                  - img [ref=e249]
                  - text: San Francisco, US
                - generic [ref=e252]:
                  - generic [ref=e253]:
                    - paragraph [ref=e254]: 3,400
                    - paragraph [ref=e255]: Followers
                  - generic [ref=e256]:
                    - paragraph [ref=e257]: $12,000
                    - paragraph [ref=e258]: Earnings
            - link "GameFi Dev tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e260] [cursor=pointer]:
              - /url: /creator/gamefi-dev
              - img [ref=e263]
              - generic [ref=e265]:
                - img "GameFi Dev" [ref=e266]
                - generic [ref=e267]:
                  - paragraph [ref=e268]: tech
                  - heading "GameFi Dev" [level=3] [ref=e269]
                  - paragraph [ref=e270]: "@gamefi-dev"
                - paragraph [ref=e271]: Where gaming meets finance, we're building the future.
                - generic [ref=e272]:
                  - img [ref=e273]
                  - text: Los Angeles, US
                - generic [ref=e276]:
                  - generic [ref=e277]:
                    - paragraph [ref=e278]: 3,300
                    - paragraph [ref=e279]: Followers
                  - generic [ref=e280]:
                    - paragraph [ref=e281]: $13,000
                    - paragraph [ref=e282]: Earnings
            - link "DeFi Expert tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e284] [cursor=pointer]:
              - /url: /creator/defi-expert
              - generic [ref=e285]:
                - img "DeFi Expert" [ref=e286]
                - generic [ref=e287]:
                  - paragraph [ref=e288]: tech
                  - heading "DeFi Expert" [level=3] [ref=e289]
                  - paragraph [ref=e290]: "@defi-expert"
                - paragraph [ref=e291]: Navigating the deep waters of decentralized finance.
                - generic [ref=e292]:
                  - img [ref=e293]
                  - text: Singapore, SG
                - generic [ref=e296]:
                  - generic [ref=e297]:
                    - paragraph [ref=e298]: 3,100
                    - paragraph [ref=e299]: Followers
                  - generic [ref=e300]:
                    - paragraph [ref=e301]: $11,000
                    - paragraph [ref=e302]: Earnings
            - link "Blockchain Edu education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e304] [cursor=pointer]:
              - /url: /creator/blockchain-edu
              - img [ref=e307]
              - generic [ref=e309]:
                - img "Blockchain Edu" [ref=e310]
                - generic [ref=e311]:
                  - paragraph [ref=e312]: education
                  - heading "Blockchain Edu" [level=3] [ref=e313]
                  - paragraph [ref=e314]: "@blockchain-edu"
                - paragraph [ref=e315]: Simplifying blockchain for the next generation of builders.
                - generic [ref=e316]:
                  - img [ref=e317]
                  - text: New York, US
                - generic [ref=e320]:
                  - generic [ref=e321]:
                    - paragraph [ref=e322]: 2,900
                    - paragraph [ref=e323]: Followers
                  - generic [ref=e324]:
                    - paragraph [ref=e325]: $8,900
                    - paragraph [ref=e326]: Earnings
            - link "Metaverse Architect tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e328] [cursor=pointer]:
              - /url: /creator/metaverse-architect
              - img [ref=e331]
              - generic [ref=e333]:
                - img "Metaverse Architect" [ref=e334]
                - generic [ref=e335]:
                  - paragraph [ref=e336]: tech
                  - heading "Metaverse Architect" [level=3] [ref=e337]
                  - paragraph [ref=e338]: "@metaverse-architect"
                - paragraph [ref=e339]: Building the spaces where we'll live and play tomorrow.
                - generic [ref=e340]:
                  - img [ref=e341]
                  - text: Seoul, KR
                - generic [ref=e344]:
                  - generic [ref=e345]:
                    - paragraph [ref=e346]: 2,800
                    - paragraph [ref=e347]: Followers
                  - generic [ref=e348]:
                    - paragraph [ref=e349]: $9,200
                    - paragraph [ref=e350]: Earnings
            - link "Web3 Builder tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e352] [cursor=pointer]:
              - /url: /creator/web3-builder
              - img [ref=e355]
              - generic [ref=e357]:
                - img "Web3 Builder" [ref=e358]
                - generic [ref=e359]:
                  - paragraph [ref=e360]: tech
                  - heading "Web3 Builder" [level=3] [ref=e361]
                  - paragraph [ref=e362]: "@web3-builder"
                - paragraph [ref=e363]: Architecting the infrastructure for a more open web.
                - generic [ref=e364]:
                  - img [ref=e365]
                  - text: Toronto, CA
                - generic [ref=e368]:
                  - generic [ref=e369]:
                    - paragraph [ref=e370]: 2,700
                    - paragraph [ref=e371]: Followers
                  - generic [ref=e372]:
                    - paragraph [ref=e373]: $9,500
                    - paragraph [ref=e374]: Earnings
            - link "Generative Artist art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e376] [cursor=pointer]:
              - /url: /creator/generative-artist
              - img [ref=e379]
              - generic [ref=e381]:
                - img "Generative Artist" [ref=e382]
                - generic [ref=e383]:
                  - paragraph [ref=e384]: art
                  - heading "Generative Artist" [level=3] [ref=e385]
                  - paragraph [ref=e386]: "@generative-artist"
                - paragraph [ref=e387]: Letting the algorithms paint the portrait of tomorrow.
                - generic [ref=e388]:
                  - img [ref=e389]
                  - text: Copenhagen, DK
                - generic [ref=e392]:
                  - generic [ref=e393]:
                    - paragraph [ref=e394]: 2,600
                    - paragraph [ref=e395]: Followers
                  - generic [ref=e396]:
                    - paragraph [ref=e397]: $8,200
                    - paragraph [ref=e398]: Earnings
  - generic [ref=e399]:
    - img [ref=e401]
    - button "Open Tanstack query devtools" [ref=e450] [cursor=pointer]:
      - img [ref=e451]
  - alert [ref=e500]
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
      |           ^ Error: 2 axe violation(s) on dark theme > explore:
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