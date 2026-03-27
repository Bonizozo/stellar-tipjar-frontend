import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelScheduledTip,
  createScheduledTip,
  listScheduledTips,
  type CreateScheduledTipPayload,
} from "@/services/scheduleService";

const SCHEDULED_TIPS_KEY = ["scheduledTips"] as const;

export function useScheduledTips(username?: string) {
  return useQuery({
    queryKey: [...SCHEDULED_TIPS_KEY, username],
    queryFn: () => listScheduledTips(username),
  });
}

export function useScheduleTip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateScheduledTipPayload) => createScheduledTip(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SCHEDULED_TIPS_KEY }),
  });
}

export function useCancelScheduledTip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelScheduledTip(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SCHEDULED_TIPS_KEY }),
  });
}
