"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainerVariants, staggerItemVariants, reducedVariants } from "@/utils/animations";

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}

/** Wraps children in a stagger container. Direct children should use staggerItemVariants. */
export function StaggerList({ children, className, as: Tag = "div" }: StaggerListProps) {
  const prefersReduced = useReducedMotion();
  const container = prefersReduced
    ? reducedVariants(staggerContainerVariants)
    : staggerContainerVariants;

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/** Individual item inside a StaggerList */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const item = prefersReduced ? reducedVariants(staggerItemVariants) : staggerItemVariants;

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
