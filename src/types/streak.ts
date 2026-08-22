export interface TipStreak {
  currentStreak: number;
  longestStreak: number;
  lastTipDate: string | null;
  streakStartDate: string | null;
  totalTips: number;
  recoveryAvailable: boolean;
  recoveryExpiresAt: string | null;
}

export interface StreakReward {
  streakMilestone: number;
  rewardType: "badge" | "bonus" | "discount";
  rewardValue: string;
  claimed: boolean;
  claimedAt?: string;
}

export interface StreakHistoryEntry {
  date: string;
  tipped: boolean;
  amount?: string;
  creatorUsername?: string;
}
