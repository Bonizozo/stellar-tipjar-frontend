"use client";

import { useCallback, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ChartTooltip } from "./ChartTooltip";
import { ChartContainer } from "./ChartContainer";
import { LiveBadge } from "./LiveBadge";
import { useRealtimeChart } from "@/hooks/useRealtimeChart";

interface RealtimeTipFeedProps {
  /** Async function that returns the latest tip amount */
  fetcher?: () => Promise<number>;
  pollIntervalMs?: number;
  windowSize?: number;
  enabled?: boolean;
}

const AXIS_STYLE = { fontSize: 10, fill: "rgba(21,21,21,0.4)" };
const GRID_STROKE = "rgba(21,21,21,0.06)";

/** Simulated fetcher used when no real fetcher is provided */
function simulateTip(): Promise<number> {
  return Promise.resolve(Math.round(Math.random() * 120 + 5));
}

export function RealtimeTipFeed({
  fetcher,
  pollIntervalMs = 3000,
  windowSize = 20,
  enabled = true,
}: RealtimeTipFeedProps) {
  const { data, secondsSinceUpdate, isConnected, push } = useRealtimeChart({
    windowSize,
    pollIntervalMs,
    fetcher: fetcher ?? simulateTip,
    enabled,
  });

  const latest = data.at(-1);
  const prev = data.at(-2);
  const delta = latest && prev ? latest.value - prev.value : 0;

  const customTooltip = useCallback(
    (props: any) => (
      <ChartTooltip {...props} unit="XLM" labelFormatter={(l) => l} />
    ),
    [],
  );

  const badge = <LiveBadge secondsSinceUpdate={secondsSinceUpdate} />;

  return (
    <ChartContainer
      title="Real-time Tip Feed"
      description={`Updating every ${pollIntervalMs / 1000}s · ${windowSize}-point window`}
      badge={badge}
    >
      {/* Latest value callout */}
      <div className="mb-4 flex items-end gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={latest?.value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="text-4xl font-bold text-ink"
          >
            {latest ? `${latest.value.toLocaleString()} XLM` : "—"}
          </motion.p>
        </AnimatePresence>
        {delta !== 0 && (
          <span
            className={`mb-1 text-sm font-semibold ${
              delta > 0 ? "text-moss" : "text-red-500"
            }`}
          >
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta).toLocaleString()}
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data.map((p) => ({ time: p.date.slice(-8), value: p.value }))}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={GRID_STROKE}
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            content={customTooltip}
            cursor={{ stroke: "rgba(21,21,21,0.08)" }}
          />
          {latest && (
            <ReferenceLine
              y={latest.value}
              stroke="#ff785a"
              strokeDasharray="4 3"
              strokeWidth={1}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            name="Tip"
            stroke="#0f6c7b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#0f6c7b", strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Recent ticks list */}
      {data.length > 0 && (
        <div className="mt-4 max-h-28 overflow-y-auto space-y-1 border-t border-ink/10 pt-3">
          {[...data]
            .reverse()
            .slice(0, 8)
            .map((point, i) => (
              <div
                key={point.timestamp}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-ink/40">{point.date.slice(-8)}</span>
                <span
                  className={`font-semibold ${i === 0 ? "text-wave" : "text-ink/70"}`}
                >
                  {point.value.toLocaleString()} XLM
                </span>
              </div>
            ))}
        </div>
      )}
    </ChartContainer>
  );
}
