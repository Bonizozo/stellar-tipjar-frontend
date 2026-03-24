# Troubleshooting

## Common Issues

## Freighter Not Detected

Symptoms:

- Connect wallet action fails
- Error: "Freighter wallet extension is not installed."

Checks:

- Install Freighter browser extension
- Ensure extension is enabled in current browser profile
- Reload app after installation

## User Declines Wallet Permission

Symptoms:

- Error: "You declined the connection request."

Resolution:

- Retry connection and approve permission prompt
- Verify browser popup blockers are not suppressing extension dialogs

## API Requests Failing

Symptoms:

- `API request failed: <status> <statusText>`

Checks:

- Verify `NEXT_PUBLIC_API_URL` points to running backend
- Confirm backend endpoint path matches service call
- Confirm CORS allows frontend origin

## Rate-Limit Errors

Symptoms:

- Error: "Rate limit reached. Try again in Xs."

Context:

- Client-side limit is 10 requests per minute

Resolution:

- Wait for countdown/retry window
- Reduce repeated rapid interactions
- Queue non-critical actions where appropriate

## Balance Not Updating

Symptoms:

- Connected wallet shows stale or zero balance

Checks:

- Verify correct network (`testnet` vs `public`)
- Confirm account exists and is funded on that network
- Ensure Horizon endpoint is reachable

## Build or Start Fails

Checklist:

- Run `npm install`
- Run `npm run typecheck`
- Run `npm run build`
- Confirm Node version is >= 20

## Lint Command Fails with Missing Config

Symptoms:

- ESLint reports no configuration found

Resolution:

- Add `eslint.config.js` or compatible flat config
- Or align eslint version/config strategy in project setup

## Debug Techniques

- Inspect browser console for wallet/API errors.
- Log service-layer responses before UI transformations.
- Validate environment variables loaded in runtime (`.env.local`).
- Reproduce with a clean browser profile for extension-related issues.
