"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { pageTransitionVariants, reducedVariants } from "@/utils/animations";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced
    ? reducedVariants(pageTransitionVariants)
    : pageTransitionVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
