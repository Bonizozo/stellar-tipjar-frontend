# localStorage / sessionStorage Security Audit

> Addresses issue #600: confirm no sensitive material (session tokens, wallet
> secrets) is ever written unencrypted to persistent client storage.

## Summary

All client-side persistence in this application goes through
`src/lib/storage.ts` — a typed, namespaced, SSR-safe wrapper that prefixes
every key with `stj:`. **No code path outside that module calls
`localStorage` or `sessionStorage` directly**, with the single documented
exception of the theme-flash-prevention script in `src/app/[locale]/layout.tsx`
(see below).

No session tokens, authentication secrets, wallet private keys, or seed
phrases are ever written to client storage. The data stored is limited to
UI preferences, non-sensitive identifiers, and connection-status flags.

---

## Complete Key Inventory

All keys use the pattern `stj:<domain>:<key>`.

### Wallet / Auth — `stj:wallet:session`

**Written by**: `src/store/walletStore.ts`  
**Storage type**: `localStorage` (via `createNamespacedStorage("wallet")`)  
**Shape**:

```ts
interface PersistedSession {
  publicKey: string | null;   // Stellar public key — a non-secret identifier
  network: StellarNetwork;     // "testnet" | "mainnet"
  wasConnected: boolean;       // reconnection hint flag
}
```

**Security assessment**: ✅ Safe.

- `publicKey` is the Stellar **public** key, which is, by definition, public.
  It is not a credential. Knowing a public key allows an observer to view
  on-chain history (already public on the ledger) but does not allow them to
  sign transactions or move funds.
- `network` is a non-sensitive configuration value.
- `wasConnected` is a boolean flag that triggers a lightweight Freighter
  revalidation on next load. If the extension is no longer connected or the
  address has changed the persisted session is immediately cleared.
- **No session/auth token is stored here.** The app uses Freighter (a browser
  extension) for signing; the private key never leaves the extension and is
  never accessible to this application at all.
- An XSS payload that reads this key learns only a public Stellar address — the
  same information visible in any blockchain explorer.

**Cleared on**: disconnect, address mismatch during revalidation, stale session
detection.

---

### User Profile — `stj:store:user-storage`

**Written by**: `src/store/userStore.ts` (via zustand `persist` middleware)  
**Storage type**: `localStorage` (via `createZustandStorage("store")`)  
**Shape**:

```ts
interface User {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  role: "creator" | "supporter";
  avatarUrl?: string;
}
```

**Security assessment**: ✅ Safe with one note.

- No password, token, or secret is persisted here.
- `email` is PII. It is used solely for display purposes and is not a
  credential. Exposure via XSS would be a privacy concern (not an account
  takeover vector), consistent with the general XSS risk applicable to
  any client-side app.
- **Authentication tokens (JWT / session cookies) are not stored here.**
  If a server-side auth layer is added in future it must use `httpOnly`
  cookies, not localStorage, so JavaScript (including XSS payloads) cannot
  read them.

**Cleared on**: `logout()` action in `useUserStore`.

---

### UI Preferences (non-sensitive)

These keys contain no credentials or secrets of any kind.

| Key | Written by | Content |
|-----|-----------|---------|
| `stj:theme:theme` | `ThemeProvider.tsx` | `"light"` / `"dark"` / `"system"` |
| `stj:i18n:locale` | `I18nProvider.tsx`, `LanguageSwitcher.tsx` | Locale string e.g. `"en"` |
| `stj:consent:cookieConsent` | `CookieConsent.tsx` | `"accepted"` / `"declined"` |
| `stj:currency:currency` | `CurrencyContext.tsx` | Currency code e.g. `"USD"` |
| `stj:sound:*` | `soundUtils.ts` | Volume / mute preferences |
| `stj:banner:dismissed` | `useBanner.ts` | Dismissed-banner flags |
| `stj:tour:*` | `useTour.ts` | Onboarding tour completion flags |
| `stj:notifications:*` | `useNotificationPrefs.ts`, `notificationService.ts` | Notification preference toggles |
| `stj:filterBuilder:*` | `useFilterBuilder.ts` | Saved filter UI state |
| `stj:searchHistory:*` | `useSearch.ts` | User's recent search queries |
| `stj:recommendations:*` | `recommendationEngineService.ts` | Cached recommendation scores |
| `stj:ml:*` | `mlModel.ts` | Cached ML model parameters |
| `stj:refunds:*` | `useRefunds.ts` | Refund request drafts |
| `stj:goals:*` | `useGoals.ts` | Creator goal state |
| `stj:team:*` | `useTeam.ts` | Team member list (display data) |
| `stj:filters:*` | `advancedFilterService.ts` | Advanced filter presets |
| `stj:store:notification-store` | `notificationStore.ts` | Notification feed state |
| `stj:store:profile-completion-storage` | `profileCompletionStore.ts` | Profile completion progress |
| `stj:store:profile-details` | `profileDetailsStore.ts` | Displayed profile fields |
| `stj:store:certification-storage` | `useCertificationStore.ts` | Certification badge data |
| `stj:store:mentorship-storage` | `useMentorshipStore.ts` | Mentorship session preferences |

### sessionStorage Only

| Key | Written by | Content |
|-----|-----------|---------|
| `stj:scroll:*` | `useScrollRestoration.ts` | Per-route scroll positions |
| `stj:search:*` | `src/app/search/page.tsx` | Current search query state |

---

### Theme Flash Prevention Script (direct `localStorage` read)

**Location**: `src/app/[locale]/layout.tsx` — inline `<script>` tag  
**Operation**: **read-only**. The script reads `stj:theme:theme` (and two
legacy keys) before React hydrates to apply the correct colour-scheme class
without a flash. It never writes to `localStorage`.  
**Security impact**: None. Read-only access to a non-sensitive preference.

---

## Conclusion

Every key written to `localStorage` or `sessionStorage` by this application
contains only:

- UI preferences (theme, locale, sound, currency)
- Non-secret identifiers (Stellar **public** key, username, display name)
- Connection-status flags (`wasConnected`, `network`)
- Cached/derived UI data (search history, filters, goals, teams)

No session tokens, auth cookies, wallet secrets, seed phrases, or private keys
are ever written to client storage. An XSS payload that reads all `stj:*` keys
cannot impersonate the user, sign transactions, or drain funds.

**Future guidance**: If a server-side authentication layer (JWT, session cookie)
is added, the token **must** be stored in an `httpOnly` cookie so it is
inaccessible to JavaScript. `localStorage` must not be used for auth tokens.
