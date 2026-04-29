/**
 * AI-powered content moderation service.
 * Scans content for inappropriate material, spam, and policy violations.
 * Auto-flags high-confidence violations; queues borderline cases for manual review.
 */

export type ModerationCategory =
  | "spam"
  | "harassment"
  | "hate_speech"
  | "inappropriate"
  | "impersonation"
  | "other";

export type ModerationStatus = "pending" | "flagged" | "approved" | "rejected" | "reviewing";

export interface ModerationResult {
  id: string;
  contentId: string;
  contentType: "tip_message" | "comment" | "profile_bio" | "username";
  content: string;
  authorId: string;
  flagged: boolean;
  autoActioned: boolean;
  confidence: number; // 0–1
  categories: ModerationCategory[];
  status: ModerationStatus;
  reviewedBy?: string;
  reviewNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScanRequest {
  contentId: string;
  contentType: ModerationResult["contentType"];
  content: string;
  authorId: string;
}

export interface ModerationQueue {
  items: ModerationResult[];
  total: number;
  pending: number;
  flagged: number;
}

export interface ReviewAction {
  resultId: string;
  status: "approved" | "rejected";
  reviewNote?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Keyword-based local pre-scan (runs before API call) ─────────────────────

const SPAM_PATTERNS = [
  /\b(buy now|click here|free money|earn \$|make money fast)\b/i,
  /https?:\/\/[^\s]{30,}/,
  /(.)\1{6,}/, // repeated chars
];

const HATE_PATTERNS = [
  /\b(slur1|slur2)\b/i, // placeholder — real list would be comprehensive
];

const HARASSMENT_PATTERNS = [/\b(kill yourself|kys|go die)\b/i];

function localPreScan(content: string): { flagged: boolean; categories: ModerationCategory[]; confidence: number } {
  const categories: ModerationCategory[] = [];

  if (SPAM_PATTERNS.some((p) => p.test(content))) categories.push("spam");
  if (HATE_PATTERNS.some((p) => p.test(content))) categories.push("hate_speech");
  if (HARASSMENT_PATTERNS.some((p) => p.test(content))) categories.push("harassment");

  const flagged = categories.length > 0;
  const confidence = flagged ? 0.85 : 0;
  return { flagged, categories, confidence };
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`Moderation API error: ${res.status}`);
  return res.json() as Promise<T>;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Scan a piece of content for policy violations.
 * Performs a local pre-scan first; if clean, delegates to the AI moderation API.
 * High-confidence violations (≥0.9) are auto-actioned without manual review.
 */
export async function scanContent(req: ScanRequest): Promise<ModerationResult> {
  const local = localPreScan(req.content);

  // If local scan is confident enough, skip the remote call
  if (local.flagged && local.confidence >= 0.9) {
    return apiFetch<ModerationResult>("/api/moderation/scan", {
      method: "POST",
      body: JSON.stringify({ ...req, localResult: local, autoAction: true }),
    });
  }

  return apiFetch<ModerationResult>("/api/moderation/scan", {
    method: "POST",
    body: JSON.stringify({ ...req, localResult: local }),
  });
}

/** Fetch the moderation queue (pending + flagged items). */
export async function getModerationQueue(
  status?: ModerationStatus,
): Promise<ModerationQueue> {
  const qs = status ? `?status=${status}` : "";
  return apiFetch<ModerationQueue>(`/api/moderation/queue${qs}`);
}

/** Submit a manual review decision for a flagged item. */
export async function reviewContent(action: ReviewAction): Promise<ModerationResult> {
  return apiFetch<ModerationResult>(`/api/moderation/${action.resultId}/review`, {
    method: "PATCH",
    body: JSON.stringify({ status: action.status, reviewNote: action.reviewNote }),
  });
}

/** Fetch a single moderation result by ID. */
export async function getModerationResult(id: string): Promise<ModerationResult> {
  return apiFetch<ModerationResult>(`/api/moderation/${id}`);
}
