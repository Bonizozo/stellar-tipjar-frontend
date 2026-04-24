export type Period = '24h' | '7d' | '30d' | 'all';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  metric: number;
  change24h: number;
  avatarUrl?: string;
}

export interface LeaderboardsResponse {
  tippers: LeaderboardEntry[];
  creators: LeaderboardEntry[];
  biggest: LeaderboardEntry[];
}

