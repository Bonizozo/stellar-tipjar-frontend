"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNotificationStore } from "@/store/notificationStore";
import type { Notification } from "@/store/notificationStore";

function NotificationIcon({ type }: { type: Notification["type"] }) {
  switch (type) {
    case "tip":
      return <span className="text-lg">💸</span>;
    case "follower":
      return <span className="text-lg">👥</span>;
    case "milestone":
      return <span className="text-lg">🎉</span>;
  }
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead, removeNotification } = useNotificationStore();

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const time = new Date(notification.timestamp);
  const timeStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onClick={handleClick}
      className={`group flex gap-3 rounded-lg p-3 transition-colors cursor-pointer ${
        notification.read
          ? "bg-transparent hover:bg-ink/5 dark:hover:bg-canvas/5"
          : "bg-sunrise/10 hover:bg-sunrise/15 dark:bg-sunrise/10 dark:hover:bg-sunrise/15"
      }`}
    >
      <div className="flex-shrink-0 pt-0.5">
        <NotificationIcon type={notification.type} />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold ${notification.read ? "text-ink dark:text-canvas" : "text-ink dark:text-canvas"}`}
        >
          {notification.title}
        </p>
        <p className="mt-0.5 text-xs text-ink/60 dark:text-canvas/60 line-clamp-2">
          {notification.description}
        </p>
        <p className="mt-1 text-xs text-ink/40 dark:text-canvas/40">
          {timeStr}
        </p>
      </div>

      {!notification.read && (
        <div className="flex-shrink-0 h-2 w-2 rounded-full bg-sunrise mt-1" />
      )}

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          removeNotification(notification.id);
        }}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 rounded p-1 text-ink/40 hover:bg-ink/10 dark:text-canvas/40 dark:hover:bg-canvas/10 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <TrashIcon className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );

  if (notification.link) {
    return (
      <Link href={notification.link} legacyBehavior>
        <a style={{ textDecoration: "none" }}>{content}</a>
      </Link>
    );
  }

  return content;
}

function NotificationGroup({
  title,
  notifications,
}: {
  title: string;
  notifications: Notification[];
}) {
  if (notifications.length === 0) return null;

  return (
    <div className="space-y-1">
      <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-canvas/50">
        {title}
      </h3>
      <div className="space-y-1">
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}
      </div>
    </div>
  );
}

export function NotificationCenter() {
  const {
    notifications,
    isOpen,
    setOpen,
    getGroupedNotifications,
    markAllAsRead,
    clearAll,
    getUnreadCount,
  } = useNotificationStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const grouped = getGroupedNotifications();
  const unreadCount = getUnreadCount();
  const hasNotifications = notifications.length > 0;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, setOpen]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-16 z-50 h-[calc(100vh-64px)] w-full max-w-sm overflow-hidden rounded-l-2xl border-l border-ink/10 bg-[color:var(--surface)] shadow-xl dark:border-canvas/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4 dark:border-canvas/10">
              <h2 className="text-lg font-semibold text-ink dark:text-canvas">
                Notifications
              </h2>
              <motion.button
                onClick={() => setOpen(false)}
                className="rounded p-1 hover:bg-ink/10 dark:hover:bg-canvas/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-5 w-5 text-ink/60 dark:text-canvas/60" />
              </motion.button>
            </div>

            {/* Actions */}
            {hasNotifications && (
              <div className="flex gap-2 border-b border-ink/10 px-4 py-3 dark:border-canvas/10">
                <button
                  onClick={() => markAllAsRead()}
                  disabled={unreadCount === 0}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-ink/5 px-3 py-2 text-xs font-semibold text-ink hover:bg-ink/10 disabled:opacity-50 transition-colors dark:bg-canvas/5 dark:text-canvas dark:hover:bg-canvas/10"
                >
                  <CheckIcon className="h-4 w-4" />
                  Mark All Read
                </button>
                <button
                  onClick={() => clearAll()}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-error/5 px-3 py-2 text-xs font-semibold text-error hover:bg-error/10 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                  Clear All
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="overflow-y-auto h-[calc(100%-128px)]">
              {!hasNotifications ? (
                <div className="flex h-full items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-2xl mb-2">🔔</p>
                    <p className="text-sm font-semibold text-ink dark:text-canvas">
                      No notifications yet
                    </p>
                    <p className="mt-1 text-xs text-ink/60 dark:text-canvas/60">
                      You'll see tips, followers, and milestones here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  {grouped.today.length > 0 && (
                    <NotificationGroup
                      title="Today"
                      notifications={grouped.today}
                    />
                  )}
                  {grouped.thisWeek.length > 0 && (
                    <NotificationGroup
                      title="This Week"
                      notifications={grouped.thisWeek}
                    />
                  )}
                  {grouped.earlier.length > 0 && (
                    <NotificationGroup
                      title="Earlier"
                      notifications={grouped.earlier}
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
