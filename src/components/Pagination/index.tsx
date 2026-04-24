"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageButton from "./PageButton";
import PageSizeSelector from "./PageSizeSelector";

type Variant = "numbered" | "simple" | "compact";

interface PaginationProps {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
  pageSizes?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  variant?: Variant;
  showFirstLast?: boolean;
  showPageSizeSelector?: boolean;
  siblingCount?: number;
}

function getPageList(
  totalPages: number,
  current: number,
  siblingCount = 1,
): Array<number | string> {
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, two siblings, two ellipses
  if (totalPages <= totalNumbers)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages: Array<number | string> = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(totalPages - 1, current + siblingCount);

  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < totalPages - 1;

  pages.push(1);

  if (showLeftEllipsis) {
    pages.push("...");
  } else {
    for (let p = 2; p < left; p++) pages.push(p);
  }

  for (let p = left; p <= right; p++) pages.push(p);

  if (showRightEllipsis) {
    pages.push("...");
  } else {
    for (let p = right + 1; p < totalPages; p++) pages.push(p);
  }

  pages.push(totalPages);
  return pages;
}

export default function Pagination({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
  pageSizes = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  variant = "numbered",
  showFirstLast = true,
  showPageSizeSelector = true,
  siblingCount = 1,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const qPage = Number(searchParams?.get("page") ?? "");
  const qSize = Number(searchParams?.get("size") ?? "");

  const [pageSize, setPageSize] = useState<number>(qSize || initialPageSize);
  const [currentPage, setCurrentPage] = useState<number>(qPage || initialPage);

  useEffect(() => {
    setCurrentPage(qPage || initialPage);
  }, [qPage, initialPage]);

  useEffect(() => {
    setPageSize(qSize || initialPageSize);
  }, [qSize, initialPageSize]);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    // clamp
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  useEffect(() => {
    onPageSizeChange?.(pageSize);
  }, [pageSize, onPageSizeChange]);

  const updateUrl = useCallback(
    (page: number, size = pageSize) => {
      try {
        const params = new URLSearchParams(
          Array.from(searchParams || []).map(([k, v]) => [k, v]),
        );
        params.set("page", String(page));
        params.set("size", String(size));
        const url = `${location.pathname}?${params.toString()}`;
        // use router push but cast to any to avoid strict Route typing in this environment
        (router as any).push(url);
      } catch (err) {
        // fallback: do nothing
      }
    },
    [router, searchParams, pageSize],
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    updateUrl(page, pageSize);
  };

  const goPrevious = () => goToPage(Math.max(1, currentPage - 1));
  const goNext = () => goToPage(Math.min(totalPages, currentPage + 1));
  const goToFirst = () => goToPage(1);
  const goToLast = () => goToPage(totalPages);

  const pages = useMemo(
    () => getPageList(totalPages, currentPage, siblingCount),
    [totalPages, currentPage, siblingCount],
  );

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    // when page size changes reset to page 1 to avoid out-of-range
    setCurrentPage(1);
    updateUrl(1, size);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrevious();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToFirst();
    } else if (e.key === "End") {
      e.preventDefault();
      goToLast();
    }
  };

  // Render variants
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      onKeyDown={onKeyDown}
      className="w-full"
    >
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-2">
          {showFirstLast && (
            <PageButton
              onClick={goToFirst}
              disabled={currentPage === 1}
              ariaLabel="Go to first page"
            >
              First
            </PageButton>
          )}
          <PageButton
            onClick={goPrevious}
            disabled={currentPage === 1}
            ariaLabel="Go to previous page"
          >
            Prev
          </PageButton>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {variant === "numbered" && (
            <div className="flex items-center gap-2 overflow-auto py-1 px-2">
              {pages.map((p, idx) =>
                p === "..." ? (
                  <span
                    key={`ell-${idx}`}
                    className="px-3 select-none text-sm text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <PageButton
                    key={String(p)}
                    onClick={() => goToPage(Number(p))}
                    active={Number(p) === currentPage}
                    ariaLabel={`Go to page ${p}`}
                  >
                    {p}
                  </PageButton>
                ),
              )}
            </div>
          )}

          {variant === "simple" && (
            <div className="text-sm text-gray-700 dark:text-gray-200">
              Page {currentPage} of {totalPages}
            </div>
          )}

          {variant === "compact" && (
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <PageButton
                onClick={goPrevious}
                disabled={currentPage === 1}
                ariaLabel="Go to previous page"
              >
                -
              </PageButton>
              <span className="min-w-[48px] text-center">{currentPage}</span>
              <PageButton
                onClick={goNext}
                disabled={currentPage === totalPages}
                ariaLabel="Go to next page"
              >
                +
              </PageButton>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <PageButton
            onClick={goNext}
            disabled={currentPage === totalPages}
            ariaLabel="Go to next page"
          >
            Next
          </PageButton>
          {showFirstLast && (
            <PageButton
              onClick={goToLast}
              disabled={currentPage === totalPages}
              ariaLabel="Go to last page"
            >
              Last
            </PageButton>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div />
        {showPageSizeSelector && (
          <div className="flex items-center gap-4">
            <PageSizeSelector
              value={pageSize}
              options={pageSizes}
              onChange={handlePageSizeChange}
            />
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {totalItems} items
            </div>
          </div>
        )}
        <div />
      </div>
    </nav>
  );
}
