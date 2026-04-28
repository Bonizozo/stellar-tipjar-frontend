"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface RealtimePoint {
  timestamp: number;
  /** ISO date string for display */
  date: string;
  value: number;
  /** Optional secondary metric */
  value2?: number;
}

interface UseRealtimeChartOptions {
  /** How many data points to keep in the window */
  windowSize?: number;
  /** Poll interval in ms (0 = no polling, use push only) */
  pollIntervalMs?: number;
  /** Called each tick to fetch the latest value */
  fetcher?: () => Promise<number>;
  /** Initial seed data */
  initialData?: RealtimePoint[];
  enabled?: boolean;
}

interface UseRealtimeChartReturn {
  data: RealtimePoint[];
  lastUpdated: number;
  secondsSinceUpdate: number;
  isConnected: boolean;
  /** Push a new point manually (e.g. from a WebSocket message) */
  push: (value: number, value2?: number) => void;
  /** Reset the buffer */
  clear: () => void;
}

function nowIso() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

/**
 * Manages a rolling window of time-series data points.
 * Supports both polling (via `fetcher`) and push-based updates (via `push`).
 */
export function useRealtimeChart({
  windowSize = 30,
  pollIntervalMs = 5000,
  fetcher,
  initialData = [],
  enabled = true,
}: UseRealtimeChartOptions = {}): UseRealtimeChartReturn {
  const [data, setData] = useState<RealtimePoint[]>(initialData);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const staleTicker = useRef<ReturnType<typeof setInterval> | null>(null);

  const push = useCallback(
    (value: number, value2?: number) => {
      const point: RealtimePoint = {
        timestamp: Date.now(),
        date: nowIso(),
        value,
        value2,
      };
      setData((prev) => [...prev.slice(-(windowSize - 1)), point]);
      setLastUpdated(Date.now());
      setSecondsSinceUpdate(0);
    },
    [windowSize],
  );

  const clear = useCallback(() => setData([]), []);

  // Stale ticker — increments every second
  useEffect(() => {
    staleTicker.current = setInterval(() => {
      setSecondsSinceUpdate((s) => s + 1);
    }, 1000);
    return () => {
      if (staleTicker.current) clearInterval(staleTicker.current);
    };
  }, []);

  // Polling loop
  useEffect(() => {
    if (!enabled || !fetcher || pollIntervalMs <= 0) return;

    setIsConnected(true);

    const tick = async () => {
      try {
        const value = await fetcher();
        push(value);
      } catch {
        // silently skip failed ticks
      }
    };

    tick(); // immediate first fetch
    timerRef.current = setInterval(tick, pollIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsConnected(false);
    };
  }, [enabled, fetcher, pollIntervalMs, push]);

  return { data, lastUpdated, secondsSinceUpdate, isConnected, push, clear };
}
