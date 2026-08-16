"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/transactions/
 * PROTECTS: Transaction history list, tip records, filtering, and data fetching
 * WHY HERE: Transactions uses useTipHistory hook to fetch live transaction data
 *           from the API. API failures or data transformation errors should
 *           not crash the entire application.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function TransactionsError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "transactions" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
