"use client";

import { useCallback } from "react";

export interface ArrowNavOptions {
  vertical?: boolean;
  horizontal?: boolean;
  wrap?: boolean;
}

export function useArrowKeyNavigation(
  items: HTMLElement[],
  options: ArrowNavOptions = { vertical: true, horizontal: false, wrap: true }
) {
  const handleArrowKey = useCallback(
    (e: React.KeyboardEvent, direction: "up" | "down" | "left" | "right") => {
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      if ((direction === "up" || direction === "left") && options.vertical) {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = options.wrap ? items.length - 1 : currentIndex;
        }
      } else if ((direction === "down" || direction === "right") && options.vertical) {
        nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) {
          nextIndex = options.wrap ? 0 : currentIndex;
        }
      }

      if (nextIndex !== currentIndex) {
        e.preventDefault();
        items[nextIndex].focus();
      }
    },
    [items, options]
  );

  return handleArrowKey;
}
