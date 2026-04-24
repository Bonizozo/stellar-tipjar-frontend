"use client";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface DistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  loading?: boolean;
}

const COLORS = ["#ff785a", "#0f6c7b", "#5f7f41", "#fbbf24", "#8b5cf6"];

export function DistributionChart({ data, loading = false }: DistributionChartProps) {
  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-ink/50 dark:text-ink-dark/50">Loading chart...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid rgba(21, 21, 21, 0.1)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "var(--foreground)" }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
