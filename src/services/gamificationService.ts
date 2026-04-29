import type {
  GamificationState,
  LeaderboardData,
  LeaderboardPeriod,
  Level,
  GamificationBadge,
  Achievement,
  Reward,
  XPEvent,
} from "@/types/gamification";
import { generateAvatarUrl } from "@/utils/imageUtils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── Level table ────────────────────────────────────────────────────────────

export const LEVELS: Level[] = [
  { level: 1, title: "Newcomer",    minXP: 0,    maxXP: 100,  color: "text-gray-500",   bgColor: "bg-gray-100",   icon: "🌱" },
  { level: 2, title: "Supporter",   minXP: 100,  maxXP: 300,  color: "text-green-600",  bgColor: "bg-green-100",  icon: "⭐" },
  { level: 3, title: "Contributor", minXP: 300,  maxXP: 600,  color: "text-blue-600",   bgColor: "bg-blue-100",   icon: "🔥" },
  { level: 4, title: "Champion",    minXP: 600,  maxXP: 1000, color: "text-purple-600", bgColor: "bg-purple-100", icon: "💎" },
  { level: 5, title: "Legend",      minXP: 1000, maxXP: 1000, color: "text-yellow-500", bgColor: "bg-yellow-100", icon: "👑" },
];

export function getLevel(xp: number): Level {
  return [...LEVELS].reverse().find((l) => xp >= l.minXP) ?? LEVELS[0];
}

export function getNextLevel(current: Level): Level | null {
  return LEVELS.find((l) => l.level === current.level + 1) ?? null;
}

// ── XP calculation ─────────────────────────────────────────────────────────

export function calculateXP(tipCount: number, totalTipped: number, streak: number): number {
  const base = tipCount * 10 + Math.floor(totalTipped);
  const streakBonus = streak > 0 ? Math.floor(streak * 2) : 0;
  return base + streakBonus;
}

// ── Badge definitions ──────────────────────────────────────────────────────

export function buildBadges(
  tipCount: number,
  totalTipped: number,
  uniqueRecipients: number,
  currentLevelNum: number,
  streak: number,
): GamificationBadge[] {
  return [
    {
      id: "first-tip",
      name: "First Tip",
      description: "Send your first tip",
      icon: "🎉",
      rarity: "common",
      xpReward: 20,
      unlocked: tipCount >= 1,
    },
    {
      id: "generous",
      name: "Generous",
      description: "Tip 5 different creators",
      icon: "💝",
      rarity: "common",
      xpReward: 30,
      unlocked: uniqueRecipients >= 5,
    },
    {
      id: "loyal",
      name: "Loyal Fan",
      description: "Send 10 tips total",
      icon: "⭐",
      rarity: "rare",
      xpReward: 75,
      unlocked: tipCount >= 10,
    },
    {
      id: "big-spender",
      name: "Big Spender",
      description: "Send a single tip of 100+ XLM",
      icon: "💰",
      rarity: "rare",
      xpReward: 100,
      unlocked: false, // requires per-tip data — set externally
    },
    {
      id: "streak-7",
      name: "Week Warrior",
      description: "Maintain a 7-day tipping streak",
      icon: "🔥",
      rarity: "rare",
      xpReward: 150,
      unlocked: streak >= 7,
    },
    {
      id: "community",
      name: "Community Pillar",
      description: "Support 10 different creators",
      icon: "🤝",
      rarity: "epic",
      xpReward: 200,
      unlocked: uniqueRecipients >= 10,
    },
    {
      id: "whale",
      name: "Whale",
      description: "Tip 500+ XLM total",
      icon: "🐋",
      rarity: "epic",
      xpReward: 300,
      unlocked: totalTipped >= 500,
    },
    {
      id: "streak-30",
      name: "Monthly Master",
      description: "Maintain a 30-day tipping streak",
      icon: "🌙",
      rarity: "epic",
      xpReward: 400,
      unlocked: streak >= 30,
    },
    {
      id: "legend",
      name: "Legend",
      description: "Reach Level 5",
      icon: "👑",
      rarity: "legendary",
      xpReward: 500,
      unlocked: currentLevelNum >= 5,
    },
    {
      id: "mega-whale",
      name: "Mega Whale",
      description: "Tip 2000+ XLM total",
      icon: "🌊",
      rarity: "legendary",
      xpReward: 1000,
      unlocked: totalTipped >= 2000,
    },
  ];
}

// ── Achievement definitions ────────────────────────────────────────────────

