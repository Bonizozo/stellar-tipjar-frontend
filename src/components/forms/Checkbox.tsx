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

export function Checkbox({
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
      <label className="inline-flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <span className={disabled ? "text-slate-400" : "text-slate-700"}>{label}</span>
      </label>
    </FormField>
  );
}
