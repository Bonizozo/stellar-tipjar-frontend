"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/creator/[username]/
 * PROTECTS: Creator profile page with dynamic username route and profile data
 * WHY HERE: Creator page is a dynamic route (parameterized by [username]) that
 *           calls getCreatorProfile API. The page also renders CreatorPageClient
 *           which may have additional data fetching. API failures or missing
 *           profiles should be caught at this segment level.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function CreatorError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "creator" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
