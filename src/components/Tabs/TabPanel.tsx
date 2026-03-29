"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabPanelProps {
  id: string;
  activeId: string;
  children: React.ReactNode;
  lazy?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ id, activeId, children, lazy = true }) => {
  const isActive = id === activeId;
  const [mounted, setMounted] = React.useState(!lazy || isActive);

  React.useEffect(() => {
    if (isActive && !mounted) setMounted(true);
  }, [isActive, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={id}
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="py-6"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
