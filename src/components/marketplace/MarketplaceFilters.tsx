"use client";

import { Search } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "digital", label: "Digital" },
  { id: "apparel", label: "Apparel" },
  { id: "music", label: "Music" },
  { id: "courses", label: "Courses" },
  { id: "ebooks", label: "E-books" },
  { id: "accessories", label: "Accessories" },
];

interface MarketplaceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MarketplaceFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: MarketplaceFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
        <input
          type="text"
          placeholder="Search creators and stores..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-ink/10 bg-[color:var(--surface)] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-wave/50"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-wave text-white"
                : "bg-ink/10 text-ink/70 hover:bg-ink/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
