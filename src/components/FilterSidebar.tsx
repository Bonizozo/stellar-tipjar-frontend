"use client";

import React from "react";
import { CATEGORIES } from "@/utils/categories";

interface Filters {
  categories: string[];
  verifiedOnly: boolean;
  locations: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  availableLocations: string[];
  className?: string;
}

export function FilterSidebar({
  filters,
  onChange,
  availableLocations,
  className = "",
}: FilterSidebarProps) {
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: newCategories });
  };

  const toggleVerified = () => {
    onChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
  };

  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location];
    onChange({ ...filters, locations: newLocations });
  };

  const clearFilters = () => {
    onChange({
      categories: [],
      verifiedOnly: false,
      locations: [],
    });
  };

  return (
    <aside className={`w-64 shrink-0 hidden lg:block ${className}`}>
      <div className="sticky top-24 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-wave hover:underline transition-all"
          >
            Clear All
          </button>
        </div>

        {/* Verified Status */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-bold text-ink/40">Status</h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={toggleVerified}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-ink/10 rounded-full peer peer-checked:bg-wave transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
            </div>
            <span className="text-sm font-medium text-ink group-hover:text-wave transition-colors">
              Verified Only
            </span>
          </label>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-bold text-ink/40">Categories</h3>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 rounded border-ink/20 text-wave focus:ring-wave/20 cursor-pointer"
                />
                <span className="text-sm font-medium text-ink group-hover:text-wave transition-colors capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        {availableLocations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-ink/40">Location</h3>
            <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-2 pr-2">
              {availableLocations.map((location) => (
                <label key={location} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(location)}
                    onChange={() => toggleLocation(location)}
                    className="w-4 h-4 rounded border-ink/20 text-wave focus:ring-wave/20 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-ink group-hover:text-wave transition-colors">
                    {location}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
