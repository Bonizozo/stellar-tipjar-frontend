/**
 * Wallet state store — state-machine-driven abstraction (#221).
 *
 * Models connection as an explicit state machine:
 *   unavailable → available → connecting → connected → error
 *
 * Only module that instantiates the Freighter wallet provider.
 * Handles session revalidation, network mismatch detection, and
 * typed error taxonomy.
 *
 * Persistence goes through `createNamespacedStorage("wallet")` (not
 * zustand/persist) so the store stays a clean runtime state machine while
 * still sharing the same SSR-safe, namespaced backend as the rest of the
 * app rather than calling `localStorage` directly.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createNamespacedStorage } from "@/lib/storage";
import {
  FreighterWallet,
  WalletError,
  WalletErrorCode,
  DEFAULT_NETWORK,
  type StellarNetwork,
} from "@/lib/wallet";

// ── State machine types ───────────────────────────────────────────────────────

export type WalletStatus =
  | "unavailable"
  | "available"
  | "connecting"
  | "connected"
  | "error";

// ── Persisted shape ────────────────────────────────────────────────────────────

interface PersistedSession {
  publicKey: string | null;
  network: StellarNetwork;
  wasConnected: boolean;
}

const sessionStorage = createNamespacedStorage("wallet");

// ── Store state ───────────────────────────────────────────────────────────────

export interface WalletState {
  status: WalletStatus;
  publicKey: string | null;
  network: StellarNetwork;
  balance: string;
  error: WalletError | null;

  // Actions
  initialize: () => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  refreshNetwork: () => Promise<void>;
  signStellarTransaction: (xdr: string) => Promise<string>;
  checkNetworkMismatch: () => Promise<boolean>;
}

// ── Singleton provider ────────────────────────────────────────────────────────

let provider: FreighterWallet | null = null;

function getProvider(): FreighterWallet {
  if (!provider) {
    provider = new FreighterWallet();
  }
  return provider;
}

// Allow injecting a mock provider in tests
export function setWalletProvider(mock: FreighterWallet) {
  provider = mock;
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useWalletStore = create<WalletState>()(
  devtools(
    (set, get) => ({
      // ── Initial state ──────────────────────────────────────────────────
      status: "unavailable",
      publicKey: null,
      network: DEFAULT_NETWORK,
      balance: "0.0",
      error: null,

      // ── Initialize (revalidate persisted session on app load) ──────────
      initialize: async () => {
        const wallet = getProvider();

        const installed = await wallet.isInstalled();
        if (!installed) {
          set({ status: "unavailable", error: null }, false, "wallet/init-unavailable");
          return;
        }

        const persisted = sessionStorage.get<PersistedSession>("session");

        if (!persisted?.wasConnected || !persisted.publicKey) {
          set({ status: "available", error: null }, false, "wallet/init-available");
          return;
        }

        // Revalidate: is Freighter still connected + allowed?
        try {
          const stillConnected = await wallet.isInstalled();
          if (!stillConnected) {
            sessionStorage.remove("session");
            set(
              { status: "available", publicKey: null, error: null },
              false,
              "wallet/init-stale",
            );
            return;
          }

          // Attempt a lightweight connect to verify session is alive
          const currentAddress = await wallet.connect();

          // Verify address still matches
          if (currentAddress !== persisted.publicKey) {
            sessionStorage.remove("session");
            set(
              { status: "available", publicKey: null, error: null },
              false,
              "wallet/init-address-mismatch",
            );
            return;
          }

          const detectedNetwork = await wallet.getNetwork();
          const balance = await wallet.getBalance(currentAddress, detectedNetwork);

          set(
            {
              status: "connected",
              publicKey: currentAddress,
              network: detectedNetwork,
              balance,
              error: null,
            },
            false,
            "wallet/init-restored",
          );
        } catch {
          // Session is stale — silently downgrade
          sessionStorage.remove("session");
          set(
            { status: "available", publicKey: null, error: null },
            false,
            "wallet/init-failed",
          );
        }
      },

      // ── Connect ────────────────────────────────────────────────────────
      connect: async () => {
        set({ status: "connecting", error: null }, false, "wallet/connect");

        try {
          const wallet = getProvider();
          const publicKey = await wallet.connect();
          const detectedNetwork = await wallet.getNetwork();
          const balance = await wallet.getBalance(publicKey, detectedNetwork);

          // Persist session
          const session: PersistedSession = {
            publicKey,
            network: detectedNetwork,
            wasConnected: true,
          };
          sessionStorage.set("session", session);

          set(
            {
              status: "connected",
              publicKey,
              network: detectedNetwork,
              balance,
              error: null,
            },
            false,
            "wallet/connect-success",
          );
        } catch (err) {
          const walletError =
            err instanceof WalletError
              ? err
              : new WalletError(
                  WalletErrorCode.USER_DECLINED,
                  err instanceof Error ? err.message : "Failed to connect wallet.",
                );

          set(
            {
              status: "error",
              publicKey: null,
              balance: "0.0",
              error: walletError,
            },
            false,
            "wallet/connect-error",
          );
        }
      },

      // ── Disconnect ─────────────────────────────────────────────────────
      disconnect: async () => {
        const wallet = getProvider();
        await wallet.disconnect();
        sessionStorage.remove("session");

        set(
          {
            status: "available",
            publicKey: null,
            balance: "0.0",
            error: null,
          },
          false,
          "wallet/disconnect",
        );
      },

      // ── Refresh balance ────────────────────────────────────────────────
      refreshBalance: async () => {
        const { publicKey, network, status } = get();
        if (status !== "connected" || !publicKey) {
          set({ balance: "0.0" }, false, "wallet/balance-skip");
          return;
        }

        try {
          const wallet = getProvider();
          const nextBalance = await wallet.getBalance(publicKey, network);
          set({ balance: nextBalance }, false, "wallet/balance-update");
        } catch {
          // Balance fetch failure is non-fatal — keep previous value
        }
      },

      // ── Refresh network ────────────────────────────────────────────────
      refreshNetwork: async () => {
        try {
          const wallet = getProvider();
          const detectedNetwork = await wallet.getNetwork();
          set({ network: detectedNetwork }, false, "wallet/network-update");
        } catch {
          // Network detection failure — keep previous value
        }
      },

      // ── Sign transaction with network mismatch detection ───────────────
      signStellarTransaction: async (xdr: string) => {
        const { publicKey, network, status } = get();
        if (status !== "connected" || !publicKey) {
          throw new WalletError(
            WalletErrorCode.SESSION_STALE,
            "Wallet not connected.",
          );
        }

        // Check for network mismatch before signing
        const wallet = getProvider();
        const freighterNetwork = await wallet.getNetwork();
        if (freighterNetwork !== network) {
          const mismatchError = new WalletError(
            WalletErrorCode.NETWORK_MISMATCH,
            `Freighter is on ${freighterNetwork} but the app expects ${network}. Please switch your network in Freighter.`,
          );
          set({ error: mismatchError }, false, "wallet/network-mismatch");
          throw mismatchError;
        }

        try {
          return await wallet.signTransaction(xdr, network);
        } catch (err) {
          const walletError =
            err instanceof WalletError
              ? err
              : new WalletError(
                  WalletErrorCode.USER_DECLINED,
                  err instanceof Error ? err.message : "Failed to sign transaction.",
                );
          set({ error: walletError }, false, "wallet/sign-error");
          throw walletError;
        }
      },

      // ── Check network mismatch (non-throwing) ──────────────────────────
      checkNetworkMismatch: async () => {
        const { network, status } = get();
        if (status !== "connected") return false;

        try {
          const wallet = getProvider();
          const freighterNetwork = await wallet.getNetwork();
          if (freighterNetwork !== network) {
            const mismatchError = new WalletError(
              WalletErrorCode.NETWORK_MISMATCH,
              `Freighter is on ${freighterNetwork} but the app expects ${network}.`,
            );
            set({ error: mismatchError }, false, "wallet/mismatch-check");
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    { name: "WalletStore" },
  ),
);

// ── Derived selectors ─────────────────────────────────────────────────────────

export const useWalletPublicKey = () =>
  useWalletStore((s) => s.publicKey);

export const useWalletBalance = () =>
  useWalletStore((s) => s.balance);

export const useIsWalletConnected = () =>
  useWalletStore((s) => s.status === "connected");

export const useWalletNetwork = () =>
  useWalletStore((s) => s.network);

export const useWalletStatus = () =>
  useWalletStore((s) => s.status);

export const useWalletError = () =>
  useWalletStore((s) => s.error);

export const useWalletShortAddress = () =>
  useWalletStore((s) => {
    if (!s.publicKey) return "";
    return `${s.publicKey.slice(0, 4)}...${s.publicKey.slice(-4)}`;
  });

export const useWalletIsInstalled = () =>
  useWalletStore((s) => s.status !== "unavailable");

export const useWalletIsConnecting = () =>
  useWalletStore((s) => s.status === "connecting");
