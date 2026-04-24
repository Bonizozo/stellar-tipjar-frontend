"use client";

import { useEffect, useState, useCallback } from "react";
import { pwaManager } from "@/lib/pwa/manager";

export interface UsePWAReturn {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  install: () => Promise<void>;
  requestNotificationPermission: () => Promise<boolean>;
  subscribeToPushNotifications: (vapidKey: string) => Promise<boolean>;
}

export function usePWA(): UsePWAReturn {
  const [isOnline, setIsOnline] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for online/offline changes
    const unsubscribe = pwaManager.onOnlineStatusChange((online) => {
      setIsOnline(online);
    });

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      unsubscribe();
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) {
      throw new Error("Installation prompt not available");
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const requestNotificationPermission = useCallback(async () => {
    return pwaManager.requestPushNotificationPermission();
  }, []);

  const subscribeToPushNotifications = useCallback(async (vapidKey: string) => {
    const subscription = await pwaManager.subscribeToPushNotifications(vapidKey);
    return subscription !== null;
  }, []);

  return {
    isOnline,
    isInstallable,
    isInstalled,
    install,
    requestNotificationPermission,
    subscribeToPushNotifications,
  };
}
