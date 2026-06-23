"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

import { useWebSocket } from "@/hooks/useWebSocket";
import { useNotifications, TipNotification } from "@/hooks/useNotifications";
import { useToast } from "@/hooks/useToast";
import { playNotificationSound, isSoundMuted, setSoundMuted } from "@/utils/soundUtils";
import type { Tip } from "@/lib/websocket/client";

interface WebSocketContextType {
  notifications: TipNotification[];
  unreadCount: number;
  markAllRead: () => void;
  clearNotifications: () => void;
  isMuted: boolean;
  setMuted: (muted: boolean) => void;
  connectionStatus: string;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
  const { clientRef, status } = useWebSocket({ url: wsUrl });
  const { notifications, unreadCount, addNotification, markAllRead, clearNotifications } =
    useNotifications();
  const toast = useToast();

  const [isMuted, setIsMuted] = useState<boolean>(() =>
    typeof window !== "undefined" ? isSoundMuted() : false
  );

  const setMuted = useCallback((muted: boolean) => {
    setSoundMuted(muted);
    setIsMuted(muted);
  }, []);

  // Request browser notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    const client = clientRef.current;
    if (!client) return;

    const channel = "tips";

    const handleTip = (tip: Tip) => {
      const shortFrom = `${tip.sender_address.slice(0, 4)}…${tip.sender_address.slice(-4)}`;

      addNotification({ amount: String(tip.amount), from: tip.sender_address, memo: tip.memo });

      const message = tip.memo
        ? `💸 New tip: ${tip.amount} XLM — "${tip.memo}"`
        : `💸 New tip: ${tip.amount} XLM from ${shortFrom}`;

      toast.success(message, { duration: 6000 });

      if (!isMuted) {
        playNotificationSound();
      }

      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("💸 New tip received!", {
          body: tip.memo ? `${tip.amount} XLM — "${tip.memo}"` : `${tip.amount} XLM from ${shortFrom}`,
          icon: "/icons/icon-192x192.png",
          tag: "tip-received",
        });
      }
    };

    client.subscribe(channel, handleTip);
    return () => {
      client.unsubscribe(channel, handleTip);
    };
  }, [status, clientRef, addNotification, toast, isMuted]);

  return (
    <WebSocketContext.Provider
      value={{ notifications, unreadCount, markAllRead, clearNotifications, isMuted, setMuted, connectionStatus: status }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext(): WebSocketContextType {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  return ctx;
}
