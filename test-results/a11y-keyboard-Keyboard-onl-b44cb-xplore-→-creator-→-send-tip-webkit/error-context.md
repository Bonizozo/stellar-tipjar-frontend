# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y-keyboard.spec.ts >> Keyboard-only journey >> full keyboard journey: explore → creator → send tip
- Location: tests/e2e/a11y-keyboard.spec.ts:24:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - region "Explore Creators" [ref=e3]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - heading "Explore Creators" [level=1] [ref=e7]
          - paragraph [ref=e8]: Discover amazing builders, artists, and community leaders on Stellar. Support your favorites and help the ecosystem grow.
        - link "Compare Creators" [ref=e9]:
          - /url: /compare
          - img [ref=e10]
          - text: Compare Creators
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - img [ref=e17]
          - searchbox "Search creators" [ref=e19]
        - generic [ref=e22]: Type to start searching creators, tags, or categories.
      - 'button "Sort by: Most Popular" [ref=e25]':
        - generic [ref=e26]:
          - generic [ref=e27]: "Sort by:"
          - text: Most Popular
        - img [ref=e28]
    - generic [ref=e30]:
      - complementary [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]:
            - heading "Filters" [level=2] [ref=e34]
            - button "Clear All" [ref=e35]
          - generic [ref=e36]:
            - heading "Status" [level=3] [ref=e37]
            - generic [ref=e38]:
              - checkbox "Verified Only" [ref=e40]
              - text: Verified Only
          - generic [ref=e41]:
            - heading "Categories" [level=3] [ref=e42]
            - generic [ref=e43]:
              - generic [ref=e44]:
                - checkbox "art" [ref=e45]
                - text: art
              - generic [ref=e46]:
                - checkbox "tech" [ref=e47]
                - text: tech
              - generic [ref=e48]:
                - checkbox "community" [ref=e49]
                - text: community
              - generic [ref=e50]:
                - checkbox "education" [ref=e51]
                - text: education
              - generic [ref=e52]:
                - checkbox "music" [ref=e53]
                - text: music
              - generic [ref=e54]:
                - checkbox "gaming" [ref=e55]
                - text: gaming
              - generic [ref=e56]:
                - checkbox "crypto" [ref=e57]
                - text: crypto
              - generic [ref=e58]:
                - checkbox "nft" [ref=e59]
                - text: nft
              - generic [ref=e60]:
                - checkbox "defi" [ref=e61]
                - text: defi
              - generic [ref=e62]:
                - checkbox "dao" [ref=e63]
                - text: dao
          - generic [ref=e64]:
            - heading "Location" [level=3] [ref=e65]
            - generic [ref=e66]:
              - generic [ref=e67]:
                - checkbox "Amsterdam, NL" [ref=e68]
                - text: Amsterdam, NL
              - generic [ref=e69]:
                - checkbox "Austin, US" [ref=e70]
                - text: Austin, US
              - generic [ref=e71]:
                - checkbox "Barcelona, ES" [ref=e72]
                - text: Barcelona, ES
              - generic [ref=e73]:
                - checkbox "Berlin, DE" [ref=e74]
                - text: Berlin, DE
              - generic [ref=e75]:
                - checkbox "Boston, US" [ref=e76]
                - text: Boston, US
              - generic [ref=e77]:
                - checkbox "Chicago, US" [ref=e78]
                - text: Chicago, US
              - generic [ref=e79]:
                - checkbox "Copenhagen, DK" [ref=e80]
                - text: Copenhagen, DK
              - generic [ref=e81]:
                - checkbox "Dublin, IE" [ref=e82]
                - text: Dublin, IE
              - generic [ref=e83]:
                - checkbox "Lisbon, PT" [ref=e84]
                - text: Lisbon, PT
              - generic [ref=e85]:
                - checkbox "London, UK" [ref=e86]
                - text: London, UK
              - generic [ref=e87]:
                - checkbox "Los Angeles, US" [ref=e88]
                - text: Los Angeles, US
              - generic [ref=e89]:
                - checkbox "Mexico City, MX" [ref=e90]
                - text: Mexico City, MX
              - generic [ref=e91]:
                - checkbox "Milan, IT" [ref=e92]
                - text: Milan, IT
              - generic [ref=e93]:
                - checkbox "New York, US" [ref=e94]
                - text: New York, US
              - generic [ref=e95]:
                - checkbox "Paris, FR" [ref=e96]
                - text: Paris, FR
              - generic [ref=e97]:
                - checkbox "San Francisco, US" [ref=e98]
                - text: San Francisco, US
              - generic [ref=e99]:
                - checkbox "Seoul, KR" [ref=e100]
                - text: Seoul, KR
              - generic [ref=e101]:
                - checkbox "Singapore, SG" [ref=e102]
                - text: Singapore, SG
              - generic [ref=e103]:
                - checkbox "Stockholm, SE" [ref=e104]
                - text: Stockholm, SE
              - generic [ref=e105]:
                - checkbox "Sydney, AU" [ref=e106]
                - text: Sydney, AU
              - generic [ref=e107]:
                - checkbox "Tokyo, JP" [ref=e108]
                - text: Tokyo, JP
              - generic [ref=e109]:
                - checkbox "Toronto, CA" [ref=e110]
                - text: Toronto, CA
              - generic [ref=e111]:
                - checkbox "Zurich, CH" [ref=e112]
                - text: Zurich, CH
      - generic [ref=e113]:
        - paragraph [ref=e115]: Found 25 creators
        - list "Creator list" [ref=e116]:
          - generic [ref=e117]:
            - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e119]:
              - /url: /creator/nft-creator
              - img [ref=e122]
              - generic [ref=e124]:
                - generic [ref=e126]: NC
                - generic [ref=e127]:
                  - paragraph [ref=e128]: art
                  - heading "NFT Creator" [level=3] [ref=e129]
                  - paragraph [ref=e130]: "@nft-creator"
                - paragraph [ref=e131]: Minting experiences that transcend the digital realm.
                - generic [ref=e132]:
                  - img [ref=e133]
                  - text: Sydney, AU
                - generic [ref=e136]:
                  - generic [ref=e137]:
                    - paragraph [ref=e138]: 4,200
                    - paragraph [ref=e139]: Followers
                  - generic [ref=e140]:
                    - paragraph [ref=e141]: $15,000
                    - paragraph [ref=e142]: Earnings
            - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e144]:
              - /url: /creator/protocol-dev
              - img [ref=e147]
              - generic [ref=e149]:
                - generic [ref=e151]: PD
                - generic [ref=e152]:
                  - paragraph [ref=e153]: tech
                  - heading "Protocol Dev" [level=3] [ref=e154]
                  - paragraph [ref=e155]: "@protocol-dev"
                - paragraph [ref=e156]: Optimizing the core protocols for maximum efficiency.
                - generic [ref=e157]:
                  - img [ref=e158]
                  - text: Chicago, US
                - generic [ref=e161]:
                  - generic [ref=e162]:
                    - paragraph [ref=e163]: 4,100
                    - paragraph [ref=e164]: Followers
                  - generic [ref=e165]:
                    - paragraph [ref=e166]: $16,000
                    - paragraph [ref=e167]: Earnings
            - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e169]:
              - /url: /creator/solidity-dev
              - img [ref=e172]
              - generic [ref=e174]:
                - generic [ref=e176]: SD
                - generic [ref=e177]:
                  - paragraph [ref=e178]: tech
                  - heading "Solidity Dev" [level=3] [ref=e179]
                  - paragraph [ref=e180]: "@solidity-dev"
                - paragraph [ref=e181]: Forging bulletproof smart contracts for the world's applications.
                - generic [ref=e182]:
                  - img [ref=e183]
                  - text: San Francisco, US
                - generic [ref=e186]:
                  - generic [ref=e187]:
                    - paragraph [ref=e188]: 3,900
                    - paragraph [ref=e189]: Followers
                  - generic [ref=e190]:
                    - paragraph [ref=e191]: $14,500
                    - paragraph [ref=e192]: Earnings
            - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e194]:
              - /url: /creator/smart-contract-dev
              - img [ref=e197]
              - generic [ref=e199]:
                - generic [ref=e201]: SC
                - generic [ref=e202]:
                  - paragraph [ref=e203]: tech
                  - heading "Smart Contract Dev" [level=3] [ref=e204]
                  - paragraph [ref=e205]: "@smart-contract-dev"
                - paragraph [ref=e206]: Writing secure, efficient code for the on-chain economy.
                - generic [ref=e207]:
                  - img [ref=e208]
                  - text: Boston, US
                - generic [ref=e211]:
                  - generic [ref=e212]:
                    - paragraph [ref=e213]: 3,800
                    - paragraph [ref=e214]: Followers
                  - generic [ref=e215]:
                    - paragraph [ref=e216]: $14,000
                    - paragraph [ref=e217]: Earnings
            - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e219]:
              - /url: /creator/crypto-educator
              - img [ref=e222]
              - generic [ref=e224]:
                - generic [ref=e226]: CE
                - generic [ref=e227]:
                  - paragraph [ref=e228]: education
                  - heading "Crypto Educator" [level=3] [ref=e229]
                  - paragraph [ref=e230]: "@crypto-educator"
                - paragraph [ref=e231]: Helping the world understand the power of crypto.
                - generic [ref=e232]:
                  - img [ref=e233]
                  - text: Austin, US
                - generic [ref=e236]:
                  - generic [ref=e237]:
                    - paragraph [ref=e238]: 3,500
                    - paragraph [ref=e239]: Followers
                  - generic [ref=e240]:
                    - paragraph [ref=e241]: $10,500
                    - paragraph [ref=e242]: Earnings
            - link "tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e244]:
              - /url: /creator/stellar-dev
              - img [ref=e247]
              - generic [ref=e249]:
                - generic [ref=e251]: SD
                - generic [ref=e252]:
                  - paragraph [ref=e253]: tech
                  - heading "Stellar Dev" [level=3] [ref=e254]
                  - paragraph [ref=e255]: "@stellar-dev"
                - paragraph [ref=e256]: Building the future of open finance on Stellar.
                - generic [ref=e257]:
                  - img [ref=e258]
                  - text: San Francisco, US
                - generic [ref=e261]:
                  - generic [ref=e262]:
                    - paragraph [ref=e263]: 3,400
                    - paragraph [ref=e264]: Followers
                  - generic [ref=e265]:
                    - paragraph [ref=e266]: $12,000
                    - paragraph [ref=e267]: Earnings
            - link "tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e269]:
              - /url: /creator/gamefi-dev
              - img [ref=e272]
              - generic [ref=e274]:
                - generic [ref=e276]: GD
                - generic [ref=e277]:
                  - paragraph [ref=e278]: tech
                  - heading "GameFi Dev" [level=3] [ref=e279]
                  - paragraph [ref=e280]: "@gamefi-dev"
                - paragraph [ref=e281]: Where gaming meets finance, we're building the future.
                - generic [ref=e282]:
                  - img [ref=e283]
                  - text: Los Angeles, US
                - generic [ref=e286]:
                  - generic [ref=e287]:
                    - paragraph [ref=e288]: 3,300
                    - paragraph [ref=e289]: Followers
                  - generic [ref=e290]:
                    - paragraph [ref=e291]: $13,000
                    - paragraph [ref=e292]: Earnings
            - link "tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e294]:
              - /url: /creator/defi-expert
              - generic [ref=e295]:
                - generic [ref=e297]: DE
                - generic [ref=e298]:
                  - paragraph [ref=e299]: tech
                  - heading "DeFi Expert" [level=3] [ref=e300]
                  - paragraph [ref=e301]: "@defi-expert"
                - paragraph [ref=e302]: Navigating the deep waters of decentralized finance.
                - generic [ref=e303]:
                  - img [ref=e304]
                  - text: Singapore, SG
                - generic [ref=e307]:
                  - generic [ref=e308]:
                    - paragraph [ref=e309]: 3,100
                    - paragraph [ref=e310]: Followers
                  - generic [ref=e311]:
                    - paragraph [ref=e312]: $11,000
                    - paragraph [ref=e313]: Earnings
            - link "education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e315]:
              - /url: /creator/blockchain-edu
              - img [ref=e318]
              - generic [ref=e320]:
                - generic [ref=e322]: BE
                - generic [ref=e323]:
                  - paragraph [ref=e324]: education
                  - heading "Blockchain Edu" [level=3] [ref=e325]
                  - paragraph [ref=e326]: "@blockchain-edu"
                - paragraph [ref=e327]: Simplifying blockchain for the next generation of builders.
                - generic [ref=e328]:
                  - img [ref=e329]
                  - text: New York, US
                - generic [ref=e332]:
                  - generic [ref=e333]:
                    - paragraph [ref=e334]: 2,900
                    - paragraph [ref=e335]: Followers
                  - generic [ref=e336]:
                    - paragraph [ref=e337]: $8,900
                    - paragraph [ref=e338]: Earnings
            - link "tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e340]:
              - /url: /creator/metaverse-architect
              - img [ref=e343]
              - generic [ref=e345]:
                - generic [ref=e347]: MA
                - generic [ref=e348]:
                  - paragraph [ref=e349]: tech
                  - heading "Metaverse Architect" [level=3] [ref=e350]
                  - paragraph [ref=e351]: "@metaverse-architect"
                - paragraph [ref=e352]: Building the spaces where we'll live and play tomorrow.
                - generic [ref=e353]:
                  - img [ref=e354]
                  - text: Seoul, KR
                - generic [ref=e357]:
                  - generic [ref=e358]:
                    - paragraph [ref=e359]: 2,800
                    - paragraph [ref=e360]: Followers
                  - generic [ref=e361]:
                    - paragraph [ref=e362]: $9,200
                    - paragraph [ref=e363]: Earnings
            - link "tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e365]:
              - /url: /creator/web3-builder
              - img [ref=e368]
              - generic [ref=e370]:
                - generic [ref=e372]: WB
                - generic [ref=e373]:
                  - paragraph [ref=e374]: tech
                  - heading "Web3 Builder" [level=3] [ref=e375]
                  - paragraph [ref=e376]: "@web3-builder"
                - paragraph [ref=e377]: Architecting the infrastructure for a more open web.
                - generic [ref=e378]:
                  - img [ref=e379]
                  - text: Toronto, CA
                - generic [ref=e382]:
                  - generic [ref=e383]:
                    - paragraph [ref=e384]: 2,700
                    - paragraph [ref=e385]: Followers
                  - generic [ref=e386]:
                    - paragraph [ref=e387]: $9,500
                    - paragraph [ref=e388]: Earnings
            - link "art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e390]:
              - /url: /creator/generative-artist
              - img [ref=e393]
              - generic [ref=e395]:
                - generic [ref=e397]: GA
                - generic [ref=e398]:
                  - paragraph [ref=e399]: art
                  - heading "Generative Artist" [level=3] [ref=e400]
                  - paragraph [ref=e401]: "@generative-artist"
                - paragraph [ref=e402]: Letting the algorithms paint the portrait of tomorrow.
                - generic [ref=e403]:
                  - img [ref=e404]
                  - text: Copenhagen, DK
                - generic [ref=e407]:
                  - generic [ref=e408]:
                    - paragraph [ref=e409]: 2,600
                    - paragraph [ref=e410]: Followers
                  - generic [ref=e411]:
                    - paragraph [ref=e412]: $8,200
                    - paragraph [ref=e413]: Earnings
  - generic [ref=e414]:
    - img [ref=e416]
    - button "Open Tanstack query devtools" [ref=e484] [cursor=pointer]:
      - img [ref=e485]
  - alert [ref=e553]
