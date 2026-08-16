"use client";

import React, { createContext, useContext, useEffect, useMemo, ReactNode } from "react";

import {
  useWalletStore,
  type WalletStatus as StoreWalletStatus,
} from "@/store/walletStore";
import type { StellarNetwork } from "@/lib/wallet";

// ── Context types ─────────────────────────────────────────────────────────────

type WalletStatus = "idle" | "loading" | "connected";

export interface WalletContextType {
  isConnected: boolean;
  isInstalled: boolean;
  publicKey: string | null;
  shortAddress: string;
  balance: string;
  network: StellarNetwork;
  provider: "freighter";
  status: WalletStatus;
  isConnecting: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  signStellarTransaction: (xdr: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// ── Map store status → context status ─────────────────────────────────────────

function toContextStatus(storeStatus: StoreWalletStatus): WalletStatus {
  switch (storeStatus) {
    case "connected":
      return "connected";
    case "connecting":
      return "loading";
    default:
      return "idle";
  }
}

function formatAddress(address: string | null): string {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

// ── Provider ──────────────────────────────────────────────────────────────────
//
// Thin derivation layer: all state and persistence now live in `walletStore`
// (the sole module that talks to Freighter and to storage). This component
// just derives context shape from the store and triggers `initialize()` on
// mount to revalidate any persisted session.

export function WalletProvider({ children }: { children: ReactNode }) {
  // Select all state and functions from Zustand store in one selector
  // This prevents multiple subscriptions and ensures atomic updates
  const {
    status: storeStatus,
    publicKey,
    network,
    balance,
    error,
    initialize,
    connect: storeConnect,
    disconnect: storeDisconnect,
    refreshBalance,
    signStellarTransaction,
  } = useWalletStore((s) => ({
    status: s.status,
    publicKey: s.publicKey,
    network: s.network,
    balance: s.balance,
    error: s.error,
    initialize: s.initialize,
    connect: s.connect,
    disconnect: s.disconnect,
    refreshBalance: s.refreshBalance,
    signStellarTransaction: s.signStellarTransaction,
  }));

  // Initialize on mount — revalidates persisted sessions
  useEffect(() => {
    void initialize();
  }, [initialize]);

  // Refresh balance when connected
  useEffect(() => {
    if (storeStatus === "connected") {
      void refreshBalance();
    }
  }, [refreshBalance, storeStatus]);

  const status = toContextStatus(storeStatus);
  const isInstalled = storeStatus !== "unavailable";
  const isConnecting = storeStatus === "connecting";

  // Memoize the context value to prevent unnecessary re-renders
  // This is critical given wallet state updates frequently (balance polling, connection status)
  // Note: Zustand functions (connect, disconnect, etc.) are already stable references
  const contextValue = useMemo(
    () => ({
      isConnected: storeStatus === "connected" && !!publicKey,
      isInstalled,
      publicKey,
      shortAddress: formatAddress(publicKey),
      balance,
      network,
      provider: "freighter" as const,
      status,
      isConnecting,
      isLoading: isConnecting,
      error: error?.message ?? null,
      connect: storeConnect,
      disconnect: storeDisconnect,
      refreshBalance,
      signStellarTransaction,
    }),
    [
      storeStatus,
      publicKey,
      isInstalled,
      balance,
      network,
      status,
      isConnecting,
      error,
      storeConnect,
      storeDisconnect,
      refreshBalance,
      signStellarTransaction,
    ]
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
}
