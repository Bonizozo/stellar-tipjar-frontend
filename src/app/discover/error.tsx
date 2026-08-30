"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/discover/
 * PROTECTS: Creator discovery page with dynamic content and browsing
 * WHY HERE: Discover renders CreatorDiscovery component which fetches
 *           and displays dynamic creator data. API failures or data
 *           transformation errors should be contained to this segment.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function DiscoverError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "discover" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
