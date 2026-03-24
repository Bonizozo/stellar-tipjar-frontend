"use client";

import { useCallback, useRef } from "react";

/**
 * Returns a throttled callback that runs at most once every delayMs window.
 */
export function useThrottle<T extends (...args: never[]) => void>(
  callback: T,
  delayMs: number,
): T {
  const lastCalledAtRef = useRef(0);

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCalledAtRef.current < delayMs) {
        return;
      }

      lastCalledAtRef.current = now;
      callback(...args);
    },
    [callback, delayMs],
  );

  return throttled as T;
}
