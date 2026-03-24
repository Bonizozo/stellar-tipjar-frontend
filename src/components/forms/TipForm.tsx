"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { FormError } from "@/components/forms/FormError";
import { FormInput } from "@/components/forms/FormInput";
import { createTipIntent } from "@/services/api";
import { tipSchema, type TipSchemaInput, type TipSchemaValues } from "@/schemas/tipSchema";

interface TipFormProps {
  username: string;
  defaultAssetCode?: string;
}

export function TipForm({ username, defaultAssetCode = "XLM" }: TipFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TipSchemaInput>({
    resolver: zodResolver(tipSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      amount: 1,
      message: "",
      assetCode: defaultAssetCode,
    },
  });

  const onSubmit = async (values: TipSchemaInput) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    const parsed: TipSchemaValues = tipSchema.parse(values);

    try {
      const intent = await createTipIntent({
        username,
        amount: parsed.amount.toString(),
        assetCode: parsed.assetCode,
      });

      setSubmitSuccess(
        intent.checkoutUrl
          ? `Tip intent created. Continue at: ${intent.checkoutUrl}`
          : `Tip intent created successfully. Intent ID: ${intent.intentId}`,
      );
      reset({
        amount: 1,
        message: "",
        assetCode: parsed.assetCode,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the tip intent.";
      setSubmitError(message);
    }
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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

      <label className="block text-sm font-medium text-ink">
        <span>Message (optional)</span>
        <textarea
          className={`mt-1 min-h-24 w-full rounded-xl border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
            errors.message ? "border-error/60 focus:ring-error/30" : "border-ink/20 focus:ring-wave/30"
          }`}
          placeholder="Leave a supportive message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "tip-message-error" : undefined}
          {...register("message")}
        />
        <FormError id="tip-message-error" message={errors.message?.message} />
      </label>

      {submitError ? (
        <p role="alert" aria-live="assertive" className="rounded-lg border border-error/30 bg-error/5 px-3 py-2 text-sm text-error">
          {submitError}
        </p>
      ) : null}

      {submitSuccess ? (
        <p role="status" aria-live="polite" className="rounded-lg border border-success/30 bg-success/5 px-3 py-2 text-sm text-success">
          {submitSuccess}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Intent..." : "Create Tip Intent"}
        </Button>
      </div>
    </form>
  );
}
