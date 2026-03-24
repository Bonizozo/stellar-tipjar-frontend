# PWA Testing Guide

Quick guide to test PWA features in the Stellar Tip Jar application.

## Important Note

PWA features are **disabled in development mode** to avoid caching issues. To test PWA functionality, you must build and run in production mode.

## Testing Steps

### 1. Build for Production

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`

### 2. Test Install Prompt

1. Open the app in Chrome or Edge
2. Wait a few seconds for the install prompt to appear at the bottom
3. Click "Install" to add the app to your system
4. Or click "Not now" to dismiss

**Note:** The install prompt only appears when:
- Running on HTTPS or localhost
- App meets PWA criteria (manifest, service worker, etc.)
- User hasn't dismissed it recently

### 3. Test Offline Mode

1. Open Chrome DevTools (F12)
2. Go to the **Network** tab
3. Check the **Offline** checkbox
4. Navigate to different pages
5. Previously visited pages should load from cache
6. New pages should show the offline fallback

### 4. Verify Service Worker

1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in the left sidebar
4. You should see the service worker registered and active
5. Check **Cache Storage** to see cached assets

### 5. Test on Mobile

#### Android (Chrome)
1. Visit the app on your phone
2. Tap the "Add to Home Screen" prompt
3. Or use Chrome menu → "Install app"
4. App icon appears on home screen
5. Opens in standalone mode (no browser UI)

#### iOS (Safari)
1. Visit the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll and tap "Add to Home Screen"
4. Customize name and tap "Add"
5. App icon appears on home screen

## Lighthouse Audit

Run a PWA audit to verify everything is configured correctly:

1. Build and start the app: `npm run build && npm start`
2. Open Chrome DevTools (F12)
3. Go to **Lighthouse** tab
4. Select **Progressive Web App** category
5. Click **Generate report**
6. Review the PWA score and recommendations

Target score: **90+**

## Common Issues

### Install Prompt Not Showing

**Solution:**
- Ensure you're running production build (`npm run build && npm start`)
- Clear browser cache and reload
- Check browser console for errors
- Verify manifest.json is accessible at `/manifest.json`

### Service Worker Not Registering

**Solution:**
- Check browser console for registration errors
- Verify you're on HTTPS or localhost
- Clear site data in DevTools → Application → Clear storage
- Rebuild the app

### Offline Mode Not Working

**Solution:**
- Visit pages while online first (they need to be cached)
- Check service worker is active in DevTools
- Verify cache storage contains assets
- Try hard refresh (Ctrl+Shift+R) and revisit pages

### Icons Not Displaying

**Solution:**
- Verify icon files exist in `public/icons/`
- Check manifest.json paths are correct
- Clear cache and reinstall app
- Check browser console for 404 errors

## Development Mode

In development mode (`npm run dev`), PWA features are disabled to prevent caching issues during development. This is normal and expected.

To enable PWA in development (not recommended):

```typescript
// next.config.ts
disable: false, // Change from: process.env.NODE_ENV === "development"
```

## Browser Compatibility

| Browser | Install Prompt | Service Worker | Offline |
|---------|---------------|----------------|---------|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| Safari 15+ | ❌ (manual) | ⚠️ (limited) | ⚠️ |
| Firefox | ❌ | ✅ | ✅ |
| Samsung Internet | ✅ | ✅ | ✅ |

## Next Steps

After verifying PWA features work:

1. Test on real mobile devices
2. Run Lighthouse audit and address any issues
3. Test offline functionality thoroughly
4. Verify app shortcuts work
5. Check app icons on different devices
6. Test uninstall and reinstall flow

## Resources

- [PWA Documentation](./PWA.md) - Full PWA feature documentation
- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
