import { z } from "zod";

export const RECURRENCE_OPTIONS = ["none", "weekly", "monthly", "yearly"] as const;
export type Recurrence = (typeof RECURRENCE_OPTIONS)[number];

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const tipSchema = z.object({
  amount: z.coerce
    .number()
    .refine((value) => Number.isFinite(value), "Enter a valid amount.")
    .positive("Amount must be greater than 0.")
    .min(0.01, "Minimum tip amount is 0.01 XLM."),
  message: z
    .string()
    .max(500, "Message must be 500 characters or fewer.")
    .optional()
    .or(z.literal("")),
  assetCode: z
    .string()
    .trim()
    .min(1, "Asset code is required.")
    .max(12, "Asset code must be 12 characters or fewer.")
    .regex(/^[A-Za-z0-9]+$/, "Asset code can only contain letters and numbers.")
    .transform((value) => value.toUpperCase()),
});

export const scheduledTipSchema = tipSchema.extend({
  scheduledAt: z.coerce
    .date()
    .refine((d) => d >= tomorrow(), "Scheduled date must be in the future."),
  recurrence: z.enum(RECURRENCE_OPTIONS).default("none"),
  notifyEmail: z.string().email("Enter a valid email.").optional().or(z.literal("")),
});

export type TipSchemaInput = z.input<typeof tipSchema>;
export type TipSchemaValues = z.output<typeof tipSchema>;

export type ScheduledTipInput = z.input<typeof scheduledTipSchema>;
export type ScheduledTipValues = z.output<typeof scheduledTipSchema>;
