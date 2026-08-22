"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { emailPrefsSchema, type EmailPrefsSchemaValues } from "@/schemas";

export function EmailPreferences() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EmailPrefsSchemaValues>({
    resolver: zodResolver(emailPrefsSchema),
    defaultValues: { tipReceived: true, milestones: true, weeklySummary: true, email: "" },
  });

  const onValid = async (values: EmailPrefsSchemaValues) => {
    await fetch("/api/email/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  };

  const rows: { key: keyof Omit<EmailPrefsSchemaValues, "email">; label: string; desc: string }[] = [
    { key: "tipReceived", label: "Tip received", desc: "Notify me when I receive a tip" },
    { key: "milestones", label: "Milestones", desc: "Notify me when I hit earning milestones" },
    { key: "weeklySummary", label: "Weekly summary", desc: "Send a weekly earnings digest" },
  ];

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6 rounded-2xl border border-ink/10 bg-surface p-6">
      <h2 className="text-xl font-bold text-ink">Email Notifications</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80">Email address</label>
        <input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          className={`w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
            errors.email ? "border-error/60 focus:ring-error/20" : "border-ink/20 focus:border-wave focus:ring-wave/20"
          }`}
        />
        {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
      </div>

      <div className="space-y-3">
        {rows.map(({ key, label, desc }) => (
          <label key={key} className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-ink/10 p-4 hover:bg-ink/5">
            <div>
              <p className="font-medium text-ink">{label}</p>
              <p className="text-sm text-ink/60">{desc}</p>
            </div>
            <input type="checkbox" {...register(key)} className="h-5 w-5 accent-wave" />
          </label>
        ))}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : isSubmitSuccessful ? "Saved ✓" : "Save preferences"}
      </Button>
    </form>
  );
}
