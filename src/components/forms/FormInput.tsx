import { type InputHTMLAttributes } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

import { FormError } from "@/components/forms/FormError";

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function FormInput({ label, error, registration, className = "", id, ...props }: FormInputProps) {
  const inputId = id ?? registration.name;
  const errorId = `${inputId}-error`;

  return (
    <label className="block text-sm font-medium text-ink" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
          error ? "border-error/60 focus:ring-error/30" : "border-ink/20 focus:ring-wave/30"
        } ${className}`}
        {...registration}
        {...props}
      />
      <FormError id={errorId} message={error} />
    </label>
  );
}
