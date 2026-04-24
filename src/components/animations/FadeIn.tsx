"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInVariants, reducedVariants } from "@/utils/animations";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedVariants(fadeInVariants) : fadeInVariants;

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
