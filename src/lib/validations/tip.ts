import { z } from "zod";

export const tipFormSchema = z.object({
  creatorUsername: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => Number(val) > 0, "Amount must be greater than 0")
    .refine((val) => {
      const parts = val.split(".");
      return parts.length === 1 || parts[1].length <= 7;
    }, "Amount can have at most 7 decimal places"),

  message: z
    .string()
    .max(200, "Message must be at most 200 characters")
    .optional(),

  transactionHash: z
    .string()
    .regex(/^[a-fA-F0-9]{64}$/, "Invalid transaction hash format")
    .optional()
    .or(z.literal("")),
});

export type TipFormData = z.infer<typeof tipFormSchema>;
