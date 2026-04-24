"use client";

import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/Button";

const profileSchema = z.object({
  displayName: z.string().trim().min(1, "Display name is required.").max(64),
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters.")
    .max(32)
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/, "Letters, numbers, underscores, and hyphens only."),
  bio: z.string().max(280, "Bio must be 280 characters or fewer.").optional(),
  website: z.string().url("Enter a valid URL.").or(z.literal("")).optional(),
  twitter: z.string().max(50).optional(),
  github: z.string().max(50).optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;
type FieldErrors = Partial<Record<keyof ProfileValues, string>>;

interface ProfileFormProps {
  initialValues?: Partial<ProfileValues>;
  onSave: (values: ProfileValues) => Promise<void>;
}

export function ProfileForm({ initialValues, onSave }: ProfileFormProps) {
  const [values, setValues] = useState<ProfileValues>({
    displayName: initialValues?.displayName ?? "",
    username: initialValues?.username ?? "",
    bio: initialValues?.bio ?? "",
    website: initialValues?.website ?? "",
    twitter: initialValues?.twitter ?? "",
    github: initialValues?.github ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof ProfileValues) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const result = profileSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ProfileValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSaving(true);
    try {
      await onSave(result.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Input
          id="displayName"
          label="Display name"
          value={values.displayName}
          onChange={set("displayName")}
          validationState={errors.displayName ? "error" : "default"}
          errorText={errors.displayName}
          required
        />
        <Input
          id="username"
          label="Username"
          value={values.username}
          onChange={set("username")}
          validationState={errors.username ? "error" : "default"}
          errorText={errors.username}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="bio" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Bio
        </label>
        <textarea
          id="bio"
          rows={3}
          maxLength={280}
          value={values.bio}
          onChange={(e) => set("bio")(e.target.value)}
          placeholder="Tell supporters about yourself…"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        />
        <div className="mt-1 flex justify-between text-xs text-ink/50">
          {errors.bio ? <span className="text-rose-500">{errors.bio}</span> : <span />}
          <span>{(values.bio ?? "").length}/280</span>
        </div>
      </div>

      <Input
        id="website"
        label="Website"
        type="text"
        value={values.website ?? ""}
        onChange={set("website")}
        placeholder="https://yoursite.com"
        validationState={errors.website ? "error" : "default"}
        errorText={errors.website}
      />

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Input
          id="twitter"
          label="Twitter / X handle"
          value={values.twitter ?? ""}
          onChange={set("twitter")}
          placeholder="@handle"
          validationState={errors.twitter ? "error" : "default"}
          errorText={errors.twitter}
        />
        <Input
          id="github"
          label="GitHub username"
          value={values.github ?? ""}
          onChange={set("github")}
          placeholder="username"
          validationState={errors.github ? "error" : "default"}
          errorText={errors.github}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" loading={saving}>
          Save changes
        </Button>
        {success && <span className="text-sm text-emerald-600">✓ Saved</span>}
      </div>
    </form>
  );
}
