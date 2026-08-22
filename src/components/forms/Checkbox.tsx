import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="flex items-center space-x-3 cursor-pointer">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              ref={ref}
              className={`peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-all checked:border-purple-500 checked:bg-purple-500 hover:checked:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              {...props}
            />
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium select-none peer-disabled:text-gray-400">
            {label}
          </span>
        </label>
        {error && <p className="text-red-500 text-sm mt-1 ml-8">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
