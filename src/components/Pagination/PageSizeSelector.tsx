"use client";

import React from "react";

interface PageSizeSelectorProps {
  value: number;
  options?: number[];
  onChange: (size: number) => void;
}

export default function PageSizeSelector({
  value,
  options = [10, 20, 50, 100],
  onChange,
}: PageSizeSelectorProps) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-sm text-gray-600 dark:text-gray-300">Per page</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-2 py-1 text-sm border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700"
        aria-label="Select page size"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
