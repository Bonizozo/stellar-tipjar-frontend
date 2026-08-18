# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wallet.spec.ts >> Wallet Connection >> connect button is accessible
- Location: tests/e2e/wallet.spec.ts:24:7

# Error details

```
Error: expect(locator).toHaveAttribute() failed

Locator:  getByRole('button', { name: /connect.*wallet/i })
Expected: have attribute
Received: attribute not present
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByRole('button', { name: /connect.*wallet/i })
    12 × locator resolved to <button tabindex="0" type="button" aria-busy="false" aria-disabled="false" class="inline-flex items-center justify-center rounded-xl font-semibold focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 transition-colors border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 focus-visible:ring-purple-500/50 px-6 py-3 text-lg gap-2 px-8">…</button>
       - unexpected value "attribute not present"

```

```yaml
- button "Connect Wallet"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Wallet Connection', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Mock Freighter extension as unavailable (default browser env)
  6  |     await page.addInitScript(() => {
  7  |       // Ensure window.freighter is undefined to simulate no extension
  8  |       Object.defineProperty(window, 'freighter', { value: undefined, writable: true })
  9  |     })
  10 |     await page.goto('/')
  11 |   })
  12 | 
  13 |   test('shows connect wallet button', async ({ page }) => {
  14 |     await expect(
  15 |       page.getByRole('button', { name: /connect.*wallet/i })
  16 |     ).toBeVisible()
  17 |   })
  18 | 
  19 |   test('shows error when wallet extension is not available', async ({ page }) => {
  20 |     await page.getByRole('button', { name: /connect.*wallet/i }).click()
  21 |     await expect(page.getByRole('alert')).toBeVisible()
  22 |   })
  23 | 
  24 |   test('connect button is accessible', async ({ page }) => {
  25 |     const btn = page.getByRole('button', { name: /connect.*wallet/i })
> 26 |     await expect(btn).toHaveAttribute('aria-label')
     |                       ^ Error: expect(locator).toHaveAttribute() failed
  27 |   })
  28 | })
  29 | 
```