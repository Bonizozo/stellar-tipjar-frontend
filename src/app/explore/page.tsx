"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useRecommendations } from "@/hooks/useRecommendations";
import { CREATOR_EXAMPLES, Creator } from "@/utils/creatorData";
import { FilterSidebar } from "@/components/FilterSidebar";
import { VirtualCreatorGrid } from "@/components/VirtualList/VirtualCreatorGrid";
import { Search } from "@/components/Search";
import { FilterDropdown, type FilterOption } from "@/components/FilterDropdown";
import { motion, AnimatePresence } from "framer-motion";

const sortOptions: FilterOption[] = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Recently Joined" },
  { value: "top earners", label: "Top Earners" },
];

const fetchCreatorsMock = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, { search, categories, verifiedOnly, locations, sort }] =
    queryKey;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filtered = [...CREATOR_EXAMPLES];

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.username.toLowerCase().includes(s) ||
        c.displayName?.toLowerCase().includes(s) ||
        c.bio?.toLowerCase().includes(s) ||
        c.tags.some((t) => t.toLowerCase().includes(s)),
    );
  }

  if (categories.length > 0) {
    filtered = filtered.filter((c) =>
      categories.some((cat) => c.categories.includes(cat)),
    );
  }

  if (verifiedOnly) {
    filtered = filtered.filter((c) => c.verified);
  }

  if (locations.length > 0) {
    filtered = filtered.filter((c) => locations.includes(c.location));
  }

  if (sort === "popular") {
    filtered.sort((a, b) => (b.followers || 0) - (a.followers || 0));
  } else if (sort === "recent") {
    filtered.sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
    );
  } else if (sort === "top earners") {
    filtered.sort((a, b) => (b.earnings || 0) - (a.earnings || 0));
  }

  const pageSize = 6;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const items = filtered.slice(start, end);

  return {
    items,
    nextPage: end < filtered.length ? pageParam + 1 : undefined,
    total: filtered.length,
  };
};

export default function ExplorePage() {
  const { getSearchParam, setSearchParams } = useSearchParams();
  const { trackInteraction } = useRecommendations(0);

  const [search, setSearch] = useState(getSearchParam("search") || "");
  const [filters, setFilters] = useState({
    categories: getSearchParam("category")?.split(",") || [],
    verifiedOnly: getSearchParam("verified") === "true",
    locations: getSearchParam("location")?.split(",") || [],
  });
  const [sort, setSort] = useState(getSearchParam("sort") || "popular");

  const availableLocations = useMemo(
    () => Array.from(new Set(CREATOR_EXAMPLES.map((c) => c.location))).sort(),
    [],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["creators", { search, ...filters, sort }],
    queryFn: fetchCreatorsMock,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const allCreators = data?.pages.flatMap((page) => page.items) || [];
  const totalCount = data?.pages[0]?.total || 0;

  const handleSearch = (query: string) => {
    setSearch(query);
    setSearchParams({ search: query || null });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setSearchParams({
      category:
        newFilters.categories.length > 0
          ? newFilters.categories.join(",")
          : null,
      verified: newFilters.verifiedOnly ? "true" : null,
      location:
        newFilters.locations.length > 0 ? newFilters.locations.join(",") : null,
    });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setSearchParams({ sort: newSort !== "popular" ? newSort : null });
  };

  const hasActiveFilters =
    search ||
    filters.categories.length > 0 ||
    filters.verifiedOnly ||
    filters.locations.length > 0;

  const clearAll = () => {
    setSearch("");
    setFilters({ categories: [], verifiedOnly: false, locations: [] });
    setSort("popular");
    setSearchParams({
      search: null,
      category: null,
      verified: null,
      location: null,
      sort: null,
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-ink mb-4">
                Explore <span className="text-wave">Creators</span>
              </h1>
              <p className="text-lg text-ink/60 leading-relaxed translate-y-[-4px]">
                Discover amazing builders, artists, and community leaders on
                Stellar. Support your favorites and help the ecosystem grow.
              </p>
            </div>
            <Link
              href="/compare"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-wave/10 text-wave rounded-xl hover:bg-wave/20 transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Compare Creators
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Main Controls */}
      <section className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Search
            onSearch={handleSearch}
            placeholder="Search by name, tags, or bio..."
            className="flex-1"
          />
          <div className="flex items-center gap-3 w-full md:w-auto">
            <FilterDropdown
              label="Sort by"
              options={sortOptions}
              value={sort}
              onChange={handleSortChange}
              className="flex-1 md:min-w-[200px]"
            />
            {/* Mobile Filter Toggle could go here */}
          </div>
        </div>

        {/* Active Filters Bar */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 overflow-hidden"
            >
              <span className="text-sm font-bold text-ink/40 mr-1 uppercase tracking-wider">
                Active:
              </span>
              {search && (
                <span className="px-3 py-1 bg-wave/10 text-wave rounded-full text-xs font-bold flex items-center gap-2 border border-wave/20">
                  Search: {search}
                  <button
                    onClick={() => handleSearch("")}
                    className="hover:text-ink"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold flex items-center gap-2 border border-accent/20"
                >
                  {cat}
                  <button
                    onClick={() =>
                      handleFilterChange({
                        ...filters,
                        categories: filters.categories.filter((c) => c !== cat),
                      })
                    }
                    className="hover:text-ink"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.verifiedOnly && (
                <span className="px-3 py-1 bg-accent-alt/10 text-accent-alt rounded-full text-xs font-bold flex items-center gap-2 border border-accent-alt/20">
                  Verified Only
                  <button
                    onClick={() =>
                      handleFilterChange({ ...filters, verifiedOnly: false })
                    }
                    className="hover:text-ink"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearAll}
                className="text-xs font-bold text-wave underline decoration-wave/30 underline-offset-4 hover:decoration-wave transition-all ml-2"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="flex gap-10">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          availableLocations={availableLocations}
        />

        {/* Grid Content */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-ink/40">
              {status === "loading"
                ? "Searching..."
                : `Found ${totalCount} creators`}
            </p>
          </div>

          <VirtualCreatorGrid
            creators={allCreators}
            isLoading={status === "loading"}
            trackInteraction={trackInteraction}
            onEndReached={fetchNextPage}
            hasMore={!!hasNextPage}
            isFetchingMore={isFetchingNextPage}
            scrollRestorationKey="explore-creators"
          />
        </div>
      </div>
    </div>
  );
}
