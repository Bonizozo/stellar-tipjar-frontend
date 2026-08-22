"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createNamespacedStorage } from "@/lib/storage";

const storage = createNamespacedStorage("scroll", "session");

/**
 * Persists and restores scroll position for a given key (typically the route).
 * Works with both window scroll and a custom scroll container.
 *
 * @param key       Unique identifier for this scroll position (e.g. route path)
 * @param containerRef  Optional ref to a scrollable element; defaults to window
 * @param enabled   Set to false to disable (e.g. while data is loading)
 */
export function useScrollRestoration(
  key?: string,
  containerRef?: React.RefObject<HTMLElement | null>,
  enabled = true,
) {
  const pathname = usePathname();
  const posKey = `pos:${key ?? pathname}`;
  const savedRef = useRef(false);

  // Restore on mount
  useEffect(() => {
    if (!enabled || savedRef.current) return;

    try {
      const raw = storage.getString(posKey);
      if (!raw) return;
      const saved = Number(raw);
      if (!Number.isFinite(saved) || saved <= 0) return;

      const el = containerRef?.current;
      if (el) {
        el.scrollTop = saved;
      } else {
        window.scrollTo({ top: saved, behavior: "instant" });
      }
      savedRef.current = true;
    } catch {
      // storage may be unavailable (private browsing, etc.)
    }
  }, [enabled, posKey, containerRef]);

  // Save on scroll
  useEffect(() => {
    if (!enabled) return;

    const el = containerRef?.current;
    const target: EventTarget = el ?? window;

    const save = () => {
      try {
        const pos = el ? el.scrollTop : window.scrollY;
        storage.setString(posKey, String(pos));
      } catch {
        // ignore
      }
    };

    target.addEventListener("scroll", save, { passive: true });
    return () => target.removeEventListener("scroll", save);
  }, [enabled, posKey, containerRef]);

  // Clear saved position when navigating away
  useEffect(() => {
    return () => {
      // Only clear on actual navigation (pathname change), not on re-renders
    };
  }, [pathname, posKey]);

  const clearSavedPosition = () => {
    storage.remove(posKey);
  };

  return { clearSavedPosition };
}
