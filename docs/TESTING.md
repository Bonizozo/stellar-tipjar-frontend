# Testing Guide

## Current Status

Automated test tooling is not yet configured in this repository. This guide defines the expected approach for adding and running tests.

## Baseline Quality Commands

```bash
npm run typecheck
npm run lint
npm run build
```

## Recommended Test Stack (To Add)

- Unit/component tests: Vitest + React Testing Library
- End-to-end tests: Playwright

## Suggested Scripts

```bash
npm test
npm run test:watch
npm run test:e2e
npm run test:coverage
```

## Priority Test Areas

- `src/services/api.ts`
  - rate limiting
  - queue behavior
  - throttle timing
  - `ApiRateLimitError` path
- `src/utils/requestQueue.ts`
  - ordering and retry behavior
- `src/utils/rateLimiter.ts`
  - sliding window behavior
- `src/contexts/WalletContext.tsx`
  - connect/disconnect flows
  - error mapping

## Example Unit Test Ideas

- "allows up to 10 requests and blocks the 11th within window"
- "releases blocked request after window expires"
- "non-critical request is enqueued when limited"
- "critical request throws ApiRateLimitError"

## E2E Scenarios

- Connect wallet success path
- Connect wallet decline path
- Navigate home -> explore -> creator -> tips
- Trigger repeated API actions and verify throttling/rate-limit feedback

## Coverage Guidance

Target at least:

- 80% statements/branches on service and utility modules
- Core wallet and API integration paths covered before production releases