export function buildAchievements(
  tipCount: number,
  totalTipped: number,
  uniqueRecipients: number,
  streak: number,
): Achievement[] {
  return [
    {
      id: "tips-1",
      name: "First Steps",
      description: "Send your first tip",
      icon: "🚀",
      category: "tipping",
      progress: Math.min(tipCount, 1),
      target: 1,
      completed: tipCount >= 1,
      xpReward: 25,
    },
    {
      id: "tips-5",
      name: "Getting Started",
      description: "Send 5 tips",
      icon: "✨",
      category: "tipping",
      progress: Math.min(tipCount, 5),
      target: 5,
      completed: tipCount >= 5,
      xpReward: 50,
    },
    {
      id: "tips-25",
      name: "Regular Tipper",
      description: "Send 25 tips",
      icon: "🔥",
      category: "tipping",
      progress: Math.min(tipCount, 25),
      target: 25,
      completed: tipCount >= 25,
      xpReward: 200,
    },
    {
      id: "tips-100",
      name: "Tip Machine",
      description: "Send 100 tips",
      icon: "⚡",
      category: "tipping",
      progress: Math.min(tipCount, 100),
      target: 100,
      completed: tipCount >= 100,
      xpReward: 500,
    },
    {
      id: "amount-50",
      name: "Half Century",
      description: "Tip 50 XLM total",
      icon: "💫",
      category: "milestone",
      progress: Math.min(totalTipped, 50),
      target: 50,
      completed: totalTipped >= 50,
      xpReward: 50,
    },
    {
      id: "amount-100",
      name: "Century Club",
      description: "Tip 100 XLM total",
      icon: "💯",
      category: "milestone",
      progress: Math.min(totalTipped, 100),
      target: 100,
      completed: totalTipped >= 100,
      xpReward: 100,
    },
    {
      id: "amount-500",
      name: "Mega Supporter",
      description: "Tip 500 XLM total",
      icon: "🏆",
      category: "milestone",
      progress: Math.min(totalTipped, 500),
      target: 500,
      completed: totalTipped >= 500,
      xpReward: 500,
    },
    {
      id: "creators-3",
      name: "Community Builder",
      description: "Support 3 different creators",
      icon: "🤝",
      category: "social",
      progress: Math.min(uniqueRecipients, 3),
      target: 3,
      completed: uniqueRecipients >= 3,
      xpReward: 75,
    },
    {
      id: "creators-10",
      name: "Super Connector",
      description: "Support 10 different creators",
      icon: "🌐",
      category: "social",
      progress: Math.min(uniqueRecipients, 10),
      target: 10,
      completed: uniqueRecipients >= 10,
      xpReward: 200,
    },
    {
      id: "streak-3",
      name: "On a Roll",
      description: "Tip 3 days in a row",
      icon: "🎯",
      category: "streak",
      progress: Math.min(streak, 3),
      target: 3,
      completed: streak >= 3,
      xpReward: 60,
    },
    {
      id: "streak-7",
      name: "Week Warrior",
      description: "Tip 7 days in a row",
      icon: "🔥",
      category: "streak",
      progress: Math.min(streak, 7),
      target: 7,
      completed: streak >= 7,
      xpReward: 150,
    },
    {
      id: "streak-30",
      name: "Monthly Master",
      description: "Tip 30 days in a row",
      icon: "🌙",
      category: "streak",
      progress: Math.min(streak, 30),
      target: 30,
      completed: streak >= 30,
      xpReward: 500,
    },
  ];
}

// ── Reward definitions ─────────────────────────────────────────────────────

export function buildRewards(totalXP: number, claimedIds: string[]): Reward[] {
  const defs: Omit<Reward, "claimed" | "available">[] = [
    {
      id: "profile-frame-silver",
      name: "Silver Profile Frame",
      description: "Exclusive silver border on your profile",
      icon: "🖼️",
      type: "cosmetic",
      xpCost: 100,
    },
    {
      id: "profile-frame-gold",
      name: "Gold Profile Frame",
      description: "Exclusive gold border on your profile",
      icon: "🏅",
      type: "cosmetic",
      xpCost: 250,
    },
    {
      id: "custom-badge",
      name: "Custom Badge Slot",
      description: "Unlock a custom badge display slot on your profile",
      icon: "🎖️",
      type: "cosmetic",
      xpCost: 400,
    },
    {
      id: "early-access",
      name: "Early Access",
      description: "Get early access to new features before public release",
      icon: "⚡",
      type: "feature",
      xpCost: 600,
    },
    {
      id: "fee-discount",
      name: "5% Fee Discount",
      description: "Reduce platform fees by 5% for 30 days",
      icon: "💸",
      type: "discount",
      xpCost: 800,
    },
    {
      id: "vip-badge",
      name: "VIP Badge",
      description: "Exclusive VIP badge visible on all your tips",
      icon: "💎",
      type: "exclusive",
      xpCost: 1000,
    },
  ];

  return defs.map((d) => ({
    ...d,
    claimed: claimedIds.includes(d.id),
    available: totalXP >= d.xpCost,
  }));
}

