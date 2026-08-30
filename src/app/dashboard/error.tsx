"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/dashboard/
 * PROTECTS: Dashboard component and all child widgets (stats, charts, analytics)
 * WHY HERE: Dashboard renders multiple widgets and data-fetching components.
 *           A single widget failure should not crash the entire dashboard.
 *           The rest of the page (nav, sidebar) remains intact.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function DashboardError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "dashboard" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
