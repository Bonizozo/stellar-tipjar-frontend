"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueBreakdownChartProps {
  data: Array<{
    date: string;
    gross: number;
    net: number;
    recurring: number;
    oneTime: number;
  }>;
  loading?: boolean;
}

export function RevenueBreakdownChart({ data, loading = false }: RevenueBreakdownChartProps) {
  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-ink/50 dark:text-ink-dark/50">Loading chart...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 5, right: 24, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(21, 21, 21, 0.1)" />
        <XAxis dataKey="date" stroke="rgba(21, 21, 21, 0.5)" style={{ fontSize: "12px" }} />
        <YAxis stroke="rgba(21, 21, 21, 0.5)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid rgba(21, 21, 21, 0.1)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "var(--foreground)" }}
        />
        <Legend />
        <Area type="monotone" dataKey="gross" name="Gross" stackId="1" stroke="#ff785a" fill="#ff785a" fillOpacity={0.25} />
        <Area type="monotone" dataKey="net" name="Net" stackId="2" stroke="#0f6c7b" fill="#0f6c7b" fillOpacity={0.3} />
        <Area type="monotone" dataKey="recurring" name="Recurring" stackId="3" stroke="#5f7f41" fill="#5f7f41" fillOpacity={0.35} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
