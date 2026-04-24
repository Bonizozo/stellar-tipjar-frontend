"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreatorCard } from "@/components/CreatorCard";
import { Creator } from "@/utils/creatorData";

interface CreatorGridProps {
  creators: Creator[];
  isLoading: boolean;
  trackInteraction?: (type: string, username: string, category: string) => void;
}

export function CreatorGrid({
  creators,
  isLoading,
  trackInteraction,
}: CreatorGridProps) {
  if (isLoading && creators.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[420px] rounded-3xl bg-ink/5 animate-pulse border border-ink/5"
          >
            <div className="h-24 bg-ink/5 rounded-t-3xl" />
            <div className="flex flex-col items-center px-6 -mt-12">
              <div className="h-24 w-24 rounded-full bg-ink/10 border-4 border-[color:var(--surface)] mb-4" />
              <div className="h-4 w-32 bg-ink/10 rounded mb-2" />
              <div className="h-6 w-48 bg-ink/10 rounded mb-1" />
              <div className="h-4 w-24 bg-ink/10 rounded mb-8" />
              <div className="h-4 w-full bg-ink/10 rounded mb-2" />
              <div className="h-4 w-2/3 bg-ink/10 rounded mb-8" />
              <div className="w-full h-12 bg-ink/5 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="relative mb-8 text-wave/20">
          <svg
            className="h-48 w-48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <path d="M11 8c-1.66 0-3 1.34-3 3" />
          </svg>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center text-wave"
          >
            <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
        </div>
        <h3 className="text-2xl font-bold text-ink mb-2">No creators match your search</h3>
        <p className="text-ink/50 max-w-md mx-auto">
          We couldn't find any creators matching those filters. Try adjusting your search term or clearing some filters to see more results.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.username}
            creator={creator}
            trackInteraction={trackInteraction}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
