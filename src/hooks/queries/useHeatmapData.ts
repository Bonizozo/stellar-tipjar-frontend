"use client";

import { useQuery } from "@tanstack/react-query";
import { getTipHeatmapData, type HeatmapTip } from "@/services/api";

export const heatmapKeys = {
  all: ["heatmap"] as const,
  byUser: (username: string, years: number) =>
    ["heatmap", username, years] as const,
};

/**
 * Fetches raw tip data for the heatmap calendar.
 * Data is cached for 5 minutes — heatmaps don't need real-time freshness.
 */
export function useHeatmapData(username: string, years = 1) {
  return useQuery<HeatmapTip[]>({
    queryKey: heatmapKeys.byUser(username, years),
    queryFn: () => getTipHeatmapData(username, years),
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });
}
