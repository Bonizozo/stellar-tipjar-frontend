"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchSuggestion } from "./SearchSuggestion";
import { SearchSuggestion as SuggestionType } from "@/hooks/useSearch";

interface SearchDropdownProps {
  isVisible: boolean;
  query: string;
  results: SuggestionType[];
  recentSearches: string[];
  activeIndex: number;
  isLoading: boolean;
  onSelect: (suggestion: SuggestionType) => void;
  onSelectRecent: (searchTerm: string) => void;
  onRemoveRecent: (searchTerm: string) => void;
  onHoverIndex: (index: number) => void;
}

export function SearchDropdown({
  isVisible,
  query,
  results,
  recentSearches,
  activeIndex,
  isLoading,
  onSelect,
  onSelectRecent,
  onRemoveRecent,
  onHoverIndex,
}: SearchDropdownProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-ink/10 bg-[color:var(--surface)] shadow-2xl py-2"
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="h-6 w-6 border-2 border-wave/30 border-t-wave rounded-full animate-spin" />
        </div>
      ) : query.trim() ? (
        results.length > 0 ? (
          <div>
            {results.map((s, idx) => (
              <SearchSuggestion
                key={s.id}
                suggestion={s}
                isActive={activeIndex === idx}
                query={query}
                onMouseEnter={() => onHoverIndex(idx)}
                onClick={() => onSelect(s)}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-ink/50">
            No suggestions found for &ldquo;{query}&rdquo;
          </div>
        )
      ) : (
        <div>
          {recentSearches.length > 0 ? (
            <div>
              <div className="px-4 py-1.5 text-xs font-semibold text-ink/40 uppercase tracking-wider">
                Recent Searches
              </div>
              {recentSearches.map((search, idx) => (
                <div
                  key={search}
                  onMouseEnter={() => onHoverIndex(idx)}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
                    activeIndex === idx ? "bg-wave/10" : "hover:bg-ink/5"
                  }`}
                >
                  <span
                    onClick={() => onSelectRecent(search)}
                    className="flex-1 text-sm font-medium text-ink"
                  >
                    {search}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveRecent(search);
                    }}
                    className="p-1 rounded text-ink/40 hover:text-ink/80 hover:bg-ink/10 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-ink/50">
              Type to start searching creators, tags, or categories.
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
