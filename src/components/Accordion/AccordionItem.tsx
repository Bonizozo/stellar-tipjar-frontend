"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAccordion } from "./index";

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);

export const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem sub-components must be wrapped in AccordionItem");
  }
  return context;
};

interface AccordionItemProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  value,
  disabled = false,
  className = "",
}) => {
  const { activeItems } = useAccordion();
  const isOpen = activeItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        className={`overflow-hidden rounded-xl border border-ink/10 bg-canvas transition-all duration-300 dark:border-canvas/10 dark:bg-ink ${
          isOpen ? "shadow-md ring-1 ring-wave/20 dark:ring-wave/30" : "hover:border-ink/20 dark:hover:border-canvas/20"
        } ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};
