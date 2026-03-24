"use client";

import { FilterDropdown, type FilterOption } from "./FilterDropdown";
import type { TipFilters } from "@/hooks/useTipHistory";

interface TipFiltersProps {
  filters: TipFilters;
  onFiltersChange: (filters: TipFilters) => void;
  onClear: () => void;
}

const statusOptions: FilterOption[] = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

export function TipFilters({ filters, onFiltersChange, onClear }: TipFiltersProps) {
  const hasActiveFilters =
    filters.dateFrom ||
    filters.dateTo ||
    filters.minAmount !== undefined ||
    filters.maxAmount !== undefined ||
    (filters.status && filters.status !== "all") ||
    filters.search;

  return (
    <div className="space-y-4 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-wave hover:text-wave/80 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-ink">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value || undefined })}
            placeholder="Recipient, memo, hash..."
            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          />
        </div>

        <div>
          <label htmlFor="date-from" className="block text-sm font-medium text-ink">
            From Date
          </label>
          <input
            id="date-from"
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value || undefined })}
            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          />
        </div>

        <div>
          <label htmlFor="date-to" className="block text-sm font-medium text-ink">
            To Date
          </label>
          <input
            id="date-to"
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value || undefined })}
            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          />
        </div>

        <div>
          <label htmlFor="min-amount" className="block text-sm font-medium text-ink">
            Min Amount
          </label>
          <input
            id="min-amount"
            type="number"
            min="0"
            step="1"
            value={filters.minAmount ?? ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                minAmount: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder="0"
            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          />
        </div>

        <div>
          <label htmlFor="max-amount" className="block text-sm font-medium text-ink">
            Max Amount
          </label>
          <input
            id="max-amount"
            type="number"
            min="0"
            step="1"
            value={filters.maxAmount ?? ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxAmount: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder="Any"
            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          />
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-ink">
            Status
          </label>
          <FilterDropdown
            label=""
            options={statusOptions}
            value={filters.status || "all"}
            onChange={(value) => onFiltersChange({ ...filters, status: value })}
            className="mt-1 w-full"
          />
        </div>
      </div>
    </div>
  );
}
