import React from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

interface SparklineProps {
  data: { date: string; amount: number }[];
  className?: string;
  color?: string;
}

export function Sparkline({ data, className = "", color = "#8b5cf6" }: SparklineProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className={`h-12 w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
          {/* Hide axes but keep them for proper scaling */}
          <YAxis hide domain={["auto", "auto"]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
