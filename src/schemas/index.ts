import { z } from "zod";

// Re-export existing schemas
export { tipSchema, scheduledTipSchema } from "./tipSchema";
export type { TipSchemaInput, TipSchemaValues, ScheduledTipInput, ScheduledTipValues } from "./tipSchema";
export { creatorSchema, creatorUsernameSchema } from "./creatorSchema";
export type { CreatorSchemaValues } from "./creatorSchema";

// ── Profile ──────────────────────────────────────────────────────────────────
export const profileSchema = z.object({
  displayName: z.string().trim().min(1, "Display name is required.").max(64, "Max 64 characters."),
  username: z
    .string()
    .trim()
    .min(2, "At least 2 characters.")
    .max(32, "Max 32 characters.")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/, "Letters, numbers, underscores, and hyphens only."),
  bio: z.string().max(280, "Max 280 characters.").optional().or(z.literal("")),
  website: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
  twitter: z.string().max(50).optional().or(z.literal("")),
  github: z.string().max(50).optional().or(z.literal("")),
});
export type ProfileSchemaValues = z.infer<typeof profileSchema>;

// ── Comment ───────────────────────────────────────────────────────────────────
const SPAM_PATTERNS = [/\bspam\b/i, /buy cheap/i, /click here/i, /free money/i];

export const commentSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Message cannot be empty.")
    .max(500, "Message must be 500 characters or fewer.")
    .refine(
      (val) => !SPAM_PATTERNS.some((re) => re.test(val)),
      "Your message was flagged as potential spam. Please revise it.",
    ),
});
export type CommentSchemaValues = z.infer<typeof commentSchema>;

// ── Verification request ──────────────────────────────────────────────────────
export const verificationSchema = z.object({
  proofLinks: z
    .string()
    .trim()
    .min(1, "Please provide at least one proof link.")
    .refine(
      (val) => val.split("\n").filter(Boolean).every((l) => /^https?:\/\/.+/.test(l.trim())),
      "Each line must be a valid URL starting with http:// or https://",
    ),
});
export type VerificationSchemaValues = z.infer<typeof verificationSchema>;

// ── Search ────────────────────────────────────────────────────────────────────
export const searchSchema = z.object({
  query: z.string().trim().min(1, "Enter a search term.").max(100, "Max 100 characters."),
});
export type SearchSchemaValues = z.infer<typeof searchSchema>;

// ── Email preferences ─────────────────────────────────────────────────────────
export const emailPrefsSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  tipReceived: z.boolean(),
  milestones: z.boolean(),
  weeklySummary: z.boolean(),
});
export type EmailPrefsSchemaValues = z.infer<typeof emailPrefsSchema>;
