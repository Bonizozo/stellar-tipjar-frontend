import { z } from "zod";

export const creatorFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  walletAddress: z
    .string()
    .min(1, "Wallet address is required")
    .regex(/^G[A-Z2-7]{55}$/, "Invalid Stellar address format"),

  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be at most 50 characters")
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
});

export type CreatorFormData = z.infer<typeof creatorFormSchema>;
