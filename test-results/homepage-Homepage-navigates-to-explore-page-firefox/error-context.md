# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> Homepage >> navigates to explore page
- Location: tests/e2e/homepage.spec.ts:18:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/explore"
Received: "http://localhost:3000/"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    10 × unexpected value "http://localhost:3000/"

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- banner:
  - navigation "Main navigation":
    - link "Stellar Tip Jar — home":
      - /url: /
      - text: Stellar Tip Jar
    - list:
      - listitem:
        - button "Explore"
      - listitem:
        - link "Tips":
          - /url: /tips
      - listitem:
        - link "Widgets":
          - /url: /widgets
      - listitem:
        - link "Help":
          - /url: /help
    - search:
      - text: Search
      - searchbox "Search"
    - text: Display Currency
    - combobox "Display Currency":
      - option "USD - US Dollar" [selected]
      - option "EUR - Euro"
      - option "NGN - Nigerian Naira"
      - option "GBP - British Pound"
    - combobox "Select language":
      - option "🇬🇧 English" [selected]
      - option "🇪🇸 Español"
      - option "🇫🇷 Français"
      - option "🇨🇳 中文"
      - option "🇸🇦 العربية"
    - button "Switch to dark mode"
    - button "No new notifications"
    - button "Mute notification sounds"
    - button "Install Freighter"
- main:
  - region "Support Creators with Stellar":
    - text: Open Source · Powered by Stellar
    - heading "Support Creators with Stellar" [level=1]
    - paragraph: Fast, borderless, and fee-friendly tipping powered by the Stellar blockchain. Send direct support to your favourite creators in seconds — no banks, no borders.
    - link "Explore Creators":
      - /url: /explore
      - button "Explore Creators"
    - link "Connect Wallet":
      - /url: /tips
      - button "Connect Wallet"
    - paragraph: Non-custodial · Your keys, your funds · Free to use
  - region "Platform statistics":
    - paragraph: 18,000+
    - paragraph: Tips Sent
    - paragraph: 2,400+
    - paragraph: Active Creators
    - paragraph: 500K+
    - paragraph: XLM Distributed
    - paragraph: 150+
    - paragraph: Countries Reached
  - region "How Stellar TipJar Works":
    - text: Simple as 1-2-3
    - heading "How Stellar TipJar Works" [level=2]
    - paragraph: No middlemen. No delays. Just direct, borderless support for the creators you love.
    - paragraph: Step 01
    - heading "Connect Your Wallet" [level=3]
    - paragraph: Install Freighter and connect your Stellar wallet in one click. No sign-ups, no KYC — just your keys.
    - paragraph: Step 02
    - heading "Discover Creators" [level=3]
    - paragraph: Browse verified creators across art, tech, music, and education. Filter by category, location, or popularity.
    - paragraph: Step 03
    - heading "Send a Tip" [level=3]
    - paragraph: Choose an amount in XLM or your local currency. Tips arrive in seconds with near-zero fees on Stellar.
  - region "Meet the Community":
    - text: Top Creators
    - heading "Meet the Community" [level=2]
    - paragraph: Thousands of creators are earning on Stellar. Here are some of the most supported ones right now.
    - link "View all creators":
      - /url: /explore
      - button "View all creators"
    - link "Protocol Dev Protocol Dev Verified tech · Chicago, US 16,000 XLM":
      - /url: /creator/protocol-dev
      - img "Protocol Dev"
      - text: Protocol Dev
      - img "Verified"
      - paragraph: tech · Chicago, US
      - text: 16,000 XLM
    - link "NFT Creator NFT Creator Verified art · Sydney, AU 15,000 XLM":
      - /url: /creator/nft-creator
      - img "NFT Creator"
      - text: NFT Creator
      - img "Verified"
      - paragraph: art · Sydney, AU
      - text: 15,000 XLM
    - link "Solidity Dev Solidity Dev Verified tech · San Francisco, US 14,500 XLM":
      - /url: /creator/solidity-dev
      - img "Solidity Dev"
      - text: Solidity Dev
      - img "Verified"
      - paragraph: tech · San Francisco, US
      - text: 14,500 XLM
    - link "Smart Contract Dev Smart Contract Dev Verified tech · Boston, US 14,000 XLM":
      - /url: /creator/smart-contract-dev
      - img "Smart Contract Dev"
      - text: Smart Contract Dev
      - img "Verified"
      - paragraph: tech · Boston, US
      - text: 14,000 XLM
    - link "GameFi Dev GameFi Dev Verified tech · Los Angeles, US 13,000 XLM":
      - /url: /creator/gamefi-dev
      - img "GameFi Dev"
      - text: GameFi Dev
      - img "Verified"
      - paragraph: tech · Los Angeles, US
      - text: 13,000 XLM
    - link "Stellar Dev Stellar Dev Verified tech · San Francisco, US 12,000 XLM":
      - /url: /creator/stellar-dev
      - img "Stellar Dev"
      - text: Stellar Dev
      - img "Verified"
      - paragraph: tech · San Francisco, US
      - text: 12,000 XLM
  - region "Loved by Creators Worldwide":
    - text: Creator Stories
    - heading "Loved by Creators Worldwide" [level=2]
    - paragraph: From indie artists to open-source developers — here's what they say about tipping on Stellar.
    - blockquote: “Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.”
    - paragraph: Alice Chen
    - paragraph: Digital Artist · Berlin
    - blockquote: “As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.”
    - paragraph: Marcus Webb
    - paragraph: Blockchain Developer · San Francisco
    - blockquote: “I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.”
    - paragraph: Yuki Tanaka
    - paragraph: Pixel Artist · Tokyo
    - blockquote: “My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.”
    - paragraph: Priya Nair
    - paragraph: Community Organizer · London
    - blockquote: “The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.”
    - paragraph: Jordan Blake
    - paragraph: Crypto Educator · New York
    - blockquote: “Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.”
    - paragraph: Sofia Torres
    - paragraph: Crypto Artist · Paris
  - region "Get started with Stellar TipJar":
    - heading "Ready to start tipping?" [level=2]
    - paragraph: Join thousands of creators and supporters already using Stellar TipJar. Connect your Freighter wallet and send your first tip in under 60 seconds.
    - link "Explore Creators":
      - /url: /explore
      - button "Explore Creators"
    - link "Learn more":
      - /url: /tips
      - button "Learn more"
