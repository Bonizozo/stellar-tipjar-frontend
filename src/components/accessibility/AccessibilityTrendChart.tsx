"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { AccessibilityTrend } from "@/types/accessibility";

interface AccessibilityTrendChartProps {
  trends: AccessibilityTrend[];
}

export function AccessibilityTrendChart({ trends }: AccessibilityTrendChartProps) {
  const data = trends.map((t) => ({
    date: new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    score: t.score,
    violations: t.violations,
  }));

  return (
    <div className="h-48" aria-label="Accessibility score trend chart" role="img">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)" }}
            formatter={(value: number, name: string) => [
              name === "score" ? `${value}%` : value,
              name === "score" ? "Score" : "Violations",
            ]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#0f6c7b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
