export type TimeRange = 'daily' | 'weekly' | 'monthly';

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar?: string;
  totalAmount: string;
  tipCount: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface Leaderboard {
  type: 'creators' | 'tippers' | 'trending';
  timeRange: TimeRange;
  entries: LeaderboardEntry[];
  updatedAt: Date;
}

