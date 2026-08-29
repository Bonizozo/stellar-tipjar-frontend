# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Explore Page >> can clear all filters
- Location: tests/e2e/explore.spec.ts:50:7

# Error details

```
Error: locator.isVisible: Error: strict mode violation: getByText('Clear all') resolved to 2 elements:
    1) <button class="text-xs font-bold text-wave underline decoration-wave/30 underline-offset-4 hover:decoration-wave transition-all ml-2">Clear all</button> aka getByRole('button', { name: 'Clear all', exact: true })
    2) <button class="text-xs font-semibold text-wave hover:underline transition-all">Clear All</button> aka getByRole('button', { name: 'Clear All', exact: true })

Call log:
    - checking visibility of getByText('Clear all')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic:
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
    - generic [ref=e131]:
      - generic [ref=e132]:
        - generic [ref=e134]:
          - img [ref=e136]
          - searchbox "Search creators" [active] [ref=e138]: test
          - button "Clear search" [ref=e140]:
            - img
        - 'button "Sort by: Most Popular" [ref=e143]':
          - generic [ref=e144]:
            - generic [ref=e145]: "Sort by:"
            - text: Most Popular
          - img [ref=e146]
      - generic [ref=e148]:
        - text: "Active:"
        - generic [ref=e149]:
          - text: "Search: test"
          - button "×" [ref=e150]
        - button "Clear all" [ref=e151]
    - generic [ref=e152]:
      - complementary [ref=e153]:
        - generic [ref=e154]:
          - generic [ref=e155]:
            - heading "Filters" [level=2] [ref=e156]
            - button "Clear All" [ref=e157]
          - generic [ref=e158]:
            - heading "Status" [level=3] [ref=e159]
            - generic [ref=e160]:
              - checkbox "Verified Only" [ref=e162]
              - text: Verified Only
          - generic [ref=e163]:
            - heading "Categories" [level=3] [ref=e164]
            - generic [ref=e165]:
              - generic [ref=e166]:
                - checkbox "art" [ref=e167]
                - text: art
              - generic [ref=e168]:
                - checkbox "tech" [ref=e169]
                - text: tech
              - generic [ref=e170]:
                - checkbox "community" [ref=e171]
                - text: community
              - generic [ref=e172]:
                - checkbox "education" [ref=e173]
                - text: education
              - generic [ref=e174]:
                - checkbox "music" [ref=e175]
                - text: music
              - generic [ref=e176]:
                - checkbox "gaming" [ref=e177]
                - text: gaming
              - generic [ref=e178]:
                - checkbox "crypto" [ref=e179]
                - text: crypto
              - generic [ref=e180]:
                - checkbox "nft" [ref=e181]
                - text: nft
              - generic [ref=e182]:
                - checkbox "defi" [ref=e183]
                - text: defi
              - generic [ref=e184]:
                - checkbox "dao" [ref=e185]
                - text: dao
          - generic [ref=e186]:
            - heading "Location" [level=3] [ref=e187]
            - generic [ref=e188]:
              - generic [ref=e189]:
                - checkbox "Amsterdam, NL" [ref=e190]
                - text: Amsterdam, NL
              - generic [ref=e191]:
                - checkbox "Austin, US" [ref=e192]
                - text: Austin, US
              - generic [ref=e193]:
                - checkbox "Barcelona, ES" [ref=e194]
                - text: Barcelona, ES
              - generic [ref=e195]:
                - checkbox "Berlin, DE" [ref=e196]
                - text: Berlin, DE
              - generic [ref=e197]:
                - checkbox "Boston, US" [ref=e198]
                - text: Boston, US
              - generic [ref=e199]:
                - checkbox "Chicago, US" [ref=e200]
                - text: Chicago, US
              - generic [ref=e201]:
                - checkbox "Copenhagen, DK" [ref=e202]
                - text: Copenhagen, DK
              - generic [ref=e203]:
                - checkbox "Dublin, IE" [ref=e204]
                - text: Dublin, IE
              - generic [ref=e205]:
                - checkbox "Lisbon, PT" [ref=e206]
                - text: Lisbon, PT
              - generic [ref=e207]:
                - checkbox "London, UK" [ref=e208]
                - text: London, UK
              - generic [ref=e209]:
                - checkbox "Los Angeles, US" [ref=e210]
                - text: Los Angeles, US
              - generic [ref=e211]:
                - checkbox "Mexico City, MX" [ref=e212]
                - text: Mexico City, MX
              - generic [ref=e213]:
                - checkbox "Milan, IT" [ref=e214]
                - text: Milan, IT
              - generic [ref=e215]:
                - checkbox "New York, US" [ref=e216]
                - text: New York, US
              - generic [ref=e217]:
                - checkbox "Paris, FR" [ref=e218]
                - text: Paris, FR
              - generic [ref=e219]:
                - checkbox "San Francisco, US" [ref=e220]
                - text: San Francisco, US
              - generic [ref=e221]:
                - checkbox "Seoul, KR" [ref=e222]
                - text: Seoul, KR
              - generic [ref=e223]:
                - checkbox "Singapore, SG" [ref=e224]
                - text: Singapore, SG
              - generic [ref=e225]:
                - checkbox "Stockholm, SE" [ref=e226]
                - text: Stockholm, SE
              - generic [ref=e227]:
                - checkbox "Sydney, AU" [ref=e228]
                - text: Sydney, AU
              - generic [ref=e229]:
                - checkbox "Tokyo, JP" [ref=e230]
                - text: Tokyo, JP
              - generic [ref=e231]:
                - checkbox "Toronto, CA" [ref=e232]
                - text: Toronto, CA
              - generic [ref=e233]:
                - checkbox "Zurich, CH" [ref=e234]
                - text: Zurich, CH
      - paragraph [ref=e237]: Searching...
  - generic [ref=e238]:
    - img [ref=e240]
    - button "Open Tanstack query devtools" [ref=e289] [cursor=pointer]:
      - img [ref=e290]
  - alert [ref=e339]
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
> 62  |     if (await clearButton.isVisible()) {
      |                           ^ Error: locator.isVisible: Error: strict mode violation: getByText('Clear all') resolved to 2 elements:
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