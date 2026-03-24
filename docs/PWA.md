# Progressive Web App (PWA) Features

This document describes the PWA implementation in the Stellar Tip Jar application.

## Features

### 🚀 Installable
- Users can install the app on their device (desktop or mobile)
- Install prompt appears automatically when criteria are met
- Custom install prompt UI with dismiss option
- App shortcuts for quick access to Explore and Tip History

### 📱 Offline Support
- Service worker caches static assets and pages
- Offline fallback page when network is unavailable
- Cached pages remain accessible without internet
- Smart caching strategies for different asset types

### ⚡ Performance
- Static assets cached for fast loading
- Stale-while-revalidate for optimal performance
- Network-first for dynamic content
- Cache-first for fonts and media

### 🎨 Native App Experience
- Standalone display mode (no browser UI)
- Custom theme color (#0066ff)
- App icons (192x192, 512x512)
- Splash screen support

## Configuration

### Manifest (`public/manifest.json`)
- App name, description, and icons
- Display mode and orientation
- Theme and background colors
- App shortcuts for key features

### Service Worker (`next.config.ts`)
- Automatic generation via next-pwa
- Runtime caching strategies
- Disabled in development mode
- Auto-registration and skip waiting

### Caching Strategies

**CacheFirst** (fonts, audio, video)
- Serve from cache if available
- Fetch from network if not cached
- Best for static assets that rarely change

**StaleWhileRevalidate** (images, CSS, JS)
- Serve from cache immediately
- Update cache in background
- Balance between speed and freshness

**NetworkFirst** (pages, data)
- Try network first
- Fall back to cache if offline
- Ensure fresh content when online

## Installation

### Desktop (Chrome/Edge)
1. Visit the app in Chrome or Edge
2. Look for install icon in address bar
3. Click "Install" or use the in-app prompt
4. App appears in applications menu

### Mobile (Android)
1. Visit the app in Chrome
2. Tap "Add to Home Screen" prompt
3. Or use menu → "Install app"
4. App appears on home screen

### Mobile (iOS)
1. Visit the app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. App appears on home screen

## Testing

### Install Prompt
```bash
# Build and start production server
npm run build
npm start

# Visit http://localhost:3000
# Install prompt should appear after a few seconds
```

### Offline Mode
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Navigate to cached pages
5. Should see offline fallback for uncached pages

### Service Worker
1. Open DevTools (F12)
2. Go to Application tab
3. Check "Service Workers" section
4. Verify worker is registered and active
5. Check "Cache Storage" for cached assets

### Lighthouse Audit
```bash
# Run Lighthouse PWA audit
npm run build
npm start

# Open Chrome DevTools
# Go to Lighthouse tab
# Select "Progressive Web App"
# Click "Generate report"
```

## Browser Support

### Full Support
- Chrome 90+ (Desktop & Android)
- Edge 90+
- Samsung Internet 14+
- Opera 76+

### Partial Support
- Safari 15+ (iOS & macOS)
  - No install prompt
  - Manual "Add to Home Screen"
  - Limited service worker features

### Not Supported
- Firefox (no install prompt)
- Internet Explorer

## Troubleshooting

### Install Prompt Not Showing
- Ensure HTTPS (or localhost)
- Check manifest.json is valid
- Verify service worker is registered
- Clear browser cache and reload
- Check browser console for errors

### Service Worker Not Updating
- Hard refresh (Ctrl+Shift+R)
- Clear site data in DevTools
- Unregister old service worker
- Check skipWaiting is enabled

### Offline Mode Not Working
- Verify service worker is active
- Check cache storage in DevTools
- Ensure pages were visited while online
- Check network tab for cache hits

### Icons Not Displaying
- Verify icon files exist in public/icons/
- Check manifest.json icon paths
- Ensure icons are correct size (192x192, 512x512)
- Clear cache and reinstall app

## Development

### Disable PWA in Development
PWA features are automatically disabled in development mode to avoid caching issues during development.

```typescript
// next.config.ts
disable: process.env.NODE_ENV === "development"
```

### Force Enable in Development
```typescript
// next.config.ts
disable: false
```

### Clear Service Worker
```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => registration.unregister())
})
```

## Future Enhancements

- [ ] Push notifications for tip confirmations
- [ ] Background sync for offline tips
- [ ] Periodic background sync for updates
- [ ] Web Share API integration
- [ ] Badge API for unread notifications
- [ ] File handling for QR codes
- [ ] Contact picker integration

## Resources

- [Next PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Builder](https://www.pwabuilder.com/)
