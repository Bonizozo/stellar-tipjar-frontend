import { z } from "zod";

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
});

export type CreatorSchemaValues = z.infer<typeof creatorSchema>;
