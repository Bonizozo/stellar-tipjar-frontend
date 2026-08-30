"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/profile/
 * PROTECTS: User profile page, avatar upload, profile form submission
 * WHY HERE: Profile uses profileDetailsStore and userStore, including
 *           file uploads and form submissions. A form error or upload failure
 *           should be contained to the profile segment.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function ProfileError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "profile" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
