"use client";

import { TipHistoryTimeline } from "@/components/TipHistoryTimeline";
import Link from "next/link";

export default function TipTimelinePage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Tip Timeline</h1>
          <p className="mt-2 text-ink/60">
            Interactive timeline of your tip history with filtering and export.
          </p>
        </div>
        <Link
          href="/tips"
          className="inline-flex items-center gap-2 rounded-2xl border border-ink/20 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-ink/5 transition-colors"
        >
          ← Table view
        </Link>
      </div>

      <TipHistoryTimeline />
    </section>
  );
}
