"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

import { FreighterWallet } from "@/lib/stellar/freighter";
import type { StellarNetwork, WalletProviderType } from "@/lib/stellar/types";

type WalletStatus = "idle" | "loading" | "connected";

interface WalletContextType {
  isConnected: boolean;
  isInstalled: boolean;
  publicKey: string | null;
  shortAddress: string;
  balance: string;
  network: StellarNetwork;
  provider: WalletProviderType;
  status: WalletStatus;
  isConnecting: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  signStellarTransaction: (xdr: string) => Promise<string>;
}

const STORAGE_KEYS = {
  connected: "wallet_connected",
  publicKey: "wallet_publicKey",
  provider: "wallet_provider",
} as const;

const DEFAULT_NETWORK = (process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "TESTNET").toUpperCase() as StellarNetwork;

const WalletContext = createContext<WalletContextType | undefined>(undefined);
const freighterWallet = new FreighterWallet();

function formatAddress(address: string | null): string {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function safeStorageRead(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
}

function saveConnection(publicKey: string) {
  localStorage.setItem(STORAGE_KEYS.connected, "true");
  localStorage.setItem(STORAGE_KEYS.publicKey, publicKey);
  localStorage.setItem(STORAGE_KEYS.provider, "freighter");
}

function clearConnection() {
  localStorage.removeItem(STORAGE_KEYS.connected);
  localStorage.removeItem(STORAGE_KEYS.publicKey);
  localStorage.removeItem(STORAGE_KEYS.provider);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0.0");
  const [network, setNetwork] = useState<StellarNetwork>(DEFAULT_NETWORK);
  const [status, setStatus] = useState<WalletStatus>("loading");
  const [isInstalled, setIsInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance("0.0");
      return;
    }

    const nextBalance = await freighterWallet.getBalance(publicKey, network);
    setBalance(nextBalance);
  }, [network, publicKey]);

  const refreshNetwork = useCallback(async () => {
    const detectedNetwork = await freighterWallet.getNetwork();
    setNetwork(detectedNetwork);
  }, []);

  const connect = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const nextPublicKey = await freighterWallet.connect();
      const detectedNetwork = await freighterWallet.getNetwork();
      const nextBalance = await freighterWallet.getBalance(nextPublicKey, detectedNetwork);

      setPublicKey(nextPublicKey);
      setNetwork(detectedNetwork);
      setBalance(nextBalance);
      setStatus("connected");
      saveConnection(nextPublicKey);
    } catch (err) {
      setStatus("idle");
      setPublicKey(null);
      setBalance("0.0");
      setError(err instanceof Error ? err.message : "Failed to connect wallet.");
      clearConnection();
    }
  }, []);

  const disconnect = useCallback(async () => {
    await freighterWallet.disconnect();
    setPublicKey(null);
    setBalance("0.0");
    setStatus("idle");
    setError(null);
    clearConnection();
  }, []);

  const signStellarTransaction = useCallback(
    async (xdr: string) => {
      if (!publicKey) {
        throw new Error("Wallet not connected.");
      }

      try {
        return await freighterWallet.signTransaction(xdr, network);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to sign transaction.";
        setError(message);
        throw new Error(message);
      }
    },
    [network, publicKey],
  );

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const installed = await freighterWallet.isInstalled();
        setIsInstalled(installed);
        await refreshNetwork();

        if (!installed) {
          setStatus("idle");
          clearConnection();
          return;
        }

        const persistedConnected = safeStorageRead(STORAGE_KEYS.connected) === "true";
        const persistedProvider = safeStorageRead(STORAGE_KEYS.provider) === "freighter";

        if (persistedConnected && persistedProvider) {
          await connect();
          return;
        }

        setStatus("idle");
      } catch {
        setStatus("idle");
        setError("Failed to initialize wallet.");
      }
    };

    void bootstrap();
  }, [connect, refreshNetwork]);

  useEffect(() => {
    if (status === "connected") {
      void refreshBalance();
    }
  }, [refreshBalance, status]);

  return (
    <WalletContext.Provider
      value={{
        isConnected: status === "connected" && !!publicKey,
        isInstalled,
        publicKey,
        shortAddress: formatAddress(publicKey),
        balance,
        network,
        provider: "freighter",
        status,
        isConnecting: status === "loading",
        isLoading: status === "loading",
        error,
        connect,
        disconnect,
        refreshBalance,
        signStellarTransaction,
      }}
    >
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
