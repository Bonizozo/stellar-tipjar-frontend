import type { Tip } from "@/hooks/queries/useTips";

export interface NetworkStats {
  totalTransactions: number;
  totalVolume: number;
  uniqueSenders: number;
  uniqueRecipients: number;
  completedCount: number;
  pendingCount: number;
  failedCount: number;
  topSender: string | null;
  topRecipient: string | null;
}

export function computeNetworkStats(tips: Tip[]): NetworkStats {
  const senderCounts = new Map<string, number>();
  const recipientCounts = new Map<string, number>();

  for (const tip of tips) {
    senderCounts.set(tip.sender, (senderCounts.get(tip.sender) ?? 0) + 1);
    recipientCounts.set(tip.recipient, (recipientCounts.get(tip.recipient) ?? 0) + 1);
  }

  const topSender = [...senderCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const topRecipient = [...recipientCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    totalTransactions: tips.length,
    totalVolume: tips.reduce((s, t) => s + t.amount, 0),
    uniqueSenders: senderCounts.size,
    uniqueRecipients: recipientCounts.size,
    completedCount: tips.filter((t) => t.status === "completed").length,
    pendingCount: tips.filter((t) => t.status === "pending").length,
    failedCount: tips.filter((t) => t.status === "failed").length,
    topSender,
    topRecipient,
  };
}

export function filterTips(
  tips: Tip[],
  opts: { status?: string; search?: string; minAmount?: number; maxAmount?: number }
): Tip[] {
  return tips.filter((t) => {
    if (opts.status && opts.status !== "all" && t.status !== opts.status) return false;
    if (opts.minAmount !== undefined && t.amount < opts.minAmount) return false;
    if (opts.maxAmount !== undefined && t.amount > opts.maxAmount) return false;
    if (opts.search) {
      const q = opts.search.toLowerCase();
      if (!t.sender.toLowerCase().includes(q) && !t.recipient.toLowerCase().includes(q) && !t.id.includes(q)) return false;
    }
    return true;
  });
}
