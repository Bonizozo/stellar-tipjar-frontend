"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
