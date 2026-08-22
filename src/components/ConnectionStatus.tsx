"use client";

import { useWallet } from "@/hooks/useWallet";
import { useWebSocket } from "@/hooks/useWebSocket";

// ─── Wallet Connection Status (#218) ─────────────────────────────────────────

export function WalletConnectionStatus() {
  const { isConnected, isConnecting, isInstalled, network, shortAddress } = useWallet();

  if (!isInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/50">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/30" aria-hidden="true" />
        Freighter not installed
      </span>
    );
  }

  if (isConnecting) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" aria-hidden="true" />
        Connecting…
      </span>
    );
  }

  if (isConnected) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400"
        aria-label={`Wallet connected on ${network}: ${shortAddress}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
        {shortAddress} · {network}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/50">
      <span className="h-1.5 w-1.5 rounded-full bg-ink/30" aria-hidden="true" />
      Wallet disconnected
    </span>
  );
}

// ─── WebSocket Connection Status (#219) ──────────────────────────────────────

const WS_LABELS: Record<string, string> = {
  connected: "Live",
  connecting: "Connecting…",
  disconnected: "Offline",
};

const WS_COLORS: Record<string, string> = {
  connected: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  connecting: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  disconnected: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

const WS_DOT_COLORS: Record<string, string> = {
  connected: "bg-green-500",
  connecting: "bg-yellow-500 animate-pulse",
  disconnected: "bg-red-400",
};

export function WebSocketConnectionStatus() {
  const { status } = useWebSocket();

  const label = WS_LABELS[status] ?? "Unknown";
  const colorClass = WS_COLORS[status] ?? WS_COLORS.disconnected;
  const dotClass = WS_DOT_COLORS[status] ?? WS_DOT_COLORS.disconnected;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colorClass}`}
      aria-label={`WebSocket status: ${label}`}
      role="status"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      {label}
    </span>
  );
}
