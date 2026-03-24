# Wallet Integration Guide

## Overview

Wallet integration is implemented for Freighter via:

- `src/services/walletService.ts`
- `src/contexts/WalletContext.tsx`
- `src/hooks/useWallet.ts`
- `src/components/WalletConnector.tsx`

## Environment

Set network variables in `.env.local`:

```bash
NEXT_PUBLIC_STELLAR_NETWORK=testnet
# Optional override:
# NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

## Connection Flow

1. `walletService.isConnected()` checks extension availability.
2. `walletService.isAllowed()` checks permission state.
3. `walletService.connect()` requests permission if needed and returns address.
4. `WalletContext` stores `publicKey` and fetches XLM balance.
5. `WalletConnector` reflects connected/disconnected UI state.

## Wallet Change Listener

`WalletContext` registers `WatchWalletChanges` to react to:

- account switch
- logout/disconnect
- other wallet session changes

## Signing Transactions

Use `walletService.sign(xdr, network)` to sign transaction envelopes with Freighter.

```ts
import { walletService } from "@/services/walletService";
import { STELLAR_NETWORK } from "@/utils/stellar";

const signedXdr = await walletService.sign(unsignedXdr, STELLAR_NETWORK);
```

## Error Mapping

Known connect errors are normalized:

- `FREIGHTER_NOT_INSTALLED`
- `USER_DECLINED`
- generic connection failure

`WalletConnector` renders friendly messages based on this mapping.

## Security and UX Notes

- Never store private keys in app code or local storage.
- Always treat wallet APIs as untrusted boundaries and handle rejections.
- Keep signing and submit steps explicit in UI to avoid accidental sends.
- Show loading and disabled states during connect/sign actions.

## Integration Extension Points

- Add transaction submit service after signing.
- Track transaction lifecycle in a dedicated tip flow state.
- Add network mismatch UI if backend requires specific network.
