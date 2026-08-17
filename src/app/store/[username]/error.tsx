"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/store/[username]/
 * PROTECTS: Creator's product store page with shopping cart and orders
 * WHY HERE: Store page uses useStore hook to fetch products, orders, and
 *           handle checkout operations. Multiple API calls and wallet
 *           interactions can fail. Errors should be scoped to this segment
 *           without crashing the entire application.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function StoreError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "store" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
