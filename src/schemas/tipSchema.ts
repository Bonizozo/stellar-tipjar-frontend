import { z } from "zod";

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

export type TipSchemaInput = z.input<typeof tipSchema>;
export type TipSchemaValues = z.output<typeof tipSchema>;
