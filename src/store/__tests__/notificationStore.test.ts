import { describe, it, expect, beforeEach } from "vitest";
import { useNotificationStore } from "@/store/notificationStore";

describe("useNotificationStore", () => {
  beforeEach(() => {
    useNotificationStore.setState({
      notifications: [],
      isOpen: false,
    });
  });

  it("adds notifications with generated id and unread status", () => {
    useNotificationStore.getState().addNotification({
      type: "tip",
      title: "New Tip Received",
      description: "You received 50 XLM",
      metadata: { amount: 50, currency: "XLM" },
    });

    const notifs = useNotificationStore.getState().notifications;
    expect(notifs).toHaveLength(1);
    expect(notifs[0].title).toBe("New Tip Received");
    expect(notifs[0].read).toBe(false);
    expect(notifs[0].type).toBe("tip");
    expect(notifs[0].metadata).toEqual({ amount: 50, currency: "XLM" });
    expect(useNotificationStore.getState().getUnreadCount()).toBe(1);
  });

  it("marks a notification as read", () => {
    useNotificationStore.getState().addNotification({
      type: "follower",
      title: "New Follower",
      description: "Alice is now following you",
    });

    const id = useNotificationStore.getState().notifications[0].id;
    useNotificationStore.getState().markAsRead(id);

    expect(useNotificationStore.getState().notifications[0].read).toBe(true);
    expect(useNotificationStore.getState().getUnreadCount()).toBe(0);
  });

  it("marks all notifications as read", () => {
    useNotificationStore.getState().addNotification({
      type: "tip",
      title: "Tip 1",
      description: "10 XLM",
    });
    useNotificationStore.getState().addNotification({
      type: "milestone",
      title: "Milestone reached",
      description: "100 tips reached",
    });

    expect(useNotificationStore.getState().getUnreadCount()).toBe(2);

    useNotificationStore.getState().markAllAsRead();

    expect(useNotificationStore.getState().getUnreadCount()).toBe(0);
    expect(useNotificationStore.getState().notifications.every((n) => n.read)).toBe(true);
  });

  it("removes a notification by id", () => {
    useNotificationStore.getState().addNotification({
      type: "tip",
      title: "Tip 1",
      description: "10 XLM",
    });
    const id = useNotificationStore.getState().notifications[0].id;

    useNotificationStore.getState().removeNotification(id);
    expect(useNotificationStore.getState().notifications).toHaveLength(0);
  });

  it("toggles isOpen state", () => {
    expect(useNotificationStore.getState().isOpen).toBe(false);
    useNotificationStore.getState().setOpen(true);
    expect(useNotificationStore.getState().isOpen).toBe(true);
  });
});
