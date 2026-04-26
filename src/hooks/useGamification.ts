"use client";

import { useMemo } from "react";
import { useTips } from "@/hooks/queries/useTips";

// ── Types ──────────────────────────────────────────────────────────────────

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;   // current value
  target: number;     // value needed to complete
  completed: boolean;
  xpReward: number;
}

export interface Level {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpCost: number;
  claimed: boolean;
  available: boolean;
}

// ── Level table ────────────────────────────────────────────────────────────

const LEVELS: Level[] = [
  { level: 1, title: "Newcomer",    minXP: 0,    maxXP: 100,  color: "text-gray-500" },
  { level: 2, title: "Supporter",   minXP: 100,  maxXP: 300,  color: "text-green-500" },
  { level: 3, title: "Contributor", minXP: 300,  maxXP: 600,  color: "text-blue-500" },
  { level: 4, title: "Champion",    minXP: 600,  maxXP: 1000, color: "text-purple-500" },
  { level: 5, title: "Legend",      minXP: 1000, maxXP: 1000, color: "text-yellow-500" },
];

function getLevel(xp: number): Level {
  return [...LEVELS].reverse().find((l) => xp >= l.minXP) ?? LEVELS[0];
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useGamification() {
  const { data: tips = [], isLoading } = useTips();

  return useMemo(() => {
    const completedTips = tips.filter((t) => t.status === "completed");
    const totalTipped = completedTips.reduce((s, t) => s + t.amount, 0);
    const uniqueRecipients = new Set(completedTips.map((t) => t.recipient)).size;
    const tipCount = completedTips.length;

    // XP formula: 10 per tip + 1 per XLM tipped
    const totalXP = tipCount * 10 + Math.floor(totalTipped);
    const currentLevel = getLevel(totalXP);
    const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1) ?? currentLevel;
    const xpIntoLevel = totalXP - currentLevel.minXP;
    const xpNeeded = nextLevel.maxXP - currentLevel.minXP;
    const levelProgress = currentLevel.level === 5 ? 100 : Math.min((xpIntoLevel / xpNeeded) * 100, 100);

    // ── Badges ──────────────────────────────────────────────────────────
    const badges: GamificationBadge[] = [
      {
        id: "first-tip",
        name: "First Tip",
        description: "Send your first tip",
        icon: "🎉",
        rarity: "common",
        unlocked: tipCount >= 1,
      },
      {
        id: "generous",
        name: "Generous",
        description: "Tip 5 different creators",
        icon: "💝",
        rarity: "common",
        unlocked: uniqueRecipients >= 5,
      },
      {
        id: "big-spender",
        name: "Big Spender",
        description: "Send a tip of 100+ XLM",
        icon: "💰",
        rarity: "rare",
        unlocked: completedTips.some((t) => t.amount >= 100),
      },
      {
        id: "loyal",
        name: "Loyal Fan",
        description: "Send 10 tips total",
        icon: "⭐",
        rarity: "rare",
        unlocked: tipCount >= 10,
      },
      {
        id: "whale",
        name: "Whale",
        description: "Tip 500+ XLM total",
        icon: "🐋",
        rarity: "epic",
        unlocked: totalTipped >= 500,
      },
      {
        id: "legend",
        name: "Legend",
        description: "Reach Level 5",
        icon: "👑",
        rarity: "legendary",
        unlocked: currentLevel.level >= 5,
      },
    ];

    // ── Achievements ────────────────────────────────────────────────────
    const achievements: Achievement[] = [
      {
        id: "tips-5",
        name: "Getting Started",
        description: "Send 5 tips",
        icon: "🚀",
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
        progress: Math.min(tipCount, 25),
        target: 25,
        completed: tipCount >= 25,
        xpReward: 200,
      },
      {
        id: "amount-100",
        name: "Century Club",
        description: "Tip 100 XLM total",
        icon: "💯",
        progress: Math.min(totalTipped, 100),
        target: 100,
        completed: totalTipped >= 100,
        xpReward: 100,
      },
      {
        id: "creators-3",
        name: "Community Builder",
        description: "Support 3 different creators",
        icon: "🤝",
        progress: Math.min(uniqueRecipients, 3),
        target: 3,
        completed: uniqueRecipients >= 3,
        xpReward: 75,
      },
      {
        id: "amount-500",
        name: "Mega Supporter",
        description: "Tip 500 XLM total",
        icon: "🏆",
        progress: Math.min(totalTipped, 500),
        target: 500,
        completed: totalTipped >= 500,
        xpReward: 500,
      },
    ];

    // ── Rewards ─────────────────────────────────────────────────────────
    const rewards: Reward[] = [
      {
        id: "profile-frame",
        name: "Gold Profile Frame",
        description: "Exclusive gold border on your profile",
        icon: "🖼️",
        xpCost: 200,
        claimed: false,
        available: totalXP >= 200,
      },
      {
        id: "custom-badge",
        name: "Custom Badge Slot",
        description: "Unlock a custom badge display slot",
        icon: "🎖️",
        xpCost: 400,
        claimed: false,
        available: totalXP >= 400,
      },
      {
        id: "early-access",
        name: "Early Access",
        description: "Get early access to new features",
        icon: "⚡",
        xpCost: 600,
        claimed: false,
        available: totalXP >= 600,
      },
    ];

    return {
      isLoading,
      totalXP,
      currentLevel,
      nextLevel,
      levelProgress,
      xpIntoLevel,
      xpNeeded,
      badges,
      achievements,
      rewards,
      stats: { tipCount, totalTipped, uniqueRecipients },
    };
  }, [tips, isLoading]);
}
