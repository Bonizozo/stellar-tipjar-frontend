import { useState, useCallback } from "react";
import { createNamespacedStorage } from "@/lib/storage";

const storage = createNamespacedStorage("banner");

export function useBanner(id: string, persistent = false) {
  const nsKey = `dismissed:${id}`;
  const legacyKey = `banner_dismissed_${id}`;

  const [isVisible, setIsVisible] = useState(() => {
    if (persistent) {
      const val = storage.getString(nsKey, { legacyKey });
      if (val !== null) return val !== "true";
    }
    return true;
  });

  const dismiss = useCallback(() => {
    setIsVisible(false);
    if (persistent) {
      storage.setString(nsKey, "true");
    }
  }, [persistent, nsKey]);

  return { isVisible, dismiss };
}
