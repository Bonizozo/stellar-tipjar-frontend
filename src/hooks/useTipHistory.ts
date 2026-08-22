"use client";

import { useMemo, useState } from "react";
import { useTips } from "@/hooks/queries/useTips";

export type { Tip } from "@/hooks/queries/useTips";
export type TipSortField = "date" | "amount" | "recipient" | "status";
export type SortOrder = "asc" | "desc";

export interface TipFilters {
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: string;
  search?: string;
}

/**
 * Hook for managing tip history data with filtering and sorting.
 * Data fetching and caching is handled by React Query via useTips().
 */
export function useTipHistory() {
  const { data: allTips = [], isLoading } = useTips();
  const [sortField, setSortField] = useState<TipSortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filters, setFilters] = useState<TipFilters>({});

  const tips = useMemo(() => {
    let result = [...allTips];

    if (filters.dateFrom) result = result.filter((t) => new Date(t.date) >= new Date(filters.dateFrom!));
    if (filters.dateTo) result = result.filter((t) => new Date(t.date) <= new Date(filters.dateTo!));
    if (filters.minAmount !== undefined) result = result.filter((t) => t.amount >= filters.minAmount!);
    if (filters.maxAmount !== undefined) result = result.filter((t) => t.amount <= filters.maxAmount!);
    if (filters.status && filters.status !== "all") result = result.filter((t) => t.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) => t.recipient.toLowerCase().includes(q) || t.memo?.toLowerCase().includes(q) || t.transactionHash?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortField === "amount") cmp = a.amount - b.amount;
      else if (sortField === "recipient") cmp = a.recipient.localeCompare(b.recipient);
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [allTips, filters, sortField, sortOrder]);

  const handleSort = (field: TipSortField) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortOrder("desc"); }
  };

  return { tips, allTips, isLoading, sortField, sortOrder, filters, setFilters, handleSort };
}
