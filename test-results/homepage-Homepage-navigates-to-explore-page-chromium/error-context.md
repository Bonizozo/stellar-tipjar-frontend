# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> Homepage >> navigates to explore page
- Location: tests/e2e/homepage.spec.ts:18:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /explore creators/i }).first()
    - locator resolved to <a href="/explore">…</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - <div role="button" aria-label="Skip tour" class="fixed inset-0 z-[9998] cursor-pointer"></div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 100ms
    55 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div role="button" aria-label="Skip tour" class="fixed inset-0 z-[9998] cursor-pointer"></div> intercepts pointer events
     - retrying click action
       - waiting 500ms

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
        - list [ref=e7]:
          - listitem [ref=e8]:
            - button "Explore" [ref=e10]:
              - text: Explore
              - img [ref=e11]
          - listitem [ref=e13]:
            - link "Tips" [ref=e14] [cursor=pointer]:
              - /url: /tips
          - listitem [ref=e15]:
            - link "Widgets" [ref=e16] [cursor=pointer]:
              - /url: /widgets
          - listitem [ref=e17]:
            - link "Help" [ref=e18] [cursor=pointer]:
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
              - link "Explore Creators" [ref=e57] [cursor=pointer]:
                - /url: /explore
                - button "Explore Creators" [ref=e58]:
                  - img [ref=e59]
                  - text: Explore Creators
              - link "Connect Wallet" [ref=e61] [cursor=pointer]:
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
            - link "View all creators" [ref=e133] [cursor=pointer]:
              - /url: /explore
              - button "View all creators" [ref=e134]:
                - text: View all creators
                - img [ref=e135]
          - generic [ref=e137]:
            - link "Protocol Dev Verified tech · Chicago, US 16,000 XLM" [ref=e139] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - generic [ref=e142]: PD
              - generic [ref=e143]:
                - generic [ref=e144]:
                  - generic [ref=e145]: Protocol Dev
                  - img "Verified" [ref=e146]
                - paragraph [ref=e148]: tech · Chicago, US
                - generic [ref=e149]:
                  - img [ref=e150]
                  - text: 16,000 XLM
              - img [ref=e152]
            - link "NFT Creator Verified art · Sydney, AU 15,000 XLM" [ref=e155] [cursor=pointer]:
              - /url: /creator/nft-creator
              - generic [ref=e158]: NC
              - generic [ref=e159]:
                - generic [ref=e160]:
                  - generic [ref=e161]: NFT Creator
                  - img "Verified" [ref=e162]
                - paragraph [ref=e164]: art · Sydney, AU
                - generic [ref=e165]:
                  - img [ref=e166]
                  - text: 15,000 XLM
              - img [ref=e168]
            - link "Solidity Dev Verified tech · San Francisco, US 14,500 XLM" [ref=e171] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - generic [ref=e174]: SD
              - generic [ref=e175]:
                - generic [ref=e176]:
                  - generic [ref=e177]: Solidity Dev
                  - img "Verified" [ref=e178]
                - paragraph [ref=e180]: tech · San Francisco, US
                - generic [ref=e181]:
                  - img [ref=e182]
                  - text: 14,500 XLM
              - img [ref=e184]
            - link "Smart Contract Dev Verified tech · Boston, US 14,000 XLM" [ref=e187] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - generic [ref=e190]: SC
              - generic [ref=e191]:
                - generic [ref=e192]:
                  - generic [ref=e193]: Smart Contract Dev
                  - img "Verified" [ref=e194]
                - paragraph [ref=e196]: tech · Boston, US
                - generic [ref=e197]:
                  - img [ref=e198]
                  - text: 14,000 XLM
              - img [ref=e200]
            - link "GameFi Dev Verified tech · Los Angeles, US 13,000 XLM" [ref=e203] [cursor=pointer]:
              - /url: /creator/gamefi-dev
              - generic [ref=e206]: GD
              - generic [ref=e207]:
                - generic [ref=e208]:
                  - generic [ref=e209]: GameFi Dev
                  - img "Verified" [ref=e210]
                - paragraph [ref=e212]: tech · Los Angeles, US
                - generic [ref=e213]:
                  - img [ref=e214]
                  - text: 13,000 XLM
              - img [ref=e216]
            - link "Stellar Dev Verified tech · San Francisco, US 12,000 XLM" [ref=e219] [cursor=pointer]:
              - /url: /creator/stellar-dev
              - generic [ref=e222]: SD
              - generic [ref=e223]:
                - generic [ref=e224]:
                  - generic [ref=e225]: Stellar Dev
                  - img "Verified" [ref=e226]
                - paragraph [ref=e228]: tech · San Francisco, US
                - generic [ref=e229]:
                  - img [ref=e230]
                  - text: 12,000 XLM
              - img [ref=e232]
        - region "Loved by Creators Worldwide" [ref=e234]:
          - generic [ref=e235]:
            - generic [ref=e236]: Creator Stories
            - heading "Loved by Creators Worldwide" [level=2] [ref=e237]
            - paragraph [ref=e238]: From indie artists to open-source developers — here's what they say about tipping on Stellar.
          - generic [ref=e239]:
            - generic [ref=e240]:
              - generic "5 out of 5 stars" [ref=e241]:
                - img [ref=e242]
                - img [ref=e244]
                - img [ref=e246]
                - img [ref=e248]
                - img [ref=e250]
              - blockquote [ref=e252]: “Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.”
              - generic [ref=e253]:
                - generic [ref=e254]: AC
                - generic [ref=e255]:
                  - paragraph [ref=e256]: Alice Chen
                  - paragraph [ref=e257]: Digital Artist · Berlin
            - generic [ref=e258]:
              - generic "5 out of 5 stars" [ref=e259]:
                - img [ref=e260]
                - img [ref=e262]
                - img [ref=e264]
                - img [ref=e266]
                - img [ref=e268]
              - blockquote [ref=e270]: “As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.”
              - generic [ref=e271]:
                - generic [ref=e272]: MW
                - generic [ref=e273]:
                  - paragraph [ref=e274]: Marcus Webb
                  - paragraph [ref=e275]: Blockchain Developer · San Francisco
            - generic [ref=e276]:
              - generic "5 out of 5 stars" [ref=e277]:
                - img [ref=e278]
                - img [ref=e280]
                - img [ref=e282]
                - img [ref=e284]
                - img [ref=e286]
              - blockquote [ref=e288]: “I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.”
              - generic [ref=e289]:
                - generic [ref=e290]: YT
                - generic [ref=e291]:
                  - paragraph [ref=e292]: Yuki Tanaka
                  - paragraph [ref=e293]: Pixel Artist · Tokyo
            - generic [ref=e294]:
              - generic "5 out of 5 stars" [ref=e295]:
                - img [ref=e296]
                - img [ref=e298]
                - img [ref=e300]
                - img [ref=e302]
                - img [ref=e304]
              - blockquote [ref=e306]: “My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.”
              - generic [ref=e307]:
                - generic [ref=e308]: PN
                - generic [ref=e309]:
                  - paragraph [ref=e310]: Priya Nair
                  - paragraph [ref=e311]: Community Organizer · London
            - generic [ref=e312]:
              - generic "5 out of 5 stars" [ref=e313]:
                - img [ref=e314]
                - img [ref=e316]
                - img [ref=e318]
                - img [ref=e320]
                - img [ref=e322]
              - blockquote [ref=e324]: “The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.”
              - generic [ref=e325]:
                - generic [ref=e326]: JB
                - generic [ref=e327]:
                  - paragraph [ref=e328]: Jordan Blake
                  - paragraph [ref=e329]: Crypto Educator · New York
            - generic [ref=e330]:
              - generic "5 out of 5 stars" [ref=e331]:
                - img [ref=e332]
                - img [ref=e334]
                - img [ref=e336]
                - img [ref=e338]
                - img [ref=e340]
              - blockquote [ref=e342]: “Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.”
              - generic [ref=e343]:
                - generic [ref=e344]: ST
                - generic [ref=e345]:
                  - paragraph [ref=e346]: Sofia Torres
                  - paragraph [ref=e347]: Crypto Artist · Paris
        - region "Get started with Stellar TipJar" [ref=e348]:
          - generic [ref=e350]:
            - heading "Ready to start tipping?" [level=2] [ref=e351]
            - paragraph [ref=e352]: Join thousands of creators and supporters already using Stellar TipJar. Connect your Freighter wallet and send your first tip in under 60 seconds.
            - generic [ref=e353]:
              - link "Explore Creators" [ref=e354] [cursor=pointer]:
                - /url: /explore
                - button "Explore Creators" [ref=e355]
              - link "Learn more" [ref=e356] [cursor=pointer]:
                - /url: /tips
                - button "Learn more" [ref=e357]
    - contentinfo [ref=e358]:
      - generic [ref=e359]:
        - generic [ref=e360]:
          - generic [ref=e361]:
            - heading "About" [level=3] [ref=e362]
            - generic [ref=e363]:
              - paragraph [ref=e364]: Support creators with Stellar blockchain and easy cross-border tips.
              - paragraph [ref=e365]: Built for creators and fans, with a focus on privacy and low fees.
          - generic [ref=e366]:
            - heading "Quick Links" [level=3] [ref=e367]
            - generic [ref=e368]:
              - link "Explore" [ref=e369] [cursor=pointer]:
                - /url: /explore
              - link "My Tips" [ref=e370] [cursor=pointer]:
                - /url: /tips
              - link "Creator Profile" [ref=e371] [cursor=pointer]:
                - /url: /creator
              - link "Settings" [ref=e372] [cursor=pointer]:
                - /url: /settings
              - link "Help & FAQ" [ref=e373] [cursor=pointer]:
                - /url: /help
          - generic [ref=e374]:
            - heading "Social" [level=3] [ref=e375]
            - generic [ref=e377]:
              - link "Twitter" [ref=e378] [cursor=pointer]:
                - /url: https://twitter.com/stellar
                - img [ref=e379]
                - generic [ref=e381]: Twitter
              - link "GitHub" [ref=e382] [cursor=pointer]:
                - /url: https://github.com/stellar
                - img [ref=e383]
                - generic [ref=e385]: GitHub
              - link "Discord" [ref=e386] [cursor=pointer]:
                - /url: https://discord.com/invite/stellar
                - img [ref=e387]
                - generic [ref=e389]: Discord
          - generic [ref=e390]:
            - heading "Newsletter" [level=3] [ref=e391]
            - generic [ref=e393]:
              - paragraph [ref=e394]: Join our newsletter for creator tips and Stellar updates.
              - generic [ref=e395]:
                - generic [ref=e396]: Email address
                - textbox "Email address" [ref=e397]:
                  - /placeholder: Enter your email
                - button "Subscribe" [ref=e398]
        - generic [ref=e399]:
          - generic [ref=e400]:
            - paragraph [ref=e401]: © 2026 Stellar Tip Jar. MIT License.
            - generic [ref=e402]:
              - link "Privacy Policy" [ref=e403] [cursor=pointer]:
                - /url: /privacy
              - generic [ref=e404]: •
              - link "Terms of Service" [ref=e405] [cursor=pointer]:
                - /url: /terms
              - generic [ref=e406]: •
              - link "Sitemap" [ref=e407] [cursor=pointer]:
                - /url: /sitemap.xml
          - button "Back to top" [ref=e408]:
            - img [ref=e409]
            - text: Back to top
  - generic [ref=e411]:
    - img [ref=e413]
    - button "Open Tanstack query devtools" [ref=e461] [cursor=pointer]:
      - img [ref=e462]
  - generic [ref=e510]:
    - img [ref=e512]
    - button "Open Tanstack query devtools" [ref=e560] [cursor=pointer]:
      - img [ref=e561]
  - generic [ref=e613] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e614]:
      - img [ref=e615]
    - generic [ref=e618]:
      - button "Open issues overlay" [ref=e619]:
        - generic [ref=e620]:
          - generic [ref=e621]: "1"
          - generic [ref=e622]: "2"
        - generic [ref=e623]:
          - text: Issue
          - generic [ref=e624]: s
      - button "Collapse issues badge" [ref=e625]:
        - img [ref=e626]
  - alert [ref=e630]
  - button "Skip tour" [ref=e631] [cursor=pointer]
  - 'dialog "Tour step 1 of 6: Navigation" [ref=e632]':
    - heading "Navigation" [level=3] [ref=e641]
    - paragraph [ref=e642]: Use the navbar to explore the app, access your wallet, and switch themes.
    - generic [ref=e643]:
      - button "Skip tour" [ref=e644]
      - button "Next →" [ref=e645]
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
  14 |     await expect(page.getByRole('link', { name: /explore creators/i })).toBeVisible()
  15 |     await expect(page.getByRole('link', { name: /send a tip/i })).toBeVisible()
  16 |   })
  17 | 
  18 |   test('navigates to explore page', async ({ page }) => {
> 19 |     await page.getByRole('link', { name: /explore creators/i }).first().click()
     |                                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  20 |     await expect(page).toHaveURL('/explore')
  21 |   })
  22 | })
  23 | 
```