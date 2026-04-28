import { NextRequest, NextResponse } from "next/server";

// Shared store reference — in production use a real DB
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStore = (): Map<string, any> => {
  // Access the module-level store via dynamic import workaround for Next.js edge
  // In production this would be a DB call; here we use a global for the mock
  if (!(globalThis as Record<string, unknown>).__modStore) {
    (globalThis as Record<string, unknown>).__modStore = new Map();
  }
  return (globalThis as Record<string, unknown>).__modStore as Map<string, unknown>;
};

// ── PATCH /api/moderation/[id]/review ────────────────────────────────────────

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const store = getStore();
    const item = store.get(id);

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { status, reviewNote } = await request.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = {
      ...item,
      status,
      reviewNote: reviewNote ?? item.reviewNote,
      reviewedBy: "admin",
      updatedAt: new Date().toISOString(),
    };

    store.set(id, updated);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// ── GET /api/moderation/[id] ──────────────────────────────────────────────────

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const store = getStore();
  const item = store.get(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}
