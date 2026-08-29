# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Explore Page >> can sort creators
- Location: tests/e2e/explore.spec.ts:80:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Sort by').locator('..')
    - locator resolved to <span class="flex items-center gap-2">…</span>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nextjs-portal></nextjs-portal> from <script data-nextjs-dev-overlay="true">…</script> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nextjs-portal></nextjs-portal> from <script data-nextjs-dev-overlay="true">…</script> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    35 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <nextjs-portal></nextjs-portal> from <script data-nextjs-dev-overlay="true">…</script> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - navigation [ref=e7]:
            - button "previous" [disabled] [ref=e8]:
              - img "previous" [ref=e9]
            - generic [ref=e11]:
              - generic [ref=e12]: 1/
              - text: "3"
            - button "next" [ref=e13] [cursor=pointer]:
              - img "next" [ref=e14]
          - img
        - generic [ref=e16]:
          - link "Next.js 16.2.10 (stale) Turbopack" [ref=e17]:
            - /url: https://nextjs.org/docs/messages/version-staleness
            - img [ref=e18]
            - generic "There is a newer version (16.3.1) available, upgrade recommended!" [ref=e20]: Next.js 16.2.10 (stale)
            - generic [ref=e21]: Turbopack
          - img
      - generic [ref=e22]:
        - dialog "Console Error" [ref=e23]:
          - generic [ref=e26]:
            - generic [ref=e27]:
              - generic [ref=e28]:
                - generic [ref=e30]: Console Error
                - generic [ref=e31]:
                  - button "Copy Error Info" [ref=e32] [cursor=pointer]:
                    - img [ref=e33]
                  - button "No related documentation found" [disabled] [ref=e35]:
                    - img [ref=e36]
                  - button "Attach Node.js inspector" [ref=e38] [cursor=pointer]:
                    - img [ref=e39]
              - generic [ref=e51]: Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.
            - generic [ref=e54]:
              - paragraph [ref=e55]:
                - text: Call Stack
                - generic [ref=e56]: "18"
              - button "Show 18 ignore-listed frame(s)" [ref=e57] [cursor=pointer]:
                - text: Show 18 ignore-listed frame(s)
                - img [ref=e58]
          - generic [ref=e60]: "1"
          - generic [ref=e61]: "2"
        - contentinfo [ref=e62]:
          - region "Error feedback" [ref=e63]:
            - paragraph [ref=e64]:
              - link "Was this helpful?" [ref=e65]:
                - /url: https://nextjs.org/telemetry#error-feedback
            - button "Mark as helpful" [ref=e66] [cursor=pointer]:
              - img [ref=e67]
            - button "Mark as not helpful" [ref=e70] [cursor=pointer]:
              - img [ref=e71]
    - generic [ref=e77] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e78]:
        - img [ref=e79]
      - generic [ref=e84]:
        - button "Open issues overlay" [ref=e85]:
          - generic [ref=e86]:
            - generic [ref=e87]: "2"
            - generic [ref=e88]: "3"
          - generic [ref=e89]:
            - text: Issue
            - generic [ref=e90]: s
        - button "Collapse issues badge" [ref=e91]:
          - img [ref=e92]
  - generic [ref=e94]:
    - region "Explore Creators" [ref=e95]:
      - generic [ref=e97]:
        - generic [ref=e98]:
          - heading "Explore Creators" [level=1] [ref=e99]
          - paragraph [ref=e100]: Discover amazing builders, artists, and community leaders on Stellar. Support your favorites and help the ecosystem grow.
        - link "Compare Creators" [ref=e101]:
          - /url: /compare
          - img [ref=e102]
          - text: Compare Creators
    - generic [ref=e105]:
      - generic [ref=e107]:
        - img [ref=e109]
        - searchbox "Search creators" [ref=e111]
      - 'button "Sort by: Most Popular" [ref=e114]':
        - generic [ref=e115]:
          - generic [ref=e116]: "Sort by:"
          - text: Most Popular
        - img [ref=e117]
    - generic [ref=e119]:
      - complementary [ref=e120]:
        - generic [ref=e121]:
          - generic [ref=e122]:
            - heading "Filters" [level=2] [ref=e123]
            - button "Clear All" [ref=e124]
          - generic [ref=e125]:
            - heading "Status" [level=3] [ref=e126]
            - generic [ref=e127]:
              - checkbox "Verified Only" [ref=e129]
              - text: Verified Only
          - generic [ref=e130]:
            - heading "Categories" [level=3] [ref=e131]
            - generic [ref=e132]:
              - generic [ref=e133]:
                - checkbox "art" [ref=e134]
                - text: art
              - generic [ref=e135]:
                - checkbox "tech" [ref=e136]
                - text: tech
              - generic [ref=e137]:
                - checkbox "community" [ref=e138]
                - text: community
              - generic [ref=e139]:
                - checkbox "education" [ref=e140]
                - text: education
              - generic [ref=e141]:
                - checkbox "music" [ref=e142]
                - text: music
              - generic [ref=e143]:
                - checkbox "gaming" [ref=e144]
                - text: gaming
              - generic [ref=e145]:
                - checkbox "crypto" [ref=e146]
                - text: crypto
              - generic [ref=e147]:
                - checkbox "nft" [ref=e148]
                - text: nft
              - generic [ref=e149]:
                - checkbox "defi" [ref=e150]
                - text: defi
              - generic [ref=e151]:
                - checkbox "dao" [ref=e152]
                - text: dao
          - generic [ref=e153]:
            - heading "Location" [level=3] [ref=e154]
            - generic [ref=e155]:
              - generic [ref=e156]:
                - checkbox "Amsterdam, NL" [ref=e157]
                - text: Amsterdam, NL
              - generic [ref=e158]:
                - checkbox "Austin, US" [ref=e159]
                - text: Austin, US
              - generic [ref=e160]:
                - checkbox "Barcelona, ES" [ref=e161]
                - text: Barcelona, ES
              - generic [ref=e162]:
                - checkbox "Berlin, DE" [ref=e163]
                - text: Berlin, DE
              - generic [ref=e164]:
                - checkbox "Boston, US" [ref=e165]
                - text: Boston, US
              - generic [ref=e166]:
                - checkbox "Chicago, US" [ref=e167]
                - text: Chicago, US
              - generic [ref=e168]:
                - checkbox "Copenhagen, DK" [ref=e169]
                - text: Copenhagen, DK
              - generic [ref=e170]:
                - checkbox "Dublin, IE" [ref=e171]
                - text: Dublin, IE
              - generic [ref=e172]:
                - checkbox "Lisbon, PT" [ref=e173]
                - text: Lisbon, PT
              - generic [ref=e174]:
                - checkbox "London, UK" [ref=e175]
                - text: London, UK
              - generic [ref=e176]:
                - checkbox "Los Angeles, US" [ref=e177]
                - text: Los Angeles, US
              - generic [ref=e178]:
                - checkbox "Mexico City, MX" [ref=e179]
                - text: Mexico City, MX
              - generic [ref=e180]:
                - checkbox "Milan, IT" [ref=e181]
                - text: Milan, IT
              - generic [ref=e182]:
                - checkbox "New York, US" [ref=e183]
                - text: New York, US
              - generic [ref=e184]:
                - checkbox "Paris, FR" [ref=e185]
                - text: Paris, FR
              - generic [ref=e186]:
                - checkbox "San Francisco, US" [ref=e187]
                - text: San Francisco, US
              - generic [ref=e188]:
                - checkbox "Seoul, KR" [ref=e189]
                - text: Seoul, KR
              - generic [ref=e190]:
                - checkbox "Singapore, SG" [ref=e191]
                - text: Singapore, SG
              - generic [ref=e192]:
                - checkbox "Stockholm, SE" [ref=e193]
                - text: Stockholm, SE
              - generic [ref=e194]:
                - checkbox "Sydney, AU" [ref=e195]
                - text: Sydney, AU
              - generic [ref=e196]:
                - checkbox "Tokyo, JP" [ref=e197]
                - text: Tokyo, JP
              - generic [ref=e198]:
                - checkbox "Toronto, CA" [ref=e199]
                - text: Toronto, CA
              - generic [ref=e200]:
                - checkbox "Zurich, CH" [ref=e201]
                - text: Zurich, CH
      - generic [ref=e202]:
        - paragraph [ref=e204]: Found 25 creators
        - list "Creator list" [ref=e205]:
          - generic [ref=e206]:
            - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e208]:
              - /url: /creator/nft-creator
              - img [ref=e211]
              - generic [ref=e213]:
                - generic [ref=e215]: NC
                - generic [ref=e216]:
                  - paragraph [ref=e217]: art
                  - heading "NFT Creator" [level=3] [ref=e218]
                  - paragraph [ref=e219]: "@nft-creator"
                - paragraph [ref=e220]: Minting experiences that transcend the digital realm.
                - generic [ref=e221]:
                  - img [ref=e222]
                  - text: Sydney, AU
                - generic [ref=e225]:
                  - generic [ref=e226]:
                    - paragraph [ref=e227]: 4,200
                    - paragraph [ref=e228]: Followers
                  - generic [ref=e229]:
                    - paragraph [ref=e230]: $15,000
                    - paragraph [ref=e231]: Earnings
            - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e233]:
              - /url: /creator/protocol-dev
              - img [ref=e236]
              - generic [ref=e238]:
                - generic [ref=e240]: PD
                - generic [ref=e241]:
                  - paragraph [ref=e242]: tech
                  - heading "Protocol Dev" [level=3] [ref=e243]
                  - paragraph [ref=e244]: "@protocol-dev"
                - paragraph [ref=e245]: Optimizing the core protocols for maximum efficiency.
                - generic [ref=e246]:
                  - img [ref=e247]
                  - text: Chicago, US
                - generic [ref=e250]:
                  - generic [ref=e251]:
                    - paragraph [ref=e252]: 4,100
                    - paragraph [ref=e253]: Followers
                  - generic [ref=e254]:
                    - paragraph [ref=e255]: $16,000
                    - paragraph [ref=e256]: Earnings
            - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e258]:
              - /url: /creator/solidity-dev
              - img [ref=e261]
              - generic [ref=e263]:
                - generic [ref=e265]: SD
                - generic [ref=e266]:
                  - paragraph [ref=e267]: tech
                  - heading "Solidity Dev" [level=3] [ref=e268]
                  - paragraph [ref=e269]: "@solidity-dev"
                - paragraph [ref=e270]: Forging bulletproof smart contracts for the world's applications.
                - generic [ref=e271]:
                  - img [ref=e272]
                  - text: San Francisco, US
                - generic [ref=e275]:
                  - generic [ref=e276]:
                    - paragraph [ref=e277]: 3,900
                    - paragraph [ref=e278]: Followers
                  - generic [ref=e279]:
                    - paragraph [ref=e280]: $14,500
                    - paragraph [ref=e281]: Earnings
            - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e283]:
              - /url: /creator/smart-contract-dev
              - img [ref=e286]
              - generic [ref=e288]:
                - generic [ref=e290]: SC
                - generic [ref=e291]:
                  - paragraph [ref=e292]: tech
                  - heading "Smart Contract Dev" [level=3] [ref=e293]
                  - paragraph [ref=e294]: "@smart-contract-dev"
                - paragraph [ref=e295]: Writing secure, efficient code for the on-chain economy.
                - generic [ref=e296]:
                  - img [ref=e297]
                  - text: Boston, US
                - generic [ref=e300]:
                  - generic [ref=e301]:
                    - paragraph [ref=e302]: 3,800
                    - paragraph [ref=e303]: Followers
                  - generic [ref=e304]:
                    - paragraph [ref=e305]: $14,000
                    - paragraph [ref=e306]: Earnings
            - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e308]:
              - /url: /creator/crypto-educator
              - img [ref=e311]
              - generic [ref=e313]:
                - generic [ref=e315]: CE
                - generic [ref=e316]:
                  - paragraph [ref=e317]: education
                  - heading "Crypto Educator" [level=3] [ref=e318]
                  - paragraph [ref=e319]: "@crypto-educator"
                - paragraph [ref=e320]: Helping the world understand the power of crypto.
                - generic [ref=e321]:
                  - img [ref=e322]
                  - text: Austin, US
                - generic [ref=e325]:
                  - generic [ref=e326]:
                    - paragraph [ref=e327]: 3,500
                    - paragraph [ref=e328]: Followers
                  - generic [ref=e329]:
                    - paragraph [ref=e330]: $10,500
                    - paragraph [ref=e331]: Earnings
            - link "tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e333]:
              - /url: /creator/stellar-dev
              - img [ref=e336]
              - generic [ref=e338]:
                - generic [ref=e340]: SD
                - generic [ref=e341]:
                  - paragraph [ref=e342]: tech
                  - heading "Stellar Dev" [level=3] [ref=e343]
                  - paragraph [ref=e344]: "@stellar-dev"
                - paragraph [ref=e345]: Building the future of open finance on Stellar.
                - generic [ref=e346]:
                  - img [ref=e347]
                  - text: San Francisco, US
                - generic [ref=e350]:
                  - generic [ref=e351]:
                    - paragraph [ref=e352]: 3,400
                    - paragraph [ref=e353]: Followers
                  - generic [ref=e354]:
                    - paragraph [ref=e355]: $12,000
                    - paragraph [ref=e356]: Earnings
            - link "tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e358]:
              - /url: /creator/gamefi-dev
              - img [ref=e361]
              - generic [ref=e363]:
                - generic [ref=e365]: GD
                - generic [ref=e366]:
                  - paragraph [ref=e367]: tech
                  - heading "GameFi Dev" [level=3] [ref=e368]
                  - paragraph [ref=e369]: "@gamefi-dev"
                - paragraph [ref=e370]: Where gaming meets finance, we're building the future.
                - generic [ref=e371]:
                  - img [ref=e372]
                  - text: Los Angeles, US
                - generic [ref=e375]:
                  - generic [ref=e376]:
                    - paragraph [ref=e377]: 3,300
                    - paragraph [ref=e378]: Followers
                  - generic [ref=e379]:
                    - paragraph [ref=e380]: $13,000
                    - paragraph [ref=e381]: Earnings
            - link "tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e383]:
              - /url: /creator/defi-expert
              - generic [ref=e384]:
                - generic [ref=e386]: DE
                - generic [ref=e387]:
                  - paragraph [ref=e388]: tech
                  - heading "DeFi Expert" [level=3] [ref=e389]
                  - paragraph [ref=e390]: "@defi-expert"
                - paragraph [ref=e391]: Navigating the deep waters of decentralized finance.
                - generic [ref=e392]:
                  - img [ref=e393]
                  - text: Singapore, SG
                - generic [ref=e396]:
                  - generic [ref=e397]:
                    - paragraph [ref=e398]: 3,100
                    - paragraph [ref=e399]: Followers
                  - generic [ref=e400]:
                    - paragraph [ref=e401]: $11,000
                    - paragraph [ref=e402]: Earnings
            - link "education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e404]:
              - /url: /creator/blockchain-edu
              - img [ref=e407]
              - generic [ref=e409]:
                - generic [ref=e411]: BE
                - generic [ref=e412]:
                  - paragraph [ref=e413]: education
                  - heading "Blockchain Edu" [level=3] [ref=e414]
                  - paragraph [ref=e415]: "@blockchain-edu"
                - paragraph [ref=e416]: Simplifying blockchain for the next generation of builders.
                - generic [ref=e417]:
                  - img [ref=e418]
                  - text: New York, US
                - generic [ref=e421]:
                  - generic [ref=e422]:
                    - paragraph [ref=e423]: 2,900
                    - paragraph [ref=e424]: Followers
                  - generic [ref=e425]:
                    - paragraph [ref=e426]: $8,900
                    - paragraph [ref=e427]: Earnings
            - link "tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e429]:
              - /url: /creator/metaverse-architect
              - img [ref=e432]
              - generic [ref=e434]:
                - generic [ref=e436]: MA
                - generic [ref=e437]:
                  - paragraph [ref=e438]: tech
                  - heading "Metaverse Architect" [level=3] [ref=e439]
                  - paragraph [ref=e440]: "@metaverse-architect"
                - paragraph [ref=e441]: Building the spaces where we'll live and play tomorrow.
                - generic [ref=e442]:
                  - img [ref=e443]
                  - text: Seoul, KR
                - generic [ref=e446]:
                  - generic [ref=e447]:
                    - paragraph [ref=e448]: 2,800
                    - paragraph [ref=e449]: Followers
                  - generic [ref=e450]:
                    - paragraph [ref=e451]: $9,200
                    - paragraph [ref=e452]: Earnings
            - link "tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e454]:
              - /url: /creator/web3-builder
              - img [ref=e457]
              - generic [ref=e459]:
                - generic [ref=e461]: WB
                - generic [ref=e462]:
                  - paragraph [ref=e463]: tech
                  - heading "Web3 Builder" [level=3] [ref=e464]
                  - paragraph [ref=e465]: "@web3-builder"
                - paragraph [ref=e466]: Architecting the infrastructure for a more open web.
                - generic [ref=e467]:
                  - img [ref=e468]
                  - text: Toronto, CA
                - generic [ref=e471]:
                  - generic [ref=e472]:
                    - paragraph [ref=e473]: 2,700
                    - paragraph [ref=e474]: Followers
                  - generic [ref=e475]:
                    - paragraph [ref=e476]: $9,500
                    - paragraph [ref=e477]: Earnings
            - link "art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e479]:
              - /url: /creator/generative-artist
              - img [ref=e482]
              - generic [ref=e484]:
                - generic [ref=e486]: GA
                - generic [ref=e487]:
                  - paragraph [ref=e488]: art
                  - heading "Generative Artist" [level=3] [ref=e489]
                  - paragraph [ref=e490]: "@generative-artist"
                - paragraph [ref=e491]: Letting the algorithms paint the portrait of tomorrow.
                - generic [ref=e492]:
                  - img [ref=e493]
                  - text: Copenhagen, DK
                - generic [ref=e496]:
                  - generic [ref=e497]:
                    - paragraph [ref=e498]: 2,600
                    - paragraph [ref=e499]: Followers
                  - generic [ref=e500]:
                    - paragraph [ref=e501]: $8,200
                    - paragraph [ref=e502]: Earnings
  - generic [ref=e503]:
    - img [ref=e505]
    - button "Open Tanstack query devtools" [ref=e573] [cursor=pointer]:
      - img [ref=e574]
  - alert [ref=e642]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { mockCreatorProfile, MOCK_CREATOR } from '../helpers/fixtures';
  3   | 
  4   | test.describe('Explore Page', () => {
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await mockCreatorProfile(page);
  7   |     await page.goto('/explore');
  8   |   });
  9   | 
  10  |   test('displays explore page with search and filters', async ({ page }) => {
  11  |     // Check main heading
  12  |     await expect(page.getByRole('heading', { name: /explore creators/i })).toBeVisible();
  13  |     
  14  |     // Check search functionality
  15  |     await expect(page.getByPlaceholder(/search by name, tags, or bio/i)).toBeVisible();
  16  |     
  17  |     // Check sort dropdown
  18  |     await expect(page.getByText('Sort by')).toBeVisible();
  19  |   });
  20  | 
  21  |   test('can search for creators', async ({ page }) => {
  22  |     const searchInput = page.getByPlaceholder(/search by name, tags, or bio/i);
  23  |     
  24  |     // Search for a creator
  25  |     await searchInput.fill('alice');
  26  |     await searchInput.press('Enter');
  27  |     
  28  |     // Should show search filter tag
  29  |     await expect(page.getByText('Search: alice')).toBeVisible();
  30  |   });
  31  | 
  32  |   test('can filter by categories', async ({ page }) => {
  33  |     // Open category filter (assuming it exists in FilterSidebar)
  34  |     const categorySection = page.locator('[data-testid="category-filter"]').or(
  35  |       page.getByText('Categories').locator('..')
  36  |     );
  37  |     
  38  |     if (await categorySection.isVisible()) {
  39  |       // Click on a category checkbox
  40  |       const artCategory = page.getByRole('checkbox', { name: /art/i });
  41  |       if (await artCategory.isVisible()) {
  42  |         await artCategory.click();
  43  |         
  44  |         // Should show active filter
  45  |         await expect(page.getByText('art')).toBeVisible();
  46  |       }
  47  |     }
  48  |   });
  49  | 
  50  |   test('can clear all filters', async ({ page }) => {
  51  |     const searchInput = page.getByPlaceholder(/search by name, tags, or bio/i);
  52  |     
  53  |     // Add a search filter
  54  |     await searchInput.fill('test');
  55  |     await searchInput.press('Enter');
  56  |     
  57  |     // Should show active filters
  58  |     await expect(page.getByText('Search: test')).toBeVisible();
  59  |     
  60  |     // Clear all filters
  61  |     const clearButton = page.getByText('Clear all');
  62  |     if (await clearButton.isVisible()) {
  63  |       await clearButton.click();
  64  |       
  65  |       // Active filters should be gone
  66  |       await expect(page.getByText('Search: test')).not.toBeVisible();
  67  |     }
  68  |   });
  69  | 
  70  |   test('displays creator cards', async ({ page }) => {
  71  |     // Should show creator cards (assuming they have a specific test id or role)
  72  |     const creatorCards = page.locator('[data-testid="creator-card"]').or(
  73  |       page.getByRole('article')
  74  |     );
  75  |     
  76  |     // Wait for at least one creator card to be visible
  77  |     await expect(creatorCards.first()).toBeVisible({ timeout: 10000 });
  78  |   });
  79  | 
  80  |   test('can sort creators', async ({ page }) => {
  81  |     // Click sort dropdown
  82  |     const sortButton = page.getByText('Sort by').locator('..');
> 83  |     await sortButton.click();
      |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  84  |     
  85  |     // Select a different sort option
  86  |     const recentOption = page.getByText('Recently Joined');
  87  |     if (await recentOption.isVisible()) {
  88  |       await recentOption.click();
  89  |       
  90  |       // Should update the sort display
  91  |       await expect(page.getByText('Recently Joined')).toBeVisible();
  92  |     }
  93  |   });
  94  | 
  95  |   test('shows loading state', async ({ page }) => {
  96  |     // Reload page to catch loading state
  97  |     await page.reload();
  98  |     
  99  |     // Should show loading indicator
  100 |     const loadingText = page.getByText('Searching...').or(
  101 |       page.getByText('Loading...')
  102 |     );
  103 |     
  104 |     // Loading text might be brief, so use a short timeout
  105 |     if (await loadingText.isVisible({ timeout: 2000 }).catch(() => false)) {
  106 |       await expect(loadingText).toBeVisible();
  107 |     }
  108 |   });
  109 | 
  110 |   test('shows results count', async ({ page }) => {
  111 |     // Should show found creators count
  112 |     await expect(page.getByText(/found \d+ creators/i)).toBeVisible({ timeout: 10000 });
  113 |   });
  114 | 
  115 |   test('handles empty search results', async ({ page }) => {
  116 |     const searchInput = page.getByPlaceholder(/search by name, tags, or bio/i);
  117 |     
  118 |     // Search for something that won't match
  119 |     await searchInput.fill('zzzznonexistentcreator');
  120 |     await searchInput.press('Enter');
  121 |     
  122 |     // Should show no results or 0 count
  123 |     await expect(page.getByText(/found 0 creators/i).or(
  124 |       page.getByText(/no creators found/i)
  125 |     )).toBeVisible({ timeout: 5000 });
  126 |   });
  127 | });
```