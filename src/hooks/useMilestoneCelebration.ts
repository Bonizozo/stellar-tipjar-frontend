"use client";

import { useState, useEffect, useRef } from "react";
import { checkMilestone } from "@/utils/milestones";
import type { Milestone } from "@/utils/milestones";

/**
 * Watches totalTips and triggers a celebration when a milestone threshold is crossed.
 * Tracks seen milestones in a ref so each fires only once per session.
 */
export function useMilestoneCelebration(totalTips: number) {
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const milestone = checkMilestone(totalTips);
    if (milestone && !seenRef.current.has(milestone.id)) {
      seenRef.current.add(milestone.id);
      setActiveMilestone(milestone);
    }
  }, [totalTips]);

  function dismiss() {
    setActiveMilestone(null);
  }

  return { activeMilestone, dismiss };
}
