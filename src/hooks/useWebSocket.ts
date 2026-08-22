"use client";

import { useEffect, useRef, useState } from "react";
import { WebSocketClient } from "@/lib/websocket/client";
import { WS_BASE_URL } from "@/config/env";

export type WsStatus = "connecting" | "connected" | "disconnected";

interface UseWebSocketOptions {
  url?: string;
}

export function useWebSocket(options?: UseWebSocketOptions) {
  // Only connect when an explicit WS URL is provided via env var.
  // Falling back to localhost causes noisy errors in dev when no backend is running.
  const url = options?.url ?? WS_BASE_URL;
  const clientRef = useRef<WebSocketClient | null>(null);
  const [status, setStatus] = useState<WsStatus>("disconnected");

  useEffect(() => {
    // Skip connection entirely when no URL is configured
    if (!url) return;

    const client = new WebSocketClient(url);
    clientRef.current = client;
    setStatus("connecting");

    client.connect()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnected"));

    return () => {
      client.disconnect();
      clientRef.current = null;
      setStatus("disconnected");
    };
  }, [url]);

  return { clientRef, status };
}