```

# Test source

```ts
  1   | // tests/e2e/a11y-keyboard.spec.ts
  2   | import { test, expect } from '@playwright/test';
  3   | import { mockCreatorProfile, mockTipSubmit, MOCK_CREATOR } from '../helpers/fixtures';
  4   | import { gotoAndSettle } from '../helpers/a11y';
  5   | 
  6   | test.describe('Keyboard-only journey', () => {
  7   |   test.beforeEach(async ({ page }) => {
  8   |     await mockCreatorProfile(page);
  9   |     await mockTipSubmit(page);
  10  |   });
  11  | 
  12  |   test('skip-to-content link is reachable and functional', async ({ page }) => {
  13  |     await gotoAndSettle(page, '/en/');
  14  |     // Tab once to reach skip link
  15  |     await page.keyboard.press('Tab');
  16  |     const skipLink = page.getByText(/skip to main content/i);
  17  |     await expect(skipLink).toBeFocused();
  18  |     await page.keyboard.press('Enter');
  19  |     // main content should now be focused
  20  |     const main = page.locator('#main-content');
  21  |     await expect(main).toBeFocused();
  22  |   });
  23  | 
  24  |   test('full keyboard journey: explore → creator → send tip', async ({ page }) => {
  25  |     // Step 1: Start at explore page
  26  |     await gotoAndSettle(page, '/en/explore');
  27  | 
  28  |     // Step 2: Tab to first creator card / link
  29  |     // Press Tab multiple times to get past nav into main content
  30  |     // Use skip-to-content first
  31  |     await page.keyboard.press('Tab'); // skip to content
  32  |     await page.keyboard.press('Enter'); // activate skip link
  33  | 
  34  |     // Tab through to first creator link
  35  |     let attempts = 0;
  36  |     while (attempts < 30) {
  37  |       await page.keyboard.press('Tab');
  38  |       attempts++;
  39  |       const focused = await page.evaluate(() => document.activeElement?.tagName + ':' + (document.activeElement as HTMLAnchorElement)?.href);
  40  |       if (focused.includes('creator')) break;
  41  |     }
  42  | 
  43  |     // Navigate to creator page via keyboard
  44  |     await page.keyboard.press('Enter');
> 45  |     await page.waitForURL(/\/creator\//);
      |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  46  |     await page.waitForLoadState('networkidle');
  47  | 
  48  |     // Step 3: Find the tip amount field and fill it via keyboard
  49  |     // Tab to find the Amount field
  50  |     let foundAmount = false;
  51  |     for (let i = 0; i < 40; i++) {
  52  |       await page.keyboard.press('Tab');
  53  |       const activeLabel = await page.evaluate(() => {
  54  |         const el = document.activeElement as HTMLElement;
  55  |         if (!el) return '';
  56  |         const id = el.id;
  57  |         const label = id ? document.querySelector(`label[for="${id}"]`)?.textContent : '';
  58  |         return (el.getAttribute('aria-label') || label || el.getAttribute('placeholder') || '').toLowerCase();
  59  |       });
  60  |       if (activeLabel.includes('amount')) {
  61  |         foundAmount = true;
  62  |         break;
  63  |       }
  64  |     }
  65  | 
  66  |     if (foundAmount) {
  67  |       // Type the amount — still keyboard only
  68  |       await page.keyboard.type('5');
  69  | 
  70  |       // Tab to asset code
  71  |       await page.keyboard.press('Tab');
  72  |       await page.keyboard.press('Control+a');
  73  |       await page.keyboard.type('XLM');
  74  | 
  75  |       // Tab to submit
  76  |       await page.keyboard.press('Tab');
  77  |       await page.keyboard.press('Tab');
  78  | 
  79  |       // Find submit button
  80  |       let foundSubmit = false;
  81  |       for (let i = 0; i < 10; i++) {
  82  |         const isSubmit = await page.evaluate(() => {
  83  |           const el = document.activeElement as HTMLButtonElement;
  84  |           return el?.type === 'submit' || /create tip|send tip/i.test(el?.textContent || '');
  85  |         });
  86  |         if (isSubmit) { foundSubmit = true; break; }
  87  |         await page.keyboard.press('Tab');
  88  |       }
  89  | 
  90  |       if (foundSubmit) {
  91  |         await page.keyboard.press('Enter');
  92  |         // wait for success or error response
  93  |         await page.waitForTimeout(1000);
  94  |       }
  95  |     }
  96  | 
  97  |     // Assert no js errors (page should still be functional)
  98  |     expect(page.url()).toBeTruthy();
  99  |   });
  100 | 
  101 |   test('Escape key closes open modal', async ({ page }) => {
  102 |     await gotoAndSettle(page, '/en/tips');
  103 |     const exportBtn = page.getByRole('button', { name: /export/i });
  104 |     if (await exportBtn.isVisible()) {
  105 |       await exportBtn.focus();
  106 |       await page.keyboard.press('Enter');
  107 |       await page.waitForSelector('[role="dialog"]', { timeout: 3000 }).catch(() => {});
  108 |       const dialog = page.locator('[role="dialog"]').first();
  109 |       const isOpen = await dialog.isVisible().catch(() => false);
  110 |       if (isOpen) {
  111 |         await page.keyboard.press('Escape');
  112 |         await expect(dialog).not.toBeVisible({ timeout: 2000 });
  113 |       }
  114 |     } else {
  115 |       test.skip();
  116 |     }
  117 |   });
  118 | 
  119 |   test('filter sidebar checkboxes are keyboard-operable on explore page', async ({ page }) => {
  120 |     await gotoAndSettle(page, '/en/explore');
  121 |     // Find a filter checkbox via Tab
  122 |     let foundCheckbox = false;
  123 |     for (let i = 0; i < 50; i++) {
  124 |       await page.keyboard.press('Tab');
  125 |       const isCheckbox = await page.evaluate(
  126 |         () => (document.activeElement as HTMLInputElement)?.type === 'checkbox'
  127 |       );
  128 |       if (isCheckbox) {
  129 |         foundCheckbox = true;
  130 |         // Toggle with Space
  131 |         await page.keyboard.press('Space');
  132 |         const checked = await page.evaluate(
  133 |           () => (document.activeElement as HTMLInputElement)?.checked
  134 |         );
  135 |         expect(checked).toBe(true);
  136 |         // Toggle off
  137 |         await page.keyboard.press('Space');
  138 |         break;
  139 |       }
  140 |     }
  141 |     // Not failing hard if sidebar isn't visible (mobile viewport)
  142 |   });
  143 | });
  144 | 
```