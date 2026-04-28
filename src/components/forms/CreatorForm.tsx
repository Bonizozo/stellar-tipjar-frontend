"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import { FormField } from "@/components/forms/FormField";
import { creatorFormSchema, type CreatorFormData } from "@/lib/validation/schemas";

interface CreatorFormProps {
  onSubmit: (data: CreatorFormData) => Promise<void>;
}

export function CreatorForm({ onSubmit }: CreatorFormProps) {
  const methods = useForm<CreatorFormData>({
    resolver: zodResolver(creatorFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      wallet_address: "",
      displayName: "",
      bio: "",
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const handleFormSubmit = async (data: CreatorFormData) => {
    try {
      await onSubmit(data);
      reset();
      toast.success("Creator profile submitted!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed.";
      toast.error(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        aria-label="Creator registration"
        className="space-y-2"
      >
        <FormField
          name="username"
          label="Username"
          placeholder="alice"
          description="3–30 characters: letters, numbers, underscores"
        />

        <FormField
          name="wallet_address"
          label="Stellar Wallet Address"
          placeholder="G…"
          description="Your 56-character Stellar public key"
        />

        <FormField
          name="displayName"
          label="Display Name"
          placeholder="Alice Smith"
          description="2–50 characters (optional)"
        />

        <FormField
          name="bio"
          label="Bio"
          placeholder="Tell supporters about yourself…"
          description="Up to 500 characters (optional)"
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="alice@example.com"
          description="Optional — used for notifications"
        />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-label={isSubmitting ? "Submitting, please wait" : "Register as creator"}
          >
            {isSubmitting ? "Submitting…" : "Register as Creator"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
