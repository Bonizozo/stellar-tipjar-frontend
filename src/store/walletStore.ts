/**
 * Wallet state store (#221).
 *
 * Persists connection status, public key, and network to localStorage so
 * users don't need to reconnect on every visit. Balance is excluded from
 * persistence because it must always be fetched live.
 */

import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  network: "testnet" | "mainnet";
  balance: string;

  setConnected: (publicKey: string, network: "testnet" | "mainnet") => void;
  setBalance: (balance: string) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        isConnected: false,
        publicKey: null,
        network: "testnet",
        balance: "0",

        setConnected: (publicKey, network) =>
          set({ isConnected: true, publicKey, network }, false, "wallet/connect"),

        setBalance: (balance) =>
          set({ balance }, false, "wallet/setBalance"),

        disconnect: () =>
          set(
            { isConnected: false, publicKey: null, balance: "0" },
            false,
            "wallet/disconnect",
          ),
      }),
      {
        name: "wallet-storage",
        storage: createJSONStorage(() => localStorage),
        // Do not persist balance — always fetch fresh from Horizon.
        partialize: (state) => ({
          isConnected: state.isConnected,
          publicKey: state.publicKey,
          network: state.network,
        }),
      },
    ),
    { name: "WalletStore" },
  ),
);

// ── Selectors (avoid unnecessary re-renders) ─────────────────────────────────

export const useWalletPublicKey = () =>
  useWalletStore((s) => s.publicKey);

export const useWalletBalance = () =>
  useWalletStore((s) => s.balance);

export const useIsWalletConnected = () =>
  useWalletStore((s) => s.isConnected);

export const useWalletNetwork = () =>
  useWalletStore((s) => s.network);
