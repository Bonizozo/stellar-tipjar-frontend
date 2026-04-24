"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchSuggestion as SuggestionType } from "@/hooks/useSearch";
import { SearchSuggestion } from "./SearchSuggestion";

interface SearchResultsProps {
  isVisible: boolean;
  query: string;
  results: SuggestionType[];
  recentSearches: string[];
  activeIndex: number;
  isLoading: boolean;
  onSelect: (suggestion: SuggestionType) => void;
  onSelectRecent: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onHoverIndex: (index: number) => void;
}

export function SearchResults({
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
}: SearchResultsProps) {
  if (!isVisible) return null;

  const showRecent = !query && recentSearches.length > 0;
  const showResults = query && results.length > 0;
  const showEmpty = query && !isLoading && results.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute top-full mt-2 w-full bg-[color:var(--surface)] border border-ink/10 rounded-2xl shadow-2xl overflow-hidden z-20 backdrop-blur-lg"
    >
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {/* Recent Searches */}
        {showRecent && (
          <div className="p-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-ink/40 px-3 py-2">
              Recent Searches
            </h4>
            {recentSearches.map((search, i) => (
              <div
                key={i}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-ink/5 cursor-pointer transition-colors"
                onClick={() => onSelectRecent(search)}
              >
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-ink">{search}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveRecent(search);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-ink/40 hover:text-ink transition-opacity p-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="divide-y divide-ink/5">
            {results.map((suggestion, index) => (
              <SearchSuggestion
                key={suggestion.id}
                suggestion={suggestion}
                isActive={index === activeIndex}
                query={query}
                onMouseEnter={() => onHoverIndex(index)}
                onClick={() => onSelect(suggestion)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {showEmpty && (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-3 text-ink/20">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">No results found for "{query}"</p>
            <p className="text-xs text-ink/40 mt-1">Try a different keyword or category.</p>
          </div>
        )}

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[color:var(--surface)]/50 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
            >
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-wave/20 border-t-wave" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
