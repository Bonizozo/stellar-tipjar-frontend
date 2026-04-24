"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TipTrendChartProps {
  data: Array<{
    date: string;
    amount: number;
  }>;
  loading?: boolean;
}

export function TipTrendChart({ data, loading = false }: TipTrendChartProps) {
  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-ink/50 dark:text-ink-dark/50">Loading chart...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(21, 21, 21, 0.1)" />
        <XAxis
          dataKey="date"
          stroke="rgba(21, 21, 21, 0.5)"
          style={{ fontSize: "12px" }}
        />
        <YAxis stroke="rgba(21, 21, 21, 0.5)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid rgba(21, 21, 21, 0.1)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "var(--foreground)" }}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#ff785a"
          strokeWidth={2}
          dot={{ fill: "#ff785a", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
