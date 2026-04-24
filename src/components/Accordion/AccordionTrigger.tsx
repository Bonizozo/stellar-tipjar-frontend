"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAccordion } from "./index";
import { useAccordionItem } from "./AccordionItem";

interface AccordionTriggerProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  hideArrow?: boolean;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  icon,
  className = "",
  hideArrow = false,
}) => {
  const { toggleItem } = useAccordion();
  const { value, isOpen, disabled } = useAccordionItem();

  return (
    <button
      type="button"
      onClick={() => !disabled && toggleItem(value)}
      disabled={disabled}
      aria-expanded={isOpen}
      className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-300 focus-visible:outline-none focus:bg-ink/5 dark:focus:bg-canvas/5 ${
        isOpen ? "bg-wave/[0.03] dark:bg-wave/[0.05]" : "hover:bg-ink/5 dark:hover:bg-canvas/5"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`p-2 rounded-lg bg-wave/10 text-wave dark:bg-wave/20 dark:text-wave-dark`}>
            {icon}
          </div>
        )}
        <span className={`text-base font-bold transition-colors ${isOpen ? "text-wave" : "text-ink/80 dark:text-canvas/80"}`}>
          {children}
        </span>
      </div>

      {!hideArrow && (
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
           className={`p-1 rounded-full ${isOpen ? "bg-wave/10 text-wave" : "text-ink/40 dark:text-canvas/40"}`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      )}
    </button>
  );
};
