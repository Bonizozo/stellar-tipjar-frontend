import { z } from "zod";
import { CATEGORIES } from "@/utils/categories";

export const categorySchema = z.enum(CATEGORIES);

export const creatorUsernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters.")
  .max(32, "Username must be 32 characters or fewer.")
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/,
    "Username can include letters, numbers, underscores, and hyphens only.",
  );

export const creatorSchema = z.object({
  username: creatorUsernameSchema,
  categories: z.array(categorySchema).optional().default([]),
  tags: z.array(z.string()).max(10).optional().default([]),
});

export type CreatorSchemaValues = z.infer<typeof creatorSchema>;
export type CreatorWithCategoriesTags = z.infer<typeof creatorSchema>;

