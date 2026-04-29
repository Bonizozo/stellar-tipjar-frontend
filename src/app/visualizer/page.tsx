"use client";

import { useMemo } from "react";
import { TransactionGraph } from "@/components/TransactionGraph";
import { useTips } from "@/hooks/queries/useTips";
import { computeNetworkStats } from "@/services/transactionVisualizerService";

export default function VisualizerPage() {
  const { data: tips = [], isLoading } = useTips();
  const stats = useMemo(() => computeNetworkStats(tips), [tips]);

  return (
    <section className="mx-auto max-w-5xl space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Blockchain Transaction Visualizer</h1>
        <p className="mt-2 text-ink/60">
          Interactive graph of tip flows and network activity. Click any node to inspect transaction details.
        </p>
      </div>

      {/* Network activity stats */}
      {!isLoading && tips.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Transactions", value: stats.totalTransactions },
            { label: "Volume (XLM)", value: stats.totalVolume.toFixed(2) },
            { label: "Senders", value: stats.uniqueSenders },
            { label: "Recipients", value: stats.uniqueRecipients },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 text-center shadow-card">
              <p className="text-xs text-ink/50">{label}</p>
              <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
            </div>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
        </div>
      ) : (
        <TransactionGraph tips={tips} />
      )}
    </section>
  );
}
