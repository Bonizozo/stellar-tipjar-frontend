export interface Milestone {
  id: string;
  label: string;
  threshold: number; // total tips received
  icon: string;
  badge: "bronze" | "silver" | "gold" | "platinum";
  shareText: string;
}

export const MILESTONES: Milestone[] = [
  { id: "first_tip",    label: "First Tip!",       threshold: 1,    icon: "🌱", badge: "bronze",   shareText: "I just received my first tip on Stellar Tip Jar! 🌱" },
  { id: "ten_tips",     label: "10 Tips!",          threshold: 10,   icon: "🔥", badge: "bronze",   shareText: "I've received 10 tips on Stellar Tip Jar! 🔥" },
  { id: "fifty_tips",   label: "50 Tips!",          threshold: 50,   icon: "⭐", badge: "silver",   shareText: "50 tips milestone reached on Stellar Tip Jar! ⭐" },
  { id: "century",      label: "100 Tips!",         threshold: 100,  icon: "💯", badge: "silver",   shareText: "100 tips! I'm on fire on Stellar Tip Jar! 💯" },
  { id: "five_hundred", label: "500 Tips!",         threshold: 500,  icon: "🚀", badge: "gold",     shareText: "500 tips milestone! Thank you all on Stellar Tip Jar! 🚀" },
  { id: "thousand",     label: "1,000 Tips!",       threshold: 1000, icon: "👑", badge: "platinum", shareText: "1,000 tips! I'm a top creator on Stellar Tip Jar! 👑" },
];

const BADGE_COLORS: Record<Milestone["badge"], string> = {
  bronze:   "#cd7f32",
  silver:   "#c0c0c0",
  gold:     "#ffd700",
  platinum: "#e5e4e2",
};

export function getBadgeColor(badge: Milestone["badge"]): string {
  return BADGE_COLORS[badge];
}

/** Returns the milestone just reached for a given tip count, or null. */
export function checkMilestone(totalTips: number): Milestone | null {
  return MILESTONES.find((m) => m.threshold === totalTips) ?? null;
}

/** Returns all milestones unlocked at or below a tip count. */
export function getUnlockedMilestones(totalTips: number): Milestone[] {
  return MILESTONES.filter((m) => m.threshold <= totalTips);
}
