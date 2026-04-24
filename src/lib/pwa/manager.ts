/**
 * PWA utilities for managing offline support, push notifications,
 * and background sync functionality.
 */

export interface PWAConfig {
  enableOfflineSupport: boolean;
  enablePushNotifications: boolean;
  enableBackgroundSync: boolean;
}

class PWAManager {
  private config: PWAConfig = {
    enableOfflineSupport: true,
    enablePushNotifications: true,
    enableBackgroundSync: true,
  };

  private registration: ServiceWorkerRegistration | null = null;

  /**
   * Initialize PWA features
   */
  async initialize(config?: Partial<PWAConfig>): Promise<void> {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    this.config = { ...this.config, ...config };

    try {
      this.registration = await navigator.serviceWorker.register("/sw.js");
      console.log("[PWA] Service Worker registered successfully");

      if (this.config.enablePushNotifications) {
        await this.setupPushNotifications();
      }

      if (this.config.enableBackgroundSync) {
        await this.setupBackgroundSync();
      }
    } catch (error) {
      console.error("[PWA] Service Worker registration failed:", error);
    }
  }

  /**
   * Request permission for push notifications
   */
  async requestPushNotificationPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("[PWA] Notifications not supported");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPushNotifications(vapidPublicKey: string): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.warn("[PWA] Service Worker not registered");
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
      });

      // Send subscription to server
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      return subscription;
    } catch (error) {
      console.error("[PWA] Push subscription failed:", error);
      return null;
    }
  }

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribeFromPushNotifications(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        return true;
      }
    } catch (error) {
      console.error("[PWA] Push unsubscription failed:", error);
    }

    return false;
  }

  /**
   * Check if device is online
   */
  isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Listen for online/offline events
   */
  onOnlineStatusChange(callback: (isOnline: boolean) => void): () => void {
    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }

  /**
   * Request background sync
   */
  async requestBackgroundSync(tag: string): Promise<boolean> {
    if (!this.registration || !("sync" in this.registration)) {
      return false;
    }

    try {
      await this.registration.sync.register(tag);
      return true;
    } catch (error) {
      console.error("[PWA] Background sync registration failed:", error);
      return false;
    }
  }

  /**
   * Setup push notifications
   */
  private async setupPushNotifications(): Promise<void> {
    const hasPermission = await this.requestPushNotificationPermission();
    if (hasPermission && this.registration) {
      const subscription = await this.registration.pushManager.getSubscription();
      if (!subscription) {
        // Optionally auto-subscribe if VAPID key is available
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (vapidKey) {
          await this.subscribeToPushNotifications(vapidKey);
        }
      }
    }
  }

  /**
   * Setup background sync
   */
  private async setupBackgroundSync(): Promise<void> {
    if (!this.registration || !("sync" in this.registration)) {
      return;
    }

    try {
      await this.registration.sync.register("tipjar-retry-requests");
    } catch (error) {
      console.error("[PWA] Background sync setup failed:", error);
    }
  }

  /**
   * Convert VAPID key from base64 to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }
}

export const pwaManager = new PWAManager();
