"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { GamificationState, XPEvent } from "@/types/gamification";
import {
  getUserGamificationState,
  claimReward as apiClaimReward,
  getXPHistory,
} from "@/services/gamificationService";

interface GamificationContextValue extends GamificationState {
  isLoading: boolean;
  xpHistory: XPEvent[];
  refresh: () => Promise<void>;
  claimReward: (rewardId: string) => Promise<void>;
  addXP: (amount: number, reason: string) => void;
}

const GamificationContext = createContext<GamificationContextValue | null>(null);

export function useGamificationContext() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamificationContext must be used within GamificationProvider");
  return ctx;
}

interface GamificationProviderProps {
  children: ReactNode;
  username?: string;
}

export function GamificationProvider({ children, username = "demo-user" }: GamificationProviderProps) {
  const [state, setState] = useState<GamificationState | null>(null);
  const [xpHistory, setXpHistory] = useState<XPEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [gamificationData, history] = await Promise.all([
        getUserGamificationState(username),
        getXPHistory(username),
      ]);
      setState(gamificationData);
      setXpHistory(history);
    } catch (error) {
      console.error("Failed to fetch gamification data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const claimReward = useCallback(
    async (rewardId: string) => {
      if (!state) return;
      try {
        await apiClaimReward(username, rewardId);
        // Optimistically update
        setState((prev) =>
          prev
            ? {
                ...prev,
                rewards: prev.rewards.map((r) =>
                  r.id === rewardId ? { ...r, claimed: true } : r
                ),
              }
            : prev
        );
      } catch (error) {
        console.error("Failed to claim reward:", error);
      }
    },
    [state, username]
  );

  const addXP = useCallback((amount: number, reason: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const newTotalXP = prev.totalXP + amount;
      // Recalculate level if needed (simplified — real impl would call service)
      return {
        ...prev,
        totalXP: newTotalXP,
        recentXPGain: { amount, reason },
      };
    });
    setXpHistory((prev) => [{ amount, reason, timestamp: new Date().toISOString() }, ...prev]);
  }, []);

  if (!state) {
    return (
      <GamificationContext.Provider
        value={{
          isLoading,
          totalXP: 0,
          currentLevel: { level: 1, title: "Newcomer", minXP: 0, maxXP: 100, color: "text-gray-500", bgColor: "bg-gray-100", icon: "🌱" },
          nextLevel: null,
          levelProgress: 0,
          xpIntoLevel: 0,
          xpNeeded: 100,
          badges: [],
          achievements: [],
          rewards: [],
          stats: { tipCount: 0, totalTipped: 0, uniqueRecipients: 0, currentStreak: 0 },
          xpHistory: [],
          refresh,
          claimReward,
          addXP,
        }}
      >
        {children}
      </GamificationContext.Provider>
    );
  }

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        isLoading,
        xpHistory,
        refresh,
        claimReward,
        addXP,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}
