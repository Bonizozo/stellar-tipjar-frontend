"use client";

import { useState } from "react";

type ReportStatus = "pending" | "reviewed" | "dismissed" | "actioned";

interface Report {
  id: string;
  targetUser: string;
  reportedBy: string;
  category: string;
  reason: string;
  createdAt: string;
  status: ReportStatus;
}

// Mock data — replace with real API call when backend is ready
const MOCK_REPORTS: Report[] = [
  {
    id: "r1",
    targetUser: "spam-user",
    reportedBy: "alice",
    category: "spam",
    reason: "Posting promotional links in comments.",
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
    status: "pending",
  },
  {
    id: "r2",
    targetUser: "bad-actor",
    reportedBy: "stellar-fan",
    category: "harassment",
    reason: "Sending threatening messages.",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    status: "pending",
  },
  {
    id: "r3",
    targetUser: "fake-alice",
    reportedBy: "xlm-lover",
    category: "impersonation",
    reason: "Pretending to be @alice.",
    createdAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
    status: "reviewed",
  },
];

const STATUS_STYLES: Record<ReportStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  dismissed: "bg-ink/10 text-ink/50",
  actioned: "bg-green-100 text-green-700",
};

async function updateReportStatus(id: string, status: ReportStatus): Promise<void> {
  await fetch(`/api/reports/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).catch(() => {/* best-effort */});
}

async function blockUser(username: string): Promise<void> {
  await fetch(`/api/users/${username}/block`, { method: "POST" }).catch(() => {});
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [filter, setFilter] = useState<ReportStatus | "all">("all");

  const displayed = filter === "all" ? reports : reports.filter((r) => r.status === filter);

  const setStatus = (id: string, status: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    updateReportStatus(id, status);
  };

  const handleBlock = (username: string, reportId: string) => {
    blockUser(username);
    setStatus(reportId, "actioned");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Moderation Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">
          Review and action user reports. {reports.filter((r) => r.status === "pending").length} pending.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reports by status">
        {(["all", "pending", "reviewed", "actioned", "dismissed"] as const).map((s) => (
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
        <p className="text-sm text-ink/50">No reports match this filter.</p>
      )}

      <ul className="space-y-3">
        {displayed.map((report) => (
          <li
            key={report.id}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5 shadow-card"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-ink">@{report.targetUser}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[report.status]}`}>
                    {report.status}
                  </span>
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink/60 capitalize">
                    {report.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/70">{report.reason}</p>
                <p className="mt-1 text-xs text-ink/40">
                  Reported by @{report.reportedBy} · {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {report.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStatus(report.id, "reviewed")}
                      className="rounded-lg border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-wave/40 hover:text-wave"
                    >
                      Mark Reviewed
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(report.id, "dismissed")}
                      className="rounded-lg border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink/50 hover:border-ink/40"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBlock(report.targetUser, report.id)}
                      className="rounded-lg border border-error/30 px-3 py-1.5 text-xs font-medium text-error hover:bg-error/5"
                    >
                      Block User
                    </button>
                  </>
                )}
                {report.status === "reviewed" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStatus(report.id, "dismissed")}
                      className="rounded-lg border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink/50 hover:border-ink/40"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBlock(report.targetUser, report.id)}
                      className="rounded-lg border border-error/30 px-3 py-1.5 text-xs font-medium text-error hover:bg-error/5"
                    >
                      Block User
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
