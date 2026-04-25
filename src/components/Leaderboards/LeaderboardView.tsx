'use client';

import { useState, useEffect } from 'react';
import { Leaderboard, TimeRange } from '@/types/leaderboards';
import { leaderboardService } from '@/services/leaderboardService';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

interface LeaderboardViewProps {
  type: 'creators' | 'tippers' | 'trending';
}

export const LeaderboardView = ({ type }: LeaderboardViewProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        let data;
        if (type === 'creators') {
          data = await leaderboardService.getTopCreators(timeRange);
        } else if (type === 'tippers') {
          data = await leaderboardService.getTopTippers(timeRange);
        } else {
          data = await leaderboardService.getTrending(timeRange);
        }
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [type, timeRange]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!leaderboard) return <div className="text-center py-8">No data available</div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-6">
        {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {leaderboard.entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl font-bold text-gray-400 w-8">{entry.rank}</div>

            {entry.avatar && (
              <Image
                src={entry.avatar}
                alt={entry.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}

            <div className="flex-1">
              <p className="font-semibold">{entry.name}</p>
              <p className="text-sm text-gray-600">{entry.tipCount} tips</p>
            </div>

            <div className="text-right">
              <p className="font-bold">{entry.totalAmount}</p>
              {entry.trend && (
                <div className="flex items-center justify-end gap-1 text-sm">
                  {entry.trend === 'up' && (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">↑</span>
                    </>
                  )}
                  {entry.trend === 'down' && (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">↓</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
