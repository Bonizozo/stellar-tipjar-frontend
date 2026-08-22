import { Leaderboard, TimeRange } from '@/types/leaderboards';
import { API_BASE_URL as API_URL } from "@/config/env";

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
