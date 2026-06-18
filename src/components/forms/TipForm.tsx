"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/Button";
import { FormField } from "@/components/forms/FormField";
import { createTipIntent } from "@/services/api";
import { tipFormSchema as standaloneSchema, type TipFormData } from "@/lib/validations/tip";

interface TipFormProps {
  username?: string;
  defaultUsername?: string;
  defaultAssetCode?: string;
}

// Schema for creator profile page mode
const creatorModeSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return Number.isFinite(num) && num > 0;
    }, "Amount must be greater than 0")
    .refine((val) => {
      const parts = val.split(".");
      return parts.length === 1 || parts[1].length <= 7;
    }, "Amount can have at most 7 decimal places"),
  assetCode: z
    .string()
    .trim()
    .min(1, "Asset code is required")
    .max(12, "Asset code must be 12 characters or fewer")
    .regex(/^[A-Za-z0-9]+$/, "Asset code can only contain letters and numbers")
    .transform((val) => val.toUpperCase()),
  message: z.string().max(200, "Message must be at most 200 characters").optional().or(z.literal("")),
});

type CreatorModeData = z.infer<typeof creatorModeSchema>;

export function TipForm({ username, defaultUsername = "", defaultAssetCode = "XLM" }: TipFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isCreatorMode = Boolean(username);

  // Initialize react-hook-form based on mode
  const creatorMethods = useForm<CreatorModeData>({
    resolver: zodResolver(creatorModeSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      assetCode: defaultAssetCode,
      message: "",
    },
  });

  const standaloneMethods = useForm<TipFormData>({
    resolver: zodResolver(standaloneSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      creatorUsername: defaultUsername,
      amount: "",
      message: "",
      transactionHash: "",
    },
  });

  const onSubmitCreator = async (data: CreatorModeData) => {
    setSubmitSuccess(null);
    setSubmitError(null);
    try {
      const intent = await createTipIntent({
        username: username!,
        amount: data.amount,
        assetCode: data.assetCode,
      });

      setSubmitSuccess(
        intent.checkoutUrl
          ? `Tip intent created. Continue at: ${intent.checkoutUrl}`
          : `Tip intent created successfully. Intent ID: ${intent.intentId}`
      );
      toast.success("Tip intent created successfully!");
      creatorMethods.reset({
        amount: "",
        assetCode: data.assetCode,
        message: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit tip.";
      setSubmitError(message);
      toast.error(message);
    }
  };

  const onSubmitStandalone = async (data: TipFormData) => {
    setSubmitSuccess(null);
    setSubmitError(null);
    try {
      // Standalone simulation or simple API call if needed
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitSuccess(`Tip of ${data.amount} XLM sent to @${data.creatorUsername}!`);
      toast.success("Tip submitted successfully!");
      standaloneMethods.reset({
        creatorUsername: defaultUsername,
        amount: "",
        message: "",
        transactionHash: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit tip.";
      setSubmitError(message);
      toast.error(message);
    }
  };

  if (isCreatorMode) {
    const {
      handleSubmit,
      formState: { isSubmitting },
    } = creatorMethods;

    return (
      <FormProvider {...creatorMethods}>
        <form
          onSubmit={handleSubmit(onSubmitCreator)}
          noValidate
          aria-label={`Send a tip to ${username}`}
          className="space-y-4"
        >
          <FormField
            name="amount"
            label="Amount"
            type="number"
            placeholder="10.00"
            description="Amount in Stellar assets"
          />

          <FormField
            name="assetCode"
            label="Asset Code"
            type="text"
            placeholder="XLM"
            description="e.g. XLM, USDC"
          />

          <FormField
            name="message"
            label="Message (optional)"
            placeholder="Thanks for the great content!"
            description="A short message for the creator (max 200 characters)"
          />

          {submitError && (
            <p
              role="alert"
              aria-live="assertive"
              className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}

          {submitSuccess && (
            <p
              role="status"
              aria-live="polite"
              className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            >
              {submitSuccess}
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-label={isSubmitting ? "Creating tip intent, please wait" : "Create Tip Intent"}
            >
              {isSubmitting ? "Creating Intent..." : "Create Tip Intent"}
            </Button>
          </div>
        </form>
      </FormProvider>
    );
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = standaloneMethods;

  return (
    <FormProvider {...standaloneMethods}>
      <form
        onSubmit={handleSubmit(onSubmitStandalone)}
        noValidate
        aria-label="Send a tip"
        className="space-y-4"
      >
        <FormField
          name="creatorUsername"
          label="Creator Username"
          placeholder="alice"
          description="The username of the creator you want to tip"
        />

        <FormField
          name="amount"
          label="Amount"
          type="number"
          placeholder="10.5"
          description="Amount in Stellar Lumens (XLM)"
        />

        <FormField
          name="message"
          label="Message (Optional)"
          placeholder="Thanks for the great content!"
          description="A short message for the creator (max 200 characters)"
        />

        <FormField
          name="transactionHash"
          label="Transaction Hash (Optional)"
          placeholder="64-character hex string"
        />

        {submitError && (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {submitError}
          </p>
        )}

        {submitSuccess && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            {submitSuccess}
          </p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-label={isSubmitting ? "Submitting tip, please wait" : "Submit tip"}
          >
            {isSubmitting ? "Submitting..." : "Send Tip"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
