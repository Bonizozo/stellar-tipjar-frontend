# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Explore Page >> displays creator cards
- Location: tests/e2e/explore.spec.ts:70:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="creator-card"]').or(getByRole('article')).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="creator-card"]').or(getByRole('article')).first()

```

```yaml
- region "Explore Creators":
  - heading "Explore Creators" [level=1]
  - paragraph: Discover amazing builders, artists, and community leaders on Stellar. Support your favorites and help the ecosystem grow.
  - link "Compare Creators":
    - /url: /compare
    - img
    - text: Compare Creators
- searchbox "Search creators"
- 'button "Sort by: Most Popular"': Most Popular
- complementary:
  - heading "Filters" [level=2]
  - button "Clear All"
  - heading "Status" [level=3]
  - checkbox "Verified Only"
  - text: Verified Only
  - heading "Categories" [level=3]
  - checkbox "art"
  - text: art
  - checkbox "tech"
  - text: tech
  - checkbox "community"
  - text: community
  - checkbox "education"
  - text: education
  - checkbox "music"
  - text: music
  - checkbox "gaming"
  - text: gaming
  - checkbox "crypto"
  - text: crypto
  - checkbox "nft"
  - text: nft
  - checkbox "defi"
  - text: defi
  - checkbox "dao"
  - text: dao
  - heading "Location" [level=3]
  - checkbox "Amsterdam, NL"
  - text: Amsterdam, NL
  - checkbox "Austin, US"
  - text: Austin, US
  - checkbox "Barcelona, ES"
  - text: Barcelona, ES
  - checkbox "Berlin, DE"
  - text: Berlin, DE
  - checkbox "Boston, US"
  - text: Boston, US
  - checkbox "Chicago, US"
  - text: Chicago, US
  - checkbox "Copenhagen, DK"
  - text: Copenhagen, DK
  - checkbox "Dublin, IE"
  - text: Dublin, IE
  - checkbox "Lisbon, PT"
  - text: Lisbon, PT
  - checkbox "London, UK"
  - text: London, UK
  - checkbox "Los Angeles, US"
  - text: Los Angeles, US
  - checkbox "Mexico City, MX"
  - text: Mexico City, MX
  - checkbox "Milan, IT"
  - text: Milan, IT
  - checkbox "New York, US"
  - text: New York, US
  - checkbox "Paris, FR"
  - text: Paris, FR
  - checkbox "San Francisco, US"
  - text: San Francisco, US
  - checkbox "Seoul, KR"
  - text: Seoul, KR
  - checkbox "Singapore, SG"
  - text: Singapore, SG
  - checkbox "Stockholm, SE"
  - text: Stockholm, SE
  - checkbox "Sydney, AU"
  - text: Sydney, AU
  - checkbox "Tokyo, JP"
  - text: Tokyo, JP
  - checkbox "Toronto, CA"
  - text: Toronto, CA
  - checkbox "Zurich, CH"
  - text: Zurich, CH
