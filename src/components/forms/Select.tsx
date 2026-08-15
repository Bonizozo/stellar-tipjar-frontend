import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { FormField } from './FormField';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <FormField error={error} className={className}>
        <select
          ref={ref}
          className={`peer w-full px-4 py-3 border-2 appearance-none bg-white ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500/20'
          } rounded-lg focus:ring-4 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
          {...props}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <label
          htmlFor={props.id || props.name}
          className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all pointer-events-none"
        >
          {label}
        </label>
      </FormField>
    );
  }
);
Select.displayName = 'Select';
