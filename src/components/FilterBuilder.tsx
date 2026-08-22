"use client";

import type { FilterCriterion, FilterField, FilterOperator } from "@/hooks/useFilterBuilder";

interface FilterBuilderProps {
  criteria: FilterCriterion[];
  onAdd: (field?: FilterField) => void;
  onUpdate: (id: string, patch: Partial<FilterCriterion>) => void;
  onRemove: (id: string) => void;
}

const FIELD_OPTIONS: { value: FilterField; label: string; type: "text" | "number" | "date" | "select" }[] = [
  { value: "search", label: "Search", type: "text" },
  { value: "status", label: "Status", type: "select" },
  { value: "dateFrom", label: "Date From", type: "date" },
  { value: "dateTo", label: "Date To", type: "date" },
  { value: "minAmount", label: "Min Amount", type: "number" },
  { value: "maxAmount", label: "Max Amount", type: "number" },
];

const STATUS_OPTIONS = ["completed", "pending", "failed"];

const OPERATORS_BY_TYPE: Record<string, { value: FilterOperator; label: string }[]> = {
  text: [{ value: "contains", label: "contains" }],
  select: [{ value: "equals", label: "is" }],
  date: [
    { value: "gte", label: "on or after" },
    { value: "lte", label: "on or before" },
  ],
  number: [
    { value: "gte", label: "≥" },
    { value: "lte", label: "≤" },
  ],
};

function getFieldType(field: FilterField) {
  return FIELD_OPTIONS.find((f) => f.value === field)?.type ?? "text";
}

function getDefaultOperator(field: FilterField): FilterOperator {
  const type = getFieldType(field);
  return OPERATORS_BY_TYPE[type]?.[0]?.value ?? "contains";
}

export function FilterBuilder({ criteria, onAdd, onUpdate, onRemove }: FilterBuilderProps) {
  const inputClass =
    "rounded-lg border border-ink/10 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20";

  return (
    <div className="space-y-3">
      {criteria.length === 0 && (
        <p className="text-sm text-ink/50 italic">No filter criteria added yet.</p>
      )}

      {criteria.map((criterion) => {
        const fieldMeta = FIELD_OPTIONS.find((f) => f.value === criterion.field)!;
        const operators = OPERATORS_BY_TYPE[fieldMeta.type] ?? OPERATORS_BY_TYPE.text;

        return (
          <div key={criterion.id} className="flex flex-wrap items-center gap-2">
            {/* Field selector */}
            <select
              value={criterion.field}
              onChange={(e) => {
                const field = e.target.value as FilterField;
                onUpdate(criterion.id, { field, operator: getDefaultOperator(field), value: "" });
              }}
              className={inputClass}
              aria-label="Filter field"
            >
              {FIELD_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>

            {/* Operator selector */}
            <select
              value={criterion.operator}
              onChange={(e) => onUpdate(criterion.id, { operator: e.target.value as FilterOperator })}
              className={inputClass}
              aria-label="Filter operator"
            >
              {operators.map((op) => (
                <option key={op.value} value={op.value}>{op.label}</option>
              ))}
            </select>

            {/* Value input */}
            {fieldMeta.type === "select" ? (
              <select
                value={criterion.value}
                onChange={(e) => onUpdate(criterion.id, { value: e.target.value })}
                className={inputClass}
                aria-label="Filter value"
              >
                <option value="">Select…</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            ) : (
              <input
                type={fieldMeta.type}
                value={criterion.value}
                onChange={(e) => onUpdate(criterion.id, { value: e.target.value })}
                placeholder={fieldMeta.type === "number" ? "0" : fieldMeta.type === "date" ? "" : "Value…"}
                className={`${inputClass} min-w-[140px]`}
                aria-label="Filter value"
              />
            )}

            {/* Remove button */}
            <button
              type="button"
              onClick={() => onRemove(criterion.id)}
              className="rounded-lg p-1.5 text-ink/40 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 transition-colors"
              aria-label="Remove filter"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => onAdd()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-ink/20 px-3 py-1.5 text-sm text-ink/60 hover:border-wave hover:text-wave transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add filter
      </button>
    </div>
  );
}
