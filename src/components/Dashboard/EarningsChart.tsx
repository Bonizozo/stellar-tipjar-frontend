"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EarningsChartProps {
  data: Array<{ date: string; amount: number }>;
  loading?: boolean;
}

export function EarningsChart({ data, loading = false }: EarningsChartProps) {
  if (loading) {
    return (
      <div className="h-80 w-full animate-pulse rounded-xl bg-ink/5" />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff785a" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ff785a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,21,21,0.08)" />
        <XAxis dataKey="date" stroke="rgba(21,21,21,0.4)" style={{ fontSize: 12 }} />
        <YAxis stroke="rgba(21,21,21,0.4)" style={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid rgba(21,21,21,0.1)",
            borderRadius: 8,
          }}
          formatter={(v: number) => [`${v} XLM`, "Earnings"]}
        />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#ff785a"
          strokeWidth={2}
          fill="url(#earningsGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
