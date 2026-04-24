import { z } from "zod";

// Basic validation patterns
const TEAM_NAME_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{1,31}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Team name schema
export const teamNameSchema = z
  .string()
  .min(3, "Team name must be at least 3 characters")
  .max(32, "Team name must be at most 32 characters")
  .regex(TEAM_NAME_PATTERN, "Team name can only contain letters, numbers, hyphens, and underscores");

// Team member schema
export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Member name is required").max(100, "Member name is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  split: z
    .number()
    .min(0, "Split must be 0 or higher")
    .max(100, "Split cannot exceed 100%")
    .int("Split must be a whole number"),
  createdAt: z.string().datetime().optional(),
  isActive: z.boolean().optional().default(true),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

// Team invitation schema
export const teamInvitationSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  sentAt: z.string().datetime().optional(),
  status: z.enum(["pending", "accepted", "rejected"]).optional().default("pending"),
  expiredAt: z.string().datetime().optional(),
});

export type TeamInvitationInput = z.infer<typeof teamInvitationSchema>;

// Team profile schema
export const teamProfileSchema = z.object({
  id: z.string().optional(),
  name: teamNameSchema,
  displayName: z.string().max(100, "Display name is too long").optional(),
  description: z.string().max(500, "Description is too long").optional(),
  members: z.array(teamMemberSchema).default([]),
  invitations: z.array(teamInvitationSchema).default([]),
  owner: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  totalTipsReceived: z.number().nonnegative().optional().default(0),
});

export type TeamProfileInput = z.infer<typeof teamProfileSchema>;

// Team statistics schema
export const teamStatisticsSchema = z.object({
  memberCount: z.number().nonnegative(),
  activeMemberCount: z.number().nonnegative(),
  totalSplit: z.number().min(0).max(100),
  isBalanced: z.boolean(),
  averageSplit: z.number().nonnegative(),
  totalTipsReceived: z.number().nonnegative(),
});

export type TeamStatistics = z.infer<typeof teamStatisticsSchema>;

// Create team request schema
export const createTeamSchema = z.object({
  name: teamNameSchema,
  displayName: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
});

export type CreateTeamRequest = z.infer<typeof createTeamSchema>;

// Add member request schema
export const addMemberSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  split: z.number().min(0).max(100).int(),
});

export type AddMemberRequest = z.infer<typeof addMemberSchema>;

// Update split schema
export const updateSplitSchema = z.object({
  memberId: z.string(),
  split: z.number().min(0).max(100).int(),
});

export type UpdateSplitRequest = z.infer<typeof updateSplitSchema>;

// Invite member schema
export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().max(500).optional(),
});

export type InviteMemberRequest = z.infer<typeof inviteMemberSchema>;

// Revenue split validation schema - ensures splits add up to 100%
export const revenueSplitValidationSchema = z
  .array(teamMemberSchema)
  .refine(
    (members) => {
      const activeMembers = members.filter((m) => m.isActive !== false);
      if (activeMembers.length === 0) return true;
      const total = activeMembers.reduce((sum, m) => sum + m.split, 0);
      return total === 100;
    },
    { message: "Active members' splits must total 100%" }
  );

// Team name availability check response
export const teamNameCheckSchema = z.object({
  available: z.boolean(),
  message: z.string().optional(),
});

export type TeamNameCheckResponse = z.infer<typeof teamNameCheckSchema>;