- contentinfo:
  - heading "About" [level=3]
  - paragraph: Support creators with Stellar blockchain and easy cross-border tips.
  - paragraph: Built for creators and fans, with a focus on privacy and low fees.
  - heading "Quick Links" [level=3]
  - link "Explore":
    - /url: /explore
  - link "My Tips":
    - /url: /tips
  - link "Creator Profile":
    - /url: /creator
  - link "Settings":
    - /url: /settings
  - link "Help & FAQ":
    - /url: /help
  - heading "Social" [level=3]
  - link "Twitter":
    - /url: https://twitter.com/stellar
  - link "GitHub":
    - /url: https://github.com/stellar
  - link "Discord":
    - /url: https://discord.com/invite/stellar
  - heading "Newsletter" [level=3]
  - paragraph: Join our newsletter for creator tips and Stellar updates.
  - text: Email address
  - textbox "Email address":
    - /placeholder: Enter your email
  - button "Subscribe"
  - paragraph: © 2026 Stellar Tip Jar. MIT License.
  - link "Privacy Policy":
    - /url: /privacy
  - link "Terms of Service":
    - /url: /terms
  - link "Sitemap":
    - /url: /sitemap.xml
  - button "Back to top"
- button "Open Tanstack query devtools":
  - img
- button "Open Tanstack query devtools":
  - img
- alert
- button "Skip tour"
- 'dialog "Tour step 1 of 6: Navigation"':
  - heading "Navigation" [level=3]
  - paragraph: Use the navbar to explore the app, access your wallet, and switch themes.
  - button "Skip tour"
  - button "Next →"
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
  19 |     await page.getByRole('link', { name: /explore creators/i }).first().click()
> 20 |     await expect(page).toHaveURL('/explore')
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  21 |   })
  22 | })
  23 | 
```