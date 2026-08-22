"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { KeyboardShortcut } from "@/hooks/useKeyboardShortcuts";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: KeyboardShortcut[];
}

function KeyDisplay({ shortcut }: { shortcut: KeyboardShortcut }) {
  const keys: string[] = [];

  if (shortcut.ctrlKey) keys.push("Ctrl");
  if (shortcut.shiftKey) keys.push("Shift");
  if (shortcut.altKey) keys.push("Alt");
  keys.push(shortcut.key);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {keys.map((k, i) => (
          <span key={i}>
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
              {k}
            </kbd>
            {i < keys.length - 1 && <span className="mx-1">+</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  shortcuts,
}: KeyboardShortcutsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2
            id="shortcuts-title"
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {shortcuts.map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {shortcut.description}
              </span>
              <KeyDisplay shortcut={shortcut} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
