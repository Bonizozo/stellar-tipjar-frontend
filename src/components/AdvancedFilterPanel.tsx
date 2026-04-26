"use client";

import { useState } from "react";
import { FilterBuilder } from "./FilterBuilder";
import { ActiveFilters } from "./ActiveFilters";
import { FilterPresets } from "./FilterPresets";
import { useFilterBuilder } from "@/hooks/useFilterBuilder";
import type { TipFilters } from "@/hooks/useTipHistory";

interface AdvancedFilterPanelProps {
  onFiltersChange: (filters: TipFilters) => void;
}

export function AdvancedFilterPanel({ onFiltersChange }: AdvancedFilterPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const {
    criteria,
    activeFilters,
    hasActive,
    savedFilters,
    presets,
    addCriterion,
    updateCriterion,
    removeCriterion,
    clearCriteria,
    applyPreset,
    saveCurrentFilter,
    loadSavedFilter,
    deleteSavedFilter,
  } = useFilterBuilder();

  // Propagate filter changes upward whenever criteria change
  const handleUpdate: typeof updateCriterion = (id, patch) => {
    updateCriterion(id, patch);
    // Defer to next tick so state has updated
    setTimeout(() => onFiltersChange(activeFilters), 0);
  };

  const handleRemove = (id: string) => {
    removeCriterion(id);
    setTimeout(() => onFiltersChange(activeFilters), 0);
  };

  const handleClear = () => {
    clearCriteria();
    onFiltersChange({});
  };

  const handleApplyPreset = (preset: Parameters<typeof applyPreset>[0]) => {
    applyPreset(preset);
    // Compute filters from preset criteria directly
    const filters: TipFilters = {};
    for (const c of preset.criteria) {
      if (!c.value) continue;
      switch (c.field) {
        case "search": filters.search = c.value; break;
        case "status": filters.status = c.value; break;
        case "dateFrom": filters.dateFrom = c.value; break;
        case "dateTo": filters.dateTo = c.value; break;
        case "minAmount": filters.minAmount = Number(c.value); break;
        case "maxAmount": filters.maxAmount = Number(c.value); break;
      }
    }
    onFiltersChange(filters);
  };

  const handleLoadSaved = (saved: Parameters<typeof loadSavedFilter>[0]) => {
    loadSavedFilter(saved);
    const filters: TipFilters = {};
    for (const c of saved.criteria) {
      if (!c.value) continue;
      switch (c.field) {
        case "search": filters.search = c.value; break;
        case "status": filters.status = c.value; break;
        case "dateFrom": filters.dateFrom = c.value; break;
        case "dateTo": filters.dateTo = c.value; break;
        case "minAmount": filters.minAmount = Number(c.value); break;
        case "maxAmount": filters.maxAmount = Number(c.value); break;
      }
    }
    onFiltersChange(filters);
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)]">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={expanded}
        aria-controls="advanced-filter-body"
      >
        <div className="flex items-center gap-3">
          <svg className="h-5 w-5 text-wave" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="font-semibold text-ink">Advanced Filters</span>
          {hasActive && (
            <span className="rounded-full bg-wave px-2 py-0.5 text-xs font-bold text-white">
              {criteria.filter((c) => c.value.trim()).length}
            </span>
          )}
        </div>
        <svg
          className={`h-5 w-5 text-ink/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Active filter chips — always visible when there are active filters */}
      {hasActive && (
        <div className="border-t border-ink/5 px-5 py-3">
          <ActiveFilters
            criteria={criteria}
            onRemove={handleRemove}
            onClearAll={handleClear}
          />
        </div>
      )}

      {/* Expanded body */}
      {expanded && (
        <div id="advanced-filter-body" className="border-t border-ink/10 px-5 py-4 space-y-5">
          <FilterPresets
            presets={presets}
            savedFilters={savedFilters}
            onApplyPreset={handleApplyPreset}
            onLoadSaved={handleLoadSaved}
            onDeleteSaved={deleteSavedFilter}
            onSaveCurrent={saveCurrentFilter}
            hasActiveCriteria={criteria.length > 0}
          />

          <div className="border-t border-ink/10 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/40">Filter Criteria</p>
            <FilterBuilder
              criteria={criteria}
              onAdd={addCriterion}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          </div>
        </div>
      )}
    </div>
  );
}
