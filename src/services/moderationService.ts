export type ModerationCategory = "spam" | "harassment" | "inappropriate" | "scam" | "clean";
export type ModerationStatus = "pending" | "flagged" | "approved" | "rejected";

export interface ModerationResult {
  category: ModerationCategory;
  confidence: number; // 0–1
  flagged: boolean;
  reasons: string[];
}

export interface ContentItem {
  id: string;
  type: "comment" | "profile" | "tip_message";
  content: string;
  author: string;
  createdAt: string;
  status: ModerationStatus;
  aiResult?: ModerationResult;
}

// Keyword-based AI simulation (replace with real API integration)
const SPAM_PATTERNS = [/buy now/i, /click here/i, /free money/i, /\$\$\$/];
const HARASSMENT_PATTERNS = [/hate/i, /threat/i, /kill/i];
const SCAM_PATTERNS = [/send xlm/i, /double your/i, /guaranteed profit/i];
const INAPPROPRIATE_PATTERNS = [/nsfw/i, /explicit/i];

export function scanContent(content: string): ModerationResult {
  const reasons: string[] = [];
  let category: ModerationCategory = "clean";
  let confidence = 0.95;

  if (SPAM_PATTERNS.some((p) => p.test(content))) {
    category = "spam";
    reasons.push("Promotional language detected");
    confidence = 0.88;
  } else if (SCAM_PATTERNS.some((p) => p.test(content))) {
    category = "scam";
    reasons.push("Potential scam pattern detected");
    confidence = 0.92;
  } else if (HARASSMENT_PATTERNS.some((p) => p.test(content))) {
    category = "harassment";
    reasons.push("Threatening or hateful language detected");
    confidence = 0.85;
  } else if (INAPPROPRIATE_PATTERNS.some((p) => p.test(content))) {
    category = "inappropriate";
    reasons.push("Inappropriate content detected");
    confidence = 0.80;
  }

  return {
    category,
    confidence,
    flagged: category !== "clean",
    reasons,
  };
}

export async function submitModerationAction(
  itemId: string,
  action: "approve" | "reject"
): Promise<void> {
  await fetch(`/api/moderation/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  }).catch(() => {/* best-effort */});
}
