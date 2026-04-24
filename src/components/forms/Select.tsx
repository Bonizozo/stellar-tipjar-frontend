"use client";

import { ChangeEvent, useMemo } from "react";
import { FormField } from "@/components/forms/FormField";

export type SelectValidationState = "default" | "error" | "success" | "warning";
type Option = { value: string; label: string };

type Props = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  helperText?: string;
  errorText?: string;
  validationState?: SelectValidationState;
  disabled?: boolean;
  required?: boolean;
};

const stateOutline: Record<SelectValidationState, string> = {
  default: "border-gray-300 focus:border-purple-500 focus:ring-purple-500/30",
  success: "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/30",
  warning: "border-amber-400 focus:border-amber-500 focus:ring-amber-500/30",
  error: "border-rose-400 focus:border-rose-500 focus:ring-rose-500/30",
};

export function Select({
  id,
  label,
  value,
  options,
  onChange,
  helperText,
  errorText,
  validationState = "default",
  disabled = false,
  required = false,
}: Props) {
  const outlineClass = useMemo(() => stateOutline[validationState], [validationState]);

  return (
    <FormField
      id={id}
      label={label}
      helperText={helperText}
      errorText={errorText}
      validationState={validationState}
      disabled={disabled}
    >
      <select
        id={id}
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
        disabled={disabled}
        required={required}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none ${outlineClass} ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-400" : "bg-white"}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
