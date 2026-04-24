const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type ActivityType = "tip" | "milestone" | "update";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  timestamp: number;
  creator: string;
  /** tip */
  amount?: string;
  from?: string;
  memo?: string;
  /** milestone */
  milestone?: string;
  /** update */
  title?: string;
  body?: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: "1", type: "tip", timestamp: Date.now() - 60_000, creator: "alice", amount: "50", from: "bob", memo: "Great content!" },
  { id: "2", type: "milestone", timestamp: Date.now() - 3_600_000, creator: "alice", milestone: "Reached 100 supporters 🎉" },
  { id: "3", type: "tip", timestamp: Date.now() - 7_200_000, creator: "carol", amount: "25", from: "dave" },
  { id: "4", type: "update", timestamp: Date.now() - 86_400_000, creator: "carol", title: "New video out!", body: "Just dropped a new tutorial on Stellar." },
  { id: "5", type: "tip", timestamp: Date.now() - 172_800_000, creator: "alice", amount: "10", from: "eve", memo: "Keep it up!" },
  { id: "6", type: "milestone", timestamp: Date.now() - 259_200_000, creator: "carol", milestone: "First 500 XLM received 🚀" },
];

export async function getActivityFeed(creator?: string): Promise<ActivityItem[]> {
  try {
    const path = creator ? `/activity?creator=${creator}` : "/activity";
    const res = await fetch(`${API_BASE_URL}${path}`);
    if (!res.ok) throw new Error("fetch failed");
    return res.json() as Promise<ActivityItem[]>;
  } catch {
    return creator ? MOCK_ACTIVITIES.filter((a) => a.creator === creator) : MOCK_ACTIVITIES;
  }
}
