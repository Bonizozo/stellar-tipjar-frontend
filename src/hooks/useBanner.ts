import { useState, useCallback } from "react";

const STORAGE_KEY_PREFIX = "banner_dismissed_";

export function useBanner(id: string, persistent = false) {
  const storageKey = STORAGE_KEY_PREFIX + id;

  const [isVisible, setIsVisible] = useState(() => {
    if (persistent && typeof window !== "undefined") {
      return localStorage.getItem(storageKey) !== "true";
    }
    return true;
  });

  const dismiss = useCallback(() => {
    setIsVisible(false);
    if (persistent && typeof window !== "undefined") {
      localStorage.setItem(storageKey, "true");
    }
  }, [persistent, storageKey]);

  return { isVisible, dismiss };
}
