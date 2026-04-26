"use client";

import { useState, useCallback, useEffect } from "react";
import type { TipFilters } from "@/hooks/useTipHistory";

export type FilterField = "search" | "status" | "dateFrom" | "dateTo" | "minAmount" | "maxAmount";
export type FilterOperator = "contains" | "equals" | "gte" | "lte" | "between";

export interface FilterCriterion {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string;
  value2?: string; // for "between"
}

export interface SavedFilter {
  id: string;
  name: string;
  criteria: FilterCriterion[];
  createdAt: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  criteria: FilterCriterion[];
}

const STORAGE_KEY = "tipjar:saved-filters";

const PRESETS: FilterPreset[] = [
  {
    id: "completed-this-month",
    name: "Completed This Month",
    criteria: [
      { id: "p1", field: "status", operator: "equals", value: "completed" },
      { id: "p2", field: "dateFrom", operator: "gte", value: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10) },
    ],
  },
  {
    id: "large-tips",
    name: "Large Tips (100+ XLM)",
    criteria: [
      { id: "p3", field: "minAmount", operator: "gte", value: "100" },
    ],
  },
  {
    id: "pending",
    name: "Pending Only",
    criteria: [
      { id: "p4", field: "status", operator: "equals", value: "pending" },
    ],
  },
  {
    id: "failed",
    name: "Failed Transactions",
    criteria: [
      { id: "p5", field: "status", operator: "equals", value: "failed" },
    ],
  },
];

function criteriaToFilters(criteria: FilterCriterion[]): TipFilters {
  const filters: TipFilters = {};
  for (const c of criteria) {
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
  return filters;
}

function loadSaved(): SavedFilter[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

let idCounter = 0;
function uid() {
  return `f-${Date.now()}-${++idCounter}`;
}

export function useFilterBuilder() {
  const [criteria, setCriteria] = useState<FilterCriterion[]>([]);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

  useEffect(() => {
    setSavedFilters(loadSaved());
  }, []);

  const persist = useCallback((filters: SavedFilter[]) => {
    setSavedFilters(filters);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, []);

  const addCriterion = useCallback((field: FilterField = "search") => {
    setCriteria((prev) => [
      ...prev,
      { id: uid(), field, operator: "contains", value: "" },
    ]);
  }, []);

  const updateCriterion = useCallback((id: string, patch: Partial<FilterCriterion>) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  }, []);

  const removeCriterion = useCallback((id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCriteria = useCallback(() => setCriteria([]), []);

  const applyPreset = useCallback((preset: FilterPreset) => {
    setCriteria(preset.criteria.map((c) => ({ ...c, id: uid() })));
  }, []);

  const saveCurrentFilter = useCallback((name: string) => {
    if (!name.trim() || criteria.length === 0) return;
    const entry: SavedFilter = {
      id: uid(),
      name: name.trim(),
      criteria: criteria.map((c) => ({ ...c })),
      createdAt: new Date().toISOString(),
    };
    persist([...savedFilters, entry]);
  }, [criteria, savedFilters, persist]);

  const loadSavedFilter = useCallback((saved: SavedFilter) => {
    setCriteria(saved.criteria.map((c) => ({ ...c, id: uid() })));
  }, []);

  const deleteSavedFilter = useCallback((id: string) => {
    persist(savedFilters.filter((f) => f.id !== id));
  }, [savedFilters, persist]);

  const activeFilters = criteriaToFilters(criteria);
  const hasActive = criteria.some((c) => c.value.trim() !== "");

  return {
    criteria,
    activeFilters,
    hasActive,
    savedFilters,
    presets: PRESETS,
    addCriterion,
    updateCriterion,
    removeCriterion,
    clearCriteria,
    applyPreset,
    saveCurrentFilter,
    loadSavedFilter,
    deleteSavedFilter,
  };
}
