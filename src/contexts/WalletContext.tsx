"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { walletService } from "@/services/walletService";
import { getBalance, STELLAR_NETWORK } from "@/utils/stellar";
import { WatchWalletChanges } from "@stellar/freighter-api";

interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  balance: string;
  network: string;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0.0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshBalance = useCallback(async () => {
    if (publicKey) {
      const bal = await getBalance(publicKey);
      setBalance(bal);
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      refreshBalance();
    }
  }, [publicKey, refreshBalance]);

  // Handle wallet changes (account switched, network changed, or logged out)
  useEffect(() => {
    const watcher = new WatchWalletChanges();
    watcher.watch((data) => {
      // In @stellar/freighter-api 6.0, data contains { address, network, ... }
      const newAddress =
        typeof data === "object" && data !== null && "address" in data
          ? (data as { address?: string }).address
          : undefined;
      if (newAddress && newAddress !== publicKey) {
        setPublicKey(newAddress);
      } else if (!newAddress && publicKey) {
        setPublicKey(null);
      }
    });

    return () => {
      watcher.stop();
    };
  }, [publicKey]);

  // Initial connection check
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (await walletService.isAllowed()) {
          const pk = await walletService.connect();
          if (pk) {
            setPublicKey(pk);
          }
        }
      } catch (e) {
        console.warn("Initial wallet check failed", e);
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const pk = await walletService.connect();
      if (pk) {
        setPublicKey(pk);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "FREIGHTER_NOT_INSTALLED") {
        setError("Freighter wallet extension is not installed.");
      } else if (err instanceof Error && err.message === "USER_DECLINED") {
        setError("You declined the connection request.");
      } else {
        setError("Failed to connect Freighter.");
      }
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    setBalance("0.0");
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected: !!publicKey,
        publicKey,
        balance,
        network: STELLAR_NETWORK,
        isConnecting,
        error,
        connect,
        disconnect,
        refreshBalance,
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
