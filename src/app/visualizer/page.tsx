"use client";

import { TransactionGraph } from "@/components/TransactionGraph";
import { useTips } from "@/hooks/queries/useTips";

export default function VisualizerPage() {
  const { data: tips = [], isLoading } = useTips();

  return (
    <section className="mx-auto max-w-5xl space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Transaction Visualizer</h1>
        <p className="mt-2 text-ink/60">
          Interactive graph of tip flows between senders and recipients. Click any node to inspect details.
        </p>
      </div>

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
