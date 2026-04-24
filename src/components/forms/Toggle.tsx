"use client";

import { FormField } from "@/components/forms/FormField";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
  errorText?: string;
  validationState?: "default" | "error" | "success" | "warning";
  disabled?: boolean;
};

export function Toggle({
  id,
  label,
  checked,
  onChange,
  helperText,
  errorText,
  validationState = "default",
  disabled = false,
}: Props) {
  return (
    <FormField
      id={id}
      label={label}
      helperText={helperText}
      errorText={errorText}
      validationState={validationState}
      disabled={disabled}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${checked ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-500"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-all ${checked ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </FormField>
  );
}
