"use client";

import { useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export type ReportCategory =
  | "spam"
  | "harassment"
  | "impersonation"
  | "inappropriate"
  | "misinformation"
  | "other";

const CATEGORIES: { value: ReportCategory; label: string }[] = [
  { value: "spam", label: "Spam or scam" },
  { value: "harassment", label: "Harassment or bullying" },
  { value: "impersonation", label: "Impersonation" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "misinformation", label: "Misinformation" },
  { value: "other", label: "Other" },
];

interface ReportModalProps {
  targetUser: string;
  onClose: () => void;
}

async function submitReport(payload: {
  targetUser: string;
  category: ReportCategory;
  reason: string;
}): Promise<void> {
  try {
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // best-effort — log in production
  }
}

export function ReportModal({ targetUser, onClose }: ReportModalProps) {
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const trapRef = useFocusTrap<HTMLDivElement>(true);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) { setError("Please select a reason."); return; }
    setError(null);
    setStatus("submitting");
    await submitReport({ targetUser, category, reason: reason.trim() });
    setStatus("done");
  };

  const inputCls =
    "w-full rounded-xl border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-wave/30";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={trapRef}
        className="w-full max-w-md rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card"
      >
        {status === "done" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="text-4xl" aria-hidden="true">✅</span>
            <p className="font-semibold text-ink">Report submitted</p>
            <p className="text-sm text-ink/60">
              Thank you. Our moderation team will review this report.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-xl bg-wave px-5 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-start justify-between">
              <h2 id="report-modal-title" className="text-lg font-semibold text-ink">
                Report @{targetUser}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close report dialog"
                className="rounded-lg p-1 text-ink/40 transition hover:text-ink"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-ink mb-1">Reason *</span>
                <select
                  className={inputCls}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ReportCategory)}
                  aria-required="true"
                  aria-invalid={!!error}
                >
                  <option value="">Select a reason…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-ink mb-1">
                  Additional details <span className="text-ink/40 font-normal">(optional)</span>
                </span>
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y`}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe the issue…"
                  maxLength={1000}
                  rows={3}
                  aria-label="Additional details"
                />
              </label>

              {error && (
                <p role="alert" className="text-xs text-error">{error}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                  className="rounded-xl bg-error px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting…" : "Submit Report"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink/70 transition hover:border-ink/40"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
