/**
 * advancedFilterService.ts
 *
 * Service for advanced filtering with saved filters, filter presets,
 * complex query builder, and filter sharing.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  criteria: FilterCriterion[];
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterCriterion {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string;
  logicOperator?: "AND" | "OR";
}

export type FilterField =
  | "search"
  | "status"
  | "dateFrom"
  | "dateTo"
  | "minAmount"
  | "maxAmount"
  | "category"
  | "creator"
  | "asset"
  | "tags"
  | "rating"
  | "location";

export type FilterOperator =
  | "contains"
  | "equals"
  | "not_equals"
  | "gte"
  | "lte"
  | "gt"
  | "lt"
  | "in"
  | "not_in"
  | "between"
  | "exists"
  | "regex";

export interface ComplexQuery {
  id: string;
  name: string;
  description?: string;
  groups: QueryGroup[];
  createdAt: string;
}

export interface QueryGroup {
  id: string;
  logicOperator: "AND" | "OR";
  criteria: FilterCriterion[];
}

export interface SavedFilter {
  id: string;
  name: string;
  description?: string;
  query: ComplexQuery;
  isShared: boolean;
  shareUrl?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Field Metadata ──────────────────────────────────────────────────────────

export const FILTER_FIELDS: {
  value: FilterField;
  label: string;
  type: "text" | "number" | "date" | "select" | "multi-select";
  options?: string[];
}[] = [
  { value: "search", label: "Search", type: "text" },
  { value: "status", label: "Status", type: "select", options: ["completed", "pending", "failed", "refunded"] },
  { value: "category", label: "Category", type: "select", options: ["art", "tech", "education", "community", "music", "gaming"] },
  { value: "creator", label: "Creator", type: "text" },
  { value: "asset", label: "Asset", type: "select", options: ["XLM", "USDC", "ETH", "BTC"] },
  { value: "tags", label: "Tags", type: "multi-select", options: ["nft", "defi", "dao", "web3", "generative", "tutorial"] },
  { value: "dateFrom", label: "Date From", type: "date" },
  { value: "dateTo", label: "Date To", type: "date" },
  { value: "minAmount", label: "Min Amount", type: "number" },
  { value: "maxAmount", label: "Max Amount", type: "number" },
  { value: "rating", label: "Rating", type: "number" },
  { value: "location", label: "Location", type: "text" },
];

export const OPERATORS_BY_TYPE: Record<string, { value: FilterOperator; label: string }[]> = {
  text: [
    { value: "contains", label: "contains" },
    { value: "equals", label: "equals" },
    { value: "not_equals", label: "not equals" },
    { value: "regex", label: "matches pattern" },
  ],
  select: [
    { value: "equals", label: "is" },
    { value: "not_equals", label: "is not" },
    { value: "in", label: "is any of" },
  ],
  "multi-select": [
    { value: "in", label: "includes any" },
    { value: "not_in", label: "excludes all" },
    { value: "exists", label: "has any" },
  ],
  date: [
    { value: "gte", label: "on or after" },
    { value: "lte", label: "on or before" },
    { value: "equals", label: "exactly" },
    { value: "between", label: "between" },
  ],
  number: [
    { value: "gte", label: "≥" },
    { value: "lte", label: "≤" },
    { value: "gt", label: ">" },
    { value: "lt", label: "<" },
    { value: "equals", label: "=" },
    { value: "between", label: "between" },
  ],
};

// ─── Local Storage Presets ───────────────────────────────────────────────────

const PRESETS_KEY = "advanced_filter_presets";
const SAVED_FILTERS_KEY = "advanced_saved_filters";

export function getLocalPresets(): FilterPreset[] {
  try {
    const raw = localStorage.getItem(PRESETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalPreset(preset: FilterPreset): void {
  const presets = getLocalPresets();
  const existing = presets.findIndex((p) => p.id === preset.id);
  if (existing >= 0) {
    presets[existing] = preset;
  } else {
    presets.push(preset);
  }
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

export function deleteLocalPreset(presetId: string): void {
  const presets = getLocalPresets().filter((p) => p.id !== presetId);
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

export function getLocalSavedFilters(): SavedFilter[] {
  try {
    const raw = localStorage.getItem(SAVED_FILTERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalSavedFilter(filter: SavedFilter): void {
  const filters = getLocalSavedFilters();
  const existing = filters.findIndex((f) => f.id === filter.id);
  if (existing >= 0) {
    filters[existing] = filter;
  } else {
    filters.push(filter);
  }
  localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(filters));
}

export function deleteLocalSavedFilter(filterId: string): void {
  const filters = getLocalSavedFilters().filter((f) => f.id !== filterId);
  localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(filters));
}

// ─── API Service ─────────────────────────────────────────────────────────────

export class AdvancedFilterService {
  // ── Presets ──────────────────────────────────────────────────────────────

  static async getPresets(): Promise<FilterPreset[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/filters/presets`);
      if (!response.ok) throw new Error(`Failed to fetch presets: ${response.statusText}`);
      const data = await response.json();
      return Array.isArray(data) ? data : data.presets ?? [];
    } catch (error) {
      console.error("Error fetching presets:", error);
      return getLocalPresets();
    }
  }

  static async createPreset(data: {
    name: string;
    description?: string;
    criteria: FilterCriterion[];
  }): Promise<FilterPreset | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/filters/presets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to create preset: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error creating preset:", error);
      return null;
    }
  }

  static async deletePreset(presetId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/filters/presets/${encodeURIComponent(presetId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error deleting preset:", error);
      deleteLocalPreset(presetId);
      return true;
    }
  }

  // ── Saved Filters ────────────────────────────────────────────────────────

  static async getSavedFilters(): Promise<SavedFilter[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/filters/saved`);
      if (!response.ok) throw new Error(`Failed to fetch saved filters: ${response.statusText}`);
      const data = await response.json();
      return Array.isArray(data) ? data : data.filters ?? [];
    } catch (error) {
      console.error("Error fetching saved filters:", error);
      return getLocalSavedFilters();
    }
  }

  static async saveFilter(data: {
    name: string;
    description?: string;
    query: ComplexQuery;
    isShared?: boolean;
  }): Promise<SavedFilter | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/filters/saved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to save filter: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error saving filter:", error);
      return null;
    }
  }

  static async deleteSavedFilter(filterId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/filters/saved/${encodeURIComponent(filterId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error deleting saved filter:", error);
      deleteLocalSavedFilter(filterId);
      return true;
    }
  }

  // ── Sharing ──────────────────────────────────────────────────────────────

  static async shareFilter(filterId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/filters/saved/${encodeURIComponent(filterId)}/share`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error(`Failed to share filter: ${response.statusText}`);
      const data = await response.json();
      return data.shareUrl ?? null;
    } catch (error) {
      console.error("Error sharing filter:", error);
      return null;
    }
  }

  static async getSharedFilter(shareId: string): Promise<SavedFilter | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/filters/shared/${encodeURIComponent(shareId)}`
      );
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Failed to fetch shared filter: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching shared filter:", error);
      return null;
    }
  }

  // ── Query Execution ──────────────────────────────────────────────────────

  static async executeQuery<T>(
    query: ComplexQuery,
    params?: { page?: number; limit?: number; sortBy?: string; sortOrder?: "asc" | "desc" }
  ): Promise<{ results: T[]; total: number; page: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.set("page", String(params.page));
      if (params?.limit) queryParams.set("limit", String(params.limit));
      if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
      if (params?.sortOrder) queryParams.set("sortOrder", params.sortOrder);

      const response = await fetch(
        `${API_BASE_URL}/api/filters/execute?${queryParams.toString()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
      if (!response.ok) throw new Error(`Failed to execute query: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error executing query:", error);
      return { results: [], total: 0, page: params?.page ?? 1 };
    }
  }
}

// ─── Utility Functions ───────────────────────────────────────────────────────

export function getFieldType(field: FilterField): string {
  return FILTER_FIELDS.find((f) => f.value === field)?.type ?? "text";
}

export function getFieldOptions(field: FilterField): string[] {
  return FILTER_FIELDS.find((f) => f.value === field)?.options ?? [];
}

export function getDefaultOperator(field: FilterField): FilterOperator {
  const type = getFieldType(field);
  return OPERATORS_BY_TYPE[type]?.[0]?.value ?? "contains";
}

export function generateCriterionId(): string {
  return `criterion-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateGroupId(): string {
  return `group-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildQueryString(criteria: FilterCriterion[]): string {
  return criteria
    .map((c) => {
      const op = c.operator === "equals" ? ":" : c.operator === "gte" ? ">=" : c.operator === "lte" ? "<=" : ":";
      return `${c.field}${op}${c.value}`;
    })
    .join(" ");
}
