import { useState, useCallback } from "react";

export type DropdownTrigger = "click" | "hover";
export type DropdownPlacement = "bottom" | "top" | "left" | "right";

interface UseDropdownOptions {
  trigger?: DropdownTrigger;
  defaultOpen?: boolean;
}

export function useDropdown({ trigger = "click", defaultOpen = false }: UseDropdownOptions = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const triggerProps =
    trigger === "hover"
      ? { onMouseEnter: open, onMouseLeave: close }
      : { onClick: toggle };

  return { isOpen, open, close, toggle, triggerProps };
}
