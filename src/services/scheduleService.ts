import type { Recurrence } from "@/schemas/tipSchema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ScheduledTip {
  id: string;
  username: string;
  amount: string;
  assetCode: string;
  message?: string;
  scheduledAt: string; // ISO string
  recurrence: Recurrence;
  notifyEmail?: string;
  status: "pending" | "sent" | "cancelled";
}

export interface CreateScheduledTipPayload {
  username: string;
  amount: string;
  assetCode: string;
  message?: string;
  scheduledAt: string;
  recurrence: Recurrence;
  notifyEmail?: string;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function createScheduledTip(payload: CreateScheduledTipPayload) {
  return apiFetch<ScheduledTip>("/tips/scheduled", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function listScheduledTips(username?: string) {
  const qs = username ? `?username=${encodeURIComponent(username)}` : "";
  return apiFetch<ScheduledTip[]>(`/tips/scheduled${qs}`);
}

export function cancelScheduledTip(id: string) {
  return apiFetch<{ success: boolean }>(`/tips/scheduled/${id}`, {
    method: "DELETE",
  });
}
