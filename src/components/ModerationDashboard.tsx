"use client";

import { useState, useMemo } from "react";
import {
  type ContentItem,
  type ModerationStatus,
  scanContent,
  submitModerationAction,
} from "@/services/moderationService";

const MOCK_ITEMS: ContentItem[] = [
  {
    id: "c1",
    type: "comment",
    content: "Buy now and get free money! Click here for guaranteed profit.",
    author: "spammer99",
    createdAt: new Date(Date.now() - 600_000).toISOString(),
    status: "pending",
  },
  {
    id: "c2",
    type: "tip_message",
    content: "Great stream! Keep it up 🚀",
    author: "stellar-fan",
    createdAt: new Date(Date.now() - 1_200_000).toISOString(),
    status: "pending",
  },
  {
    id: "c3",
    type: "profile",
    content: "Send XLM to double your investment — guaranteed profit!",
    author: "crypto-scammer",
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
    status: "pending",
  },
  {
    id: "c4",
    type: "comment",
    content: "Love this creator's work, very inspiring content!",
    author: "happy-tipper",
    createdAt: new Date(Date.now() - 7_200_000).toISOString(),
    status: "pending",
  },
];

const STATUS_STYLES: Record<ModerationStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  flagged: "bg-red-100 text-red-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-ink/10 text-ink/50",
};

const CATEGORY_STYLES: Record<string, string> = {
  spam: "bg-orange-100 text-orange-700",
  harassment: "bg-red-100 text-red-700",
  scam: "bg-purple-100 text-purple-700",
  inappropriate: "bg-pink-100 text-pink-700",
  clean: "bg-green-100 text-green-700",
};

export default function ModerationDashboard() {
  const [items, setItems] = useState<ContentItem[]>(() =>
    MOCK_ITEMS.map((item) => ({
      ...item,
      aiResult: scanContent(item.content),
      status: scanContent(item.content).flagged ? "flagged" : "pending",
    }))
  );
  const [filter, setFilter] = useState<ModerationStatus | "all">("all");

  const displayed = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter]
  );

  const counts = useMemo(
    () => ({
      flagged: items.filter((i) => i.status === "flagged").length,
      pending: items.filter((i) => i.status === "pending").length,
    }),
    [items]
  );

  const handleAction = (id: string, action: "approve" | "reject") => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: action === "approve" ? "approved" : "rejected" } : i
      )
    );
    submitModerationAction(id, action);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">AI Content Moderation</h1>
        <p className="mt-1 text-sm text-ink/60">
          AI-scanned content queue.{" "}
          <span className="font-medium text-red-600">{counts.flagged} flagged</span>,{" "}
          <span className="font-medium text-amber-600">{counts.pending} pending</span>.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {(["all", "flagged", "pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            aria-pressed={filter === s}
            className={`rounded-xl border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === s
                ? "border-wave bg-wave/10 text-wave"
                : "border-ink/20 text-ink/60 hover:border-wave/30"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {displayed.length === 0 && (
        <p className="text-sm text-ink/50">No items match this filter.</p>
      )}

      <ul className="space-y-3">
        {displayed.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5 shadow-card"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-ink">@{item.author}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[item.status]}`}>
                    {item.status}
                  </span>
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink/60 capitalize">
                    {item.type.replace("_", " ")}
                  </span>
                </div>

                <p className="mt-2 rounded-lg bg-ink/5 px-3 py-2 text-sm text-ink/80 italic">
                  &ldquo;{item.content}&rdquo;
                </p>

                {/* AI result */}
                {item.aiResult && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-ink/50">AI scan:</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${CATEGORY_STYLES[item.aiResult.category]}`}>
                      {item.aiResult.category}
                    </span>
                    <span className="text-xs text-ink/50">
                      {Math.round(item.aiResult.confidence * 100)}% confidence
                    </span>
                    {item.aiResult.reasons.map((r) => (
                      <span key={r} className="text-xs text-ink/50">· {r}</span>
                    ))}
                  </div>
                )}

                <p className="mt-1 text-xs text-ink/40">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              {(item.status === "flagged" || item.status === "pending") && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction(item.id, "approve")}
                    className="rounded-lg border border-green-300 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(item.id, "reject")}
                    className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
