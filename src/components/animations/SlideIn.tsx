"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reducedVariants, slideInVariants } from "@/utils/animations";

interface SlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SlideIn({ children, className, delay = 0 }: SlideInProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedVariants(slideInVariants) : slideInVariants;

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
