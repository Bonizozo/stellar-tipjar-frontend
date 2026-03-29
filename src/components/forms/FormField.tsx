import { ReactNode } from "react";

type ValidationState = "default" | "error" | "success" | "warning";

type FormFieldProps = {
  id: string;
  label: string;
  helperText?: string;
  errorText?: string;
  validationState?: ValidationState;
  disabled?: boolean;
  children: ReactNode;
};

const stateColorClasses: Record<ValidationState, string> = {
  default: "text-gray-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
};

export function FormField({
  id,
  label,
  helperText,
  errorText,
  validationState = "default",
  disabled = false,
  children,
}: FormFieldProps) {
  const textColor = stateColorClasses[validationState];

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      {children}
      <div className="mt-1 min-h-[1.25rem] text-sm">
        {errorText ? (
          <span className="text-rose-500">{errorText}</span>
        ) : helperText ? (
          <span className={textColor}>{helperText}</span>
        ) : (
          <span className="text-transparent">&nbsp;</span>
        )}
      </div>
      {disabled && <p className="mt-1 text-xs text-slate-400">Disabled</p>}
    </div>
  );
}
