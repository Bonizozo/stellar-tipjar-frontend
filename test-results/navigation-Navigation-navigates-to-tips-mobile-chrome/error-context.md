# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> navigates to /tips
- Location: tests/e2e/navigation.spec.ts:15:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /send a tip/i }).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - navigation "Main navigation" [ref=e5]:
        - link "Stellar Tip Jar — home" [ref=e6] [cursor=pointer]:
          - /url: /
          - text: Stellar Tip Jar
        - generic [ref=e7]:
          - combobox "Select language" [ref=e8] [cursor=pointer]:
            - option "🇬🇧 English" [selected]
            - option "🇪🇸 Español"
            - option "🇫🇷 Français"
            - option "🇨🇳 中文"
            - option "🇸🇦 العربية"
          - button "Switch to dark mode" [ref=e9]:
            - img [ref=e10]
          - generic [ref=e12]:
            - button "No new notifications" [ref=e13]:
              - img [ref=e14]
            - button "Mute notification sounds" [ref=e17]:
              - img [ref=e18]
          - button "Install Freighter" [ref=e23]
          - button "Open mobile menu" [ref=e24]:
            - img [ref=e25]
    - navigation "Quick actions" [ref=e27]:
      - link "Home" [ref=e28] [cursor=pointer]:
        - /url: /
        - img [ref=e29]
        - text: Home
      - link "Explore" [ref=e31] [cursor=pointer]:
        - /url: /explore
        - img [ref=e32]
        - text: Explore
      - link "Tip" [ref=e34] [cursor=pointer]:
        - /url: /tips
        - img [ref=e35]
        - text: Tip
      - button "Menu" [ref=e37]:
        - img [ref=e38]
        - text: Menu
    - main [ref=e40]:
      - generic [ref=e42]:
        - region "Support Creators with Stellar" [ref=e43]:
          - generic [ref=e46]:
            - generic [ref=e47]: Open Source · Powered by Stellar
            - heading "Support Creators with Stellar" [level=1] [ref=e49]
            - paragraph [ref=e50]: Fast, borderless, and fee-friendly tipping powered by the Stellar blockchain. Send direct support to your favourite creators in seconds — no banks, no borders.
            - generic [ref=e51]:
              - link "Explore Creators" [ref=e52] [cursor=pointer]:
                - /url: /explore
                - button "Explore Creators" [ref=e53]:
                  - img [ref=e54]
                  - text: Explore Creators
              - link "Connect Wallet" [ref=e56] [cursor=pointer]:
                - /url: /tips
                - button "Connect Wallet" [ref=e57]:
                  - img [ref=e58]
                  - text: Connect Wallet
            - paragraph [ref=e60]: Non-custodial · Your keys, your funds · Free to use
            - img [ref=e63]
        - region "Platform statistics" [ref=e66]:
          - generic [ref=e67]:
            - generic [ref=e68]:
              - img [ref=e70]
              - paragraph [ref=e72]: 18,000+
              - paragraph [ref=e73]: Tips Sent
            - generic [ref=e74]:
              - img [ref=e76]
              - paragraph [ref=e78]: 2,400+
              - paragraph [ref=e79]: Active Creators
            - generic [ref=e80]:
              - img [ref=e82]
              - paragraph [ref=e84]: 500K+
              - paragraph [ref=e85]: XLM Distributed
            - generic [ref=e86]:
              - img [ref=e88]
              - paragraph [ref=e90]: 150+
              - paragraph [ref=e91]: Countries Reached
        - region "How Stellar TipJar Works" [ref=e92]:
          - generic [ref=e93]:
            - generic [ref=e94]: Simple as 1-2-3
            - heading "How Stellar TipJar Works" [level=2] [ref=e95]
            - paragraph [ref=e96]: No middlemen. No delays. Just direct, borderless support for the creators you love.
          - generic [ref=e97]:
            - generic [ref=e98]:
              - generic: "01"
              - img [ref=e100]
              - generic [ref=e102]:
                - paragraph [ref=e103]: Step 01
                - heading "Connect Your Wallet" [level=3] [ref=e104]
                - paragraph [ref=e105]: Install Freighter and connect your Stellar wallet in one click. No sign-ups, no KYC — just your keys.
            - generic [ref=e106]:
              - generic: "02"
              - img [ref=e108]
              - generic [ref=e110]:
                - paragraph [ref=e111]: Step 02
                - heading "Discover Creators" [level=3] [ref=e112]
                - paragraph [ref=e113]: Browse verified creators across art, tech, music, and education. Filter by category, location, or popularity.
            - generic [ref=e114]:
              - generic: "03"
              - img [ref=e116]
              - generic [ref=e118]:
                - paragraph [ref=e119]: Step 03
                - heading "Send a Tip" [level=3] [ref=e120]
                - paragraph [ref=e121]: Choose an amount in XLM or your local currency. Tips arrive in seconds with near-zero fees on Stellar.
        - region "Meet the Community" [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]: Top Creators
              - heading "Meet the Community" [level=2] [ref=e126]
              - paragraph [ref=e127]: Thousands of creators are earning on Stellar. Here are some of the most supported ones right now.
            - link "View all creators" [ref=e128] [cursor=pointer]:
              - /url: /explore
              - button "View all creators" [ref=e129]:
                - text: View all creators
                - img [ref=e130]
          - generic [ref=e132]:
            - link "Protocol Dev Verified tech · Chicago, US 16,000 XLM" [ref=e134] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - generic [ref=e137]: PD
              - generic [ref=e138]:
                - generic [ref=e139]:
                  - generic [ref=e140]: Protocol Dev
                  - img "Verified" [ref=e141]
                - paragraph [ref=e143]: tech · Chicago, US
                - generic [ref=e144]:
                  - img [ref=e145]
                  - text: 16,000 XLM
              - img [ref=e147]
            - link "NFT Creator Verified art · Sydney, AU 15,000 XLM" [ref=e150] [cursor=pointer]:
              - /url: /creator/nft-creator
              - generic [ref=e153]: NC
              - generic [ref=e154]:
                - generic [ref=e155]:
                  - generic [ref=e156]: NFT Creator
                  - img "Verified" [ref=e157]
                - paragraph [ref=e159]: art · Sydney, AU
                - generic [ref=e160]:
                  - img [ref=e161]
                  - text: 15,000 XLM
              - img [ref=e163]
            - link "Solidity Dev Verified tech · San Francisco, US 14,500 XLM" [ref=e166] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - generic [ref=e169]: SD
              - generic [ref=e170]:
                - generic [ref=e171]:
                  - generic [ref=e172]: Solidity Dev
                  - img "Verified" [ref=e173]
                - paragraph [ref=e175]: tech · San Francisco, US
                - generic [ref=e176]:
                  - img [ref=e177]
                  - text: 14,500 XLM
              - img [ref=e179]
            - link "Smart Contract Dev Verified tech · Boston, US 14,000 XLM" [ref=e182] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - generic [ref=e185]: SC
              - generic [ref=e186]:
                - generic [ref=e187]:
                  - generic [ref=e188]: Smart Contract Dev
                  - img "Verified" [ref=e189]
                - paragraph [ref=e191]: tech · Boston, US
                - generic [ref=e192]:
                  - img [ref=e193]
                  - text: 14,000 XLM
              - img [ref=e195]
            - link "GameFi Dev Verified tech · Los Angeles, US 13,000 XLM" [ref=e198] [cursor=pointer]:
              - /url: /creator/gamefi-dev
              - generic [ref=e201]: GD
              - generic [ref=e202]:
                - generic [ref=e203]:
                  - generic [ref=e204]: GameFi Dev
                  - img "Verified" [ref=e205]
                - paragraph [ref=e207]: tech · Los Angeles, US
                - generic [ref=e208]:
                  - img [ref=e209]
                  - text: 13,000 XLM
              - img [ref=e211]
            - link "Stellar Dev Verified tech · San Francisco, US 12,000 XLM" [ref=e214] [cursor=pointer]:
              - /url: /creator/stellar-dev
              - generic [ref=e217]: SD
              - generic [ref=e218]:
                - generic [ref=e219]:
                  - generic [ref=e220]: Stellar Dev
                  - img "Verified" [ref=e221]
                - paragraph [ref=e223]: tech · San Francisco, US
                - generic [ref=e224]:
                  - img [ref=e225]
                  - text: 12,000 XLM
              - img [ref=e227]
        - region "Loved by Creators Worldwide" [ref=e229]:
          - generic [ref=e230]:
            - generic [ref=e231]: Creator Stories
            - heading "Loved by Creators Worldwide" [level=2] [ref=e232]
            - paragraph [ref=e233]: From indie artists to open-source developers — here's what they say about tipping on Stellar.
          - generic [ref=e234]:
            - generic [ref=e235]:
              - generic "5 out of 5 stars" [ref=e236]:
                - img [ref=e237]
                - img [ref=e239]
                - img [ref=e241]
                - img [ref=e243]
                - img [ref=e245]
              - blockquote [ref=e247]: “Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.”
              - generic [ref=e248]:
                - generic [ref=e249]: AC
                - generic [ref=e250]:
                  - paragraph [ref=e251]: Alice Chen
                  - paragraph [ref=e252]: Digital Artist · Berlin
            - generic [ref=e253]:
              - generic "5 out of 5 stars" [ref=e254]:
                - img [ref=e255]
                - img [ref=e257]
                - img [ref=e259]
                - img [ref=e261]
                - img [ref=e263]
              - blockquote [ref=e265]: “As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.”
              - generic [ref=e266]:
                - generic [ref=e267]: MW
                - generic [ref=e268]:
                  - paragraph [ref=e269]: Marcus Webb
                  - paragraph [ref=e270]: Blockchain Developer · San Francisco
            - generic [ref=e271]:
              - generic "5 out of 5 stars" [ref=e272]:
                - img [ref=e273]
                - img [ref=e275]
                - img [ref=e277]
                - img [ref=e279]
                - img [ref=e281]
              - blockquote [ref=e283]: “I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.”
              - generic [ref=e284]:
                - generic [ref=e285]: YT
                - generic [ref=e286]:
                  - paragraph [ref=e287]: Yuki Tanaka
                  - paragraph [ref=e288]: Pixel Artist · Tokyo
            - generic [ref=e289]:
              - generic "5 out of 5 stars" [ref=e290]:
                - img [ref=e291]
                - img [ref=e293]
                - img [ref=e295]
                - img [ref=e297]
                - img [ref=e299]
              - blockquote [ref=e301]: “My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.”
              - generic [ref=e302]:
                - generic [ref=e303]: PN
                - generic [ref=e304]:
                  - paragraph [ref=e305]: Priya Nair
                  - paragraph [ref=e306]: Community Organizer · London
            - generic [ref=e307]:
              - generic "5 out of 5 stars" [ref=e308]:
                - img [ref=e309]
                - img [ref=e311]
                - img [ref=e313]
                - img [ref=e315]
                - img [ref=e317]
              - blockquote [ref=e319]: “The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.”
              - generic [ref=e320]:
                - generic [ref=e321]: JB
                - generic [ref=e322]:
                  - paragraph [ref=e323]: Jordan Blake
                  - paragraph [ref=e324]: Crypto Educator · New York
            - generic [ref=e325]:
              - generic "5 out of 5 stars" [ref=e326]:
                - img [ref=e327]
                - img [ref=e329]
                - img [ref=e331]
                - img [ref=e333]
                - img [ref=e335]
              - blockquote [ref=e337]: “Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.”
              - generic [ref=e338]:
                - generic [ref=e339]: ST
                - generic [ref=e340]:
                  - paragraph [ref=e341]: Sofia Torres
                  - paragraph [ref=e342]: Crypto Artist · Paris
        - region "Get started with Stellar TipJar" [ref=e343]:
          - generic [ref=e345]:
            - heading "Ready to start tipping?" [level=2] [ref=e346]
            - paragraph [ref=e347]: Join thousands of creators and supporters already using Stellar TipJar. Connect your Freighter wallet and send your first tip in under 60 seconds.
            - generic [ref=e348]:
              - link "Explore Creators" [ref=e349] [cursor=pointer]:
                - /url: /explore
                - button "Explore Creators" [ref=e350]
              - link "Learn more" [ref=e351] [cursor=pointer]:
                - /url: /tips
                - button "Learn more" [ref=e352]
    - contentinfo [ref=e353]:
      - generic [ref=e354]:
        - generic [ref=e355]:
          - generic [ref=e356]:
            - heading "About" [level=3] [ref=e357]
            - generic [ref=e358]:
              - paragraph [ref=e359]: Support creators with Stellar blockchain and easy cross-border tips.
              - paragraph [ref=e360]: Built for creators and fans, with a focus on privacy and low fees.
          - generic [ref=e361]:
            - heading "Quick Links" [level=3] [ref=e362]
            - generic [ref=e363]:
              - link "Explore" [ref=e364] [cursor=pointer]:
                - /url: /explore
              - link "My Tips" [ref=e365] [cursor=pointer]:
                - /url: /tips
              - link "Creator Profile" [ref=e366] [cursor=pointer]:
                - /url: /creator
              - link "Settings" [ref=e367] [cursor=pointer]:
                - /url: /settings
              - link "Help & FAQ" [ref=e368] [cursor=pointer]:
                - /url: /help
          - generic [ref=e369]:
            - heading "Social" [level=3] [ref=e370]
            - generic [ref=e372]:
              - link "Twitter" [ref=e373] [cursor=pointer]:
                - /url: https://twitter.com/stellar
                - img [ref=e374]
                - generic [ref=e376]: Twitter
              - link "GitHub" [ref=e377] [cursor=pointer]:
                - /url: https://github.com/stellar
                - img [ref=e378]
                - generic [ref=e380]: GitHub
              - link "Discord" [ref=e381] [cursor=pointer]:
                - /url: https://discord.com/invite/stellar
                - img [ref=e382]
                - generic [ref=e384]: Discord
          - generic [ref=e385]:
            - heading "Newsletter" [level=3] [ref=e386]
            - generic [ref=e388]:
              - paragraph [ref=e389]: Join our newsletter for creator tips and Stellar updates.
              - generic [ref=e390]:
                - generic [ref=e391]: Email address
                - textbox "Email address" [ref=e392]:
                  - /placeholder: Enter your email
                - button "Subscribe" [ref=e393]
        - generic [ref=e394]:
          - generic [ref=e395]:
            - paragraph [ref=e396]: © 2026 Stellar Tip Jar. MIT License.
            - generic [ref=e397]:
              - link "Privacy Policy" [ref=e398] [cursor=pointer]:
                - /url: /privacy
              - generic [ref=e399]: •
              - link "Terms of Service" [ref=e400] [cursor=pointer]:
                - /url: /terms
              - generic [ref=e401]: •
              - link "Sitemap" [ref=e402] [cursor=pointer]:
                - /url: /sitemap.xml
          - button "Back to top" [ref=e403]:
            - img [ref=e404]
            - text: Back to top
  - generic [ref=e406]:
    - img [ref=e408]
    - button "Open Tanstack query devtools" [ref=e456] [cursor=pointer]:
      - img [ref=e457]
  - generic [ref=e505]:
    - img [ref=e507]
    - button "Open Tanstack query devtools" [ref=e555] [cursor=pointer]:
      - img [ref=e556]
  - generic [ref=e608] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e609]:
      - img [ref=e610]
    - generic [ref=e613]:
      - button "Open issues overlay" [ref=e614]:
        - generic [ref=e615]:
          - generic [ref=e616]: "1"
          - generic [ref=e617]: "2"
        - generic [ref=e618]:
          - text: Issue
          - generic [ref=e619]: s
      - button "Collapse issues badge" [ref=e620]:
        - img [ref=e621]
  - alert [ref=e625]
  - button "Skip tour" [ref=e626] [cursor=pointer]
  - 'dialog "Tour step 1 of 6: Navigation" [ref=e627]':
    - heading "Navigation" [level=3] [ref=e636]
    - paragraph [ref=e637]: Use the navbar to explore the app, access your wallet, and switch themes.
    - generic [ref=e638]:
      - button "Skip tour" [ref=e639]
      - button "Next →" [ref=e640]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Navigation', () => {
  4  |   test('navbar links are present on homepage', async ({ page }) => {
  5  |     await page.goto('/')
  6  |     await expect(page.getByRole('navigation')).toBeVisible()
  7  |   })
  8  | 
  9  |   test('navigates to /explore', async ({ page }) => {
  10 |     await page.goto('/')
  11 |     await page.getByRole('link', { name: /explore/i }).first().click()
  12 |     await expect(page).toHaveURL('/explore')
  13 |   })
  14 | 
  15 |   test('navigates to /tips', async ({ page }) => {
  16 |     await page.goto('/')
> 17 |     await page.getByRole('link', { name: /send a tip/i }).first().click()
     |                                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  18 |     await expect(page).toHaveURL('/tips')
  19 |   })
  20 | 
  21 |   test('mobile viewport renders navbar', async ({ page }) => {
  22 |     await page.setViewportSize({ width: 375, height: 812 })
  23 |     await page.goto('/')
  24 |     await expect(page.getByRole('navigation')).toBeVisible()
  25 |   })
  26 | })
  27 | 
```