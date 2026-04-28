/**
 * Unified Zod validation schemas for all app forms (#217).
 *
 * Import these schemas (not the raw zod shapes) in form components
 * and pass them to zodResolver() so all validation logic stays in
 * one place and is automatically type-safe.
 */

import { z } from "zod";
import { stellarAddressSchema, amountSchema, transactionHashSchema } from "./stellar";

// ── Creator registration ─────────────────────────────────────────────────────

export const createCreatorSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  wallet_address: stellarAddressSchema,

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

export type CreateCreatorInput = z.infer<typeof createCreatorSchema>;

// ── Send tip ─────────────────────────────────────────────────────────────────

export const sendTipSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),

  amount: amountSchema,

  message: z
    .string()
    .max(200, "Message must be at most 200 characters")
    .optional()
    .or(z.literal("")),
});

export type SendTipInput = z.infer<typeof sendTipSchema>;

// ── Transaction lookup ────────────────────────────────────────────────────────

export const transactionSchema = z.object({
  transaction_hash: transactionHashSchema,
});

export type TransactionInput = z.infer<typeof transactionSchema>;

// ── Profile / settings ───────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be at most 50 characters"),

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

  website: z
    .string()
    .url("Invalid URL — include https://")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ── Search ────────────────────────────────────────────────────────────────────

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query must be at most 100 characters"),
});

export type SearchInput = z.infer<typeof searchSchema>;

// ── Form-component aliases (matches the suggested public API) ─────────────────

/** Alias for sendTipSchema — use with TipForm. */
export const tipFormSchema = sendTipSchema;
export type TipFormData = SendTipInput;

/** Alias for createCreatorSchema — use with CreatorForm. */
export const creatorFormSchema = createCreatorSchema;
export type CreatorFormData = CreateCreatorInput;
