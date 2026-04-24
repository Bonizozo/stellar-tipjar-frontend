"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/Button";
import { useWallet } from "@/hooks/useWallet";

export function WalletConnector() {
  const {
    isConnected,
    isInstalled,
    shortAddress,
    network,
    balance,
    isConnecting,
    isLoading,
    error,
    connect,
    disconnect,
  } = useWallet();

  const disconnectRef = useRef<HTMLButtonElement>(null);
  const prevConnected = useRef(isConnected);

  useEffect(() => {
    if (!prevConnected.current && isConnected) {
      disconnectRef.current?.focus();
    }

    prevConnected.current = isConnected;
  }, [isConnected]);

  if (isLoading) {
    return (
      <Button disabled aria-busy>
        Checking wallet...
      </Button>
    );
  }

  if (!isInstalled) {
    return (
      <Button onClick={() => window.open("https://freighter.app", "_blank", "noopener,noreferrer")}>
        Install Freighter
      </Button>
    );
  }

  if (isConnected) {
    return (
      <div role="region" aria-label="Connected wallet" className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2 rounded-xl border border-wave/25 bg-white px-3 py-1.5 text-xs sm:text-sm shadow-sm transition-all hover:border-wave/40">
          <div className="flex flex-col">
            <span
              aria-label={`Network: ${network}`}
              className="text-[10px] font-bold uppercase tracking-wider text-wave/60"
            >
              {network}
            </span>
            <span aria-label={`Balance: ${balance} XLM`} className="font-mono text-ink/80">
              {balance} XLM
            </span>
          </div>
          <div aria-hidden="true" className="mx-1 h-4 w-px bg-wave/20" />
          <span aria-label={`Wallet address: ${shortAddress}`} className="font-medium text-ink/70">
            {shortAddress}
          </span>
          <Button
            ref={disconnectRef}
            variant="ghost"
            aria-label="Disconnect wallet"
            className="h-8 px-2 py-0 text-xs text-error hover:bg-error/5"
            onClick={() => void disconnect()}
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div role="region" aria-label="Wallet connection" className="flex flex-col items-end gap-2">
      <Button
        onClick={() => void connect()}
        disabled={isConnecting}
        aria-label={isConnecting ? "Connecting wallet, please wait" : "Connect Stellar wallet"}
        aria-busy={isConnecting}
        className={isConnecting ? "cursor-wait opacity-70" : ""}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error && (
        <span
          role="alert"
          aria-live="assertive"
          className="rounded border border-error/20 bg-error/5 px-2 py-1 text-[10px] text-error"
        >
          {error}
        </span>
      )}
    </div>
  );
}
