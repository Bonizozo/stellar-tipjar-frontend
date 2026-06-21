"use client";

import { useCallback } from "react";
import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useNotificationStore, useUnreadCount } from "@/store/notificationStore";

/** Bell SVG icon */
function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/** Speaker / mute icon */
function SoundIcon({
  muted,
  className,
}: {
  muted: boolean;
  className?: string;
}) {
  return muted ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

export function NotificationBadge() {
  const { isMuted, setMuted } = useWebSocketContext();
  const { setOpen } = useNotificationStore();
  const unreadCount = useUnreadCount();

  const handleBellClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const toggleMute = useCallback(() => {
    setMuted(!isMuted);
  }, [isMuted, setMuted]);

  return (
    <div className="flex items-center gap-2">
      {/* Notification bell */}
      <button
        onClick={handleBellClick}
        aria-label={
          unreadCount > 0
            ? `${unreadCount} unread notifications – click to mark as read`
            : "No new notifications"
        }
        className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <BellIcon className="h-5 w-5 text-current opacity-80" />

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold leading-none text-white shadow-md"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}

        {/* Pulse ring when there are unread notifications */}
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-25"
          />
        )}
      </button>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        aria-label={
          isMuted ? "Unmute notification sounds" : "Mute notification sounds"
        }
        title={isMuted ? "Unmute sounds" : "Mute sounds"}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <SoundIcon
          muted={isMuted}
          className="h-4 w-4 opacity-70 transition-opacity hover:opacity-100"
        />
      </button>
    </div>
  );
}
