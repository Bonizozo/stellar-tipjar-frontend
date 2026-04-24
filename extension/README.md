# Stellar TipJar — Browser Extension

Tip creators directly from any website without leaving the page.

## Files

```
extension/
├── manifest.json          # MV3 extension manifest
├── background.js          # Service worker — wallet state + API proxy
├── content.js             # Injected into every page — detects creators, injects tip buttons
├── popup.html             # Extension toolbar popup
├── popup.js               # Popup logic — Freighter connect, tip form
├── components/
│   └── QuickTip.tsx       # React component (for options page / host app use)
└── icons/
    ├── icon.svg           # Source icon
    ├── generate-icons.js  # Script to produce PNG icons
    ├── icon-16.png        # Required by manifest
    ├── icon-48.png        # Required by manifest
    └── icon-128.png       # Required by manifest
```

## Setup

### 1. Generate icons

```bash
cd extension/icons
node generate-icons.js
```

Or export `icon.svg` manually at 16×16, 48×48, and 128×128 as PNG.

### 2. Configure API URL

The extension defaults to `http://localhost:8000`. To point at production, update the `API_BASE` constant in both `background.js` and `content.js`.

### 3. Load in Chrome / Edge

1. Open `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder

### 4. Load in Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `extension/manifest.json`

> Firefox uses MV2 for permanent installs. For production Firefox support, create a separate `manifest.v2.json` with `background.scripts` instead of `service_worker`.

## How it works

### Creator detection (`content.js`)

Scans every page for:
- Links matching `stellar-tipjar.app/creator/<username>`
- The current page URL (if you're on a creator profile)
- `<meta name="tipjar:username">` tags (for sites that opt in)

Detected creators get an inline ⭐ **Tip** button injected next to their link. Clicking it opens a lightweight overlay — no page navigation needed.

### Popup

Click the extension icon to see:
- Wallet connection status (Freighter)
- The first detected creator on the current tab
- A quick-tip form with preset amounts

### Wallet

Uses [Freighter](https://www.freighter.app) — the Stellar browser wallet. The popup handles the Freighter handshake directly (background service workers can't access extension APIs from other extensions). Wallet state is persisted via `chrome.storage.local`.

### Tip flow

1. User picks an amount and optionally adds a message
2. `POST /tips/intents` is called via the background service worker
3. On success, the intent ID is shown and balance is refreshed

## Development

No build step required — the extension is plain JS/HTML. Edit files and click **Reload** on `chrome://extensions`.

For `QuickTip.tsx`, if you want to use it in a React context, import it into your host app normally:

```tsx
import { QuickTip } from "./extension/components/QuickTip";
```
