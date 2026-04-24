"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccordionItem } from "./AccordionItem";

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = "",
}) => {
  const { isOpen } = useAccordionItem();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <div className={`p-5 pt-0 text-ink/70 dark:text-canvas/70 text-sm leading-relaxed border-t border-ink/5 dark:border-canvas/5 mt-0 ${className}`}>
             {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
