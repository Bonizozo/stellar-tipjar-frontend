"use client";

import { useState } from "react";
import { VerificationBadge } from "@/components/VerificationBadge";

interface VerificationRequest {
  id: string;
  username: string;
  proofLinks: string[];
  documentUrl?: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

// Mock data — replace with real API call
const MOCK_REQUESTS: VerificationRequest[] = [
  {
    id: "vr-1",
    username: "alice",
    proofLinks: ["https://twitter.com/alice"],
    submittedAt: new Date().toISOString(),
    status: "pending",
  },
];

export default function AdminVerificationPage() {
  const [requests, setRequests] = useState<VerificationRequest[]>(MOCK_REQUESTS);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await fetch(`/api/admin/verification/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const statusColor: Record<VerificationRequest["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-ink">Verification Requests</h1>

      <div className="space-y-4">
        {requests.length === 0 && (
          <p className="text-ink/50">No pending requests.</p>
        )}
        {requests.map((req) => (
          <div key={req.id} className="rounded-2xl border border-ink/10 bg-surface p-6 space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="font-bold text-ink">@{req.username}</span>
                {req.status === "approved" && <VerificationBadge isVerified />}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[req.status]}`}>
                {req.status}
              </span>
            </div>

            <div className="text-sm text-ink/60">
              Submitted: {new Date(req.submittedAt).toLocaleString()}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-ink/80">Proof links:</p>
              {req.proofLinks.map((link) => (
                <a key={link} href={link} target="_blank" rel="noopener noreferrer"
                  className="block text-sm text-wave underline break-all">{link}</a>
              ))}
            </div>

            {req.documentUrl && (
              <a href={req.documentUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block text-sm text-wave underline">View uploaded document</a>
            )}

            {req.status === "pending" && (
              <div className="flex gap-3 pt-2">
                <button onClick={() => updateStatus(req.id, "approved")}
                  className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                  Approve
                </button>
                <button onClick={() => updateStatus(req.id, "rejected")}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
