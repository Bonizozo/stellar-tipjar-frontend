"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/Button";
import { FormError } from "@/components/forms/FormError";
import { FormInput } from "@/components/forms/FormInput";
import { useScheduleTip } from "@/hooks/mutations/useScheduleTip";
import {
  scheduledTipSchema,
  RECURRENCE_OPTIONS,
  type ScheduledTipInput,
} from "@/schemas/tipSchema";

interface Props {
  username: string;
  defaultAssetCode?: string;
}

const RECURRENCE_LABELS: Record<string, string> = {
  none: "One-time",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
};

// min date for the calendar input (tomorrow)
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function ScheduledTipForm({ username, defaultAssetCode = "XLM" }: Props) {
  const [success, setSuccess] = useState<string | null>(null);
  const { mutateAsync, isPending } = useScheduleTip();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScheduledTipInput>({
    resolver: zodResolver(scheduledTipSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      amount: 1,
      assetCode: defaultAssetCode,
      message: "",
      recurrence: "none",
      notifyEmail: "",
    },
  });

  const onSubmit = async (values: ScheduledTipInput) => {
    setSuccess(null);
    const parsed = scheduledTipSchema.parse(values);
    await mutateAsync({
      username,
      amount: parsed.amount.toString(),
      assetCode: parsed.assetCode,
      message: parsed.message || undefined,
      scheduledAt: parsed.scheduledAt.toISOString(),
      recurrence: parsed.recurrence,
      notifyEmail: parsed.notifyEmail || undefined,
    });
    setSuccess(
      `Tip scheduled for ${parsed.scheduledAt.toLocaleDateString()}${
        parsed.recurrence !== "none" ? ` · repeats ${parsed.recurrence}` : ""
      }${parsed.notifyEmail ? ` · reminder → ${parsed.notifyEmail}` : ""}`,
    );
    reset();
  };

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={`Schedule a tip for ${username}`}
    >
      {/* Amount + Asset */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Amount"
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          placeholder="10.00"
          registration={register("amount", { valueAsNumber: true })}
          error={errors.amount?.message}
        />
        <FormInput
          label="Asset Code"
          type="text"
          maxLength={12}
          placeholder="XLM"
          registration={register("assetCode")}
          error={errors.assetCode?.message}
        />
      </div>

      {/* Date + Recurrence */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="scheduledAt">
            Send Date
          </label>
          <input
            id="scheduledAt"
            type="date"
            min={minDate()}
            className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 ${
              errors.scheduledAt ? "border-error/60 focus:ring-error/30" : "border-ink/20 focus:ring-wave/30"
            }`}
            aria-invalid={Boolean(errors.scheduledAt)}
            aria-describedby={errors.scheduledAt ? "scheduledAt-error" : undefined}
            {...register("scheduledAt")}
          />
          <FormError id="scheduledAt-error" message={errors.scheduledAt?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="recurrence">
            Repeat
          </label>
          <select
            id="recurrence"
            className="mt-1 w-full rounded-xl border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-wave/30"
            {...register("recurrence")}
          >
            {RECURRENCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {RECURRENCE_LABELS[opt]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="block text-sm font-medium text-ink">
        <label htmlFor="schedule-message">Message (optional)</label>
        <textarea
          id="schedule-message"
          className={`mt-1 min-h-20 w-full rounded-xl border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
            errors.message ? "border-error/60 focus:ring-error/30" : "border-ink/20 focus:ring-wave/30"
          }`}
          placeholder="Happy birthday! 🎉"
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FormError id="schedule-message-error" message={errors.message?.message} />
      </div>

      {/* Email reminder */}
      <FormInput
        label="Email reminder (optional)"
        type="email"
        placeholder="you@example.com"
        registration={register("notifyEmail")}
        error={errors.notifyEmail?.message}
      />

      {success && (
        <p role="status" aria-live="polite" className="rounded-lg border border-success/30 bg-success/5 px-3 py-2 text-sm text-success">
          {success}
        </p>
      )}

      <Button type="submit" disabled={isPending} aria-busy={isPending}>
        {isPending ? "Scheduling…" : "Schedule Tip"}
      </Button>
    </form>
  );
}
