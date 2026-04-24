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
