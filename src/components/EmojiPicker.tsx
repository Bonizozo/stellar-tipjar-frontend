"use client";

import { useEffect, useRef } from "react";

const EMOJIS = ["❤️", "🔥", "⭐", "👏", "😂", "🙏", "💎", "🚀"];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  selected: string[];
}

export function EmojiPicker({ onSelect, onClose, selected }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Emoji picker"
      className="absolute bottom-full left-0 z-10 mb-1 flex gap-1 rounded-xl border border-ink/10 bg-[color:var(--surface)] p-2 shadow-card"
    >
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => {
            onSelect(emoji);
            onClose();
          }}
          aria-label={`React with ${emoji}`}
          aria-pressed={selected.includes(emoji)}
          className={`rounded-lg p-1.5 text-lg transition-colors hover:bg-wave/10 ${
            selected.includes(emoji) ? "bg-wave/15 ring-1 ring-wave/30" : ""
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
