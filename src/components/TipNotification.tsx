"use client";

import { useEffect } from "react";
import { useTipNotifications } from "@/hooks/useTipNotifications";

interface TipNotificationProps {
  creatorUsername: string;
}

/**
 * Mounts real-time tip notifications for a creator channel.
 * Renders nothing — side-effects only (toast + sound).
 */
export function TipNotification({ creatorUsername }: TipNotificationProps) {
  useTipNotifications(creatorUsername);
  return null;
}
