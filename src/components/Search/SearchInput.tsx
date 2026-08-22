"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  placeholder = "Search creators, categories...",
  className = "",
  isLoading = false,
}: SearchInputProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 group-focus-within:text-wave transition-colors pointer-events-none">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        aria-label="Search creators"
        aria-autocomplete="list"
        autoComplete="off"
        className="w-full pl-12 pr-12 py-3.5 rounded-full border-2 border-ink/10 bg-[color:var(--surface)] text-ink placeholder:text-ink/40 focus:border-wave focus:ring-4 focus:ring-wave/10 outline-none transition-all duration-300 shadow-sm hover:border-ink/20"
      />

      {/* Action Buttons (Loading or Clear) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="h-5 w-5 animate-spin rounded-full border-2 border-wave/20 border-t-wave"
            />
          ) : value && (
            <motion.button
              key="clear"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange("")}
              className="text-ink/40 hover:text-ink transition-colors p-0.5 rounded-full hover:bg-ink/5"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
