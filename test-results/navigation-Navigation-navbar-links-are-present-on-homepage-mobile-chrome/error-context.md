# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> navbar links are present on homepage
- Location: tests/e2e/navigation.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('navigation')
Expected: visible
Error: strict mode violation: getByRole('navigation') resolved to 2 elements:
    1) <nav data-tour="navbar" aria-label="Main navigation" class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">…</nav> aka getByRole('navigation', { name: 'Main navigation' })
    2) <nav aria-label="Quick actions" class="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/10 bg-[color:var(--surface)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">…</nav> aka getByRole('navigation', { name: 'Quick actions' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('navigation')

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
          - generic [ref=e10]:
            - button "No new notifications" [ref=e11]:
              - img [ref=e12]
            - button "Mute notification sounds" [ref=e15]:
              - img [ref=e16]
          - button "Install Freighter" [ref=e21]
          - button "Open mobile menu" [ref=e22]:
            - img [ref=e23]
    - navigation "Quick actions" [ref=e25]:
      - link "Home" [ref=e26] [cursor=pointer]:
        - /url: /
        - img [ref=e27]
        - text: Home
      - link "Explore" [ref=e29] [cursor=pointer]:
        - /url: /explore
        - img [ref=e30]
        - text: Explore
      - link "Tip" [ref=e32] [cursor=pointer]:
        - /url: /tips
        - img [ref=e33]
        - text: Tip
      - button "Menu" [ref=e35]:
        - img [ref=e36]
        - text: Menu
    - main [ref=e38]:
      - generic [ref=e40]:
        - region "Support Creators with Stellar" [ref=e41]:
          - generic [ref=e44]:
            - generic [ref=e45]: Open Source · Powered by Stellar
            - heading "Support Creators with Stellar" [level=1] [ref=e47]
            - paragraph [ref=e48]: Fast, borderless, and fee-friendly tipping powered by the Stellar blockchain. Send direct support to your favourite creators in seconds — no banks, no borders.
            - generic [ref=e49]:
              - link "Explore Creators" [ref=e50] [cursor=pointer]:
                - /url: /explore
                - button "Explore Creators" [ref=e51]:
                  - img [ref=e52]
                  - text: Explore Creators
              - link "Connect Wallet" [ref=e54] [cursor=pointer]:
                - /url: /tips
                - button "Connect Wallet" [ref=e55]:
                  - img [ref=e56]
                  - text: Connect Wallet
            - paragraph [ref=e58]: Non-custodial · Your keys, your funds · Free to use
            - img [ref=e61]
        - region "Platform statistics" [ref=e64]:
          - generic [ref=e65]:
            - generic [ref=e66]:
              - img [ref=e68]
              - paragraph [ref=e70]: 18,000+
              - paragraph [ref=e71]: Tips Sent
            - generic [ref=e72]:
              - img [ref=e74]
              - paragraph [ref=e76]: 2,400+
              - paragraph [ref=e77]: Active Creators
            - generic [ref=e78]:
              - img [ref=e80]
              - paragraph [ref=e82]: 500K+
              - paragraph [ref=e83]: XLM Distributed
            - generic [ref=e84]:
              - img [ref=e86]
              - paragraph [ref=e88]: 150+
              - paragraph [ref=e89]: Countries Reached
        - region "How Stellar TipJar Works" [ref=e90]:
          - generic [ref=e91]:
            - generic [ref=e92]: Simple as 1-2-3
            - heading "How Stellar TipJar Works" [level=2] [ref=e93]
            - paragraph [ref=e94]: No middlemen. No delays. Just direct, borderless support for the creators you love.
          - generic [ref=e95]:
            - generic [ref=e96]:
              - generic: "01"
              - img [ref=e98]
              - generic [ref=e100]:
                - paragraph [ref=e101]: Step 01
                - heading "Connect Your Wallet" [level=3] [ref=e102]
                - paragraph [ref=e103]: Install Freighter and connect your Stellar wallet in one click. No sign-ups, no KYC — just your keys.
            - generic [ref=e104]:
              - generic: "02"
              - img [ref=e106]
              - generic [ref=e108]:
                - paragraph [ref=e109]: Step 02
                - heading "Discover Creators" [level=3] [ref=e110]
                - paragraph [ref=e111]: Browse verified creators across art, tech, music, and education. Filter by category, location, or popularity.
            - generic [ref=e112]:
              - generic: "03"
              - img [ref=e114]
              - generic [ref=e116]:
                - paragraph [ref=e117]: Step 03
                - heading "Send a Tip" [level=3] [ref=e118]
                - paragraph [ref=e119]: Choose an amount in XLM or your local currency. Tips arrive in seconds with near-zero fees on Stellar.
        - region "Meet the Community" [ref=e120]:
          - generic [ref=e121]:
            - generic [ref=e122]:
              - generic [ref=e123]: Top Creators
              - heading "Meet the Community" [level=2] [ref=e124]
              - paragraph [ref=e125]: Thousands of creators are earning on Stellar. Here are some of the most supported ones right now.
            - link "View all creators" [ref=e126] [cursor=pointer]:
              - /url: /explore
              - button "View all creators" [ref=e127]:
                - text: View all creators
                - img [ref=e128]
          - generic [ref=e130]:
            - link "Protocol Dev Protocol Dev Verified tech · Chicago, US 16,000 XLM" [ref=e132] [cursor=pointer]:
              - /url: /creator/protocol-dev
              - img "Protocol Dev" [ref=e134]
              - generic [ref=e135]:
                - generic [ref=e136]:
                  - generic [ref=e137]: Protocol Dev
                  - img "Verified" [ref=e138]
                - paragraph [ref=e140]: tech · Chicago, US
                - generic [ref=e141]:
                  - img [ref=e142]
                  - text: 16,000 XLM
              - img [ref=e144]
            - link "NFT Creator NFT Creator Verified art · Sydney, AU 15,000 XLM" [ref=e147] [cursor=pointer]:
              - /url: /creator/nft-creator
              - img "NFT Creator" [ref=e149]
              - generic [ref=e150]:
                - generic [ref=e151]:
                  - generic [ref=e152]: NFT Creator
                  - img "Verified" [ref=e153]
                - paragraph [ref=e155]: art · Sydney, AU
                - generic [ref=e156]:
                  - img [ref=e157]
                  - text: 15,000 XLM
              - img [ref=e159]
            - link "Solidity Dev Solidity Dev Verified tech · San Francisco, US 14,500 XLM" [ref=e162] [cursor=pointer]:
              - /url: /creator/solidity-dev
              - img "Solidity Dev" [ref=e164]
              - generic [ref=e165]:
                - generic [ref=e166]:
                  - generic [ref=e167]: Solidity Dev
                  - img "Verified" [ref=e168]
                - paragraph [ref=e170]: tech · San Francisco, US
                - generic [ref=e171]:
                  - img [ref=e172]
                  - text: 14,500 XLM
              - img [ref=e174]
            - link "Smart Contract Dev Smart Contract Dev Verified tech · Boston, US 14,000 XLM" [ref=e177] [cursor=pointer]:
              - /url: /creator/smart-contract-dev
              - img "Smart Contract Dev" [ref=e179]
              - generic [ref=e180]:
                - generic [ref=e181]:
                  - generic [ref=e182]: Smart Contract Dev
                  - img "Verified" [ref=e183]
                - paragraph [ref=e185]: tech · Boston, US
                - generic [ref=e186]:
                  - img [ref=e187]
                  - text: 14,000 XLM
              - img [ref=e189]
            - link "GameFi Dev GameFi Dev Verified tech · Los Angeles, US 13,000 XLM" [ref=e192] [cursor=pointer]:
              - /url: /creator/gamefi-dev
              - img "GameFi Dev" [ref=e194]
              - generic [ref=e195]:
                - generic [ref=e196]:
                  - generic [ref=e197]: GameFi Dev
                  - img "Verified" [ref=e198]
                - paragraph [ref=e200]: tech · Los Angeles, US
                - generic [ref=e201]:
                  - img [ref=e202]
                  - text: 13,000 XLM
              - img [ref=e204]
            - link "Stellar Dev Stellar Dev Verified tech · San Francisco, US 12,000 XLM" [ref=e207] [cursor=pointer]:
              - /url: /creator/stellar-dev
              - img "Stellar Dev" [ref=e209]
              - generic [ref=e210]:
                - generic [ref=e211]:
                  - generic [ref=e212]: Stellar Dev
                  - img "Verified" [ref=e213]
                - paragraph [ref=e215]: tech · San Francisco, US
                - generic [ref=e216]:
                  - img [ref=e217]
                  - text: 12,000 XLM
              - img [ref=e219]
        - region "Loved by Creators Worldwide" [ref=e221]:
          - generic [ref=e222]:
            - generic [ref=e223]: Creator Stories
            - heading "Loved by Creators Worldwide" [level=2] [ref=e224]
            - paragraph [ref=e225]: From indie artists to open-source developers — here's what they say about tipping on Stellar.
          - generic [ref=e226]:
            - generic [ref=e227]:
              - generic "5 out of 5 stars" [ref=e228]:
                - img [ref=e229]
                - img [ref=e231]
                - img [ref=e233]
                - img [ref=e235]
                - img [ref=e237]
              - blockquote [ref=e239]: “Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.”
              - generic [ref=e240]:
                - generic [ref=e241]: AC
                - generic [ref=e242]:
                  - paragraph [ref=e243]: Alice Chen
                  - paragraph [ref=e244]: Digital Artist · Berlin
            - generic [ref=e245]:
              - generic "5 out of 5 stars" [ref=e246]:
                - img [ref=e247]
                - img [ref=e249]
                - img [ref=e251]
                - img [ref=e253]
                - img [ref=e255]
              - blockquote [ref=e257]: “As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.”
              - generic [ref=e258]:
                - generic [ref=e259]: MW
                - generic [ref=e260]:
                  - paragraph [ref=e261]: Marcus Webb
                  - paragraph [ref=e262]: Blockchain Developer · San Francisco
            - generic [ref=e263]:
              - generic "5 out of 5 stars" [ref=e264]:
                - img [ref=e265]
                - img [ref=e267]
                - img [ref=e269]
                - img [ref=e271]
                - img [ref=e273]
              - blockquote [ref=e275]: “I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.”
              - generic [ref=e276]:
                - generic [ref=e277]: YT
                - generic [ref=e278]:
                  - paragraph [ref=e279]: Yuki Tanaka
                  - paragraph [ref=e280]: Pixel Artist · Tokyo
            - generic [ref=e281]:
              - generic "5 out of 5 stars" [ref=e282]:
                - img [ref=e283]
                - img [ref=e285]
                - img [ref=e287]
                - img [ref=e289]
                - img [ref=e291]
              - blockquote [ref=e293]: “My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.”
              - generic [ref=e294]:
                - generic [ref=e295]: PN
                - generic [ref=e296]:
                  - paragraph [ref=e297]: Priya Nair
                  - paragraph [ref=e298]: Community Organizer · London
            - generic [ref=e299]:
              - generic "5 out of 5 stars" [ref=e300]:
                - img [ref=e301]
                - img [ref=e303]
                - img [ref=e305]
                - img [ref=e307]
                - img [ref=e309]
              - blockquote [ref=e311]: “The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.”
              - generic [ref=e312]:
                - generic [ref=e313]: JB
                - generic [ref=e314]:
                  - paragraph [ref=e315]: Jordan Blake
                  - paragraph [ref=e316]: Crypto Educator · New York
            - generic [ref=e317]:
              - generic "5 out of 5 stars" [ref=e318]:
                - img [ref=e319]
                - img [ref=e321]
                - img [ref=e323]
                - img [ref=e325]
                - img [ref=e327]
              - blockquote [ref=e329]: “Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.”
              - generic [ref=e330]:
                - generic [ref=e331]: ST
                - generic [ref=e332]:
                  - paragraph [ref=e333]: Sofia Torres
                  - paragraph [ref=e334]: Crypto Artist · Paris
        - region "Get started with Stellar TipJar" [ref=e335]:
          - generic [ref=e337]:
            - heading "Ready to start tipping?" [level=2] [ref=e338]
            - paragraph [ref=e339]: Join thousands of creators and supporters already using Stellar TipJar. Connect your Freighter wallet and send your first tip in under 60 seconds.
            - generic [ref=e340]:
              - link "Explore Creators" [ref=e341] [cursor=pointer]:
                - /url: /explore
                - button "Explore Creators" [ref=e342]
              - link "Learn more" [ref=e343] [cursor=pointer]:
                - /url: /tips
                - button "Learn more" [ref=e344]
    - contentinfo [ref=e345]:
      - generic [ref=e346]:
        - generic [ref=e347]:
          - generic [ref=e348]:
            - heading "About" [level=3] [ref=e349]
            - generic [ref=e350]:
              - paragraph [ref=e351]: Support creators with Stellar blockchain and easy cross-border tips.
              - paragraph [ref=e352]: Built for creators and fans, with a focus on privacy and low fees.
          - generic [ref=e353]:
            - heading "Quick Links" [level=3] [ref=e354]
            - generic [ref=e355]:
              - link "Explore" [ref=e356] [cursor=pointer]:
                - /url: /explore
              - link "My Tips" [ref=e357] [cursor=pointer]:
                - /url: /tips
              - link "Creator Profile" [ref=e358] [cursor=pointer]:
                - /url: /creator
              - link "Settings" [ref=e359] [cursor=pointer]:
                - /url: /settings
              - link "Help & FAQ" [ref=e360] [cursor=pointer]:
                - /url: /help
          - generic [ref=e361]:
            - heading "Social" [level=3] [ref=e362]
            - generic [ref=e364]:
              - link "Twitter" [ref=e365] [cursor=pointer]:
                - /url: https://twitter.com/stellar
                - img [ref=e366]
                - generic [ref=e368]: Twitter
              - link "GitHub" [ref=e369] [cursor=pointer]:
                - /url: https://github.com/stellar
                - img [ref=e370]
                - generic [ref=e372]: GitHub
              - link "Discord" [ref=e373] [cursor=pointer]:
                - /url: https://discord.com/invite/stellar
                - img [ref=e374]
                - generic [ref=e376]: Discord
          - generic [ref=e377]:
            - heading "Newsletter" [level=3] [ref=e378]
            - generic [ref=e380]:
              - paragraph [ref=e381]: Join our newsletter for creator tips and Stellar updates.
              - generic [ref=e382]:
                - generic [ref=e383]: Email address
                - textbox "Email address" [ref=e384]:
                  - /placeholder: Enter your email
                - button "Subscribe" [ref=e385]
        - generic [ref=e386]:
          - generic [ref=e387]:
            - paragraph [ref=e388]: © 2026 Stellar Tip Jar. MIT License.
            - generic [ref=e389]:
              - link "Privacy Policy" [ref=e390] [cursor=pointer]:
                - /url: /privacy
              - generic [ref=e391]: •
              - link "Terms of Service" [ref=e392] [cursor=pointer]:
                - /url: /terms
              - generic [ref=e393]: •
              - link "Sitemap" [ref=e394] [cursor=pointer]:
                - /url: /sitemap.xml
          - button "Back to top" [ref=e395]:
            - img [ref=e396]
            - text: Back to top
  - button "Open Next.js Dev Tools" [ref=e403] [cursor=pointer]:
    - img [ref=e404]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Navigation', () => {
  4  |   test('navbar links are present on homepage', async ({ page }) => {
  5  |     await page.goto('/')
> 6  |     await expect(page.getByRole('navigation')).toBeVisible()
     |                                                ^ Error: expect(locator).toBeVisible() failed
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
  17 |     await page.getByRole('link', { name: /send a tip/i }).first().click()
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