"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useModeration } from "@/hooks/useModeration";
import type { ModerationStatus, ModerationResult } from "@/services/moderationService";

const STATUS_STYLES: Record<ModerationStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  flagged: "bg-red-100 text-red-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-ink/10 text-ink/50",
  reviewing: "bg-blue-100 text-blue-700",
};

const STATUS_FILTERS: Array<{ label: string; value: ModerationStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Flagged", value: "flagged" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const color = pct >= 90 ? "text-red-600" : pct >= 60 ? "text-amber-600" : "text-green-600";
  return <span className={`text-xs font-mono font-semibold ${color}`}>{pct}%</span>;
}

function ReviewModal({
  item,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  item: ModerationResult;
  onClose: () => void;
  onSubmit: (status: "approved" | "rejected", note: string) => void;
  isSubmitting: boolean;
}) {
  const [note, setNote] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Review content"
    >
      <div className="w-full max-w-lg rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-xl">
        <h2 className="text-lg font-bold text-ink">Review Content</h2>
        <p className="mt-1 text-xs text-ink/50">ID: {item.id}</p>

        <div className="mt-4 rounded-xl border border-ink/10 bg-ink/5 p-3">
          <p className="text-sm text-ink/80 break-words">{item.content}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="text-ink/50">Author: <strong className="text-ink">{item.authorId}</strong></span>
          <span className="text-ink/50">Type: <strong className="text-ink">{item.contentType}</strong></span>
          <span className="text-ink/50">Confidence: <ConfidenceBadge confidence={item.confidence} /></span>
          {item.categories.length > 0 && (
            <span className="text-ink/50">
              Categories:{" "}
              {item.categories.map((c) => (
                <span key={c} className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-red-700 capitalize">{c}</span>
              ))}
            </span>
          )}
        </div>

        <textarea
          className="mt-4 w-full rounded-xl border border-ink/20 bg-transparent p-3 text-sm text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none"
          placeholder="Review note (optional)"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-ink/20 px-4 py-2 text-sm text-ink/60 hover:border-ink/40"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onSubmit("rejected", note)}
            className="rounded-lg border border-error/30 px-4 py-2 text-sm font-medium text-error hover:bg-error/5 disabled:opacity-50"
          >
            Reject
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onSubmit("approved", note)}
            className="rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90 disabled:opacity-50"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModerationDashboard() {
  const [statusFilter, setStatusFilter] = useState<ModerationStatus | "all">("all");
  const [reviewing, setReviewing] = useState<ModerationResult | null>(null);

  const { queue, isLoadingQueue, isQueueError, review, isReviewing } = useModeration(
    statusFilter === "all" ? undefined : statusFilter,
  );

  const handleReview = (status: "approved" | "rejected", note: string) => {
    if (!reviewing) return;
    review(
      { resultId: reviewing.id, status, reviewNote: note || undefined },
      { onSuccess: () => setReviewing(null) },
    );
  };

  const stats = [
    { label: "Total", value: queue?.total ?? 0, icon: ShieldCheck, color: "text-wave" },
    { label: "Pending", value: queue?.pending ?? 0, icon: Clock, color: "text-amber-500" },
    { label: "Flagged", value: queue?.flagged ?? 0, icon: ShieldAlert, color: "text-red-500" },
    {
      label: "Reviewed",
      value: (queue?.total ?? 0) - (queue?.pending ?? 0) - (queue?.flagged ?? 0),
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink">AI Content Moderation</h1>
        <p className="mt-1 text-sm text-ink/60">
          Automated detection of inappropriate content and spam. High-confidence violations are auto-actioned.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-card"
          >
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
              <span className="text-xs text-ink/50">{label}</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatusFilter(value)}
            aria-pressed={statusFilter === value}
            className={`rounded-xl border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              statusFilter === value
                ? "border-wave bg-wave/10 text-wave"
                : "border-ink/20 text-ink/60 hover:border-wave/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoadingQueue && (
        <div className="flex items-center gap-2 text-sm text-ink/50">
          <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
          Loading queue…
        </div>
      )}

      {isQueueError && (
        <p className="text-sm text-error">Failed to load moderation queue.</p>
      )}

      {!isLoadingQueue && !isQueueError && queue?.items.length === 0 && (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-8 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-green-500" aria-hidden="true" />
          <p className="mt-2 text-sm text-ink/50">No items match this filter.</p>
        </div>
      )}

      <ul className="space-y-3">
        {queue?.items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5 shadow-card"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[item.status]}`}
                  >
                    {item.status}
                  </span>
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink/60 capitalize">
                    {item.contentType}
                  </span>
                  {item.autoActioned && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                      Auto-actioned
                    </span>
                  )}
                  {item.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 capitalize"
                    >
                      {c.replace("_", " ")}
                    </span>
                  ))}
                </div>

                {/* Content preview */}
                <p className="mt-2 line-clamp-2 text-sm text-ink/80">{item.content}</p>

                {/* Footer */}
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-ink/40">
                  <span>Author: <strong className="text-ink/60">{item.authorId}</strong></span>
                  <span>Confidence: <ConfidenceBadge confidence={item.confidence} /></span>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>

                {item.reviewNote && (
                  <p className="mt-1 text-xs text-ink/50 italic">Note: {item.reviewNote}</p>
                )}
              </div>

              {/* Actions */}
              {(item.status === "pending" || item.status === "flagged") && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      review({ resultId: item.id, status: "approved" });
                    }}
                    aria-label="Approve"
                    className="rounded-lg border border-green-200 p-2 text-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      review({ resultId: item.id, status: "rejected" });
                    }}
                    aria-label="Reject"
                    className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewing(item)}
                    className="rounded-lg border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink/60 hover:border-wave/40 hover:text-wave"
                  >
                    Review
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Review modal */}
      {reviewing && (
        <ReviewModal
          item={reviewing}
          onClose={() => setReviewing(null)}
          onSubmit={handleReview}
          isSubmitting={isReviewing}
        />
      )}
    </div>
  );
}