- paragraph: Found 25 creators
- list "Creator list":
  - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings":
    - /url: /creator/nft-creator
    - img
    - paragraph: art
    - heading "NFT Creator" [level=3]
    - paragraph: "@nft-creator"
    - paragraph: Minting experiences that transcend the digital realm.
    - img
    - text: Sydney, AU
    - paragraph: 4,200
    - paragraph: Followers
    - paragraph: $15,000
    - paragraph: Earnings
  - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings":
    - /url: /creator/protocol-dev
    - img
    - paragraph: tech
    - heading "Protocol Dev" [level=3]
    - paragraph: "@protocol-dev"
    - paragraph: Optimizing the core protocols for maximum efficiency.
    - img
    - text: Chicago, US
    - paragraph: 4,100
    - paragraph: Followers
    - paragraph: $16,000
    - paragraph: Earnings
  - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings":
    - /url: /creator/solidity-dev
    - img
    - paragraph: tech
    - heading "Solidity Dev" [level=3]
    - paragraph: "@solidity-dev"
    - paragraph: Forging bulletproof smart contracts for the world's applications.
    - img
    - text: San Francisco, US
    - paragraph: 3,900
    - paragraph: Followers
    - paragraph: $14,500
    - paragraph: Earnings
  - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings":
    - /url: /creator/smart-contract-dev
    - img
    - paragraph: tech
    - heading "Smart Contract Dev" [level=3]
    - paragraph: "@smart-contract-dev"
    - paragraph: Writing secure, efficient code for the on-chain economy.
    - img
    - text: Boston, US
    - paragraph: 3,800
    - paragraph: Followers
    - paragraph: $14,000
    - paragraph: Earnings
  - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings":
    - /url: /creator/crypto-educator
    - img
    - paragraph: education
    - heading "Crypto Educator" [level=3]
    - paragraph: "@crypto-educator"
    - paragraph: Helping the world understand the power of crypto.
    - img
    - text: Austin, US
    - paragraph: 3,500
    - paragraph: Followers
    - paragraph: $10,500
    - paragraph: Earnings
  - link "tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings":
    - /url: /creator/stellar-dev
    - img
    - paragraph: tech
    - heading "Stellar Dev" [level=3]
    - paragraph: "@stellar-dev"
    - paragraph: Building the future of open finance on Stellar.
    - img
    - text: San Francisco, US
    - paragraph: 3,400
    - paragraph: Followers
    - paragraph: $12,000
    - paragraph: Earnings
  - link "tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings":
    - /url: /creator/gamefi-dev
    - img
    - paragraph: tech
    - heading "GameFi Dev" [level=3]
    - paragraph: "@gamefi-dev"
    - paragraph: Where gaming meets finance, we're building the future.
    - img
    - text: Los Angeles, US
    - paragraph: 3,300
    - paragraph: Followers
    - paragraph: $13,000
    - paragraph: Earnings
  - link "tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings":
    - /url: /creator/defi-expert
    - paragraph: tech
    - heading "DeFi Expert" [level=3]
    - paragraph: "@defi-expert"
    - paragraph: Navigating the deep waters of decentralized finance.
    - img
    - text: Singapore, SG
    - paragraph: 3,100
    - paragraph: Followers
    - paragraph: $11,000
    - paragraph: Earnings
  - link "education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings":
    - /url: /creator/blockchain-edu
    - img
    - paragraph: education
    - heading "Blockchain Edu" [level=3]
    - paragraph: "@blockchain-edu"
    - paragraph: Simplifying blockchain for the next generation of builders.
    - img
    - text: New York, US
    - paragraph: 2,900
    - paragraph: Followers
    - paragraph: $8,900
    - paragraph: Earnings
  - link "tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings":
    - /url: /creator/metaverse-architect
    - img
    - paragraph: tech
    - heading "Metaverse Architect" [level=3]
    - paragraph: "@metaverse-architect"
    - paragraph: Building the spaces where we'll live and play tomorrow.
    - img
    - text: Seoul, KR
    - paragraph: 2,800
    - paragraph: Followers
    - paragraph: $9,200
    - paragraph: Earnings
  - link "tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings":
    - /url: /creator/web3-builder
    - img
    - paragraph: tech
    - heading "Web3 Builder" [level=3]
    - paragraph: "@web3-builder"
    - paragraph: Architecting the infrastructure for a more open web.
    - img
    - text: Toronto, CA
    - paragraph: 2,700
    - paragraph: Followers
    - paragraph: $9,500
    - paragraph: Earnings
  - link "art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings":
    - /url: /creator/generative-artist
    - img
    - paragraph: art
    - heading "Generative Artist" [level=3]
    - paragraph: "@generative-artist"
    - paragraph: Letting the algorithms paint the portrait of tomorrow.
    - img
    - text: Copenhagen, DK
    - paragraph: 2,600
    - paragraph: Followers
    - paragraph: $8,200
    - paragraph: Earnings
- button "Open Tanstack query devtools":
  - img
- alert
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
> 77  |     await expect(creatorCards.first()).toBeVisible({ timeout: 10000 });
      |                                        ^ Error: expect(locator).toBeVisible() failed
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