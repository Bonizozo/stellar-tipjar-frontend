"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/analytics/
 * PROTECTS: Analytics dashboard with all chart components
 * WHY HERE: Analytics renders multiple data-heavy chart components
 *           (TipTrendChart, RevenueBreakdownChart, TopSupportersChart,
 *           DistributionChart, SupporterRetentionChart, RealtimeTipFeed,
 *           SupporterHeatmap). Individual chart failures or data fetch errors
 *           should not crash the entire analytics page.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function AnalyticsError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "analytics" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
