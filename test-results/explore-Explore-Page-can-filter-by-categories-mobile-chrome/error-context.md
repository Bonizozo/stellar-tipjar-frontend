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
    54 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <nextjs-portal></nextjs-portal> from <script data-nextjs-dev-overlay="true">…</script> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - generic [ref=e11]:
            - generic [ref=e12]: 1/
            - text: "3"
          - button "next" [ref=e13] [cursor=pointer]:
            - img "next" [ref=e14]
        - link "Next.js 16.2.10 (stale) Turbopack" [ref=e17] [cursor=pointer]:
          - /url: https://nextjs.org/docs/messages/version-staleness
          - img [ref=e18]
          - generic "There is a newer version (16.3.1) available, upgrade recommended!" [ref=e20]: Next.js 16.2.10 (stale)
          - generic [ref=e21]: Turbopack
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
                    - generic [ref=e74]: "24"
                  - button "Show 22 ignore-listed frame(s)" [ref=e75] [cursor=pointer]:
                    - text: Show 22 ignore-listed frame(s)
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
      - generic [ref=e110]:
        - button "Open issues overlay" [ref=e111]:
          - generic [ref=e112]:
            - generic [ref=e113]: "2"
            - generic [ref=e114]: "3"
          - generic [ref=e115]:
            - text: Issue
            - generic [ref=e116]: s
        - button "Collapse issues badge" [ref=e117]:
          - img [ref=e118]
  - generic [ref=e120]:
    - region "Explore Creators" [ref=e121]:
      - generic [ref=e123]:
        - generic [ref=e124]:
          - heading "Explore Creators" [level=1] [ref=e125]
          - paragraph [ref=e126]: Discover amazing builders, artists, and community leaders on Stellar. Support your favorites and help the ecosystem grow.
        - link "Compare Creators" [ref=e127] [cursor=pointer]:
          - /url: /compare
          - img [ref=e128]
          - text: Compare Creators
    - generic [ref=e131]:
      - generic [ref=e133]:
        - img [ref=e135]
        - searchbox "Search creators" [ref=e137]
      - 'button "Sort by: Most Popular" [ref=e140]':
        - generic [ref=e141]:
          - generic [ref=e142]: "Sort by:"
          - text: Most Popular
        - img [ref=e143]
    - generic [ref=e145]:
      - complementary [ref=e146]:
        - generic [ref=e147]:
          - generic [ref=e148]:
            - heading "Filters" [level=2] [ref=e149]
            - button "Clear All" [ref=e150]
          - generic [ref=e151]:
            - heading "Status" [level=3] [ref=e152]
            - generic [ref=e153]:
              - checkbox "Verified Only" [ref=e155]
              - text: Verified Only
          - generic [ref=e156]:
            - heading "Categories" [level=3] [ref=e157]
            - generic [ref=e158]:
              - generic [ref=e159]:
                - checkbox "art" [ref=e160]
                - text: art
              - generic [ref=e161]:
                - checkbox "tech" [ref=e162]
                - text: tech
              - generic [ref=e163]:
                - checkbox "community" [ref=e164]
                - text: community
              - generic [ref=e165]:
                - checkbox "education" [ref=e166]
                - text: education
              - generic [ref=e167]:
                - checkbox "music" [ref=e168]
                - text: music
              - generic [ref=e169]:
                - checkbox "gaming" [ref=e170]
                - text: gaming
              - generic [ref=e171]:
                - checkbox "crypto" [ref=e172]
                - text: crypto
              - generic [ref=e173]:
                - checkbox "nft" [ref=e174]
                - text: nft
              - generic [ref=e175]:
                - checkbox "defi" [ref=e176]
                - text: defi
              - generic [ref=e177]:
                - checkbox "dao" [ref=e178]
                - text: dao
          - generic [ref=e179]:
            - heading "Location" [level=3] [ref=e180]
            - generic [ref=e181]:
              - generic [ref=e182]:
                - checkbox "Amsterdam, NL" [ref=e183]
                - text: Amsterdam, NL
              - generic [ref=e184]:
                - checkbox "Austin, US" [ref=e185]
                - text: Austin, US
              - generic [ref=e186]:
                - checkbox "Barcelona, ES" [ref=e187]
                - text: Barcelona, ES
              - generic [ref=e188]:
                - checkbox "Berlin, DE" [ref=e189]
                - text: Berlin, DE
              - generic [ref=e190]:
                - checkbox "Boston, US" [ref=e191]
                - text: Boston, US
              - generic [ref=e192]:
                - checkbox "Chicago, US" [ref=e193]
                - text: Chicago, US
              - generic [ref=e194]:
                - checkbox "Copenhagen, DK" [ref=e195]
                - text: Copenhagen, DK
              - generic [ref=e196]:
                - checkbox "Dublin, IE" [ref=e197]
                - text: Dublin, IE
              - generic [ref=e198]:
                - checkbox "Lisbon, PT" [ref=e199]
                - text: Lisbon, PT
              - generic [ref=e200]:
                - checkbox "London, UK" [ref=e201]
                - text: London, UK
              - generic [ref=e202]:
                - checkbox "Los Angeles, US" [ref=e203]
                - text: Los Angeles, US
              - generic [ref=e204]:
                - checkbox "Mexico City, MX" [ref=e205]
                - text: Mexico City, MX
              - generic [ref=e206]:
                - checkbox "Milan, IT" [ref=e207]
                - text: Milan, IT
              - generic [ref=e208]:
                - checkbox "New York, US" [ref=e209]
                - text: New York, US
              - generic [ref=e210]:
                - checkbox "Paris, FR" [ref=e211]
                - text: Paris, FR
              - generic [ref=e212]:
                - checkbox "San Francisco, US" [ref=e213]
                - text: San Francisco, US
              - generic [ref=e214]:
                - checkbox "Seoul, KR" [ref=e215]
                - text: Seoul, KR
              - generic [ref=e216]:
                - checkbox "Singapore, SG" [ref=e217]
                - text: Singapore, SG
              - generic [ref=e218]:
                - checkbox "Stockholm, SE" [ref=e219]
                - text: Stockholm, SE
              - generic [ref=e220]:
                - checkbox "Sydney, AU" [ref=e221]
                - text: Sydney, AU
              - generic [ref=e222]:
                - checkbox "Tokyo, JP" [ref=e223]
                - text: Tokyo, JP
              - generic [ref=e224]:
                - checkbox "Toronto, CA" [ref=e225]
                - text: Toronto, CA
              - generic [ref=e226]:
                - checkbox "Zurich, CH" [ref=e227]
                - text: Zurich, CH
      - generic [ref=e228]:
        - paragraph [ref=e230]: Found 25 creators
        - list "Creator list" [ref=e231]:
          - generic [ref=e232]:
            - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e234] [cursor=pointer]:
              - /url: /creator/nft-creator
              - img [ref=e237]
              - generic [ref=e239]:
                - generic [ref=e241]: NC
                - generic [ref=e242]:
                  - paragraph [ref=e243]: art
                  - heading "NFT Creator" [level=3] [ref=e244]
                  - paragraph [ref=e245]: "@nft-creator"
                - paragraph [ref=e246]: Minting experiences that transcend the digital realm.
                - generic [ref=e247]:
                  - img [ref=e248]
                  - text: Sydney, AU
                - generic [ref=e251]:
                  - generic [ref=e252]:
                    - paragraph [ref=e253]: 4,200
                    - paragraph [ref=e254]: Followers
                  - generic [ref=e255]:
                    - paragraph [ref=e256]: $15,000
                    - paragraph [ref=e257]: Earnings
            - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e259] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - img [ref=e262]
              - generic [ref=e264]:
                - generic [ref=e266]: PD
                - generic [ref=e267]:
                  - paragraph [ref=e268]: tech
                  - heading "Protocol Dev" [level=3] [ref=e269]
                  - paragraph [ref=e270]: "@protocol-dev"
                - paragraph [ref=e271]: Optimizing the core protocols for maximum efficiency.
                - generic [ref=e272]:
                  - img [ref=e273]
                  - text: Chicago, US
                - generic [ref=e276]:
                  - generic [ref=e277]:
                    - paragraph [ref=e278]: 4,100
                    - paragraph [ref=e279]: Followers
                  - generic [ref=e280]:
                    - paragraph [ref=e281]: $16,000
                    - paragraph [ref=e282]: Earnings
            - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e284] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - img [ref=e287]
              - generic [ref=e289]:
                - generic [ref=e291]: SD
                - generic [ref=e292]:
                  - paragraph [ref=e293]: tech
                  - heading "Solidity Dev" [level=3] [ref=e294]
                  - paragraph [ref=e295]: "@solidity-dev"
                - paragraph [ref=e296]: Forging bulletproof smart contracts for the world's applications.
                - generic [ref=e297]:
                  - img [ref=e298]
                  - text: San Francisco, US
                - generic [ref=e301]:
                  - generic [ref=e302]:
                    - paragraph [ref=e303]: 3,900
                    - paragraph [ref=e304]: Followers
                  - generic [ref=e305]:
                    - paragraph [ref=e306]: $14,500
                    - paragraph [ref=e307]: Earnings
            - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e309] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - img [ref=e312]
              - generic [ref=e314]:
                - generic [ref=e316]: SC
                - generic [ref=e317]:
                  - paragraph [ref=e318]: tech
                  - heading "Smart Contract Dev" [level=3] [ref=e319]
                  - paragraph [ref=e320]: "@smart-contract-dev"
                - paragraph [ref=e321]: Writing secure, efficient code for the on-chain economy.
                - generic [ref=e322]:
                  - img [ref=e323]
                  - text: Boston, US
                - generic [ref=e326]:
                  - generic [ref=e327]:
                    - paragraph [ref=e328]: 3,800
                    - paragraph [ref=e329]: Followers
                  - generic [ref=e330]:
                    - paragraph [ref=e331]: $14,000
                    - paragraph [ref=e332]: Earnings
            - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e334] [cursor=pointer]:
              - /url: /creator/crypto-educator
              - img [ref=e337]
              - generic [ref=e339]:
                - generic [ref=e341]: CE
                - generic [ref=e342]:
                  - paragraph [ref=e343]: education
                  - heading "Crypto Educator" [level=3] [ref=e344]
                  - paragraph [ref=e345]: "@crypto-educator"
                - paragraph [ref=e346]: Helping the world understand the power of crypto.
                - generic [ref=e347]:
                  - img [ref=e348]
                  - text: Austin, US
                - generic [ref=e351]:
                  - generic [ref=e352]:
                    - paragraph [ref=e353]: 3,500
                    - paragraph [ref=e354]: Followers
                  - generic [ref=e355]:
                    - paragraph [ref=e356]: $10,500
                    - paragraph [ref=e357]: Earnings
  - generic [ref=e358]:
    - img [ref=e360]
    - button "Open Tanstack query devtools" [ref=e408] [cursor=pointer]:
      - img [ref=e409]
  - alert [ref=e457]
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