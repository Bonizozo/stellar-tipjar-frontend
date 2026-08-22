"use client";

import { useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import { useToast } from "./useToast";
import { useNotificationPrefs } from "./useNotificationPrefs";
import { playNotificationSound } from "@/utils/soundUtils";
import type { Tip } from "@/lib/websocket/client";

export function useTipNotifications(creatorUsername: string) {
  const { clientRef, status } = useWebSocket();
  const toast = useToast();
  const { settings } = useNotificationPrefs();

  useEffect(() => {
    if (status !== "connected") return;
    const client = clientRef.current;
    if (!client) return;

    const inAppEnabled = settings.categories.tips.inApp;
    const channel = `creator:${creatorUsername}`;

    const handler = (tip: Tip) => {
      if (!inAppEnabled) return;

      const shortFrom = `${tip.sender_address.slice(0, 4)}…${tip.sender_address.slice(-4)}`;
      const message = tip.memo
        ? `💸 ${tip.amount} XLM — "${tip.memo}"`
        : `💸 ${tip.amount} XLM from ${shortFrom}`;

      toast.success(message, { duration: 6000 });
      playNotificationSound();
    };

    client.subscribe(channel, handler);
    return () => {
      client.unsubscribe(channel, handler);
    };
  }, [status, clientRef, creatorUsername, toast, settings.categories.tips.inApp]);
}
