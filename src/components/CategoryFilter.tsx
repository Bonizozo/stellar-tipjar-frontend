"use client";

import { useState } from "react";
import { CATEGORIES, type Category } from "@/utils/categories";
import { FilterOption } from "./FilterDropdown"; // Reuse interface

interface CategoryFilterProps {
  selectedCategories: Category[];
  onChange: (categories: Category[]) => void;
  className?: string;
}

export function CategoryFilter({
  selectedCategories,
  onChange,
  className = "",
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
  ];

  const toggleCategory = (category: Category) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onChange(newSelected.length ? newSelected : []);
  };

  const isSelected = (cat: Category) => selectedCategories.includes(cat);
  const selectedCount = selectedCategories.length;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-ink/10 bg-[color:var(--surface)] px-4 py-3 text-left text-ink hover:border-wave/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 min-w-[220px]"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Filter by categories"
      >
        <span className="flex items-center gap-2">
          <span className="text-sm text-ink/60">Categories</span>
          <span className="font-medium">
            {selectedCount === 0 ? 'All' : `${selectedCount} selected`}
          </span>
        </span>
        <svg
          className={`h-5 w-5 text-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-ink/10 bg-[color:var(--surface)] shadow-lg max-h-64 overflow-auto">
          <div className="py-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-wave/5 focus:bg-wave/10 rounded-lg transition-all"
                role="checkbox"
                aria-checked={isSelected(category)}
              >
                <div className={`w-5 h-5 rounded border-2 transition-colors flex-shrink-0 ${
                  isSelected(category)
                    ? 'border-wave bg-wave'
                    : 'border-ink/30 bg-transparent'
                }`} />
                <span className={`font-normal capitalize ${
                  isSelected(category) ? 'text-wave' : 'text-ink'
                }`}>
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

