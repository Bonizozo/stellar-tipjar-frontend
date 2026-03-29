"use client";

import React, { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearch } from "@/hooks/useSearch";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

interface SearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function Search({ onSearch, placeholder, className = "" }: SearchProps) {
  const {
    query,
    setQuery,
    results,
    recentSearches,
    isLoading,
    activeIndex,
    setActiveIndex,
    showResults,
    setShowResults,
    handleKeyDown,
    selectSuggestion,
    saveSearch,
    removeRecentSearch,
  } = useSearch();

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResults]);

  const handleSelectRecent = (searchTerm: string) => {
    setQuery(searchTerm);
    saveSearch(searchTerm);
    setShowResults(false);
    onSearch?.(searchTerm);
  };

  const handleSelectSuggestion = (suggestion: any) => {
    selectSuggestion(suggestion);
    onSearch?.(suggestion.name.startsWith("#") ? suggestion.name.slice(1) : suggestion.name);
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <SearchInput
        value={query}
        onChange={(val) => {
          setQuery(val);
          setShowResults(true);
          onSearch?.(val);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowResults(true)}
        placeholder={placeholder}
        isLoading={isLoading}
      />

      <AnimatePresence>
        {showResults && (
          <SearchResults
            isVisible={showResults}
            query={query}
            results={results}
            recentSearches={recentSearches}
            activeIndex={activeIndex}
            isLoading={isLoading}
            onSelect={handleSelectSuggestion}
            onSelectRecent={handleSelectRecent}
            onRemoveRecent={removeRecentSearch}
            onHoverIndex={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
