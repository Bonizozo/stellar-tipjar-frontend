"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { OptimizedImage } from "@/components/OptimizedImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imageUrl?: string;
}

export function SectionCard({ title, description, icon, imageUrl }: SectionCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card dark:border-ink-dark/10 dark:bg-[color:var(--surface-dark)] dark:shadow-card-dark"
      whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
    >
      {imageUrl ? (
        <div className="mb-4 relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-wave/20">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            fill
            sizes="48px"
          />
        </div>
      ) : icon ? (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-wave/10 text-wave dark:bg-wave-dark/10 dark:text-wave-dark">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-ink dark:text-ink-dark">{title}</h3>
      <p className="mt-2 text-sm text-ink/70 dark:text-ink-dark/70">{description}</p>
    </motion.article>
  );
}
