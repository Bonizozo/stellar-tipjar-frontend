import { Leaderboard, TimeRange } from '@/types/leaderboards';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const leaderboardService = {
  async getTopCreators(timeRange: TimeRange): Promise<Leaderboard> {
    const res = await fetch(`${API_URL}/leaderboards/creators?timeRange=${timeRange}`);
    if (!res.ok) throw new Error('Failed to fetch creators leaderboard');
    return res.json();
  },

  async getTopTippers(timeRange: TimeRange): Promise<Leaderboard> {
    const res = await fetch(`${API_URL}/leaderboards/tippers?timeRange=${timeRange}`);
    if (!res.ok) throw new Error('Failed to fetch tippers leaderboard');
    return res.json();
  },

  async getTrending(timeRange: TimeRange): Promise<Leaderboard> {
    const res = await fetch(`${API_URL}/leaderboards/trending?timeRange=${timeRange}`);
    if (!res.ok) throw new Error('Failed to fetch trending leaderboard');
    return res.json();
  },
};
