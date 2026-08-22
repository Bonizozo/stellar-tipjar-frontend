"use client";

import { useEffect, useRef, useCallback } from "react";

export function useFocusManagement(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      const firstFocusable = containerRef.current?.querySelector(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) as HTMLElement;
      firstFocusable?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const focusableElements = Array.from(
      containerRef.current?.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) || []
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement
    );
    let nextIndex = currentIndex + (e.shiftKey ? -1 : 1);

    if (nextIndex < 0) nextIndex = focusableElements.length - 1;
    if (nextIndex >= focusableElements.length) nextIndex = 0;

    e.preventDefault();
    focusableElements[nextIndex].focus();
  }, []);

  return { containerRef, handleKeyDown };
}
