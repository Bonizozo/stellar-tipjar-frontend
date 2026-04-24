"use client";

import { useState } from 'react';
import { LeaderboardTable } from './LeaderboardTable';
import { TimeFilter } from './TimeFilter';
import { useLeaderboards } from '@/hooks/useLeaderboards';

interface Tab {
  value: 'tippers' | 'creators' | 'biggest';
  label: string;
}

export function Leaderboards() {
  const [activeTab, setActiveTab] = useState<Tab['value']>('tippers');
  const [period, setPeriod] = useState<'24h' | '7d' | '30d' | 'all'>('30d');

  const { data: leaderboards = {}, isLoading } = useLeaderboards({ period });

  const tabs: Tab[] = [
    { value: 'tippers', label: 'Top Tippers' },
    { value: 'creators', label: 'Top Creators' },
    { value: 'biggest', label: 'Biggest Tips' },
  ];

  const currentData = leaderboards[activeTab] || [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-ink to-ink/80 bg-clip-text text-transparent">
          Leaderboards
        </h2>
        <TimeFilter value={period} onChange={setPeriod} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {tabs.map((tab) => (
          <div key={tab.value} className={`group cursor-pointer transition-all rounded-3xl border-2 border-ink/10 bg-surface p-6 hover:border-wave/30 hover:shadow-2xl ${activeTab === tab.value ? 'border-wave/50 ring-4 ring-wave/20 shadow-2xl scale-[1.02]' : ''}`} onClick={() => setActiveTab(tab.value)}>
            <h3 className="font-bold text-xl mb-4 text-ink group-hover:text-wave transition-colors">{tab.label}</h3>
            <div className="space-y-3">
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="h-6 w-6 border-2 border-wave/30 border-t-wave rounded-full animate-spin" />
                </div>
              ) : (leaderboards[tab.value] as any[])?.length ? (
                <div className="space-y-2">
                  {(leaderboards[tab.value] as any[]).slice(0, 5).map((entry: any, i: number) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="font-mono text-sm font-bold text-ink/70">#{i+1}</span>
                      <span className="font-semibold text-wave">{entry.metric?.toLocaleString()} XLM</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-4 border-t border-ink/20">
                    <button className="w-full text-wave hover:text-wave/80 text-sm font-medium transition-colors">
                      View full list
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center text-ink/40">
                  <div className="w-16 h-16 rounded-2xl bg-ink/10 flex items-center justify-center mb-2">
                    🏆
                  </div>
                  <p className="text-sm text-center">No data yet</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

