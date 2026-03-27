"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterDropdown, type FilterOption } from "@/components/FilterDropdown";
import { Pagination } from "@/components/Pagination";
import { OptimizedImage } from "@/components/OptimizedImage";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "@/hooks/useSearchParams";
import { RecommendedCreators } from "@/components/RecommendedCreators";
import { useRecommendations } from "@/hooks/useRecommendations";

interface Creator {
  username: string;
  displayName?: string;
  category?: string;
  followers?: number;
}

const creatorExamples: Creator[] = [
  { username: "alice", displayName: "Alice", category: "art", followers: 1250 },
  { username: "stellar-dev", displayName: "Stellar Dev", category: "tech", followers: 3400 },
  { username: "pixelmaker", displayName: "Pixel Maker", category: "art", followers: 890 },
  { username: "community-lab", displayName: "Community Lab", category: "community", followers: 2100 },
  { username: "crypto-artist", displayName: "Crypto Artist", category: "art", followers: 1800 },
  { username: "blockchain-edu", displayName: "Blockchain Edu", category: "education", followers: 2900 },
  { username: "nft-creator", displayName: "NFT Creator", category: "art", followers: 4200 },
  { username: "defi-expert", displayName: "DeFi Expert", category: "tech", followers: 3100 },
  { username: "web3-builder", displayName: "Web3 Builder", category: "tech", followers: 2700 },
  { username: "dao-organizer", displayName: "DAO Organizer", category: "community", followers: 1950 },
  { username: "smart-contract-dev", displayName: "Smart Contract Dev", category: "tech", followers: 3800 },
  { username: "digital-artist", displayName: "Digital Artist", category: "art", followers: 2300 },
  { username: "crypto-educator", displayName: "Crypto Educator", category: "education", followers: 3500 },
  { username: "metaverse-architect", displayName: "Metaverse Architect", category: "tech", followers: 2800 },
  { username: "token-designer", displayName: "Token Designer", category: "art", followers: 1600 },
  { username: "blockchain-analyst", displayName: "Blockchain Analyst", category: "education", followers: 2400 },
  { username: "community-manager", displayName: "Community Manager", category: "community", followers: 1750 },
  { username: "protocol-dev", displayName: "Protocol Dev", category: "tech", followers: 4100 },
  { username: "3d-artist", displayName: "3D Artist", category: "art", followers: 2200 },
  { username: "crypto-writer", displayName: "Crypto Writer", category: "education", followers: 1900 },
  { username: "gamefi-dev", displayName: "GameFi Dev", category: "tech", followers: 3300 },
  { username: "generative-artist", displayName: "Generative Artist", category: "art", followers: 2600 },
  { username: "web3-educator", displayName: "Web3 Educator", category: "education", followers: 2100 },
  { username: "nft-collector", displayName: "NFT Collector", category: "community", followers: 1400 },
  { username: "solidity-dev", displayName: "Solidity Dev", category: "tech", followers: 3900 },
];

const categoryOptions: FilterOption[] = [
  { value: "all", label: "All Categories" },
  { value: "art", label: "Art" },
  { value: "tech", label: "Tech" },
  { value: "community", label: "Community" },
  { value: "education", label: "Education" },
];

const sortOptions: FilterOption[] = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Recently Joined" },
  { value: "name", label: "Name (A-Z)" },
];

export default function ExplorePage() {
  const { getSearchParam, setSearchParams } = useSearchParams();
  const { trackInteraction } = useRecommendations(0);
  
  const [search, setSearch] = useState(getSearchParam("search") || "");
  const [category, setCategory] = useState(getSearchParam("category") || "all");
  const [sort, setSort] = useState(getSearchParam("sort") || "popular");
  const [page, setPage] = useState(Number(getSearchParam("page")) || 1);
  const [pageSize, setPageSize] = useState(Number(getSearchParam("pageSize")) || 10);
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedSearch = useDebounce(search, 300);

  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(creatorExamples);
  
  const pagination = usePagination({
    totalItems: filteredCreators.length,
    pageSize,
    currentPage: page,
  });

  const paginatedCreators = filteredCreators.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let results = [...creatorExamples];

      // Filter by search
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        results = results.filter(
          (creator) =>
            creator.username.toLowerCase().includes(searchLower) ||
            creator.displayName?.toLowerCase().includes(searchLower)
        );
      }

      // Filter by category
      if (category !== "all") {
        results = results.filter((creator) => creator.category === category);
      }

      // Sort results
      if (sort === "popular") {
        results.sort((a, b) => (b.followers || 0) - (a.followers || 0));
      } else if (sort === "name") {
        results.sort((a, b) => a.username.localeCompare(b.username));
      }

      setFilteredCreators(results);
      setPage(1);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearch, category, sort]);

  useEffect(() => {
    setSearchParams({
      search: search || null,
      category: category !== "all" ? category : null,
      sort: sort !== "popular" ? sort : null,
      page: page > 1 ? String(page) : null,
      pageSize: pageSize !== 10 ? String(pageSize) : null,
    });
  }, [search, category, sort, page, pageSize, setSearchParams]);

  useEffect(() => {
    if (page > pagination.totalPages && pagination.totalPages > 0) {
      setPage(1);
    }
  }, [page, pagination.totalPages]);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("popular");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const hasActiveFilters = search || category !== "all" || sort !== "popular";

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Explore Creators</h1>
        <p className="mt-2 max-w-2xl text-ink/75">
          Discover and support creators on Stellar. Search by name or filter by category.
        </p>
      </div>

      <RecommendedCreators limit={3} />

      <div className="space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search creators by name or username..."
          className="w-full"
        />

        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            className="w-full sm:w-auto sm:min-w-[200px]"
          />

          <FilterDropdown
            label="Sort by"
            options={sortOptions}
            value={sort}
            onChange={setSort}
            className="w-full sm:w-auto sm:min-w-[200px]"
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg px-4 py-2 text-sm text-wave hover:text-wave/80 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-ink/10 pt-4">
        <p className="text-sm text-ink/60">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              Showing {pagination.startIndex + 1}-{pagination.endIndex} of {filteredCreators.length}{" "}
              {filteredCreators.length === 1 ? "creator" : "creators"}
            </>
          )}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
        </div>
      ) : filteredCreators.length > 0 ? (
        <>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCreators.map((creator) => (
            <li key={creator.username}>
              <Link
                href={`/creator/${creator.username}`}
                onClick={() => trackInteraction("click", creator.username, creator.category)}
                className="block rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5 transition hover:border-wave/40 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-ink/5">
                    <OptimizedImage
                      src={generateAvatarUrl(creator.username)}
                      alt={creator.displayName || creator.username}
                      fill
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-wave">
                      {creator.category || "Creator"}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-ink line-clamp-1">
                      {creator.displayName || `@${creator.username}`}
                    </p>
                    <p className="text-sm text-ink/60 line-clamp-1">@{creator.username}</p>
                  </div>
                  {creator.followers !== undefined && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-ink">{creator.followers.toLocaleString()}</p>
                      <p className="text-xs text-ink/60">followers</p>
                    </div>
                  )}
                </div>
              </Link>
            </li>
            ))}
          </ul>

          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            pageNumbers={pagination.pageNumbers}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
          />
        </>
      ) : (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-ink/20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-ink">No creators found</h3>
          <p className="mt-2 text-ink/60">Try adjusting your search or filters</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
