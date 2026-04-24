"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TopSupportersChartProps {
  data: Array<{
    name: string;
    tips: number;
  }>;
  loading?: boolean;
}

export function TopSupportersChart({ data, loading = false }: TopSupportersChartProps) {
  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-ink/50 dark:text-ink-dark/50">Loading chart...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(21, 21, 21, 0.1)" />
        <XAxis
          dataKey="name"
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
        <Bar dataKey="tips" fill="#0f6c7b" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
