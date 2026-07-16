import React, { InputHTMLAttributes, forwardRef } from 'react';
import { FormField } from './FormField';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <FormField label={label} error={error} helperText={helperText} className={className}>
        <input
          ref={ref}
          className={`peer w-full px-4 py-3 border-2 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500/20'
          } rounded-lg focus:ring-4 transition-all placeholder-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed`}
          placeholder={label}
          {...props}
        />
      </FormField>
    );
  }
);
Input.displayName = 'Input';
