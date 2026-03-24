"use client";

import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/Button";

export function WalletConnector() {
  const { isConnected, shortAddress, network, balance, isConnecting, error, connect, disconnect } = useWallet();

  if (isConnected) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2 rounded-xl border border-wave/25 bg-white px-3 py-1.5 text-xs sm:text-sm shadow-sm transition-all hover:border-wave/40">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-wave/60">
              {network}
            </span>
            <span className="font-mono text-ink/80">{balance} XLM</span>
          </div>
          <div className="h-4 w-px bg-wave/20 mx-1" />
          <span className="font-medium text-ink/70">{shortAddress}</span>
          <Button variant="ghost" className="h-8 px-2 py-0 text-xs text-error hover:bg-error/5" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button 
        onClick={connect} 
        disabled={isConnecting}
        className={isConnecting ? "opacity-70 cursor-wait" : ""}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error && (
        <span className="text-[10px] text-error bg-error/5 px-2 py-1 rounded border border-error/20">
          {error}
        </span>
      )}
    </div>
  );
}
