"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MarketplaceError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError(error, { context: "MarketplaceSegment", digest: error.digest });
  }, [error]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <ErrorFallback
        error={error}
        reset={reset}
        showDetails={process.env.NODE_ENV === "development"}
      />
    </div>
  );
}
