"use client";

import { 
  CurrencyDollarIcon, 
  HashtagIcon, 
  UsersIcon,
  TrophyIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { formatNumber } from "@/utils/format";
import type { SelectedCreator } from "./CreatorComparison";

interface ComparisonTableProps {
  creators: SelectedCreator[];
}

interface MetricRowProps {
  label: string;
  icon: React.ReactNode;
  values: (string | number)[];
  format?: "number" | "currency" | "percentage";
  suffix?: string;
}

function MetricRow({ label, icon, values, format = "number", suffix = "" }: MetricRowProps) {
  const formatValue = (value: string | number) => {
    if (typeof value === "string") return value;
    
    switch (format) {
      case "currency":
        return `${formatNumber(value)} XLM`;
      case "percentage":
        return `${value}%`;
      default:
        return formatNumber(value) + suffix;
    }
  };

  return (
    <tr className="border-b border-ink/10">
      <td className="py-4 px-4 font-medium text-ink">
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
      </td>
      {values.map((value, index) => (
        <td key={index} className="py-4 px-4 text-center text-ink">
          {formatValue(value)}
        </td>
      ))}
    </tr>
  );
}

export function ComparisonTable({ creators }: ComparisonTableProps) {
  // Fetch stats for all creators
  const statsQueries = creators.map(creator => 
    useCreatorStats(creator.username)
  );

  const isLoading = statsQueries.some(query => query.isPending);
  const hasError = statsQueries.some(query => query.isError);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-ink/10 rounded w-1/3"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-ink/10 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 text-center">
        <p className="text-ink/50">Error loading comparison data</p>
      </div>
    );
  }

  const statsData = statsQueries.map(query => query.data).filter(Boolean);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ink/5">
            <tr>
              <th className="py-4 px-4 text-left font-semibold text-ink">Metric</th>
              {creators.map((creator, index) => (
                <th key={creator.username} className="py-4 px-4 text-center font-semibold text-ink min-w-[150px]">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={generateAvatarUrl(creator.username)}
                      alt={creator.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{creator.displayName}</p>
                      <p className="text-sm text-ink/60">@{creator.username}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <MetricRow
              label="Total Tips Received"
              icon={<CurrencyDollarIcon className="w-5 h-5 text-green-600" />}
              values={statsData.map(stats => stats?.totalAmountXlm || 0)}
              format="currency"
            />
            <MetricRow
              label="Number of Tips"
              icon={<HashtagIcon className="w-5 h-5 text-blue-600" />}
              values={statsData.map(stats => stats?.tipCount || 0)}
            />
            <MetricRow
              label="Unique Supporters"
              icon={<UsersIcon className="w-5 h-5 text-purple-600" />}
              values={statsData.map(stats => stats?.uniqueSupporters || 0)}
            />
            <MetricRow
              label="Average Tip Amount"
              icon={<CurrencyDollarIcon className="w-5 h-5 text-orange-600" />}
              values={statsData.map(stats => 
                stats && stats.tipCount > 0 
                  ? (stats.totalAmountXlm / stats.tipCount)
                  : 0
              )}
              format="currency"
            />
            <MetricRow
              label="Top Supporter Amount"
              icon={<TrophyIcon className="w-5 h-5 text-yellow-600" />}
              values={statsData.map(stats => 
                stats?.topSupporters?.[0]?.totalAmount || 0
              )}
              format="currency"
            />
            <MetricRow
              label="Recent Activity (7 days)"
              icon={<CalendarIcon className="w-5 h-5 text-indigo-600" />}
              values={statsData.map(stats => {
                if (!stats?.tipHistory) return 0;
                const recent = stats.tipHistory.slice(-7);
                return recent.reduce((sum, day) => sum + day.amount, 0);
              })}
              format="currency"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}