// ── API calls (with mock fallback) ─────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getUserGamificationState(username: string): Promise<GamificationState> {
  try {
    return await apiFetch<GamificationState>(`/users/${username}/gamification`);
  } catch {
    // Mock fallback
    const tipCount = 12;
    const totalTipped = 340;
    const uniqueRecipients = 7;
    const streak = 5;
    const totalXP = calculateXP(tipCount, totalTipped, streak);
    const currentLevel = getLevel(totalXP);
    const nextLevel = getNextLevel(currentLevel);
    const xpIntoLevel = totalXP - currentLevel.minXP;
    const xpNeeded = (nextLevel?.minXP ?? currentLevel.minXP) - currentLevel.minXP;
    const levelProgress = currentLevel.level === 5 ? 100 : Math.min((xpIntoLevel / xpNeeded) * 100, 100);

    return {
      totalXP,
      currentLevel,
      nextLevel,
      levelProgress,
      xpIntoLevel,
      xpNeeded: xpNeeded || 1,
      badges: buildBadges(tipCount, totalTipped, uniqueRecipients, currentLevel.level, streak),
      achievements: buildAchievements(tipCount, totalTipped, uniqueRecipients, streak),
      rewards: buildRewards(totalXP, []),
      stats: { tipCount, totalTipped, uniqueRecipients, currentStreak: streak },
    };
  }
}

export async function claimReward(username: string, rewardId: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/users/${username}/rewards/${rewardId}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to claim reward");
  } catch {
    // Silently handled — UI updates optimistically
  }
}

export async function getXPHistory(username: string): Promise<XPEvent[]> {
  try {
    return await apiFetch<XPEvent[]>(`/users/${username}/xp-history`);
  } catch {
    const now = Date.now();
    return [
      { amount: 10, reason: "Sent a tip", timestamp: new Date(now - 86400000).toISOString() },
      { amount: 50, reason: "Achievement: Getting Started", timestamp: new Date(now - 172800000).toISOString() },
      { amount: 10, reason: "Sent a tip", timestamp: new Date(now - 259200000).toISOString() },
      { amount: 75, reason: "Achievement: Community Builder", timestamp: new Date(now - 345600000).toISOString() },
      { amount: 10, reason: "Sent a tip", timestamp: new Date(now - 432000000).toISOString() },
    ];
  }
}

export async function getGamificationLeaderboard(period: LeaderboardPeriod): Promise<LeaderboardData> {
  try {
    return await apiFetch<LeaderboardData>(`/leaderboards/gamification?period=${period}`);
  } catch {
    const scale: Record<LeaderboardPeriod, number> = { "24h": 0.1, "7d": 0.4, "30d": 1, all: 2 };
    const s = scale[period];

    const tippers = [
      { name: "xlm-whale",       xp: 1800, metric: 12500, level: 5 },
      { name: "stellar-max",     xp: 1200, metric: 9800,  level: 5 },
      { name: "defi-donor",      xp: 980,  metric: 7500,  level: 4 },
      { name: "crypto-angel",    xp: 760,  metric: 6200,  level: 4 },
      { name: "nft-supporter",   xp: 620,  metric: 4800,  level: 3 },
      { name: "blockchain-backer", xp: 540, metric: 4200, level: 3 },
      { name: "web3-warrior",    xp: 480,  metric: 3800,  level: 3 },
      { name: "tip-machine",     xp: 420,  metric: 3400,  level: 2 },
      { name: "stellar-fan",     xp: 380,  metric: 3100,  level: 2 },
      { name: "xlm-lover",       xp: 320,  metric: 2900,  level: 2 },
    ].map((e, i) => ({
      rank: i + 1,
      userId: e.name,
      name: e.name,
      avatarUrl: generateAvatarUrl(e.name),
      metric: Math.round(e.metric * s),
      xp: Math.round(e.xp * s),
      level: e.level,
      change24h: parseFloat(((Math.random() - 0.4) * 20).toFixed(1)),
      badges: buildBadges(
        Math.round(e.metric * s / 100),
        Math.round(e.metric * s),
        Math.round(e.xp * s / 200),
        e.level,
        Math.round(e.xp * s / 100),
      )
        .filter((b) => b.unlocked)
        .slice(0, 3)
        .map(({ id, icon, rarity }) => ({ id, icon, rarity })),
    }));

    const creators = [
      { name: "stellar-dev", xp: 2100, metric: 15000, level: 5 },
      { name: "alice",       xp: 1600, metric: 11200, level: 5 },
      { name: "nft-queen",   xp: 1200, metric: 8900,  level: 5 },
      { name: "defi-guru",   xp: 980,  metric: 7600,  level: 4 },
      { name: "art-star",    xp: 760,  metric: 6400,  level: 4 },
    ].map((e, i) => ({
      rank: i + 1,
      userId: e.name,
      name: e.name,
      avatarUrl: generateAvatarUrl(e.name),
      metric: Math.round(e.metric * s),
      xp: Math.round(e.xp * s),
      level: e.level,
      change24h: parseFloat(((Math.random() - 0.4) * 20).toFixed(1)),
      badges: buildBadges(0, Math.round(e.metric * s), 0, e.level, 0)
        .filter((b) => b.unlocked)
        .slice(0, 3)
        .map(({ id, icon, rarity }) => ({ id, icon, rarity })),
    }));

    return {
      tippers,
      creators,
      biggest: tippers.slice(0, 5),
      updatedAt: new Date().toISOString(),
    };
  }
}
