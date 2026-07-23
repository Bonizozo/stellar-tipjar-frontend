"use client";

import { useCallback, useEffect, useState } from "react";
import type { Goal } from "@/components/goals/GoalCard";
import { createNamespacedStorage } from "@/lib/storage";
import { z } from "zod";

const storage = createNamespacedStorage("goals");

const goalSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  deadline: z.string(),
  status: z.enum(["active", "completed", "expired"]),
  supporters: z
    .array(
      z.object({
        address: z.string(),
        amount: z.number(),
      }),
    )
    .optional(),
});

function deriveStatus(goal: Goal): Goal["status"] {
  if (goal.currentAmount >= goal.targetAmount) return "completed";
  if (new Date(goal.deadline) < new Date()) return "expired";
  return "active";
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = storage.get<Goal[]>("goals", {
      schema: z.array(goalSchema),
      legacyKey: "stellar_tipjar_goals",
    });
    setGoals(loaded ?? []);
    setIsLoading(false);
  }, []);

  const persist = (next: Goal[]) => {
    setGoals(next);
    storage.set("goals", next);
  };

  const createGoal = useCallback(
    (data: Omit<Goal, "id" | "currentAmount" | "status" | "supporters">) => {
      const goal: Goal = {
        ...data,
        id: crypto.randomUUID(),
        currentAmount: 0,
        status: "active",
        supporters: [],
      };
      persist([goal, ...goals]);
      return goal;
    },
    [goals]
  );

  const updateGoal = useCallback(
    (id: string, patch: Partial<Omit<Goal, "id">>) => {
      persist(
        goals.map((g) => {
          if (g.id !== id) return g;
          const updated = { ...g, ...patch };
          return { ...updated, status: deriveStatus(updated) };
        })
      );
    },
    [goals]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      persist(goals.filter((g) => g.id !== id));
    },
    [goals]
  );

  const addContribution = useCallback(
    (id: string, amount: number, address: string) => {
      persist(
        goals.map((g) => {
          if (g.id !== id) return g;
          const currentAmount = g.currentAmount + amount;
          const supporters = [...(g.supporters ?? []), { address, amount }];
          const updated = { ...g, currentAmount, supporters };
          return { ...updated, status: deriveStatus(updated) };
        })
      );
    },
    [goals]
  );

  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");
  const expiredGoals = goals.filter((g) => g.status === "expired");

  return {
    goals,
    activeGoals,
    completedGoals,
    expiredGoals,
    isLoading,
    createGoal,
    updateGoal,
    deleteGoal,
    addContribution,
  };
}
