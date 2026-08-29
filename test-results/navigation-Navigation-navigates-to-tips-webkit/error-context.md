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
  - link "Skip to main content" [ref=e2]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - navigation "Main navigation" [ref=e5]:
        - link "Stellar Tip Jar — home" [ref=e6]:
          - /url: /
          - text: Stellar Tip Jar
        - list [ref=e7]:
          - listitem [ref=e8]:
            - button "Explore" [ref=e10]:
              - text: Explore
              - img [ref=e11]
          - listitem [ref=e13]:
            - link "Tips" [ref=e14]:
              - /url: /tips
          - listitem [ref=e15]:
            - link "Widgets" [ref=e16]:
              - /url: /widgets
          - listitem [ref=e17]:
            - link "Help" [ref=e18]:
              - /url: /help
        - search [ref=e20]:
          - generic [ref=e21]: Search
          - generic:
            - img
          - searchbox "Search" [ref=e22]
        - generic [ref=e23]:
          - generic [ref=e25]:
            - generic [ref=e26]: Display Currency
            - combobox "Display Currency" [ref=e28] [cursor=pointer]:
              - option "USD - US Dollar" [selected]
              - option "EUR - Euro"
              - option "NGN - Nigerian Naira"
              - option "GBP - British Pound"
          - combobox "Select language" [ref=e29] [cursor=pointer]:
            - option "🇬🇧 English" [selected]
            - option "🇪🇸 Español"
            - option "🇫🇷 Français"
            - option "🇨🇳 中文"
            - option "🇸🇦 العربية"
          - button "Switch to dark mode" [ref=e30]:
            - img [ref=e31]
          - generic [ref=e33]:
            - button "No new notifications" [ref=e34]:
              - img [ref=e35]
            - button "Mute notification sounds" [ref=e38]:
              - img [ref=e39]
          - button "Install Freighter" [ref=e44]
    - main [ref=e45]:
      - generic [ref=e47]:
        - region "Support Creators with Stellar" [ref=e48]:
          - generic [ref=e51]:
            - generic [ref=e52]: Open Source · Powered by Stellar
            - heading "Support Creators with Stellar" [level=1] [ref=e54]:
              - text: Support Creators
              - text: with Stellar
            - paragraph [ref=e55]: Fast, borderless, and fee-friendly tipping powered by the Stellar blockchain. Send direct support to your favourite creators in seconds — no banks, no borders.
            - generic [ref=e56]:
              - link "Explore Creators" [ref=e57]:
                - /url: /explore
                - button "Explore Creators" [ref=e58]:
                  - img [ref=e59]
                  - text: Explore Creators
              - link "Connect Wallet" [ref=e61]:
                - /url: /tips
                - button "Connect Wallet" [ref=e62]:
                  - img [ref=e63]
                  - text: Connect Wallet
            - paragraph [ref=e65]: Non-custodial · Your keys, your funds · Free to use
            - img [ref=e68]
        - region "Platform statistics" [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e73]:
              - img [ref=e75]
              - paragraph [ref=e77]: 18,000+
              - paragraph [ref=e78]: Tips Sent
            - generic [ref=e79]:
              - img [ref=e81]
              - paragraph [ref=e83]: 2,400+
              - paragraph [ref=e84]: Active Creators
            - generic [ref=e85]:
              - img [ref=e87]
              - paragraph [ref=e89]: 500K+
              - paragraph [ref=e90]: XLM Distributed
            - generic [ref=e91]:
              - img [ref=e93]
              - paragraph [ref=e95]: 150+
              - paragraph [ref=e96]: Countries Reached
        - region "How Stellar TipJar Works" [ref=e97]:
          - generic [ref=e98]:
            - generic [ref=e99]: Simple as 1-2-3
            - heading "How Stellar TipJar Works" [level=2] [ref=e100]
            - paragraph [ref=e101]: No middlemen. No delays. Just direct, borderless support for the creators you love.
          - generic [ref=e102]:
            - generic [ref=e103]:
              - generic: "01"
              - img [ref=e105]
              - generic [ref=e107]:
                - paragraph [ref=e108]: Step 01
                - heading "Connect Your Wallet" [level=3] [ref=e109]
                - paragraph [ref=e110]: Install Freighter and connect your Stellar wallet in one click. No sign-ups, no KYC — just your keys.
            - generic [ref=e111]:
              - generic: "02"
              - img [ref=e113]
              - generic [ref=e115]:
                - paragraph [ref=e116]: Step 02
                - heading "Discover Creators" [level=3] [ref=e117]
                - paragraph [ref=e118]: Browse verified creators across art, tech, music, and education. Filter by category, location, or popularity.
            - generic [ref=e119]:
              - generic: "03"
              - img [ref=e121]
              - generic [ref=e123]:
                - paragraph [ref=e124]: Step 03
                - heading "Send a Tip" [level=3] [ref=e125]
                - paragraph [ref=e126]: Choose an amount in XLM or your local currency. Tips arrive in seconds with near-zero fees on Stellar.
        - region "Meet the Community" [ref=e127]:
          - generic [ref=e128]:
            - generic [ref=e129]:
              - generic [ref=e130]: Top Creators
              - heading "Meet the Community" [level=2] [ref=e131]
              - paragraph [ref=e132]: Thousands of creators are earning on Stellar. Here are some of the most supported ones right now.
            - link "View all creators" [ref=e133]:
              - /url: /explore
              - button "View all creators" [ref=e134]:
                - text: View all creators
                - img [ref=e135]
          - generic [ref=e137]:
            - link "Protocol Dev Protocol Dev Verified tech · Chicago, US 16,000 XLM" [ref=e139]:
              - /url: /creator/protocol-dev
              - img "Protocol Dev" [ref=e141]
              - generic [ref=e142]:
                - generic [ref=e143]:
                  - generic [ref=e144]: Protocol Dev
                  - img "Verified" [ref=e145]
                - paragraph [ref=e147]: tech · Chicago, US
                - generic [ref=e148]:
                  - img [ref=e149]
                  - text: 16,000 XLM
              - img [ref=e151]
            - link "NFT Creator NFT Creator Verified art · Sydney, AU 15,000 XLM" [ref=e154]:
              - /url: /creator/nft-creator
              - img "NFT Creator" [ref=e156]
              - generic [ref=e157]:
                - generic [ref=e158]:
                  - generic [ref=e159]: NFT Creator
                  - img "Verified" [ref=e160]
                - paragraph [ref=e162]: art · Sydney, AU
                - generic [ref=e163]:
                  - img [ref=e164]
                  - text: 15,000 XLM
              - img [ref=e166]
            - link "Solidity Dev Solidity Dev Verified tech · San Francisco, US 14,500 XLM" [ref=e169]:
              - /url: /creator/solidity-dev
              - img "Solidity Dev" [ref=e171]
              - generic [ref=e172]:
                - generic [ref=e173]:
                  - generic [ref=e174]: Solidity Dev
                  - img "Verified" [ref=e175]
                - paragraph [ref=e177]: tech · San Francisco, US
                - generic [ref=e178]:
                  - img [ref=e179]
                  - text: 14,500 XLM
              - img [ref=e181]
            - link "Smart Contract Dev Smart Contract Dev Verified tech · Boston, US 14,000 XLM" [ref=e184]:
              - /url: /creator/smart-contract-dev
              - img "Smart Contract Dev" [ref=e186]
              - generic [ref=e187]:
                - generic [ref=e188]:
                  - generic [ref=e189]: Smart Contract Dev
                  - img "Verified" [ref=e190]
                - paragraph [ref=e192]: tech · Boston, US
                - generic [ref=e193]:
                  - img [ref=e194]
                  - text: 14,000 XLM
              - img [ref=e196]
            - link "GameFi Dev GameFi Dev Verified tech · Los Angeles, US 13,000 XLM" [ref=e199]:
              - /url: /creator/gamefi-dev
              - img "GameFi Dev" [ref=e201]
              - generic [ref=e202]:
                - generic [ref=e203]:
                  - generic [ref=e204]: GameFi Dev
                  - img "Verified" [ref=e205]
                - paragraph [ref=e207]: tech · Los Angeles, US
                - generic [ref=e208]:
                  - img [ref=e209]
                  - text: 13,000 XLM
              - img [ref=e211]
            - link "Stellar Dev Stellar Dev Verified tech · San Francisco, US 12,000 XLM" [ref=e214]:
              - /url: /creator/stellar-dev
              - img "Stellar Dev" [ref=e216]
              - generic [ref=e217]:
                - generic [ref=e218]:
                  - generic [ref=e219]: Stellar Dev
                  - img "Verified" [ref=e220]
                - paragraph [ref=e222]: tech · San Francisco, US
                - generic [ref=e223]:
                  - img [ref=e224]
                  - text: 12,000 XLM
              - img [ref=e226]
        - region "Loved by Creators Worldwide" [ref=e228]:
          - generic [ref=e229]:
            - generic [ref=e230]: Creator Stories
            - heading "Loved by Creators Worldwide" [level=2] [ref=e231]
            - paragraph [ref=e232]: From indie artists to open-source developers — here's what they say about tipping on Stellar.
          - generic [ref=e233]:
            - generic [ref=e234]:
              - generic "5 out of 5 stars" [ref=e235]:
                - img [ref=e236]
                - img [ref=e238]
                - img [ref=e240]
                - img [ref=e242]
                - img [ref=e244]
              - blockquote [ref=e246]: “Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.”
              - generic [ref=e247]:
                - generic [ref=e248]: AC
                - generic [ref=e249]:
                  - paragraph [ref=e250]: Alice Chen
                  - paragraph [ref=e251]: Digital Artist · Berlin
            - generic [ref=e252]:
              - generic "5 out of 5 stars" [ref=e253]:
                - img [ref=e254]
                - img [ref=e256]
                - img [ref=e258]
                - img [ref=e260]
                - img [ref=e262]
              - blockquote [ref=e264]: “As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.”
              - generic [ref=e265]:
                - generic [ref=e266]: MW
                - generic [ref=e267]:
                  - paragraph [ref=e268]: Marcus Webb
                  - paragraph [ref=e269]: Blockchain Developer · San Francisco
            - generic [ref=e270]:
              - generic "5 out of 5 stars" [ref=e271]:
                - img [ref=e272]
                - img [ref=e274]
                - img [ref=e276]
                - img [ref=e278]
                - img [ref=e280]
              - blockquote [ref=e282]: “I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.”
              - generic [ref=e283]:
                - generic [ref=e284]: YT
                - generic [ref=e285]:
                  - paragraph [ref=e286]: Yuki Tanaka
                  - paragraph [ref=e287]: Pixel Artist · Tokyo
            - generic [ref=e288]:
              - generic "5 out of 5 stars" [ref=e289]:
                - img [ref=e290]
                - img [ref=e292]
                - img [ref=e294]
                - img [ref=e296]
                - img [ref=e298]
              - blockquote [ref=e300]: “My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.”
              - generic [ref=e301]:
                - generic [ref=e302]: PN
                - generic [ref=e303]:
                  - paragraph [ref=e304]: Priya Nair
                  - paragraph [ref=e305]: Community Organizer · London
            - generic [ref=e306]:
              - generic "5 out of 5 stars" [ref=e307]:
                - img [ref=e308]
                - img [ref=e310]
                - img [ref=e312]
                - img [ref=e314]
                - img [ref=e316]
              - blockquote [ref=e318]: “The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.”
              - generic [ref=e319]:
                - generic [ref=e320]: JB
                - generic [ref=e321]:
                  - paragraph [ref=e322]: Jordan Blake
                  - paragraph [ref=e323]: Crypto Educator · New York
            - generic [ref=e324]:
              - generic "5 out of 5 stars" [ref=e325]:
                - img [ref=e326]
                - img [ref=e328]
                - img [ref=e330]
                - img [ref=e332]
                - img [ref=e334]
              - blockquote [ref=e336]: “Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.”
              - generic [ref=e337]:
                - generic [ref=e338]: ST
                - generic [ref=e339]:
                  - paragraph [ref=e340]: Sofia Torres
                  - paragraph [ref=e341]: Crypto Artist · Paris
        - region "Get started with Stellar TipJar" [ref=e342]:
          - generic [ref=e344]:
            - heading "Ready to start tipping?" [level=2] [ref=e345]
            - paragraph [ref=e346]: Join thousands of creators and supporters already using Stellar TipJar. Connect your Freighter wallet and send your first tip in under 60 seconds.
            - generic [ref=e347]:
              - link "Explore Creators" [ref=e348]:
                - /url: /explore
                - button "Explore Creators" [ref=e349]
              - link "Learn more" [ref=e350]:
                - /url: /tips
                - button "Learn more" [ref=e351]
    - contentinfo [ref=e352]:
      - generic [ref=e353]:
        - generic [ref=e354]:
          - generic [ref=e355]:
            - heading "About" [level=3] [ref=e356]
            - generic [ref=e357]:
              - paragraph [ref=e358]: Support creators with Stellar blockchain and easy cross-border tips.
              - paragraph [ref=e359]: Built for creators and fans, with a focus on privacy and low fees.
          - generic [ref=e360]:
            - heading "Quick Links" [level=3] [ref=e361]
            - generic [ref=e362]:
              - link "Explore" [ref=e363]:
                - /url: /explore
              - link "My Tips" [ref=e364]:
                - /url: /tips
              - link "Creator Profile" [ref=e365]:
                - /url: /creator
              - link "Settings" [ref=e366]:
                - /url: /settings
              - link "Help & FAQ" [ref=e367]:
                - /url: /help
          - generic [ref=e368]:
            - heading "Social" [level=3] [ref=e369]
            - generic [ref=e371]:
              - link "Twitter" [ref=e372]:
                - /url: https://twitter.com/stellar
                - img [ref=e373]
                - generic [ref=e375]: Twitter
              - link "GitHub" [ref=e376]:
                - /url: https://github.com/stellar
                - img [ref=e377]
                - generic [ref=e379]: GitHub
              - link "Discord" [ref=e380]:
                - /url: https://discord.com/invite/stellar
                - img [ref=e381]
                - generic [ref=e383]: Discord
          - generic [ref=e384]:
            - heading "Newsletter" [level=3] [ref=e385]
            - generic [ref=e387]:
              - paragraph [ref=e388]: Join our newsletter for creator tips and Stellar updates.
              - generic [ref=e389]:
                - generic [ref=e390]: Email address
                - textbox "Email address" [ref=e391]:
                  - /placeholder: Enter your email
                - button "Subscribe" [ref=e392]
        - generic [ref=e393]:
          - generic [ref=e394]:
            - paragraph [ref=e395]: © 2026 Stellar Tip Jar. MIT License.
            - generic [ref=e396]:
              - link "Privacy Policy" [ref=e397]:
                - /url: /privacy
              - generic [ref=e398]: •
              - link "Terms of Service" [ref=e399]:
                - /url: /terms
              - generic [ref=e400]: •
              - link "Sitemap" [ref=e401]:
                - /url: /sitemap.xml
          - button "Back to top" [ref=e402]:
            - img [ref=e403]
            - text: Back to top
  - generic [ref=e405]:
    - img [ref=e407]
    - button "Open Tanstack query devtools" [ref=e475] [cursor=pointer]:
      - img [ref=e476]
  - generic [ref=e544]:
    - img [ref=e546]
    - button "Open Tanstack query devtools" [ref=e614] [cursor=pointer]:
      - img [ref=e615]
  - generic [ref=e687] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e688]:
      - img [ref=e689]
    - generic [ref=e694]:
      - button "Open issues overlay" [ref=e695]:
        - generic [ref=e696]:
          - generic [ref=e697]: "1"
          - generic [ref=e698]: "2"
        - generic [ref=e699]:
          - text: Issue
          - generic [ref=e700]: s
      - button "Collapse issues badge" [ref=e701]:
        - img [ref=e702]
  - alert [ref=e706]
  - button "Skip tour" [ref=e707] [cursor=pointer]
  - 'dialog "Tour step 1 of 6: Navigation" [ref=e708]':
    - heading "Navigation" [level=3] [ref=e717]
    - paragraph [ref=e718]: Use the navbar to explore the app, access your wallet, and switch themes.
    - generic [ref=e719]:
      - button "Skip tour" [ref=e720]
      - button "Next →" [ref=e721]
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