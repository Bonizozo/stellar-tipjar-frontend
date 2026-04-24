"use client";

import { 
  CurrencyDollarIcon, 
  HashtagIcon, 
  UsersIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import { GoalProgressBar } from "./GoalProgressBar";
import { TipChart } from "./TipChart";
import { TopSupporters } from "./TopSupporters";
import { StatCard } from "@/components/StatCard";


interface CreatorStatsDashboardProps {
  username: string;
}

export function CreatorStatsDashboard({ username }: CreatorStatsDashboardProps) {
  const { data, isPending, isError } = useCreatorStats(username);

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-ink/5 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <StatCard key={i} label="" value={0} icon={null} loading />
          ))}
        </div>
        <div className="h-64 bg-ink/5 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center rounded-2xl border border-dashed border-ink/20">
        <ChartBarIcon className="w-12 h-12 mx-auto text-ink/20 mb-3" />
        <p className="text-ink/50">Stats unavailable for this creator yet.</p>
      </div>
    );
  }

  // Calculate some mock trends for demonstration
  // In a real app, these would come from the API comparison with previous period
  const trends = {
    total: 12.5,
    count: 8.2,
    supporters: -2.4
  };

  return (
    <div className="space-y-8">
      {/* Goal Progress Bar - Prominent full-width */}
      <section>
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5" />
          Fundraising Goal
        </h2>
        <GoalProgressBar 
          currentAmount={data.totalAmountXlm} 
          goalAmount={10000} 
        />
      </section>
      
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard
          label="Total Tips"
          value={data.totalAmountXlm}
          suffix=" XLM"
          decimals={1}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          trend={trends.total}
          sparklineData={data.tipHistory.slice(-14)} // Last 14 days
        />
        <StatCard
          label="Tip Count"
          value={data.tipCount}
          icon={<HashtagIcon className="w-6 h-6" />}
          trend={trends.count}
          sparklineData={data.tipHistory.slice(-14).map(d => ({ ...d, amount: d.amount / 2 }))} // Different shape
        />
        <StatCard
          label="Supporters"
          value={data.uniqueSupporters}
          icon={<UsersIcon className="w-6 h-6" />}
          trend={trends.supporters}
          sparklineData={data.tipHistory.slice(-14).reverse()} // Another different shape
        />
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold text-ink mb-4">Tip History</h2>
          <TipChart data={data.tipHistory} />
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink mb-4">Top Supporters</h2>
          <TopSupporters supporters={data.topSupporters} />
        </section>
      </div>
    </div>
  );
}

