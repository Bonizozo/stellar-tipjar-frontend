"use client";

import { useMemo, useState, useEffect } from "react";
import { SlidersHorizontal, X, Tag } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters, type SearchFilterState } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { useDebounce } from "@/hooks/useDebounce";
import { CREATOR_EXAMPLES, type Creator } from "@/utils/creatorData";
import { CATEGORIES } from "@/utils/categories";

const HISTORY_KEY = "stellar_search_history_page";
const DEFAULT_FILTERS: SearchFilterState = { categories: [], verifiedOnly: false, sort: "popular" };

function trackSearch(query: string) {
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/search", JSON.stringify({ query, ts: Date.now() }));
  }
}

function applyFilters(creators: Creator[], query: string, filters: SearchFilterState, activeTags: string[]): Creator[] {
  let result = [...creators];

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (c) =>
        c.username.toLowerCase().includes(q) ||
        c.displayName?.toLowerCase().includes(q) ||
        c.bio?.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.categories.some((cat) => cat.toLowerCase().includes(q))
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((c) => filters.categories.some((cat) => c.categories.includes(cat)));
  }

  if (activeTags.length > 0) {
    result = result.filter((c) => activeTags.every((tag) => c.tags.includes(tag)));
  }

  if (filters.verifiedOnly) {
    result = result.filter((c) => c.verified);
  }

  switch (filters.sort) {
    case "popular":
      result.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
      break;
    case "recent":
      result.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
      break;
    case "earnings":
      result.sort((a, b) => b.earnings - a.earnings);
      break;
  }

  return result;
}

/** Compute per-category and per-tag counts from a result set */
function computeFacets(creators: Creator[]) {
  const catCounts = new Map<string, number>();
  const tagCounts = new Map<string, number>();

  for (const c of creators) {
    for (const cat of c.categories) catCounts.set(cat, (catCounts.get(cat) ?? 0) + 1);
    for (const tag of c.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }

  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return { catCounts, topTags };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]"));
    } catch {}
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    trackSearch(debouncedQuery);
    setHistory((prev) => {
      const next = [debouncedQuery, ...prev.filter((h) => h !== debouncedQuery)].slice(0, 10);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, [debouncedQuery]);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(t);
  }, [debouncedQuery, filters, activeTags]);

  const results = useMemo(
    () => applyFilters(CREATOR_EXAMPLES, debouncedQuery, filters, activeTags),
    [debouncedQuery, filters, activeTags]
  );

  // Facets computed from the full unfiltered-by-tags set so counts stay meaningful
  const baseResults = useMemo(
    () => applyFilters(CREATOR_EXAMPLES, debouncedQuery, { ...filters, categories: [] }, []),
    [debouncedQuery, filters]
  );
  const { catCounts, topTags } = useMemo(() => computeFacets(baseResults), [baseResults]);

  const activeFilterCount = filters.categories.length + (filters.verifiedOnly ? 1 : 0) + activeTags.length;

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setActiveTags([]);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Search Creators</h1>
        <p className="mt-1 text-ink/60">Find creators by name, category, or tag.</p>
      </div>

      {/* Search bar + filter toggle */}
      <div className="flex gap-3">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`relative inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
            showFilters || activeFilterCount > 0
              ? "border-wave bg-wave/10 text-wave"
              : "border-ink/20 text-ink/70 hover:bg-ink/5"
          }`}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-wave text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Recent searches */}
      {!query && history.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink/40">Recent:</span>
          {history.slice(0, 5).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setQuery(h)}
              className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs text-ink/70 hover:border-wave/40 hover:text-ink transition-colors"
            >
              {h}
              <X
                className="h-3 w-3 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory((prev) => {
                    const next = prev.filter((s) => s !== h);
                    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
                    return next;
                  });
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Active tag chips */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink/40">Tags:</span>
          {activeTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className="inline-flex items-center gap-1 rounded-full bg-wave/10 border border-wave/30 px-3 py-1 text-xs font-medium text-wave hover:bg-wave/20 transition-colors"
            >
              #{tag} <X className="h-3 w-3" />
            </button>
          ))}
          <button type="button" onClick={clearAll} className="text-xs text-ink/40 hover:text-ink underline">
            Clear all
          </button>
        </div>
      )}

      {/* Result count summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">
          {isLoading ? (
            <span className="inline-block h-4 w-24 animate-pulse rounded bg-ink/10" />
          ) : (
            <>
              <span className="font-semibold text-ink">{results.length}</span>{" "}
              creator{results.length !== 1 ? "s" : ""} found
              {(debouncedQuery || activeFilterCount > 0) && (
                <button type="button" onClick={clearAll} className="ml-3 text-xs text-wave hover:underline">
                  Clear all filters
                </button>
              )}
            </>
          )}
        </p>
      </div>

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Filter + facet sidebar */}
        {showFilters && (
          <div className="w-60 shrink-0 space-y-6">
            <SearchFilters filters={filters} onChange={setFilters} resultCount={results.length} />

            {/* Tag facets */}
            {topTags.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50">
                  <Tag className="h-3.5 w-3.5" /> Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {topTags.map(([tag, count]) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                        activeTags.includes(tag)
                          ? "bg-wave text-white"
                          : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                      }`}
                    >
                      #{tag}{" "}
                      <span className={activeTags.includes(tag) ? "text-white/70" : "text-ink/40"}>
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category facets with counts */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                Category counts
              </h3>
              <div className="space-y-1">
                {CATEGORIES.filter((cat) => catCounts.has(cat)).map((cat) => (
                  <div key={cat} className="flex items-center justify-between px-3 py-1 text-sm text-ink/60">
                    <span className="capitalize">{cat}</span>
                    <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-medium text-ink/50">
                      {catCounts.get(cat)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="min-w-0 flex-1">
          <SearchResults results={results} isLoading={isLoading} query={debouncedQuery} />
        </div>
      </div>
    </section>
  );
}

