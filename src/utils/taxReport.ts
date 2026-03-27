import type { Tip } from "@/hooks/queries/useTips";

export interface TaxSummary {
  year: number;
  totalTips: number;
  totalAmountXLM: number;
  completedTips: number;
  completedAmountXLM: number;
  byRecipient: { recipient: string; count: number; amountXLM: number }[];
  byMonth: { month: string; count: number; amountXLM: number }[];
}

export function buildTaxSummary(tips: Tip[], year: number): TaxSummary {
  const completed = tips.filter((t) => t.status === "completed");

  const recipientMap = new Map<string, { count: number; amountXLM: number }>();
  for (const t of completed) {
    const cur = recipientMap.get(t.recipient) ?? { count: 0, amountXLM: 0 };
    recipientMap.set(t.recipient, { count: cur.count + 1, amountXLM: cur.amountXLM + t.amount });
  }

  const monthMap = new Map<string, { count: number; amountXLM: number }>();
  for (const t of completed) {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const cur = monthMap.get(key) ?? { count: 0, amountXLM: 0 };
    monthMap.set(key, { count: cur.count + 1, amountXLM: cur.amountXLM + t.amount });
  }

  return {
    year,
    totalTips: tips.length,
    totalAmountXLM: tips.reduce((s, t) => s + t.amount, 0),
    completedTips: completed.length,
    completedAmountXLM: completed.reduce((s, t) => s + t.amount, 0),
    byRecipient: [...recipientMap.entries()]
      .map(([recipient, v]) => ({ recipient, ...v }))
      .sort((a, b) => b.amountXLM - a.amountXLM),
    byMonth: [...monthMap.entries()]
      .map(([month, v]) => ({ month, ...v }))
      .sort((a, b) => a.month.localeCompare(b.month)),
  };
}
