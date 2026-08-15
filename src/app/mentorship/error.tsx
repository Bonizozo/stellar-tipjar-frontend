"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MentorshipError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError(error, { context: "MentorshipSegment", digest: error.digest });
  }, [error]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <ErrorFallback
        error={error}
        reset={reset}
        showDetails={process.env.NODE_ENV === "development"}
      />
    </div>
  );
}
