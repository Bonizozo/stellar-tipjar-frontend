"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommendations } from "@/services/recommendationService";
import { recordInteraction, clearAffinityProfile } from "@/utils/mlModel";

export const recommendationKeys = {
  list: (exclude?: string) => ["recommendations", exclude ?? ""] as const,
};

export function useRecommendations(limit = 6, excludeUsername?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: recommendationKeys.list(excludeUsername),
    queryFn: () => getRecommendations(limit, excludeUsername),
    staleTime: 2 * 60 * 1000,
  });

  /** Call this whenever the user interacts with a creator */
  const trackInteraction = useCallback(
    (
      type: "view" | "tip" | "search" | "click",
      creatorUsername: string,
      category?: string,
    ) => {
      recordInteraction({ type, creatorUsername, category, timestamp: Date.now() });
      // Invalidate so the next render re-scores with updated affinity
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
    [queryClient],
  );

  /** Wipe all stored preferences */
  const resetPreferences = useCallback(() => {
    clearAffinityProfile();
    queryClient.invalidateQueries({ queryKey: ["recommendations"] });
  }, [queryClient]);

  return {
    recommendations: query.data?.creators ?? [],
    isPersonalised: query.data?.isPersonalised ?? false,
    isLoading: query.isLoading,
    isError: query.isError,
    trackInteraction,
    resetPreferences,
  };
}
