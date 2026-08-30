# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y-keyboard.spec.ts >> Keyboard-only journey >> Escape key closes open modal
- Location: tests/e2e/a11y-keyboard.spec.ts:101:7

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('[role="dialog"]').first()
Expected: not visible
Received: visible
Timeout:  2000ms

Call log:
  - Expect "not toBeVisible" with timeout 2000ms
  - waiting for locator('[role="dialog"]').first()
    18 × locator resolved to <div role="dialog" aria-modal="true" aria-labelledby="export-modal-title" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">…</div>
       - unexpected value "visible"

```

```yaml
- dialog "Export Transactions":
  - heading "Export Transactions" [level=2]
  - button "Close"
  - group "Format"
  - group "Date Range"
  - paragraph: 8 transactions will be exported
  - button "Cancel"
  - button "Export"
```

# Test source

```ts
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
  45  |     await page.waitForURL(/\/creator\//);
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
> 112 |         await expect(dialog).not.toBeVisible({ timeout: 2000 });
      |                                  ^ Error: expect(locator).not.toBeVisible() failed
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