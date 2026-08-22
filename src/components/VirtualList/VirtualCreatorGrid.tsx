"use client";

import { useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { CreatorCard } from "@/components/CreatorCard";
import { Creator } from "@/utils/creatorData";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Approximate height of a CreatorCard in px — used as the initial estimate */
const CARD_ESTIMATED_HEIGHT = 420;

/** Number of columns at each breakpoint — must match Tailwind grid classes */
const COLUMNS = {
  default: 1,
  md: 2,
  xl: 3,
} as const;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CreatorCardSkeleton() {
  return (
    <div className="h-[420px] animate-pulse rounded-3xl border border-ink/5 bg-ink/5">
      <div className="h-24 rounded-t-3xl bg-ink/5" />
      <div className="flex flex-col items-center px-6 -mt-12">
        <div className="mb-4 h-24 w-24 rounded-full border-4 border-[color:var(--surface)] bg-ink/10" />
        <div className="mb-2 h-4 w-32 rounded bg-ink/10" />
        <div className="mb-1 h-6 w-48 rounded bg-ink/10" />
        <div className="mb-8 h-4 w-24 rounded bg-ink/10" />
        <div className="mb-2 h-4 w-full rounded bg-ink/10" />
        <div className="mb-8 h-4 w-2/3 rounded bg-ink/10" />
        <div className="h-12 w-full rounded-2xl bg-ink/5" />
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="relative mb-8 text-wave/20">
        <svg
          className="h-48 w-48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-wave"
        >
          <svg
            className="h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
      </div>
      <h3 className="mb-2 text-2xl font-bold text-ink">
        No creators match your search
      </h3>
      <p className="mx-auto max-w-md text-ink/50">
        Try adjusting your search term or clearing some filters to see more
        results.
      </p>
    </motion.div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface VirtualCreatorGridProps {
  creators: Creator[];
  isLoading: boolean;
  trackInteraction?: (type: string, username: string, category: string) => void;
  onEndReached?: () => void;
  hasMore?: boolean;
  isFetchingMore?: boolean;
  scrollRestorationKey?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Virtualised creator grid.
 *
 * Items are grouped into rows of N columns (responsive via JS matchMedia).
 * Each row is a single virtual item, so the virtualiser only tracks row count
 * rather than individual card count — this keeps the item count small and
 * makes dynamic height measurement straightforward.
 */
export function VirtualCreatorGrid({
  creators,
  isLoading,
  trackInteraction,
  onEndReached,
  hasMore = false,
  isFetchingMore = false,
  scrollRestorationKey = "creator-grid",
}: VirtualCreatorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Determine column count from viewport ──────────────────────────────────
  const getColumns = useCallback((): number => {
    if (typeof window === "undefined") return COLUMNS.default;
    if (window.innerWidth >= 1280) return COLUMNS.xl;
    if (window.innerWidth >= 768) return COLUMNS.md;
    return COLUMNS.default;
  }, []);

  const cols = getColumns();
  const rows = Math.ceil(creators.length / cols);

  // ── Virtual scroll (row-based) ────────────────────────────────────────────
  const { virtualItems, totalSize, paddingStart } = useVirtualScroll({
    count: rows,
    estimatedItemHeight: CARD_ESTIMATED_HEIGHT + 32, // card + gap
    overscan: 2,
    onEndReached,
    endReachedThreshold: 2,
  });

  useScrollRestoration(scrollRestorationKey, undefined, !isLoading);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading && creators.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CreatorCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (creators.length === 0) return <EmptyState />;

  // ── Footer ────────────────────────────────────────────────────────────────
  const footer = (
    <div className="flex justify-center py-8">
      {isFetchingMore && (
        <div className="flex items-center gap-3 font-medium text-ink/40">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-wave/20 border-t-wave" />
          <span>Loading more creators…</span>
        </div>
      )}
      {!hasMore && !isFetchingMore && creators.length > 0 && (
        <p className="text-sm font-medium text-ink/40">
          All {creators.length} creators loaded
        </p>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      role="list"
      aria-label="Creator list"
      style={{ position: "relative", height: totalSize + 80 /* footer */ }}
    >
      {/* Virtualised rows */}
      <div style={{ transform: `translateY(${paddingStart}px)` }}>
        {virtualItems.map((virtualRow) => {
          const rowStart = virtualRow.index * cols;
          const rowCreators = creators.slice(rowStart, rowStart + cols);

          return (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef as any}
              className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-2 xl:grid-cols-3"
              role="presentation"
            >
              <AnimatePresence mode="popLayout">
                {rowCreators.map((creator) => (
                  <CreatorCard
                    key={creator.username}
                    creator={creator}
                    trackInteraction={trackInteraction}
                  />
                ))}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer pinned below the virtual area */}
      <div
        style={{
          position: "absolute",
          top: totalSize,
          left: 0,
          right: 0,
        }}
      >
        {footer}
      </div>
    </div>
  );
}
