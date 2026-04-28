import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  scanContent,
  getModerationQueue,
  reviewContent,
  type ScanRequest,
  type ModerationStatus,
  type ReviewAction,
} from "@/services/moderationService";

export const moderationKeys = {
  queue: (status?: ModerationStatus) => ["moderation", "queue", status ?? "all"] as const,
};

/** Hook for scanning content and managing the moderation queue. */
export function useModeration(statusFilter?: ModerationStatus) {
  const queryClient = useQueryClient();

  // ── Queue query ────────────────────────────────────────────────────────────
  const queueQuery = useQuery({
    queryKey: moderationKeys.queue(statusFilter),
    queryFn: () => getModerationQueue(statusFilter),
    staleTime: 30_000,
    refetchInterval: 60_000, // poll every minute for new items
  });

  // ── Content scan mutation ──────────────────────────────────────────────────
  const scanMutation = useMutation({
    mutationFn: (req: ScanRequest) => scanContent(req),
    onSuccess: () => {
      // Refresh queue after a new scan result arrives
      queryClient.invalidateQueries({ queryKey: ["moderation", "queue"] });
    },
  });

  // ── Manual review mutation ─────────────────────────────────────────────────
  const reviewMutation = useMutation({
    mutationFn: (action: ReviewAction) => reviewContent(action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moderation", "queue"] });
    },
  });

  return {
    // Queue data
    queue: queueQuery.data,
    isLoadingQueue: queueQuery.isLoading,
    isQueueError: queueQuery.isError,

    // Content scanning
    scan: scanMutation.mutate,
    scanAsync: scanMutation.mutateAsync,
    isScanning: scanMutation.isPending,
    lastScanResult: scanMutation.data ?? null,

    // Manual review
    review: reviewMutation.mutate,
    isReviewing: reviewMutation.isPending,
  };
}
