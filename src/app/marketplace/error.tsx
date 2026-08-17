"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/marketplace/
 * PROTECTS: Creator marketplace listing, store browsing, product discovery
 * WHY HERE: Marketplace uses useMarketplace hook to fetch creator data and stats.
 *           Network or data-fetching failures should show error UI without
 *           crashing navigation or sidebar.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function MarketplaceError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "marketplace" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
