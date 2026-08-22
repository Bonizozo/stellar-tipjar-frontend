"use client";

import { useEffect, useCallback } from "react";

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = (shortcut.ctrlKey ?? false) === (e.ctrlKey || e.metaKey);
        const shiftMatch = (shortcut.shiftKey ?? false) === e.shiftKey;
        const altMatch = (shortcut.altKey ?? false) === e.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.handler();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

export const COMMON_SHORTCUTS: Record<string, KeyboardShortcut> = {
  search: {
    key: "k",
    ctrlKey: true,
    handler: () => {},
    description: "Open search",
  },
  help: {
    key: "/",
    handler: () => {},
    description: "Show help",
  },
  escape: {
    key: "Escape",
    handler: () => {},
    description: "Close modal/menu",
  },
  enter: {
    key: "Enter",
    handler: () => {},
    description: "Confirm action",
  },
};
