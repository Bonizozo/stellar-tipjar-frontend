// ── Core gamification types ────────────────────────────────────────────────

export type BadgeRarity = "common" | "rare" | "epic" | "legendary";
export type AchievementCategory = "tipping" | "social" | "streak" | "milestone";
export type RewardType = "cosmetic" | "feature" | "discount" | "exclusive";
export type LeaderboardPeriod = "24h" | "7d" | "30d" | "all";

// ── Level ──────────────────────────────────────────────────────────────────

export interface Level {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
  bgColor: string;
  icon: string;
}

// ── Badge ──────────────────────────────────────────────────────────────────

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  unlocked: boolean;
  unlockedAt?: string;
  /** XP awarded when first unlocked */
  xpReward: number;
}

// ── Achievement ────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  progress: number;
  target: number;
  completed: boolean;
  completedAt?: string;
  xpReward: number;
}

// ── Reward ─────────────────────────────────────────────────────────────────

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: RewardType;
  xpCost: number;
  claimed: boolean;
  available: boolean;
  /** ISO date when reward expires, if any */
  expiresAt?: string;
}

// ── Leaderboard ────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  /** Primary metric value (XLM tipped / received) */
  metric: number;
  /** XP earned */
  xp: number;
  level: number;
  change24h: number;
  badges: Pick<GamificationBadge, "id" | "icon" | "rarity">[];
}

export interface LeaderboardData {
  tippers: LeaderboardEntry[];
  creators: LeaderboardEntry[];
  biggest: LeaderboardEntry[];
  updatedAt: string;
}

// ── User gamification state ────────────────────────────────────────────────

export interface GamificationStats {
  tipCount: number;
  totalTipped: number;
  uniqueRecipients: number;
  currentStreak: number;
}

export interface GamificationState {
  totalXP: number;
  currentLevel: Level;
  nextLevel: Level | null;
  levelProgress: number;
  xpIntoLevel: number;
  xpNeeded: number;
  badges: GamificationBadge[];
  achievements: Achievement[];
  rewards: Reward[];
  stats: GamificationStats;
  recentXPGain?: { amount: number; reason: string };
}

// ── XP event ──────────────────────────────────────────────────────────────

export interface XPEvent {
  amount: number;
  reason: string;
  timestamp: string;
}
