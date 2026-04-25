"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import { FormField } from "@/components/forms/FormField";
import { tipFormSchema, type TipFormData } from "@/lib/validations/tip";

interface TipFormProps {
  defaultUsername?: string;
}

export function TipForm({ defaultUsername = "" }: TipFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const methods = useForm<TipFormData>({
    resolver: zodResolver(tipFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      creatorUsername: defaultUsername,
      amount: "",
      message: "",
      transactionHash: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: TipFormData) => {
    setSubmitSuccess(null);
    try {
      // TODO: replace with real API call once backend is ready
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitSuccess(`Tip of ${data.amount} XLM sent to @${data.creatorUsername}!`);
      toast.success("Tip submitted successfully!");
      reset({ creatorUsername: defaultUsername, amount: "", message: "", transactionHash: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit tip.";
      toast.error(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Send a tip"
        className="space-y-2"
      >
        <FormField
          name="creatorUsername"
          label="Creator Username"
          placeholder="alice"
          description="The username of the creator you want to tip"
        />

        <FormField
          name="amount"
          label="Amount (XLM)"
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
