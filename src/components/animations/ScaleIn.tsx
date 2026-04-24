"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reducedVariants, scaleInVariants } from "@/utils/animations";

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedVariants(scaleInVariants) : scaleInVariants;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
