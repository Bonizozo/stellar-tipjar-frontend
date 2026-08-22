"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainerVariants, staggerItemVariants } from "@/utils/animations";

const stats = [
  {
    value: "18,000+",
    label: "Tips Sent",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "2,400+",
    label: "Active Creators",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "500K+",
    label: "XLM Distributed",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    value: "150+",
    label: "Countries Reached",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function SocialProofStrip() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-label="Platform statistics"
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-r from-wave/5 via-accent/5 to-accent-alt/5 backdrop-blur-sm"
    >
      <motion.div
        className="grid grid-cols-2 gap-px sm:grid-cols-4"
        variants={prefersReduced ? undefined : staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {stats.map(({ value, label, icon }) => (
          <motion.div
            key={label}
            variants={prefersReduced ? undefined : staggerItemVariants}
            className="flex flex-col items-center gap-2 px-6 py-8 text-center"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-wave/10 text-wave">
              {icon}
            </span>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sunrise to-wave tabular-nums">
              {value}
            </p>
            <p className="text-sm font-medium text-ink/60 uppercase tracking-wide">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
