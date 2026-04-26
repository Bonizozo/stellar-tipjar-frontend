"use client";

import { useMemo, useState } from "react";
import { exportToCSV } from "@/utils/exportCSV";
import { useTipHistory } from "@/hooks/useTipHistory";
import { TipFilters } from "@/components/TipFilters";
import type { Tip } from "@/hooks/queries/useTips";

const STATUS_STYLES: Record<Tip["status"], string> = {
  completed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_DOT: Record<Tip["status"], string> = {
  completed: "bg-green-500",
  pending: "bg-yellow-500",
  failed: "bg-red-500",
};

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatDayLabel(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function dayKey(dateStr: string) {
  return new Date(dateStr).toISOString().slice(0, 10);
}

function TipTimelineItem({ tip, isLast }: { tip: Tip; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`mt-1 h-3 w-3 rounded-full border-2 border-[color:var(--surface)] ring-2 ring-ink/10 shrink-0 ${STATUS_DOT[tip.status]}`} />
        {!isLast && <div className="w-px flex-1 bg-ink/10 mt-1" />}
      </div>

      <div className="mb-4 flex-1 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <a href={`/creator/${tip.recipient}`} className="font-semibold text-wave hover:underline">
              @{tip.recipient}
            </a>
            <p className="text-xs text-ink/50 mt-0.5">{formatTime(tip.date)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-ink">{tip.amount} XLM</span>
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[tip.status]}`}>
              {tip.status}
            </span>
          </div>
        </div>

        {tip.memo && <p className="mt-2 text-sm text-ink/70 italic">"{tip.memo}"</p>}

        {tip.transactionHash && (
          <div className="mt-2">
            <button type="button" onClick={() => setExpanded((v) => !v)} className="text-xs text-wave hover:underline">
              {expanded ? "Hide" : "Show"} transaction details
            </button>
            {expanded && (
              <div className="mt-2 rounded-lg bg-ink/5 p-3">
                <p className="text-xs text-ink/60 font-mono break-all">{tip.transactionHash}</p>
                <a
                  href={`https://stellar.expert/explorer/public/tx/${tip.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-wave hover:underline"
                >
                  View on Stellar Expert ↗
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Groups tips by calendar day, returns sorted array of [dayKey, tips[]] */
function groupByDay(tips: Tip[]): [string, Tip[]][] {
  const map = new Map<string, Tip[]>();
  for (const tip of tips) {
    const key = dayKey(tip.date);
    const group = map.get(key) ?? [];
    group.push(tip);
    map.set(key, group);
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

export function TipHistoryTimeline() {
  const { tips, allTips, isLoading, filters, setFilters } = useTipHistory();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return tips;
    const q = search.toLowerCase();
    return tips.filter(
      (t) =>
        t.recipient.toLowerCase().includes(q) ||
        t.memo?.toLowerCase().includes(q) ||
        t.transactionHash?.toLowerCase().includes(q)
    );
  }, [tips, search]);

  const grouped = useMemo(() => groupByDay(filtered), [filtered]);

  const stats = useMemo(() => ({
    total: filtered.length,
    completed: filtered.filter((t) => t.status === "completed").length,
    volume: filtered.filter((t) => t.status === "completed").reduce((s, t) => s + t.amount, 0),
  }), [filtered]);

  const handleExport = () => {
    exportToCSV(
      filtered.map((t) => ({ ...t })),
      [
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount (XLM)" },
        { key: "recipient", label: "Recipient" },
        { key: "status", label: "Status" },
        { key: "memo", label: "Memo" },
        { key: "transactionHash", label: "Transaction Hash" },
      ],
      `tip-history-${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipient, memo, tx hash…"
          className="w-full rounded-2xl border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none sm:max-w-xs"
        />
        <button
          type="button"
          onClick={handleExport}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-2 rounded-2xl bg-wave px-4 py-2.5 text-sm font-medium text-white hover:bg-wave/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <TipFilters filters={filters} onFiltersChange={setFilters} onClear={() => setFilters({})} />

      {/* Summary stats */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Showing", value: `${stats.total} of ${allTips.length}` },
            { label: "Completed", value: stats.completed },
            { label: "Volume", value: `${stats.volume} XLM` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-3 text-center">
              <p className="text-xs text-ink/50">{label}</p>
              <p className="mt-0.5 text-base font-bold text-ink">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Timeline grouped by day */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="mt-1 h-3 w-3 rounded-full bg-ink/10 shrink-0" />
              <div className="flex-1 h-20 rounded-2xl bg-ink/5" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-12 text-center">
          <p className="font-medium text-ink">No tips found</p>
          <p className="mt-1 text-sm text-ink/50">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([day, dayTips]) => (
            <div key={day}>
              {/* Day separator */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-ink/10" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                  {formatDayLabel(dayTips[0].date)}
                </span>
                <div className="h-px flex-1 bg-ink/10" />
              </div>
              {dayTips.map((tip, i) => (
                <TipTimelineItem key={tip.id} tip={tip} isLast={i === dayTips.length - 1} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
