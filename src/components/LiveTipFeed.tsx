"use client";

import { useEffect, useRef } from "react";
import type { LiveTip } from "@/hooks/useLiveStream";

interface LiveTipFeedProps {
  tips: LiveTip[];
}

export function LiveTipFeed({ tips }: LiveTipFeedProps) {
  const prevLen = useRef(0);

  useEffect(() => {
    prevLen.current = tips.length;
  }, [tips]);

  if (tips.length === 0) return null;

  return (
    <div className="space-y-2" aria-live="polite" aria-label="Live tip notifications">
      {[...tips].reverse().slice(0, 5).map((tip, i) => (
        <div
          key={tip.id}
          className="flex items-center gap-3 rounded-xl border border-yellow-300/50 bg-yellow-50 dark:border-yellow-700/50 dark:bg-yellow-900/20 px-4 py-2.5 shadow-sm"
          style={{ opacity: 1 - i * 0.15 }}
        >
          <span className="text-xl" aria-hidden="true">💸</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-ink">
              <span className="text-wave">{tip.sender}</span> tipped{" "}
              <span className="text-yellow-600 dark:text-yellow-400">{tip.amount} XLM</span>
            </p>
            {tip.memo && <p className="text-xs text-ink/60 truncate">"{tip.memo}"</p>}
          </div>
          <span className="shrink-0 text-xs text-ink/40">
            {new Date(tip.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      ))}
    </div>
  );
}
