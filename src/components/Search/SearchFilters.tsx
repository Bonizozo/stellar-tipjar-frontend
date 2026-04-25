"use client";

import { CATEGORIES } from "@/utils/categories";

export type SortOption = "popular" | "recent" | "earnings";

export interface SearchFilterState {
  categories: string[];
  verifiedOnly: boolean;
  sort: SortOption;
}

interface SearchFiltersProps {
  filters: SearchFilterState;
  onChange: (filters: SearchFilterState) => void;
  resultCount: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Recently Joined" },
  { value: "earnings", label: "Top Earners" },
];

export function SearchFilters({ filters, onChange, resultCount }: SearchFiltersProps) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const activeCount = filters.categories.length + (filters.verifiedOnly ? 1 : 0);

  return (
    <aside className="space-y-6">
      {/* Result count + clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">
          <span className="font-semibold text-ink">{resultCount}</span> result{resultCount !== 1 ? "s" : ""}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => onChange({ categories: [], verifiedOnly: false, sort: filters.sort })}
            className="text-xs text-wave hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">Sort by</h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ ...filters, sort: value })}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                filters.sort === value
                  ? "bg-wave/10 font-medium text-wave"
                  : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">Category</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-ink/5 transition-colors">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-ink/30 accent-wave"
              />
              <span className="text-sm capitalize text-ink/80">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Verification */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">Verification</h3>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-ink/5 transition-colors">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="h-4 w-4 rounded border-ink/30 accent-wave"
          />
          <span className="text-sm text-ink/80">Verified only</span>
        </label>
      </div>
    </aside>
  );
}
