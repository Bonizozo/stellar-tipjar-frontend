"use client";

import type { FilterCriterion } from "@/hooks/useFilterBuilder";

interface ActiveFiltersProps {
  criteria: FilterCriterion[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const FIELD_LABELS: Record<string, string> = {
  search: "Search",
  status: "Status",
  dateFrom: "From",
  dateTo: "To",
  minAmount: "Min",
  maxAmount: "Max",
};

export function ActiveFilters({ criteria, onRemove, onClearAll }: ActiveFiltersProps) {
  const active = criteria.filter((c) => c.value.trim() !== "");
  if (active.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Active filters">
      <span className="text-xs font-medium text-ink/50 uppercase tracking-wide">Active:</span>

      {active.map((c) => (
        <span
          key={c.id}
          role="listitem"
          className="inline-flex items-center gap-1.5 rounded-full bg-wave/10 px-3 py-1 text-sm font-medium text-wave"
        >
          <span className="text-wave/70">{FIELD_LABELS[c.field] ?? c.field}</span>
          <span>{c.value}</span>
          <button
            type="button"
            onClick={() => onRemove(c.id)}
            className="ml-0.5 rounded-full p-0.5 hover:bg-wave/20 transition-colors"
            aria-label={`Remove ${FIELD_LABELS[c.field]} filter`}
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-ink/50 hover:text-red-500 transition-colors underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
}
