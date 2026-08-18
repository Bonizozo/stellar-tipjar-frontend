# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> Homepage >> has working navigation links
- Location: tests/e2e/homepage.spec.ts:13:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /explore creators/i })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /explore creators/i }) resolved to 2 elements:
    1) <a href="/explore">…</a> aka getByLabel('Support Creatorswith Stellar').getByRole('link', { name: 'Explore Creators' })
    2) <a href="/explore">…</a> aka getByLabel('Get started with Stellar').getByRole('link', { name: 'Explore Creators' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /explore creators/i })

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
          - generic [ref=e31]:
            - button "No new notifications" [ref=e32]:
              - img [ref=e33]
            - button "Mute notification sounds" [ref=e36]:
              - img [ref=e37]
          - button "Install Freighter" [ref=e42]
    - main [ref=e43]:
      - generic [ref=e45]:
        - region "Support Creators with Stellar" [ref=e46]:
          - generic [ref=e49]:
            - generic [ref=e50]: Open Source · Powered by Stellar
            - heading "Support Creators with Stellar" [level=1] [ref=e52]:
              - text: Support Creators
              - text: with Stellar
            - paragraph [ref=e53]: Fast, borderless, and fee-friendly tipping powered by the Stellar blockchain. Send direct support to your favourite creators in seconds — no banks, no borders.
            - generic [ref=e54]:
              - link "Explore Creators" [ref=e55]:
                - /url: /explore
                - button "Explore Creators" [ref=e56]:
                  - img [ref=e57]
                  - text: Explore Creators
              - link "Connect Wallet" [ref=e59]:
                - /url: /tips
                - button "Connect Wallet" [ref=e60]:
                  - img [ref=e61]
                  - text: Connect Wallet
            - paragraph [ref=e63]: Non-custodial · Your keys, your funds · Free to use
            - img [ref=e66]
        - region "Platform statistics" [ref=e69]:
          - generic [ref=e70]:
            - generic [ref=e71]:
              - img [ref=e73]
              - paragraph [ref=e75]: 18,000+
              - paragraph [ref=e76]: Tips Sent
            - generic [ref=e77]:
              - img [ref=e79]
              - paragraph [ref=e81]: 2,400+
              - paragraph [ref=e82]: Active Creators
            - generic [ref=e83]:
              - img [ref=e85]
              - paragraph [ref=e87]: 500K+
              - paragraph [ref=e88]: XLM Distributed
            - generic [ref=e89]:
              - img [ref=e91]
              - paragraph [ref=e93]: 150+
              - paragraph [ref=e94]: Countries Reached
        - region "How Stellar TipJar Works" [ref=e95]:
          - generic [ref=e96]:
            - generic [ref=e97]: Simple as 1-2-3
            - heading "How Stellar TipJar Works" [level=2] [ref=e98]
            - paragraph [ref=e99]: No middlemen. No delays. Just direct, borderless support for the creators you love.
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic: "01"
              - img [ref=e103]
              - generic [ref=e105]:
                - paragraph [ref=e106]: Step 01
                - heading "Connect Your Wallet" [level=3] [ref=e107]
                - paragraph [ref=e108]: Install Freighter and connect your Stellar wallet in one click. No sign-ups, no KYC — just your keys.
            - generic [ref=e109]:
              - generic: "02"
              - img [ref=e111]
              - generic [ref=e113]:
                - paragraph [ref=e114]: Step 02
                - heading "Discover Creators" [level=3] [ref=e115]
                - paragraph [ref=e116]: Browse verified creators across art, tech, music, and education. Filter by category, location, or popularity.
            - generic [ref=e117]:
              - generic: "03"
              - img [ref=e119]
              - generic [ref=e121]:
                - paragraph [ref=e122]: Step 03
                - heading "Send a Tip" [level=3] [ref=e123]
                - paragraph [ref=e124]: Choose an amount in XLM or your local currency. Tips arrive in seconds with near-zero fees on Stellar.
        - region "Meet the Community" [ref=e125]:
          - generic [ref=e126]:
            - generic [ref=e127]:
              - generic [ref=e128]: Top Creators
              - heading "Meet the Community" [level=2] [ref=e129]
              - paragraph [ref=e130]: Thousands of creators are earning on Stellar. Here are some of the most supported ones right now.
            - link "View all creators" [ref=e131]:
              - /url: /explore
              - button "View all creators" [ref=e132]:
                - text: View all creators
                - img [ref=e133]
          - generic [ref=e135]:
            - link "Protocol Dev Protocol Dev Verified tech · Chicago, US 16,000 XLM" [ref=e137]:
              - /url: /creator/protocol-dev
              - img "Protocol Dev" [ref=e139]
              - generic [ref=e140]:
                - generic [ref=e141]:
                  - generic [ref=e142]: Protocol Dev
                  - img "Verified" [ref=e143]
                - paragraph [ref=e145]: tech · Chicago, US
                - generic [ref=e146]:
                  - img [ref=e147]
                  - text: 16,000 XLM
              - img [ref=e149]
            - link "NFT Creator NFT Creator Verified art · Sydney, AU 15,000 XLM" [ref=e152]:
              - /url: /creator/nft-creator
              - img "NFT Creator" [ref=e154]
              - generic [ref=e155]:
                - generic [ref=e156]:
                  - generic [ref=e157]: NFT Creator
                  - img "Verified" [ref=e158]
                - paragraph [ref=e160]: art · Sydney, AU
                - generic [ref=e161]:
                  - img [ref=e162]
                  - text: 15,000 XLM
              - img [ref=e164]
            - link "Solidity Dev Solidity Dev Verified tech · San Francisco, US 14,500 XLM" [ref=e167]:
              - /url: /creator/solidity-dev
              - img "Solidity Dev" [ref=e169]
              - generic [ref=e170]:
                - generic [ref=e171]:
                  - generic [ref=e172]: Solidity Dev
                  - img "Verified" [ref=e173]
                - paragraph [ref=e175]: tech · San Francisco, US
                - generic [ref=e176]:
                  - img [ref=e177]
                  - text: 14,500 XLM
              - img [ref=e179]
            - link "Smart Contract Dev Smart Contract Dev Verified tech · Boston, US 14,000 XLM" [ref=e182]:
              - /url: /creator/smart-contract-dev
              - img "Smart Contract Dev" [ref=e184]
              - generic [ref=e185]:
                - generic [ref=e186]:
                  - generic [ref=e187]: Smart Contract Dev
                  - img "Verified" [ref=e188]
                - paragraph [ref=e190]: tech · Boston, US
                - generic [ref=e191]:
                  - img [ref=e192]
                  - text: 14,000 XLM
              - img [ref=e194]
            - link "GameFi Dev GameFi Dev Verified tech · Los Angeles, US 13,000 XLM" [ref=e197]:
              - /url: /creator/gamefi-dev
              - img "GameFi Dev" [ref=e199]
              - generic [ref=e200]:
                - generic [ref=e201]:
                  - generic [ref=e202]: GameFi Dev
                  - img "Verified" [ref=e203]
                - paragraph [ref=e205]: tech · Los Angeles, US
                - generic [ref=e206]:
                  - img [ref=e207]
                  - text: 13,000 XLM
              - img [ref=e209]
            - link "Stellar Dev Stellar Dev Verified tech · San Francisco, US 12,000 XLM" [ref=e212]:
              - /url: /creator/stellar-dev
              - img "Stellar Dev" [ref=e214]
              - generic [ref=e215]:
                - generic [ref=e216]:
                  - generic [ref=e217]: Stellar Dev
                  - img "Verified" [ref=e218]
                - paragraph [ref=e220]: tech · San Francisco, US
                - generic [ref=e221]:
                  - img [ref=e222]
                  - text: 12,000 XLM
              - img [ref=e224]
        - region "Loved by Creators Worldwide" [ref=e226]:
          - generic [ref=e227]:
            - generic [ref=e228]: Creator Stories
            - heading "Loved by Creators Worldwide" [level=2] [ref=e229]
            - paragraph [ref=e230]: From indie artists to open-source developers — here's what they say about tipping on Stellar.
          - generic [ref=e231]:
            - generic [ref=e232]:
              - generic "5 out of 5 stars" [ref=e233]:
                - img [ref=e234]
                - img [ref=e236]
                - img [ref=e238]
                - img [ref=e240]
                - img [ref=e242]
              - blockquote [ref=e244]: “Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.”
              - generic [ref=e245]:
                - generic [ref=e246]: AC
                - generic [ref=e247]:
                  - paragraph [ref=e248]: Alice Chen
                  - paragraph [ref=e249]: Digital Artist · Berlin
            - generic [ref=e250]:
              - generic "5 out of 5 stars" [ref=e251]:
                - img [ref=e252]
                - img [ref=e254]
                - img [ref=e256]
                - img [ref=e258]
                - img [ref=e260]
              - blockquote [ref=e262]: “As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.”
              - generic [ref=e263]:
                - generic [ref=e264]: MW
                - generic [ref=e265]:
                  - paragraph [ref=e266]: Marcus Webb
                  - paragraph [ref=e267]: Blockchain Developer · San Francisco
            - generic [ref=e268]:
              - generic "5 out of 5 stars" [ref=e269]:
                - img [ref=e270]
                - img [ref=e272]
                - img [ref=e274]
                - img [ref=e276]
                - img [ref=e278]
              - blockquote [ref=e280]: “I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.”
              - generic [ref=e281]:
                - generic [ref=e282]: YT
                - generic [ref=e283]:
                  - paragraph [ref=e284]: Yuki Tanaka
                  - paragraph [ref=e285]: Pixel Artist · Tokyo
            - generic [ref=e286]:
              - generic "5 out of 5 stars" [ref=e287]:
                - img [ref=e288]
                - img [ref=e290]
                - img [ref=e292]
                - img [ref=e294]
                - img [ref=e296]
              - blockquote [ref=e298]: “My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.”
              - generic [ref=e299]:
                - generic [ref=e300]: PN
                - generic [ref=e301]:
                  - paragraph [ref=e302]: Priya Nair
                  - paragraph [ref=e303]: Community Organizer · London
            - generic [ref=e304]:
              - generic "5 out of 5 stars" [ref=e305]:
                - img [ref=e306]
                - img [ref=e308]
                - img [ref=e310]
                - img [ref=e312]
                - img [ref=e314]
              - blockquote [ref=e316]: “The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.”
              - generic [ref=e317]:
                - generic [ref=e318]: JB
                - generic [ref=e319]:
                  - paragraph [ref=e320]: Jordan Blake
                  - paragraph [ref=e321]: Crypto Educator · New York
            - generic [ref=e322]:
              - generic "5 out of 5 stars" [ref=e323]:
                - img [ref=e324]
                - img [ref=e326]
                - img [ref=e328]
                - img [ref=e330]
                - img [ref=e332]
              - blockquote [ref=e334]: “Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.”
              - generic [ref=e335]:
                - generic [ref=e336]: ST
                - generic [ref=e337]:
                  - paragraph [ref=e338]: Sofia Torres
                  - paragraph [ref=e339]: Crypto Artist · Paris
        - region "Get started with Stellar TipJar" [ref=e340]:
          - generic [ref=e342]:
            - heading "Ready to start tipping?" [level=2] [ref=e343]
            - paragraph [ref=e344]: Join thousands of creators and supporters already using Stellar TipJar. Connect your Freighter wallet and send your first tip in under 60 seconds.
            - generic [ref=e345]:
              - link "Explore Creators" [ref=e346]:
                - /url: /explore
                - button "Explore Creators" [ref=e347]
              - link "Learn more" [ref=e348]:
                - /url: /tips
                - button "Learn more" [ref=e349]
    - contentinfo [ref=e350]:
      - generic [ref=e351]:
        - generic [ref=e352]:
          - generic [ref=e353]:
            - heading "About" [level=3] [ref=e354]
            - generic [ref=e355]:
              - paragraph [ref=e356]: Support creators with Stellar blockchain and easy cross-border tips.
              - paragraph [ref=e357]: Built for creators and fans, with a focus on privacy and low fees.
          - generic [ref=e358]:
            - heading "Quick Links" [level=3] [ref=e359]
            - generic [ref=e360]:
              - link "Explore" [ref=e361]:
                - /url: /explore
              - link "My Tips" [ref=e362]:
                - /url: /tips
              - link "Creator Profile" [ref=e363]:
                - /url: /creator
              - link "Settings" [ref=e364]:
                - /url: /settings
              - link "Help & FAQ" [ref=e365]:
                - /url: /help
          - generic [ref=e366]:
            - heading "Social" [level=3] [ref=e367]
            - generic [ref=e369]:
              - link "Twitter" [ref=e370]:
                - /url: https://twitter.com/stellar
                - img [ref=e371]
                - generic [ref=e373]: Twitter
              - link "GitHub" [ref=e374]:
                - /url: https://github.com/stellar
                - img [ref=e375]
                - generic [ref=e377]: GitHub
              - link "Discord" [ref=e378]:
                - /url: https://discord.com/invite/stellar
                - img [ref=e379]
                - generic [ref=e381]: Discord
          - generic [ref=e382]:
            - heading "Newsletter" [level=3] [ref=e383]
            - generic [ref=e385]:
              - paragraph [ref=e386]: Join our newsletter for creator tips and Stellar updates.
              - generic [ref=e387]:
                - generic [ref=e388]: Email address
                - textbox "Email address" [ref=e389]:
                  - /placeholder: Enter your email
                - button "Subscribe" [ref=e390]
        - generic [ref=e391]:
          - generic [ref=e392]:
            - paragraph [ref=e393]: © 2026 Stellar Tip Jar. MIT License.
            - generic [ref=e394]:
              - link "Privacy Policy" [ref=e395]:
                - /url: /privacy
              - generic [ref=e396]: •
              - link "Terms of Service" [ref=e397]:
                - /url: /terms
              - generic [ref=e398]: •
              - link "Sitemap" [ref=e399]:
                - /url: /sitemap.xml
          - button "Back to top" [ref=e400]:
            - img [ref=e401]
            - text: Back to top
  - button "Open Next.js Dev Tools" [ref=e408] [cursor=pointer]:
    - img [ref=e409]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Homepage', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/')
  6  |   })
  7  | 
  8  |   test('renders hero section', async ({ page }) => {
  9  |     await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  10 |     await expect(page.getByText(/stellar tip jar/i).first()).toBeVisible()
  11 |   })
  12 | 
  13 |   test('has working navigation links', async ({ page }) => {
> 14 |     await expect(page.getByRole('link', { name: /explore creators/i })).toBeVisible()
     |                                                                         ^ Error: expect(locator).toBeVisible() failed
  15 |     await expect(page.getByRole('link', { name: /send a tip/i })).toBeVisible()
  16 |   })
  17 | 
  18 |   test('navigates to explore page', async ({ page }) => {
  19 |     await page.getByRole('link', { name: /explore creators/i }).first().click()
  20 |     await expect(page).toHaveURL('/explore')
  21 |   })
  22 | })
  23 | 
```