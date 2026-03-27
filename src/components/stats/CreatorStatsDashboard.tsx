"use client";

import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import { GoalProgressBar } from "./GoalProgressBar";
import { StatsCard } from "./StatsCard";
import { TipChart } from "./TipChart";
import { TopSupporters } from "./TopSupporters";


interface CreatorStatsDashboardProps {
  username: string;
}

export function CreatorStatsDashboard({ username }: CreatorStatsDashboardProps) {
  const { data, isPending, isError } = useCreatorStats(username);

  if (isPending) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-ink/5" />
          ))}
        </div>
        <div className="h-56 rounded-2xl bg-ink/5" />
        <div className="h-48 rounded-2xl bg-ink/5" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-ink/50">Stats unavailable right now.</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Goal Progress Bar - Prominent full-width */}
      <GoalProgressBar 
        currentAmount={data.totalAmountXlm} 
        goalAmount={10000} 
      />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          title="Total Tips"
          value={`${data.totalAmountXlm.toLocaleString()} XLM`}
        />
        <StatsCard
          title="Tip Count"
          value={data.tipCount.toLocaleString()}
          sub="all time"
        />
        <StatsCard
          title="Supporters"
          value={data.uniqueSupporters.toLocaleString()}
          sub="unique senders"
        />
      </div>
      <TipChart data={data.tipHistory} />
      <TopSupporters supporters={data.topSupporters} />
    </div>
  );
}

