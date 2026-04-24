"use client";

import { ChangeEvent, useMemo } from "react";
import { FormField } from "@/components/forms/FormField";

export type InputValidationState = "default" | "error" | "success" | "warning";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  validationState?: InputValidationState;
  disabled?: boolean;
  required?: boolean;
};

const stateOutline: Record<InputValidationState, string> = {
  default: "border-gray-300 focus:border-purple-500 focus:ring-purple-500/30",
  success: "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/30",
  warning: "border-amber-400 focus:border-amber-500 focus:ring-amber-500/30",
  error: "border-rose-400 focus:border-rose-500 focus:ring-rose-500/30",
};

export function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
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
      <div className="relative">
        <input
          id={id}
          aria-invalid={validationState === "error"}
          aria-describedby={errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          type={type}
          placeholder={placeholder || " "}
          required={required}
          disabled={disabled}
          className={`peer w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder-transparent transition-all focus:outline-none ${outlineClass} ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-400" : "bg-white"}`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-3 block text-sm text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-600 dark:peer-focus:text-purple-300"
        >
          {label}
        </label>
      </div>
    </FormField>
  );
}
