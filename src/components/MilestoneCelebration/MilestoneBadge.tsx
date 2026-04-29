"use client";

import type { Milestone } from "@/utils/milestones";
import { getBadgeColor } from "@/utils/milestones";

interface Props {
  milestone: Milestone;
    size?: "sm" | "md" | "lg";
    }
    
    const SIZE = { sm: "h-10 w-10 text-xl", md: "h-16 w-16 text-3xl", lg: "h-24 w-24 text-5xl" };
    const LABEL_SIZE = { sm: "text-xs", md: "text-sm", lg: "text-base" };
    
    export function MilestoneBadge({ milestone, size = "md" }: Props) {
      const color = getBadgeColor(milestone.badge);
        return (
            <div className="flex flex-col items-center gap-1.5" aria-label={`${milestone.label} badge`}>
                  <div
                          className={`${SIZE[size]} flex items-center justify-center rounded-full border-4 shadow-lg`}
                                  style={{ borderColor: color, boxShadow: `0 0 16px ${color}66` }}
                                        >
                                                <span role="img" aria-label={milestone.label}>{milestone.icon}</span>
                                                      </div>
                                                            <span className={`${LABEL_SIZE[size]} font-semibold capitalize`} style={{ color }}>
                                                                    {milestone.badge}
                                                                          </span>
                                                                                <span className="text-xs font-medium text-ink/70">{milestone.label}</span>
                                                                                    </div>
                                                                                      );
                                                                                      }
                                                                                      "