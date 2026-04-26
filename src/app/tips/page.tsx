"use client";

import { useState } from "react";
import Link from "next/link";
import { TipHistoryTable } from "@/components/TipHistoryTable";
import { VirtualTipTable } from "@/components/VirtualList/VirtualTipTable";
import { AdvancedFilterPanel } from "@/components/AdvancedFilterPanel";
import { Pagination } from "@/components/Pagination";
import { ExportModal } from "@/components/ExportModal";
import { TipForm } from "@/components/forms/TipForm";
import { useTipHistory } from "@/hooks/useTipHistory";
import { usePagination } from "@/hooks/usePagination";

export default function TipsPage() {
  const {
    tips,
    allTips,
    isLoading,
    sortField,
    sortOrder,
    filters,
    setFilters,
    handleSort,
  } = useTipHistory();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showExport, setShowExport] = useState(false);
  // Use virtual table when there are enough rows to benefit from it
  const useVirtual = tips.length > 50;

  const pagination = usePagination({
    totalItems: tips.length,
    pageSize,
    currentPage: page,
  });

  const paginatedTips = tips.slice(pagination.startIndex, pagination.endIndex);

  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const totalAmount = tips.reduce((sum, tip) => {
    return tip.status === "completed" ? sum + tip.amount : sum;
  }, 0);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            Tip History
          </h1>
          <p className="mt-2 max-w-2xl text-ink/75">
            View and manage all your tip transactions. Filter by date, amount,
            or status.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/tips/timeline"
            className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-ink/5 transition-colors"
          >
            Timeline view
          </Link>
          <button
            type="button"
            onClick={() => setShowExport(true)}
            disabled={allTips.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
          <p className="text-sm text-ink/60">Total Tips</p>
          <p className="mt-1 text-2xl font-bold text-ink">{allTips.length}</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
          <p className="text-sm text-ink/60">Total Amount</p>
          <p className="mt-1 text-2xl font-bold text-ink">{totalAmount} XLM</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
          <p className="text-sm text-ink/60">Filtered Results</p>
          <p className="mt-1 text-2xl font-bold text-ink">{tips.length}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <h2 className="mb-4 text-xl font-semibold text-ink">Send a Tip</h2>
        <TipForm />
      </div>

      <AdvancedFilterPanel
        onFiltersChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
        </div>
      ) : (
        <>
          {useVirtual ? (
            <VirtualTipTable
              tips={tips}
              onSort={handleSort}
              sortBy={sortField}
              sortOrder={sortOrder}
              scrollRestorationKey="tip-history"
            />
          ) : (
            <TipHistoryTable
              tips={paginatedTips}
              onSort={handleSort}
              sortBy={sortField}
              sortOrder={sortOrder}
            />
          )}

          {!useVirtual && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              pageNumbers={pagination.pageNumbers}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
            />
          )}
        </>
      )}

      {showExport && (
        <ExportModal tips={allTips} onClose={() => setShowExport(false)} />
      )}
    </section>
  );
}
