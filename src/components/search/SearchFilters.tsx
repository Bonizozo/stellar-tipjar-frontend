"use client";

import { CATEGORIES } from "@/utils/categories";

export interface SearchFilterState {
  categories: string[];
  verifiedOnly: boolean;
  sort: "popular" | "recent" | "earnings";
}

interface SearchFiltersProps {
  filters: SearchFilterState;
  onChange: (filters: SearchFilterState) => void;
  resultCount?: number;
}

export function SearchFilters({ filters, onChange, resultCount }: SearchFiltersProps) {
  const toggleCategory = (cat: string) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: cats });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">Sort by</h3>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as SearchFilterState["sort"] })}
          className="w-full rounded-xl border border-ink/20 bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-wave/20"
        >
          <option value="popular">Most popular</option>
          <option value="recent">Most recent</option>
          <option value="earnings">Top earners</option>
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">Categories</h3>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                filters.categories.includes(cat)
                  ? "bg-wave text-white"
                  : "bg-ink/5 text-ink/70 hover:bg-ink/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={filters.verifiedOnly}
          onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
          className="h-4 w-4 rounded border-ink/30 accent-wave"
        />
        <span className="text-ink/80">Verified only</span>
      </label>

      {resultCount !== undefined && (
        <p className="text-xs text-ink/40">{resultCount} result{resultCount !== 1 ? "s" : ""}</p>
      )}
    </div>
  );
}
