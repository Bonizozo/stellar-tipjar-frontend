import { useMemo } from "react";

export interface UsePaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
}

export interface UsePaginationReturn {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumbers: (number | "ellipsis")[];
}

/**
 * Hook for pagination logic and calculations.
 * Handles page number generation with ellipsis for large page counts.
 */
export function usePagination({
  totalItems,
  pageSize,
  currentPage,
}: UsePaginationProps): UsePaginationReturn {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    pageNumbers,
  };
}
