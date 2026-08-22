"use client";

import { TransactionList } from "@/components/transactions/TransactionList";
import { useTipHistory } from "@/hooks/useTipHistory";

export default function TransactionsPage() {
  const { tips, isLoading } = useTipHistory();

  // Map tip history to Transaction shape
  const transactions = (tips ?? []).map((t: any) => ({
    id: t.id ?? t.intentId ?? String(Math.random()),
    createdAt: t.createdAt ?? t.scheduledAt ?? new Date().toISOString(),
    amount: String(t.amount),
    assetCode: t.assetCode ?? "XLM",
    creatorUsername: t.creatorUsername ?? t.username ?? "unknown",
    senderUsername: t.senderUsername,
    transactionHash: t.transactionHash ?? t.hash,
    message: t.message,
  }));

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-ink">Transaction History</h1>
        <p className="mt-1 text-ink/60">View, filter, and download receipts for all your tips.</p>
      </header>

      {isLoading ? (
        <div className="py-20 text-center text-ink/40">Loading transactions…</div>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
}
