"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageNumbers: (number | "ellipsis")[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageNumbers,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
      <div className="flex items-center gap-2">
        <label htmlFor="page-size" className="text-sm text-ink/60">
          Show:
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-ink/10 bg-[color:var(--surface)] px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-ink/60">per page</span>
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={!hasPrevPage}
          className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent"
          aria-label="First page"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent"
          aria-label="Previous page"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "ellipsis") {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-ink/40">
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[2.5rem] rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentPage === pageNum
                    ? "bg-wave text-white"
                    : "text-ink hover:bg-ink/5"
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent"
          aria-label="Next page"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage}
          className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent"
          aria-label="Last page"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
      )}

      {totalPages > 1 && (
        <div className="text-sm text-ink/60">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}
