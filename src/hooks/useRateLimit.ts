"use client";

import { useEffect, useState } from "react";
import {
  getApiRateLimitStatus,
  subscribeToApiRateLimit,
  type ApiRateLimitStatus,
} from "@/services/api";

/**
 * Exposes live API rate-limit status and keeps retry countdown in sync.
 */
export function useRateLimit() {
  const [status, setStatus] = useState<ApiRateLimitStatus>(() => getApiRateLimitStatus());

  useEffect(() => subscribeToApiRateLimit(setStatus), []);

  useEffect(() => {
    if (status.retryAfterMs <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setStatus(getApiRateLimitStatus());
    }, 1_000);

    return () => clearInterval(interval);
  }, [status.retryAfterMs]);

  return status;
}
