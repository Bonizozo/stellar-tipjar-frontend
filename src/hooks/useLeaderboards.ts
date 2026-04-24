"use client";

import { useQuery } from '@tanstack/react-query';
import { getLeaderboards } from '@/services/api';
import type { LeaderboardsResponse, Period } from '@/types/leaderboards';

interface UseLeaderboardsProps {
  period: Period;
}

export function useLeaderboards({ period }: UseLeaderboardsProps) {
  return useQuery({
    queryKey: ['leaderboards', period],
    queryFn: () => getLeaderboards(period),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: 2,
  });
}

