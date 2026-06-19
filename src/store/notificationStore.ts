/**
 * Notification center store.
 *
 * Manages in-app notifications with read/unread states and grouping.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type NotificationType = "tip" | "follower" | "milestone";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  metadata?: Record<string, any>;
}

interface NotificationStoreState {
  notifications: Notification[];
  isOpen: boolean;

  addNotification: (
    notification: Omit<Notification, "id" | "read" | "timestamp">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  setOpen: (open: boolean) => void;
  getGroupedNotifications: () => {
    today: Notification[];
    thisWeek: Notification[];
    earlier: Notification[];
  };
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationStoreState>()(
  persist(
    (set, get) => ({
      notifications: [],
      isOpen: false,

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              read: false,
              timestamp: new Date(),
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () => set({ notifications: [] }),

      setOpen: (open) => set({ isOpen: open }),

      getGroupedNotifications: () => {
        const state = get();
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        );
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const todayNotifs: Notification[] = [];
        const thisWeekNotifs: Notification[] = [];
        const earlierNotifs: Notification[] = [];

        state.notifications.forEach((n) => {
          const notifDate = new Date(n.timestamp);
          const notifDay = new Date(
            notifDate.getFullYear(),
            notifDate.getMonth(),
            notifDate.getDate(),
          );

          if (notifDay.getTime() === today.getTime()) {
            todayNotifs.push(n);
          } else if (notifDate > weekAgo) {
            thisWeekNotifs.push(n);
          } else {
            earlierNotifs.push(n);
          }
        });

        return {
          today: todayNotifs,
          thisWeek: thisWeekNotifs,
          earlier: earlierNotifs,
        };
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: "notification-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          timestamp:
            n.timestamp instanceof Date
              ? n.timestamp.toISOString()
              : n.timestamp,
        })),
      }),
      merge: (persistedState, currentState) => {
        if (persistedState && "notifications" in persistedState) {
          const notifs = (persistedState as any).notifications.map(
            (n: any) => ({
              ...n,
              timestamp: new Date(n.timestamp),
            }),
          );
          return {
            ...currentState,
            notifications: notifs,
          };
        }
        return currentState;
      },
    },
  ),
);

export const useNotifications = () =>
  useNotificationStore((s) => s.notifications);
export const useUnreadCount = () =>
  useNotificationStore((s) => s.getUnreadCount());
export const useIsNotificationOpen = () =>
  useNotificationStore((s) => s.isOpen);
