"use client";

import { SearchX } from "lucide-react";
import { CreatorCard } from "@/components/CreatorCard";
import type { Creator } from "@/utils/creatorData";

interface SearchResultsProps {
  results: Creator[];
  isLoading: boolean;
  query: string;
}

export function SearchResults({ results, isLoading, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-3xl bg-ink/5" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <SearchX className="mb-4 h-12 w-12 text-ink/20" />
        <p className="font-medium text-ink">
          {query ? `No results for "${query}"` : "Start typing to search creators"}
        </p>
        <p className="mt-1 text-sm text-ink/50">
          {query ? "Try different keywords or remove some filters." : "Search by name, category, or tag."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((creator) => (
        <CreatorCard key={creator.username} creator={creator} />
      ))}
    </div>
  );
}
