export type TimeRange = "daily" | "weekly" | "monthly";
export type Period = TimeRange; // Alias for compatibility

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar?: string;
  totalAmount: string;
  tipCount: number;
  trend?: "up" | "down" | "stable";
}

export interface Leaderboard {
  type: "creators" | "tippers" | "trending";
  timeRange: TimeRange;
  entries: LeaderboardEntry[];
  updatedAt: Date;
}

export interface LeaderboardsResponse {
  leaderboards: Leaderboard[];
  timestamp: Date;
}
