"use client";

import {
  CurrencyDollarIcon,
  HashtagIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import { useHeatmapData } from "@/hooks/queries/useHeatmapData";
import { GoalProgressBar } from "./GoalProgressBar";
import { TipChart } from "./TipChart";
import { TopSupporters } from "./TopSupporters";
import { StatCard } from "@/components/StatCard";
import { TipHeatmapCalendar } from "@/components/TipHeatmapCalendar";

interface CreatorStatsDashboardProps {
  username: string;
}

export function CreatorStatsDashboard({
  username,
}: CreatorStatsDashboardProps) {
  const { data, isPending, isError } = useCreatorStats(username);
  const { data: heatmapTips = [], isPending: heatmapPending } = useHeatmapData(
    username,
    1,
  );

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-ink/5" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <StatCard key={i} label="" value={0} icon={null} loading />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-ink/5" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/20 p-8 text-center">
        <ChartBarIcon className="mx-auto mb-3 h-12 w-12 text-ink/20" />
        <p className="text-ink/50">Stats unavailable for this creator yet.</p>
      </div>
    );
  }

  const trends = { total: 12.5, count: 8.2, supporters: -2.4 };

  return (
    <div className="space-y-8">
      {/* Goal Progress Bar */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-ink">
          <ChartBarIcon className="h-5 w-5" />
          Fundraising Goal
        </h2>
        <GoalProgressBar
          currentAmount={data.totalAmountXlm}
          goalAmount={10000}
        />
      </section>

      {/* KPI cards */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard
          label="Total Tips"
          value={data.totalAmountXlm}
          suffix=" XLM"
          decimals={1}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={trends.total}
          sparklineData={data.tipHistory.slice(-14)}
        />
        <StatCard
          label="Tip Count"
          value={data.tipCount}
          icon={<HashtagIcon className="h-6 w-6" />}
          trend={trends.count}
          sparklineData={data.tipHistory
            .slice(-14)
            .map((d) => ({ ...d, amount: d.amount / 2 }))}
        />
        <StatCard
          label="Supporters"
          value={data.uniqueSupporters}
          icon={<UsersIcon className="h-6 w-6" />}
          trend={trends.supporters}
          sparklineData={data.tipHistory.slice(-14).reverse()}
        />
      </section>

      {/* Tip history chart + top supporters */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Tip History</h2>
          <TipChart data={data.tipHistory} />
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">
            Top Supporters
          </h2>
          <TopSupporters supporters={data.topSupporters} />
        </section>
      </div>

      {/* Heatmap calendar */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-ink">
          Activity Heatmap
        </h2>
        <TipHeatmapCalendar
          tips={heatmapTips}
          loading={heatmapPending}
          title={`${username}'s Tip Activity`}
          showStats
        />
      </section>
    </div>
  );
}
