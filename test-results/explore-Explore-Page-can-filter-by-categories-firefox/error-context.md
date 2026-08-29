# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Explore Page >> can filter by categories
- Location: tests/e2e/explore.spec.ts:32:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('checkbox', { name: /art/i })
    - locator resolved to <input type="checkbox" class="w-4 h-4 rounded border-ink/20 text-wave focus:ring-wave/20 cursor-pointer"/>
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
    49 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <nextjs-portal></nextjs-portal> from <script data-nextjs-dev-overlay="true">…</script> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

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
          - link "Next.js 16.2.10 (stale) Turbopack" [ref=e17] [cursor=pointer]:
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
              - generic [ref=e48]: Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.
            - generic [ref=e49]:
              - generic [ref=e50]:
                - paragraph [ref=e52]:
                  - img [ref=e54]
                  - generic [ref=e57]: src/contexts/ThemeContext.tsx (14:5) @ ThemeProvider
                  - button "Open in editor" [ref=e58] [cursor=pointer]:
                    - img [ref=e60]
                - generic [ref=e63]:
                  - generic [ref=e64]: "12 | export function ThemeProvider({ children }: ThemeContextType) {"
                  - generic [ref=e65]: 13 | return (
                  - generic [ref=e66]: "> 14 | <NextThemesProvider"
                  - generic [ref=e67]: "| ^"
                  - generic [ref=e68]: 15 | attribute="class"
                  - generic [ref=e69]: 16 | defaultTheme="system"
                  - generic [ref=e70]: 17 | enableSystem
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - paragraph [ref=e73]:
                    - text: Call Stack
                    - generic [ref=e74]: "75"
                  - button "Show 73 ignore-listed frame(s)" [ref=e75] [cursor=pointer]:
                    - text: Show 73 ignore-listed frame(s)
                    - img [ref=e76]
                - generic [ref=e78]:
                  - generic [ref=e79]:
                    - text: ThemeProvider
                    - button "Open ThemeProvider in editor" [ref=e80] [cursor=pointer]:
                      - img [ref=e81]
                  - text: src/contexts/ThemeContext.tsx (14:5)
                - generic [ref=e83]:
                  - generic [ref=e84]:
                    - text: RootLayout
                    - button "Open RootLayout in editor" [ref=e85] [cursor=pointer]:
                      - img [ref=e86]
                  - text: src/app/layout.tsx (16:5)
          - generic [ref=e88]: "1"
          - generic [ref=e89]: "2"
        - contentinfo [ref=e90]:
          - region "Error feedback" [ref=e91]:
            - paragraph [ref=e92]:
              - link "Was this helpful?" [ref=e93] [cursor=pointer]:
                - /url: https://nextjs.org/telemetry#error-feedback
            - button "Mark as helpful" [ref=e94] [cursor=pointer]:
              - img [ref=e95]
            - button "Mark as not helpful" [ref=e98] [cursor=pointer]:
              - img [ref=e99]
    - generic [ref=e105] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e106]:
        - img [ref=e107]
      - generic [ref=e111]:
        - button "Open issues overlay" [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]: "2"
            - generic [ref=e115]: "3"
          - generic [ref=e116]:
            - text: Issue
            - generic [ref=e117]: s
        - button "Collapse issues badge" [ref=e118]:
          - img [ref=e119]
  - generic [ref=e121]:
    - region "Explore Creators" [ref=e122]:
      - generic [ref=e124]:
        - generic [ref=e125]:
          - heading "Explore Creators" [level=1] [ref=e126]
          - paragraph [ref=e127]: Discover amazing builders, artists, and community leaders on Stellar. Support your favorites and help the ecosystem grow.
        - link "Compare Creators" [ref=e128] [cursor=pointer]:
          - /url: /compare
          - img [ref=e129]
          - text: Compare Creators
    - generic [ref=e132]:
      - generic [ref=e134]:
        - img [ref=e136]
        - searchbox "Search creators" [ref=e138]
      - 'button "Sort by: Most Popular" [ref=e141]':
        - generic [ref=e142]:
          - generic [ref=e143]: "Sort by:"
          - text: Most Popular
        - img [ref=e144]
    - generic [ref=e146]:
      - complementary [ref=e147]:
        - generic [ref=e148]:
          - generic [ref=e149]:
            - heading "Filters" [level=2] [ref=e150]
            - button "Clear All" [ref=e151]
          - generic [ref=e152]:
            - heading "Status" [level=3] [ref=e153]
            - generic [ref=e154]:
              - checkbox "Verified Only" [ref=e156]
              - text: Verified Only
          - generic [ref=e157]:
            - heading "Categories" [level=3] [ref=e158]
            - generic [ref=e159]:
              - generic [ref=e160]:
                - checkbox "art" [ref=e161]
                - text: art
              - generic [ref=e162]:
                - checkbox "tech" [ref=e163]
                - text: tech
              - generic [ref=e164]:
                - checkbox "community" [ref=e165]
                - text: community
              - generic [ref=e166]:
                - checkbox "education" [ref=e167]
                - text: education
              - generic [ref=e168]:
                - checkbox "music" [ref=e169]
                - text: music
              - generic [ref=e170]:
                - checkbox "gaming" [ref=e171]
                - text: gaming
              - generic [ref=e172]:
                - checkbox "crypto" [ref=e173]
                - text: crypto
              - generic [ref=e174]:
                - checkbox "nft" [ref=e175]
                - text: nft
              - generic [ref=e176]:
                - checkbox "defi" [ref=e177]
                - text: defi
              - generic [ref=e178]:
                - checkbox "dao" [ref=e179]
                - text: dao
          - generic [ref=e180]:
            - heading "Location" [level=3] [ref=e181]
            - generic [ref=e182]:
              - generic [ref=e183]:
                - checkbox "Amsterdam, NL" [ref=e184]
                - text: Amsterdam, NL
              - generic [ref=e185]:
                - checkbox "Austin, US" [ref=e186]
                - text: Austin, US
              - generic [ref=e187]:
                - checkbox "Barcelona, ES" [ref=e188]
                - text: Barcelona, ES
              - generic [ref=e189]:
                - checkbox "Berlin, DE" [ref=e190]
                - text: Berlin, DE
              - generic [ref=e191]:
                - checkbox "Boston, US" [ref=e192]
                - text: Boston, US
              - generic [ref=e193]:
                - checkbox "Chicago, US" [ref=e194]
                - text: Chicago, US
              - generic [ref=e195]:
                - checkbox "Copenhagen, DK" [ref=e196]
                - text: Copenhagen, DK
              - generic [ref=e197]:
                - checkbox "Dublin, IE" [ref=e198]
                - text: Dublin, IE
              - generic [ref=e199]:
                - checkbox "Lisbon, PT" [ref=e200]
                - text: Lisbon, PT
              - generic [ref=e201]:
                - checkbox "London, UK" [ref=e202]
                - text: London, UK
              - generic [ref=e203]:
                - checkbox "Los Angeles, US" [ref=e204]
                - text: Los Angeles, US
              - generic [ref=e205]:
                - checkbox "Mexico City, MX" [ref=e206]
                - text: Mexico City, MX
              - generic [ref=e207]:
                - checkbox "Milan, IT" [ref=e208]
                - text: Milan, IT
              - generic [ref=e209]:
                - checkbox "New York, US" [ref=e210]
                - text: New York, US
              - generic [ref=e211]:
                - checkbox "Paris, FR" [ref=e212]
                - text: Paris, FR
              - generic [ref=e213]:
                - checkbox "San Francisco, US" [ref=e214]
                - text: San Francisco, US
              - generic [ref=e215]:
                - checkbox "Seoul, KR" [ref=e216]
                - text: Seoul, KR
              - generic [ref=e217]:
                - checkbox "Singapore, SG" [ref=e218]
                - text: Singapore, SG
              - generic [ref=e219]:
                - checkbox "Stockholm, SE" [ref=e220]
                - text: Stockholm, SE
              - generic [ref=e221]:
                - checkbox "Sydney, AU" [ref=e222]
                - text: Sydney, AU
              - generic [ref=e223]:
                - checkbox "Tokyo, JP" [ref=e224]
                - text: Tokyo, JP
              - generic [ref=e225]:
                - checkbox "Toronto, CA" [ref=e226]
                - text: Toronto, CA
              - generic [ref=e227]:
                - checkbox "Zurich, CH" [ref=e228]
                - text: Zurich, CH
      - generic [ref=e229]:
        - paragraph [ref=e231]: Found 25 creators
        - list "Creator list" [ref=e232]:
          - generic [ref=e233]:
            - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e235] [cursor=pointer]:
              - /url: /creator/nft-creator
              - img [ref=e238]
              - generic [ref=e240]:
                - generic [ref=e242]: NC
                - generic [ref=e243]:
                  - paragraph [ref=e244]: art
                  - heading "NFT Creator" [level=3] [ref=e245]
                  - paragraph [ref=e246]: "@nft-creator"
                - paragraph [ref=e247]: Minting experiences that transcend the digital realm.
                - generic [ref=e248]:
                  - img [ref=e249]
                  - text: Sydney, AU
                - generic [ref=e252]:
                  - generic [ref=e253]:
                    - paragraph [ref=e254]: 4,200
                    - paragraph [ref=e255]: Followers
                  - generic [ref=e256]:
                    - paragraph [ref=e257]: $15,000
                    - paragraph [ref=e258]: Earnings
            - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e260] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - img [ref=e263]
              - generic [ref=e265]:
                - generic [ref=e267]: PD
                - generic [ref=e268]:
                  - paragraph [ref=e269]: tech
                  - heading "Protocol Dev" [level=3] [ref=e270]
                  - paragraph [ref=e271]: "@protocol-dev"
                - paragraph [ref=e272]: Optimizing the core protocols for maximum efficiency.
                - generic [ref=e273]:
                  - img [ref=e274]
                  - text: Chicago, US
                - generic [ref=e277]:
                  - generic [ref=e278]:
                    - paragraph [ref=e279]: 4,100
                    - paragraph [ref=e280]: Followers
                  - generic [ref=e281]:
                    - paragraph [ref=e282]: $16,000
                    - paragraph [ref=e283]: Earnings
            - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e285] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - img [ref=e288]
              - generic [ref=e290]:
                - generic [ref=e292]: SD
                - generic [ref=e293]:
                  - paragraph [ref=e294]: tech
                  - heading "Solidity Dev" [level=3] [ref=e295]
                  - paragraph [ref=e296]: "@solidity-dev"
                - paragraph [ref=e297]: Forging bulletproof smart contracts for the world's applications.
                - generic [ref=e298]:
                  - img [ref=e299]
                  - text: San Francisco, US
                - generic [ref=e302]:
                  - generic [ref=e303]:
                    - paragraph [ref=e304]: 3,900
                    - paragraph [ref=e305]: Followers
                  - generic [ref=e306]:
                    - paragraph [ref=e307]: $14,500
                    - paragraph [ref=e308]: Earnings
            - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e310] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - img [ref=e313]
              - generic [ref=e315]:
                - generic [ref=e317]: SC
                - generic [ref=e318]:
                  - paragraph [ref=e319]: tech
                  - heading "Smart Contract Dev" [level=3] [ref=e320]
                  - paragraph [ref=e321]: "@smart-contract-dev"
                - paragraph [ref=e322]: Writing secure, efficient code for the on-chain economy.
                - generic [ref=e323]:
                  - img [ref=e324]
                  - text: Boston, US
                - generic [ref=e327]:
                  - generic [ref=e328]:
                    - paragraph [ref=e329]: 3,800
                    - paragraph [ref=e330]: Followers
                  - generic [ref=e331]:
                    - paragraph [ref=e332]: $14,000
                    - paragraph [ref=e333]: Earnings
            - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e335] [cursor=pointer]:
              - /url: /creator/crypto-educator
              - img [ref=e338]
              - generic [ref=e340]:
                - generic [ref=e342]: CE
                - generic [ref=e343]:
                  - paragraph [ref=e344]: education
                  - heading "Crypto Educator" [level=3] [ref=e345]
                  - paragraph [ref=e346]: "@crypto-educator"
                - paragraph [ref=e347]: Helping the world understand the power of crypto.
                - generic [ref=e348]:
                  - img [ref=e349]
                  - text: Austin, US
                - generic [ref=e352]:
                  - generic [ref=e353]:
                    - paragraph [ref=e354]: 3,500
                    - paragraph [ref=e355]: Followers
                  - generic [ref=e356]:
                    - paragraph [ref=e357]: $10,500
                    - paragraph [ref=e358]: Earnings
            - link "tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e360] [cursor=pointer]:
              - /url: /creator/stellar-dev
              - img [ref=e363]
              - generic [ref=e365]:
                - generic [ref=e367]: SD
                - generic [ref=e368]:
                  - paragraph [ref=e369]: tech
                  - heading "Stellar Dev" [level=3] [ref=e370]
                  - paragraph [ref=e371]: "@stellar-dev"
                - paragraph [ref=e372]: Building the future of open finance on Stellar.
                - generic [ref=e373]:
                  - img [ref=e374]
                  - text: San Francisco, US
                - generic [ref=e377]:
                  - generic [ref=e378]:
                    - paragraph [ref=e379]: 3,400
                    - paragraph [ref=e380]: Followers
                  - generic [ref=e381]:
                    - paragraph [ref=e382]: $12,000
                    - paragraph [ref=e383]: Earnings
            - link "tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e385] [cursor=pointer]:
              - /url: /creator/gamefi-dev
              - img [ref=e388]
              - generic [ref=e390]:
                - generic [ref=e392]: GD
                - generic [ref=e393]:
                  - paragraph [ref=e394]: tech
                  - heading "GameFi Dev" [level=3] [ref=e395]
                  - paragraph [ref=e396]: "@gamefi-dev"
                - paragraph [ref=e397]: Where gaming meets finance, we're building the future.
                - generic [ref=e398]:
                  - img [ref=e399]
                  - text: Los Angeles, US
                - generic [ref=e402]:
                  - generic [ref=e403]:
                    - paragraph [ref=e404]: 3,300
                    - paragraph [ref=e405]: Followers
                  - generic [ref=e406]:
                    - paragraph [ref=e407]: $13,000
                    - paragraph [ref=e408]: Earnings
            - link "tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e410] [cursor=pointer]:
              - /url: /creator/defi-expert
              - generic [ref=e411]:
                - generic [ref=e413]: DE
                - generic [ref=e414]:
                  - paragraph [ref=e415]: tech
                  - heading "DeFi Expert" [level=3] [ref=e416]
                  - paragraph [ref=e417]: "@defi-expert"
                - paragraph [ref=e418]: Navigating the deep waters of decentralized finance.
                - generic [ref=e419]:
                  - img [ref=e420]
                  - text: Singapore, SG
                - generic [ref=e423]:
                  - generic [ref=e424]:
                    - paragraph [ref=e425]: 3,100
                    - paragraph [ref=e426]: Followers
                  - generic [ref=e427]:
                    - paragraph [ref=e428]: $11,000
                    - paragraph [ref=e429]: Earnings
            - link "education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e431] [cursor=pointer]:
              - /url: /creator/blockchain-edu
              - img [ref=e434]
              - generic [ref=e436]:
                - generic [ref=e438]: BE
                - generic [ref=e439]:
                  - paragraph [ref=e440]: education
                  - heading "Blockchain Edu" [level=3] [ref=e441]
                  - paragraph [ref=e442]: "@blockchain-edu"
                - paragraph [ref=e443]: Simplifying blockchain for the next generation of builders.
                - generic [ref=e444]:
                  - img [ref=e445]
                  - text: New York, US
                - generic [ref=e448]:
                  - generic [ref=e449]:
                    - paragraph [ref=e450]: 2,900
                    - paragraph [ref=e451]: Followers
                  - generic [ref=e452]:
                    - paragraph [ref=e453]: $8,900
                    - paragraph [ref=e454]: Earnings
            - link "tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e456] [cursor=pointer]:
              - /url: /creator/metaverse-architect
              - img [ref=e459]
              - generic [ref=e461]:
                - generic [ref=e463]: MA
                - generic [ref=e464]:
                  - paragraph [ref=e465]: tech
                  - heading "Metaverse Architect" [level=3] [ref=e466]
                  - paragraph [ref=e467]: "@metaverse-architect"
                - paragraph [ref=e468]: Building the spaces where we'll live and play tomorrow.
                - generic [ref=e469]:
                  - img [ref=e470]
                  - text: Seoul, KR
                - generic [ref=e473]:
                  - generic [ref=e474]:
                    - paragraph [ref=e475]: 2,800
                    - paragraph [ref=e476]: Followers
                  - generic [ref=e477]:
                    - paragraph [ref=e478]: $9,200
                    - paragraph [ref=e479]: Earnings
            - link "tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e481] [cursor=pointer]:
              - /url: /creator/web3-builder
              - img [ref=e484]
              - generic [ref=e486]:
                - generic [ref=e488]: WB
                - generic [ref=e489]:
                  - paragraph [ref=e490]: tech
                  - heading "Web3 Builder" [level=3] [ref=e491]
                  - paragraph [ref=e492]: "@web3-builder"
                - paragraph [ref=e493]: Architecting the infrastructure for a more open web.
                - generic [ref=e494]:
                  - img [ref=e495]
                  - text: Toronto, CA
                - generic [ref=e498]:
                  - generic [ref=e499]:
                    - paragraph [ref=e500]: 2,700
                    - paragraph [ref=e501]: Followers
                  - generic [ref=e502]:
                    - paragraph [ref=e503]: $9,500
                    - paragraph [ref=e504]: Earnings
            - link "art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e506] [cursor=pointer]:
              - /url: /creator/generative-artist
              - img [ref=e509]
              - generic [ref=e511]:
                - generic [ref=e513]: GA
                - generic [ref=e514]:
                  - paragraph [ref=e515]: art
                  - heading "Generative Artist" [level=3] [ref=e516]
                  - paragraph [ref=e517]: "@generative-artist"
                - paragraph [ref=e518]: Letting the algorithms paint the portrait of tomorrow.
                - generic [ref=e519]:
                  - img [ref=e520]
                  - text: Copenhagen, DK
                - generic [ref=e523]:
                  - generic [ref=e524]:
                    - paragraph [ref=e525]: 2,600
                    - paragraph [ref=e526]: Followers
                  - generic [ref=e527]:
                    - paragraph [ref=e528]: $8,200
                    - paragraph [ref=e529]: Earnings
  - generic [ref=e530]:
    - img [ref=e532]
    - button "Open Tanstack query devtools" [ref=e581] [cursor=pointer]:
      - img [ref=e582]
  - alert [ref=e631]
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
> 42  |         await artCategory.click();
      |                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  83  |     await sortButton.click();
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