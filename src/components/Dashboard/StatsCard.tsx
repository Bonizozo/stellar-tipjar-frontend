import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

export function StatsCard({ title, value, change }: StatsCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5">
      <p className="text-sm text-ink/60">{title}</p>
      <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
      <span
        className={`mt-2 inline-flex items-center gap-1 text-sm font-medium ${
          isPositive ? "text-green-600" : "text-red-500"
        }`}
      >
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}
      </span>
    </div>
  );
}
