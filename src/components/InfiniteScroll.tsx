"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loader?: React.ReactNode;
}

export function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  loader,
}: InfiniteScrollProps) {
  const { targetRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasMore && !isLoading) {
        onLoadMore();
      }
    },
    enabled: hasMore && !isLoading,
    rootMargin: "200px",
  });

  return (
    <div ref={targetRef} className="w-full py-8 flex justify-center">
      {(isLoading || hasMore) && (
        loader || (
          <div className="flex items-center gap-3 text-ink/40 font-medium animate-pulse">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-wave/20 border-t-wave" />
            <span>Loading more...</span>
          </div>
        )
      )}
      {!hasMore && !isLoading && (
        <p className="text-sm text-ink/40 font-medium">You've reached the end.</p>
      )}
    </div>
  );
}
