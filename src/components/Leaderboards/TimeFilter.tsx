"use client";

import { FilterDropdown, type FilterOption } from "../FilterDropdown";
import type { TimeRange } from "@/types/leaderboards";

const periods: FilterOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

interface TimeFilterProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
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
