'use client';

import { useState } from 'react';
import { LeaderboardView } from './LeaderboardView';
import { Users, Award, Flame } from 'lucide-react';

export const LeaderboardsPage = () => {
  const [activeTab, setActiveTab] = useState<'creators' | 'tippers' | 'trending'>('creators');

  const tabs = [
    { id: 'creators', label: 'Top Creators', icon: Award },
    { id: 'tippers', label: 'Top Tippers', icon: Users },
    { id: 'trending', label: 'Trending', icon: Flame },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Leaderboards</h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>

      <LeaderboardView type={activeTab} />
    </div>
  );
};
