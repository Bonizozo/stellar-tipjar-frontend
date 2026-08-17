"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/settings/
 * PROTECTS: Settings page with forms for email, privacy, security, and account management
 * WHY HERE: Settings page contains multiple forms that submit data to the API
 *           (email preferences, privacy settings, 2FA toggle, account deletion).
 *           Form submission errors, API failures, or account operation errors
 *           should be contained to this segment.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function SettingsError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "settings" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
