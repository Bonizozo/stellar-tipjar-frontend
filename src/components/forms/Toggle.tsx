import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-gray-700 font-medium select-none">{label}</span>
          <div className="relative">
            <input
              type="checkbox"
              role="switch"
              ref={ref}
              className="sr-only peer"
              {...props}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed transition-colors"></div>
          </div>
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';
