"use client";

import { useCallback, useEffect, useRef } from "react";

type Politeness = "polite" | "assertive";

/**
 * useAnnouncer — injects a visually-hidden live region into the DOM and
 * returns an `announce` function that screen readers will read aloud.
 *
 * Usage:
 *   const announce = useAnnouncer();
 *   announce("12 results found");           // polite (default)
 *   announce("Error: invalid input", "assertive");
 */
export function useAnnouncer() {
  const politeRef = useRef<HTMLDivElement | null>(null);
  const assertiveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const create = (politeness: Politeness) => {
      const el = document.createElement("div");
      el.setAttribute("aria-live", politeness);
      el.setAttribute("aria-atomic", "true");
      el.setAttribute("aria-relevant", "additions text");
      // Visually hidden but readable by screen readers
      Object.assign(el.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: "0",
      });
      document.body.appendChild(el);
      return el;
    };

    politeRef.current = create("polite");
    assertiveRef.current = create("assertive");

    return () => {
      politeRef.current?.remove();
      assertiveRef.current?.remove();
    };
  }, []);

  const announce = useCallback((message: string, politeness: Politeness = "polite") => {
    const el = politeness === "assertive" ? assertiveRef.current : politeRef.current;
    if (!el) return;
    // Clear then set — forces re-announcement even for identical messages
    el.textContent = "";
    requestAnimationFrame(() => {
      el.textContent = message;
    });
  }, []);

  return announce;
}
