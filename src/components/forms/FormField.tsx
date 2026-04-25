"use client";

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type ValidationState = "default" | "error" | "success" | "warning";

type FormFieldProps = {
  id?: string;
  name?: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  helperText?: string;
  errorText?: string;
  validationState?: ValidationState;
  disabled?: boolean;
  children?: ReactNode;
};

const stateColorClasses: Record<ValidationState, string> = {
  default: "text-gray-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
};

export function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  description,
  helperText,
  errorText,
  validationState = "default",
  disabled = false,
  children,
}: FormFieldProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

  // Try to use form context if available (react-hook-form FormProvider)
  let contextError: string | undefined;
  let register: ((name: string) => object) | undefined;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctx = useFormContext();
    if (name && ctx) {
      const fieldError = ctx.formState.errors[name];
      contextError = fieldError?.message as string | undefined;
      register = ctx.register;
    }
  } catch {
    // No FormProvider in tree — standalone usage
  }

  const resolvedError = errorText ?? contextError;
  const resolvedState: ValidationState = resolvedError ? "error" : validationState;
  const textColor = stateColorClasses[resolvedState];

  return (
    <div className="mb-4">
      <label
        htmlFor={fieldId}
        className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      {children ?? (name && register ? (
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            resolvedError ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={resolvedError ? "true" : "false"}
          aria-describedby={resolvedError ? `${fieldId}-error` : description ? `${fieldId}-desc` : undefined}
        />
      ) : null)}

      {description && (
        <p id={`${fieldId}-desc`} className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}

      <div className="mt-1 min-h-[1.25rem] text-sm">
        {resolvedError ? (
          <span id={`${fieldId}-error`} className="text-rose-500" role="alert">
            {resolvedError}
          </span>
        ) : helperText ? (
          <span className={textColor}>{helperText}</span>
        ) : (
          <span className="text-transparent">&nbsp;</span>
        )}
      </div>

      {disabled && <p className="mt-1 text-xs text-slate-400">Disabled</p>}
    </div>
  );
};
