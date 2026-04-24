"use client";

import { FilterDropdown, type FilterOption } from '../FilterDropdown';

type Period = '24h' | '7d' | '30d' | 'all';

const periods: FilterOption[] = [
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: 'all', label: 'All Time' },
];

interface TimeFilterProps {
  value: Period;
  onChange: (value: Period) => void;
}

export function TimeFilter({ value, onChange }: TimeFilterProps) {
  return (
    <FilterDropdown
      label="Time Period"
      options={periods}
      value={value}
      onChange={onChange as any}
      className="w-full sm:w-48"
    />
  );
}

