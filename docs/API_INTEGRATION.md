# API Integration Guide

## Configuration

Define API base URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Optional network config:

```bash
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

## Service Layer Location

All backend calls are centralized in `src/services/api.ts`.

## Public API Methods (Current)

- `getCreatorProfile(username: string): Promise<CreatorProfile>`
- `createTipIntent(payload): Promise<{ intentId: string; checkoutUrl?: string }>`

## Request Wrapper Responsibilities

The shared `request()` helper in `src/services/api.ts` handles:

- JSON headers
- typed response parsing
- path throttling
- client-side rate limiting
- queueing non-critical requests
- exponential retry behavior for queued requests

## Rate Limiting and Throttling

- Limit: **10 requests per 60 seconds**
- Per-path throttle: default **300ms**
- Custom throttle for critical endpoint (`createTipIntent`): **500ms**
- Non-critical requests (e.g., profile fetch) are queued when limited
- Critical requests throw `ApiRateLimitError` with retry timing

### Reading Rate-Limit State

Use:

- `getApiRateLimitStatus()`
- `subscribeToApiRateLimit(callback)`

Status includes:

- `isLimited`
- `retryAfterMs`
- `remainingRequests`
- `queuedRequests`
- `limit`
- `windowMs`

## Example Usage

```ts
import { getCreatorProfile, createTipIntent } from "@/services/api";

const profile = await getCreatorProfile("alice");

const intent = await createTipIntent({
  username: "alice",
  amount: "10",
  assetCode: "XLM",
});
```

## Error Handling Patterns

- API non-2xx responses throw `Error("API request failed: ...")`.
- Critical over-limit requests throw `ApiRateLimitError`.
- `getCreatorProfile` uses a fallback profile for local UX resilience if backend is unavailable.

## Type Safety

- Request/response interfaces are defined in service modules.
- Consumers should rely on typed service methods, not direct `fetch` from components.

## Best Practices

- Keep endpoint-specific transformation logic inside service functions.
- Avoid calling `fetch` directly in UI components.
- Handle errors close to user-facing boundaries (page/component), not in pure UI elements.
