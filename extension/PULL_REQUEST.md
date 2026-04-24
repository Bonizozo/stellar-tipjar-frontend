## feat: browser extension for tipping creators from any website

### What

Adds a Manifest V3 browser extension that lets users tip Stellar creators directly from any page — no navigation required.

### Why

Users currently have to visit a creator's TipJar profile page to send a tip. This extension removes that friction by detecting creator links on any site and surfacing a quick-tip UI inline.

### Changes

**New files — all under `extension/`**

| File | Purpose |
|---|---|
| `manifest.json` | MV3 manifest — permissions, content script, service worker, popup |
| `background.js` | Service worker — persists wallet state via `chrome.storage.local`, proxies `POST /tips/intents` and balance fetches to avoid CORS issues from content scripts |
| `content.js` | Injected into every page — scans for `stellar-tipjar.app/creator/<username>` links and `<meta name="tipjar:username">` tags, injects ⭐ Tip buttons next to detected links, handles a MutationObserver for SPAs |
| `popup.html` / `popup.js` | Toolbar popup — Freighter wallet connect/disconnect, detected creator display, quick-tip form with preset amounts |
| `components/QuickTip.tsx` | React component version of the overlay for use in the main app or an options page |
| `icons/icon.svg` | Source icon (gradient star) |
| `icons/generate-icons.js` | Script to produce required 16/48/128px PNGs from the SVG |
| `README.md` | Load instructions, architecture overview, dev notes |

### How it works

1. `content.js` runs on every page and detects creator references via URL patterns and meta tags
2. Clicking the injected ⭐ button (or opening the popup) shows a tip form
3. The popup connects to Freighter directly — background service workers can't access other extensions' APIs, so the popup owns the Freighter handshake and reports the result to the background for persistence
4. Tip submission goes through the background worker (`POST /tips/intents`) to keep API calls consistent and avoid content-script CORS restrictions
5. Balance is fetched from Horizon testnet and refreshed after each tip

### Testing

- Load unpacked from `chrome://extensions` (Developer mode on)
- Visit any page containing a `stellar-tipjar.app/creator/<username>` link — a ⭐ Tip button should appear inline
- Visit `stellar-tipjar.app/creator/alice` directly — popup should auto-detect the creator
- Connect Freighter, send a tip, verify intent ID returned and balance updates
- Disconnect wallet — popup should show the connect prompt, overlay should show the "Get Freighter" fallback

### Notes

- No build step — plain JS/HTML, load unpacked directly
- Firefox MV2 support is noted in the README but not included; can be a follow-up
- `API_BASE` is hardcoded to `http://localhost:8000` — a follow-up can wire this to an extension options page or read from `NEXT_PUBLIC_API_URL` at build time
- Icons need to be generated before loading (`node extension/icons/generate-icons.js`)
