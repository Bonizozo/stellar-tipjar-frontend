"use client";

import { useRef, useState } from "react";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { TipRow } from "@/components/TipRow";
import type { Tip, TipSortField, SortOrder } from "@/hooks/useTipHistory";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Fixed row height — TipRow is a simple <tr> with consistent padding */
const ROW_HEIGHT = 57;
/** Height of the sticky header row */
const HEADER_HEIGHT = 44;
/** Height of the virtualised tbody viewport */
const VIEWPORT_HEIGHT = 520;

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({
  field,
  sortBy,
  sortOrder,
}: {
  field: TipSortField;
  sortBy: TipSortField;
  sortOrder: SortOrder;
}) {
  if (sortBy !== field) {
    return (
      <svg
        className="ml-1 h-4 w-4 text-ink/30"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }
  return sortOrder === "asc" ? (
    <svg
      className="ml-1 h-4 w-4 text-wave"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  ) : (
    <svg
      className="ml-1 h-4 w-4 text-wave"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface VirtualTipTableProps {
  tips: Tip[];
  onSort: (field: TipSortField) => void;
  sortBy: TipSortField;
  sortOrder: SortOrder;
  scrollRestorationKey?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Virtualised tip history table.
 *
 * Uses a fixed row height for O(1) layout — TipRow has consistent padding
 * so measurement is unnecessary. The <thead> is rendered outside the virtual
 * viewport so it stays sticky while the <tbody> scrolls independently.
 */
export function VirtualTipTable({
  tips,
  onSort,
  sortBy,
  sortOrder,
  scrollRestorationKey = "tip-table",
}: VirtualTipTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, totalSize, paddingStart, paddingEnd } =
    useVirtualScroll({
      count: tips.length,
      estimatedItemHeight: ROW_HEIGHT,
      overscan: 5,
      scrollContainerRef: containerRef,
    });

  useScrollRestoration(scrollRestorationKey, containerRef);

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
        <p className="mt-2 text-ink/60">
          Try adjusting your filters or send your first tip
        </p>
      </div>
    );
  }

  const COLS: { label: string; field?: TipSortField; className: string }[] = [
    { label: "Date", field: "date", className: "px-4 py-3 text-left" },
    { label: "Amount", field: "amount", className: "px-4 py-3 text-left" },
    {
      label: "Recipient",
      field: "recipient",
      className: "px-4 py-3 text-left",
    },
    { label: "Status", field: "status", className: "px-4 py-3 text-left" },
    { label: "Memo", className: "px-4 py-3 text-left" },
    { label: "Transaction", className: "px-4 py-3 text-left" },
    { label: "Actions", className: "px-4 py-3 text-left" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-[color:var(--surface)]">
      {/* Row count badge */}
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2">
        <span className="text-xs font-medium text-ink/50">
          {tips.length.toLocaleString()} tip{tips.length !== 1 ? "s" : ""}
        </span>
        <span className="text-xs text-ink/40">Virtual scroll active</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Sticky header — rendered outside the virtual viewport */}
          <thead className="bg-ink/5" style={{ height: HEADER_HEIGHT }}>
            <tr>
              {COLS.map(({ label, field, className }) => (
                <th key={label} className={className}>
                  {field ? (
                    <button
                      type="button"
                      onClick={() => onSort(field)}
                      className="flex items-center text-sm font-semibold text-ink hover:text-wave"
                    >
                      {label}
                      <SortIcon
                        field={field}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                      />
                    </button>
                  ) : (
                    <span className="text-sm font-semibold text-ink">
                      {label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Virtualised tbody in its own scroll container */}
        <div
          ref={containerRef}
          style={{
            height: Math.min(VIEWPORT_HEIGHT, tips.length * ROW_HEIGHT),
            overflowY: "auto",
          }}
          role="region"
          aria-label="Tip history rows"
        >
          <table className="w-full">
            <tbody>
              {/* Top spacer */}
              {paddingStart > 0 && (
                <tr style={{ height: paddingStart }} aria-hidden="true">
                  <td colSpan={7} />
                </tr>
              )}

              {virtualItems.map((virtualItem) => {
                const tip = tips[virtualItem.index];
                if (!tip) return null;
                return <TipRow key={tip.id} tip={tip} />;
              })}

              {/* Bottom spacer */}
              {paddingEnd > 0 && (
                <tr style={{ height: paddingEnd }} aria-hidden="true">
                  <td colSpan={7} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
