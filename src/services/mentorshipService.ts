import type { Mentor } from "@/lib/mentorship-data";

export interface MentorFeedback {
  id: string;
  mentorId: string;
  menteeId: string;
  sessionId: string;
  rating: number; // 1–5
  review: string;
  createdAt: string;
}

// Simple keyword-based matching score
export function matchScore(mentor: Mentor, interests: string[]): number {
  if (interests.length === 0) return 0.5;
  const expertiseLower = mentor.expertise.map((e) => e.toLowerCase());
  const matches = interests.filter((i) =>
    expertiseLower.some((e) => e.includes(i.toLowerCase()) || i.toLowerCase().includes(e))
  );
  return matches.length / interests.length;
}

export function findBestMatch(mentors: Mentor[], interests: string[]): Mentor | null {
  const available = mentors.filter((m) => m.isAvailable);
  if (available.length === 0) return null;
  return available.reduce((best, m) =>
    matchScore(m, interests) >= matchScore(best, interests) ? m : best
  );
}

export async function submitFeedback(feedback: Omit<MentorFeedback, "id" | "createdAt">): Promise<MentorFeedback> {
  const full: MentorFeedback = {
    ...feedback,
    id: Math.random().toString(36).slice(2, 9),
    createdAt: new Date().toISOString(),
  };
  // Best-effort persist
  await fetch("/api/mentorship/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(full),
  }).catch(() => {});
  return full;
}
