"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import { CREATOR_EXAMPLES, type Creator } from "@/utils/creatorData";
import { CATEGORIES, TAGS_EXAMPLES } from "@/utils/categories";
import { fuzzyMatch } from "@/utils/fuzzyMatch";

export type SuggestionType = "creator" | "category" | "tag";

export interface SearchSuggestion {
  id: string;
  name: string;
  type: SuggestionType;
  description?: string;
  avatar?: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: Record<string, any>;
  createdAt: Date;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: Date;
  results: SearchSuggestion[];
}

const RECENT_SEARCHES_KEY = "stellar_recent_searches";
const SAVED_SEARCHES_KEY = "stellar_saved_searches";
const SEARCH_HISTORY_KEY = "stellar_search_history";
const MAX_RECENT_SEARCHES = 5;
const MAX_HISTORY_ITEMS = 20;

export function useSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  // Load recent searches, history, and saved searches on mount
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }

    const historyStored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (historyStored) {
      try {
        setSearchHistory(JSON.parse(historyStored));
      } catch (e) {
        console.error("Failed to parse search history", e);
      }
    }

    const savedStored = localStorage.getItem(SAVED_SEARCHES_KEY);
    if (savedStored) {
      try {
        setSavedSearches(JSON.parse(savedStored));
      } catch (e) {
        console.error("Failed to parse saved searches", e);
      }
    }
  }, []);

  // Update results based on query
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const lowerQuery = debouncedQuery.toLowerCase();
      
      const creatorSuggestions: SearchSuggestion[] = CREATOR_EXAMPLES
        .filter(c => 
          c.username.toLowerCase().includes(lowerQuery) || 
          c.displayName?.toLowerCase().includes(lowerQuery)
        )
        .slice(0, 5)
        .map(c => ({
          id: `creator-${c.username}`,
          name: c.displayName || `@${c.username}`,
          type: "creator",
          description: `@${c.username}`,
        }));

      const categorySuggestions: SearchSuggestion[] = Array.from(CATEGORIES)
        .filter(cat => cat.toLowerCase().includes(lowerQuery))
        .map(cat => ({
          id: `category-${cat}`,
          name: cat.charAt(0).toUpperCase() + cat.slice(1),
          type: "category",
          description: "Category",
        }));

      const tagSuggestions: SearchSuggestion[] = Array.from(TAGS_EXAMPLES)
        .filter(tag => tag.toLowerCase().includes(lowerQuery))
        .slice(0, 3)
        .map(tag => ({
          id: `tag-${tag}`,
          name: `#${tag}`,
          type: "tag",
          description: "Tag",
        }));

      setResults([...creatorSuggestions, ...categorySuggestions, ...tagSuggestions]);
      setIsLoading(false);
      setActiveIndex(-1);
    }, 200);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const saveSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchTerm);
      const newRecent = [searchTerm, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  const removeRecentSearch = useCallback((searchTerm: string) => {
    setRecentSearches(prev => {
      const newRecent = prev.filter(s => s !== searchTerm);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  // Advanced Search: Add to search history
  const addToHistory = useCallback((searchResults: SearchSuggestion[]) => {
    const historyItem: SearchHistoryItem = {
      query,
      timestamp: new Date(),
      results: searchResults,
    };

    setSearchHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [query]);

  // Advanced Search: Clear history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  // Advanced Search: Save current search
  const saveAsSearch = useCallback((name: string, filters: Record<string, any> = {}) => {
    if (!name.trim() || !query.trim()) return;

    const newSavedSearch: SavedSearch = {
      id: `search_${Date.now()}`,
      name,
      query,
      filters,
      createdAt: new Date(),
    };

    setSavedSearches(prev => {
      const updated = [...prev, newSavedSearch];
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });

    return newSavedSearch;
  }, [query]);

  // Advanced Search: Delete saved search
  const deleteSavedSearch = useCallback((searchId: string) => {
    setSavedSearches(prev => {
      const updated = prev.filter(s => s.id !== searchId);
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Advanced Search: Load saved search
  const loadSavedSearch = useCallback((search: SavedSearch) => {
    setQuery(search.query);
    setShowResults(true);
  }, []);

  // Advanced Search: Get autocomplete suggestions with fuzzy matching
  const getAutocompleteSuggestions = useCallback((input: string, limit: number = 5): string[] => {
    if (!input.trim()) {
      return recentSearches.slice(0, limit);
    }

    const allItems = [
      ...recentSearches,
      ...searchHistory.map(h => h.query),
      ...savedSearches.map(s => s.query),
    ];

    const uniqueItems = Array.from(new Set(allItems));
    const fuzzyResults = fuzzyMatch(input, uniqueItems);
    
    return fuzzyResults.slice(0, limit).map(m => m.item);
  }, [recentSearches, searchHistory, savedSearches]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        const selected = results[activeIndex];
        selectSuggestion(selected);
      } else {
        saveSearch(query);
        setShowResults(false);
      }
    } else if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name.startsWith("#") ? suggestion.name.slice(1) : suggestion.name);
    saveSearch(suggestion.name);
    setShowResults(false);
    // Here logic would probably navigate or update global filters
  };

  return {
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
    // Advanced search features
    searchHistory,
    addToHistory,
    clearHistory,
    savedSearches,
    saveAsSearch,
    deleteSavedSearch,
    loadSavedSearch,
    getAutocompleteSuggestions,
  };
}
