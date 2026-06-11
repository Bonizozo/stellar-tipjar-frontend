"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AccordionContextValue {
  activeItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be wrapped in Accordion");
  }
  return context;
};

interface AccordionProps {
  children: ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : [defaultValue as string]
  );

  const activeItems = value !== undefined
    ? (Array.isArray(value) ? value : [value as string])
    : internalValue;

  const toggleItem = (itemValue: string) => {
    let newValue: string[];

    if (type === "single") {
      newValue = activeItems.includes(itemValue) ? [] : [itemValue];
    } else {
      newValue = activeItems.includes(itemValue)
        ? activeItems.filter((i) => i !== itemValue)
        : [...activeItems, itemValue];
    }

    if (value === undefined) {
      setInternalValue(newValue);
    }

    if (onValueChange) {
      onValueChange(type === "single" ? (newValue[0] || "") : newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem, type }}>
      <div className={`space-y-2 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, value, className = "" }) => {
  return (
    <div className={`border border-ink/10 rounded-xl overflow-hidden ${className}`} data-value={value}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, value, className = "" }) => {
  const { activeItems, toggleItem } = useAccordion();
  const isOpen = activeItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      className={`w-full flex items-center justify-between px-4 py-3 text-left font-medium text-ink hover:bg-ink/5 transition-colors ${className}`}
    >
      {children}
      <svg
        className={`h-4 w-4 shrink-0 text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

interface AccordionContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, value, className = "" }) => {
  const { activeItems } = useAccordion();
  const isOpen = activeItems.includes(value);

  if (!isOpen) return null;

  return (
    <div className={`px-4 pb-4 text-sm text-ink/80 ${className}`}>
      {children}
    </div>
  );
};
