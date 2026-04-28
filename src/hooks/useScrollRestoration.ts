"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY_PREFIX = "vscroll_pos_";

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
  const storageKey = STORAGE_KEY_PREFIX + (key ?? pathname);
  const savedRef = useRef(false);

  // Restore on mount
  useEffect(() => {
    if (!enabled || savedRef.current) return;

    try {
      const raw = sessionStorage.getItem(storageKey);
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
      // sessionStorage may be unavailable (private browsing, etc.)
    }
  }, [enabled, storageKey, containerRef]);

  // Save on scroll
  useEffect(() => {
    if (!enabled) return;

    const el = containerRef?.current;
    const target: EventTarget = el ?? window;

    const save = () => {
      try {
        const pos = el ? el.scrollTop : window.scrollY;
        sessionStorage.setItem(storageKey, String(pos));
      } catch {
        // ignore
      }
    };

    target.addEventListener("scroll", save, { passive: true });
    return () => target.removeEventListener("scroll", save);
  }, [enabled, storageKey, containerRef]);

  // Clear saved position when navigating away
  useEffect(() => {
    return () => {
      // Only clear on actual navigation (pathname change), not on re-renders
    };
  }, [pathname, storageKey]);

  const clearSavedPosition = () => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  return { clearSavedPosition };
}
