"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/components/ErrorFallback";
import { logError } from "@/utils/errorLogger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * SEGMENT: src/app/stream/
 * PROTECTS: Live stream page with video player, chat, and real-time data
 * WHY HERE: Stream uses useLiveStream and useVideoStream hooks with
 *           WebSocket connections and real-time data fetching. Connection
 *           failures, video player errors, or chat service interruptions
 *           should be scoped to this segment.
 * PARENT BOUNDARY: src/app/error.tsx (catches anything not caught here)
 */
export default function StreamError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error, { digest: error.digest, segment: "stream" });
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      reset={reset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
}
