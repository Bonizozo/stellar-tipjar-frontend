"use client";

import { TipRow } from "./TipRow";
import type { Tip, TipSortField, SortOrder } from "@/hooks/useTipHistory";

interface TipHistoryTableProps {
  tips: Tip[];
  onSort: (field: TipSortField) => void;
  sortBy: TipSortField;
  sortOrder: SortOrder;
}

export function TipHistoryTable({ tips, onSort, sortBy, sortOrder }: TipHistoryTableProps) {
  const SortIcon = ({ field }: { field: TipSortField }) => {
    if (sortBy !== field) {
      return (
        <svg className="ml-1 h-4 w-4 text-ink/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortOrder === "asc" ? (
      <svg className="ml-1 h-4 w-4 text-wave" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="ml-1 h-4 w-4 text-wave" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (tips.length === 0) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-ink/20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-ink">No tips found</h3>
        <p className="mt-2 text-ink/60">Try adjusting your filters or send your first tip</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-[color:var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ink/5">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => onSort("date")}
                  className="flex items-center text-sm font-semibold text-ink hover:text-wave"
                >
                  Date
                  <SortIcon field="date" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => onSort("amount")}
                  className="flex items-center text-sm font-semibold text-ink hover:text-wave"
                >
                  Amount
                  <SortIcon field="amount" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => onSort("recipient")}
                  className="flex items-center text-sm font-semibold text-ink hover:text-wave"
                >
                  Recipient
                  <SortIcon field="recipient" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => onSort("status")}
                  className="flex items-center text-sm font-semibold text-ink hover:text-wave"
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-ink">Memo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-ink">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {tips.map((tip) => (
              <TipRow key={tip.id} tip={tip} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
