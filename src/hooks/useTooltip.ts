// Radix UI handles positioning, collision detection, and delay natively.
// This hook is provided for cases where you need programmatic control
// over tooltip visibility outside of the Radix component tree.

import { useState, useCallback, useRef, useEffect } from "react";

interface UseTooltipOptions {
  delayDuration?: number;
}

export function useTooltip({ delayDuration = 400 }: UseTooltipOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setIsOpen(true), delayDuration);
  }, [delayDuration]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { isOpen, show, hide };
}

