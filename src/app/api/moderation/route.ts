import { NextRequest, NextResponse } from "next/server";
import type { ModerationResult, ModerationStatus } from "@/services/moderationService";

// In-memory store (replace with DB in production)
const store = new Map<string, ModerationResult>();

// ── Keyword-based AI simulation ───────────────────────────────────────────────

const RULES: Array<{ pattern: RegExp; category: ModerationResult["categories"][number]; weight: number }> = [
  { pattern: /\b(buy now|click here|free money|earn \$|make money fast)\b/i, category: "spam", weight: 0.9 },
  { pattern: /https?:\/\/[^\s]{30,}/, category: "spam", weight: 0.7 },
  { pattern: /(.)\1{6,}/, category: "spam", weight: 0.6 },
  { pattern: /\b(kill yourself|kys|go die)\b/i, category: "harassment", weight: 0.95 },
  { pattern: /\b(hate|slur)\b/i, category: "hate_speech", weight: 0.8 },
];

function aiScan(content: string) {
  const matched = RULES.filter((r) => r.pattern.test(content));
  const categories = [...new Set(matched.map((r) => r.category))];
  const confidence = matched.length ? Math.max(...matched.map((r) => r.weight)) : 0;
  return { flagged: confidence >= 0.6, categories, confidence };
}

// ── GET /api/moderation/queue ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status") as ModerationStatus | null;
  let items = Array.from(store.values());
  if (status) items = items.filter((i) => i.status === status);
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return NextResponse.json({
    items,
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    flagged: items.filter((i) => i.status === "flagged").length,
  });
}

// ── POST /api/moderation/scan ─────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, contentType, content, authorId } = body as {
      contentId: string;
      contentType: ModerationResult["contentType"];
      content: string;
      authorId: string;
    };

    if (!contentId || !content || !authorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { flagged, categories, confidence } = aiScan(content);
    const autoActioned = flagged && confidence >= 0.9;

    const result: ModerationResult = {
      id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      contentId,
      contentType: contentType ?? "comment",
      content,
      authorId,
      flagged,
      autoActioned,
      confidence,
      categories,
      status: autoActioned ? "flagged" : flagged ? "pending" : "approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.set(result.id, result);
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to scan content" }, { status: 500 });
  }
}
