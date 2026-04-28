"use client";

import { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  AdvancedFilterService,
  FILTER_FIELDS,
  OPERATORS_BY_TYPE,
  getFieldType,
  getFieldOptions,
  getDefaultOperator,
  generateCriterionId,
  generateGroupId,
  buildQueryString,
  type FilterCriterion,
  type FilterField,
  type FilterOperator,
  type FilterPreset,
  type ComplexQuery,
  type QueryGroup,
  type SavedFilter,
} from "@/services/advancedFilterService";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import {
  PlusIcon,
  TrashIcon,
  FunnelIcon,
  BookmarkIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface AdvancedFilterSystemProps {
  onFilterChange?: (criteria: FilterCriterion[]) => void;
  className?: string;
}

export function AdvancedFilterSystem({
  onFilterChange,
  className = "",
}: AdvancedFilterSystemProps) {
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = useState(false);
  const [criteria, setCriteria] = useState<FilterCriterion[]>([]);
  const [globalLogic, setGlobalLogic] = useState<"AND" | "OR">("AND");
  const [presetName, setPresetName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  // Fetch presets
  const { data: presets } = useQuery({
    queryKey: ["filter-presets"],
    queryFn: () => AdvancedFilterService.getPresets(),
    staleTime: 60_000,
  });

  // Fetch saved filters
  const { data: savedFilters } = useQuery({
    queryKey: ["saved-filters"],
    queryFn: () => AdvancedFilterService.getSavedFilters(),
    staleTime: 60_000,
  });

  // Save preset mutation
  const savePresetMutation = useMutation({
    mutationFn: (data: { name: string; criteria: FilterCriterion[] }) =>
      AdvancedFilterService.createPreset(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filter-presets"] });
      setShowSaveDialog(false);
      setPresetName("");
    },
  });

  // Delete preset mutation
  const deletePresetMutation = useMutation({
    mutationFn: (id: string) => AdvancedFilterService.deletePreset(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["filter-presets"] }),
  });

  // Add criterion
  const addCriterion = useCallback(
    (field?: FilterField) => {
      const newField = field ?? "search";
      const newCriterion: FilterCriterion = {
        id: generateCriterionId(),
        field: newField,
        operator: getDefaultOperator(newField),
        value: "",
        logicOperator: criteria.length > 0 ? globalLogic : undefined,
      };
      const updated = [...criteria, newCriterion];
      setCriteria(updated);
      onFilterChange?.(updated);
    },
    [criteria, globalLogic, onFilterChange]
  );

  // Update criterion
  const updateCriterion = useCallback(
    (id: string, patch: Partial<FilterCriterion>) => {
      const updated = criteria.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      );
      setCriteria(updated);
      onFilterChange?.(updated);
    },
    [criteria, onFilterChange]
  );

  // Remove criterion
  const removeCriterion = useCallback(
    (id: string) => {
      const updated = criteria.filter((c) => c.id !== id);
      setCriteria(updated);
      onFilterChange?.(updated);
    },
    [criteria, onFilterChange]
  );

  // Clear all criteria
  const clearAll = useCallback(() => {
    setCriteria([]);
    setActivePreset(null);
    onFilterChange?.([]);
  }, [onFilterChange]);

  // Apply a preset
  const applyPreset = useCallback(
    (preset: FilterPreset) => {
      setCriteria(preset.criteria);
      setActivePreset(preset.id);
      onFilterChange?.(preset.criteria);
    },
    [onFilterChange]
  );

  // Share filter
  const handleShare = useCallback(async () => {
    if (!savedFilters || savedFilters.length === 0) return;
    const url = await AdvancedFilterService.shareFilter(savedFilters[0].id);
    if (url) setShareUrl(url);
  }, [savedFilters]);

  const inputClass =
    "rounded-lg border border-ink/10 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20";

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left"
          aria-expanded={isExpanded}
        >
          <FunnelIcon className="h-5 w-5 text-ink/60" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-semibold text-ink">Advanced Filters</h3>
            {criteria.length > 0 && (
              <p className="text-xs text-ink/50">
                {criteria.length} filter{criteria.length !== 1 ? "s" : ""} active
              </p>
            )}
          </div>
        </button>
        <div className="flex items-center gap-2">
          {criteria.length > 0 && (
            <>
              <Badge variant="info" className="text-xs">
                {buildQueryString(criteria)}
              </Badge>
              <button
                type="button"
                onClick={clearAll}
                className="rounded-lg p-1 text-ink/40 hover:text-semantic-error transition-colors"
                aria-label="Clear all filters"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </>
          )}
          {isExpanded ? (
            <ChevronUpIcon className="h-4 w-4 text-ink/40" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-ink/40" />
          )}
        </div>
      </div>

      {/* Expanded filter builder */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
              {/* Global logic toggle */}
              {criteria.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink/50">Match</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newLogic = globalLogic === "AND" ? "OR" : "AND";
                      setGlobalLogic(newLogic);
                      setCriteria(
                        criteria.map((c) => ({
                          ...c,
                          logicOperator: newLogic,
                        }))
                      );
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      globalLogic === "AND"
                        ? "bg-wave text-white"
                        : "bg-ink/10 text-ink/70"
                    }`}
                  >
                    {globalLogic}
                  </button>
                  <span className="text-xs text-ink/50">all conditions</span>
                </div>
              )}

              {/* Criteria list */}
              {criteria.length === 0 && (
                <p className="text-sm text-ink/50 italic">
                  No filters applied. Add criteria below to narrow down results.
                </p>
              )}

              {criteria.map((criterion, index) => {
                const fieldMeta = FILTER_FIELDS.find(
                  (f) => f.value === criterion.field
                )!;
                const fieldType = getFieldType(criterion.field);
                const operators =
                  OPERATORS_BY_TYPE[fieldType] ?? OPERATORS_BY_TYPE.text;
                const options = getFieldOptions(criterion.field);

                return (
                  <div
                    key={criterion.id}
                    className="flex flex-wrap items-center gap-2"
                  >
                    {/* Logic operator badge */}
                    {index > 0 && criterion.logicOperator && (
                      <span
                        className={`text-xs font-bold uppercase ${
                          criterion.logicOperator === "AND"
                            ? "text-wave"
                            : "text-orange-500"
                        }`}
                      >
                        {criterion.logicOperator}
                      </span>
                    )}

                    {/* Field selector */}
                    <select
                      value={criterion.field}
                      onChange={(e) => {
                        const field = e.target.value as FilterField;
                        updateCriterion(criterion.id, {
                          field,
                          operator: getDefaultOperator(field),
                          value: "",
                        });
                      }}
                      className={inputClass}
                      aria-label="Filter field"
                    >
                      {FILTER_FIELDS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>

                    {/* Operator selector */}
                    <select
                      value={criterion.operator}
                      onChange={(e) =>
                        updateCriterion(criterion.id, {
                          operator: e.target.value as FilterOperator,
                        })
                      }
                      className={inputClass}
                      aria-label="Filter operator"
                    >
                      {operators.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.label}
                        </option>
                      ))}
                    </select>

                    {/* Value input */}
                    {fieldType === "select" ? (
                      <select
                        value={criterion.value}
                        onChange={(e) =>
                          updateCriterion(criterion.id, {
                            value: e.target.value,
                          })
                        }
                        className={inputClass}
                        aria-label="Filter value"
                      >
                        <option value="">Select...</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt} className="capitalize">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : fieldType === "multi-select" ? (
                      <select
                        value={criterion.value}
                        onChange={(e) =>
                          updateCriterion(criterion.id, {
                            value: e.target.value,
                          })
                        }
                        className={inputClass}
                        aria-label="Filter value"
                      >
                        <option value="">Select...</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={fieldType === "number" ? "number" : fieldType === "date" ? "date" : "text"}
                        value={criterion.value}
                        onChange={(e) =>
                          updateCriterion(criterion.id, {
                            value: e.target.value,
                          })
                        }
                        placeholder={
                          fieldType === "number"
                            ? "0"
                            : fieldType === "date"
                              ? ""
                              : "Value..."
                        }
                        className={`${inputClass} min-w-[140px]`}
                        aria-label="Filter value"
                      />
                    )}

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeCriterion(criterion.id)}
                      className="rounded-lg p-1.5 text-ink/40 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 transition-colors"
                      aria-label="Remove filter"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addCriterion()}
                  className="inline-flex items-center gap-1.5"
                >
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  Add Filter
                </Button>

                {criteria.length > 0 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowSaveDialog(true)}
                      className="inline-flex items-center gap-1.5"
                    >
                      <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
                      Save Preset
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5"
                    >
                      <ShareIcon className="h-4 w-4" aria-hidden="true" />
                      Share
                    </Button>
                  </>
                )}
              </div>

              {/* Save preset dialog */}
              <AnimatePresence>
                {showSaveDialog && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 rounded-lg border border-ink/10 p-3">
                      <input
                        type="text"
                        value={presetName}
                        onChange={(e) => setPresetName(e.target.value)}
                        placeholder="Preset name..."
                        className="flex-1 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                        aria-label="Preset name"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          savePresetMutation.mutate({
                            name: presetName,
                            criteria,
                          })
                        }
                        disabled={!presetName.trim() || savePresetMutation.isPending}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowSaveDialog(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Share URL */}
              {shareUrl && (
                <div className="rounded-lg bg-ink/5 p-3">
                  <p className="text-xs font-medium text-ink/60 mb-1">
                    Share link:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink dark:bg-gray-900"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(shareUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Presets section */}
            {presets && presets.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-xs font-medium text-ink/50 uppercase tracking-wider">
                  Saved Presets
                </p>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        activePreset === preset.id
                          ? "bg-wave text-white"
                          : "bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink"
                      }`}
                    >
                      <BookmarkIcon className="h-3 w-3" aria-hidden="true" />
                      {preset.name}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePresetMutation.mutate(preset.id);
                        }}
                        className="ml-1 rounded p-0.5 hover:bg-white/20"
                        aria-label={`Delete preset ${preset.name}`}
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
