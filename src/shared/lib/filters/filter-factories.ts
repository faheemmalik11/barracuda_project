import type { FilterConfig, FilterOption } from "@shared/types/filters"

export const createSelectFilter = (
  key: string,
  label: string,
  options: readonly FilterOption[],
  placeholder?: string,
  config?: Partial<FilterConfig>
): FilterConfig => ({
  type: "select",
  key,
  label,
  placeholder: placeholder || `Select ${label.toLowerCase()}`,
  options,
  clearable: true,
  searchable: options.length > 5,
  ...config,
})

export const createMultiSelectFilter = (
  key: string,
  label: string,
  options: readonly FilterOption[],
  placeholder?: string,
  config?: Partial<FilterConfig>
): FilterConfig => ({
  type: "multiSelect",
  key,
  label,
  placeholder: placeholder || `Select ${label.toLowerCase()}`,
  options,
  clearable: true,
  searchable: true,
  maxSelections: 10,
  ...config,
})

export const createStatusFilter = (
  key: string,
  label: string,
  options: readonly FilterOption[],
  placeholder?: string,
  config?: Partial<FilterConfig>
): FilterConfig => ({
  type: "status",
  key,
  label,
  placeholder: placeholder || `Select ${label.toLowerCase()}`,
  options,
  searchable: true,
  clearable: true,
  ...config,
})

export const createSearchFilter = (
  key: string,
  label: string,
  placeholder?: string,
  config?: Partial<FilterConfig>
): FilterConfig => ({
  type: "search",
  key,
  label,
  placeholder: placeholder || `Search ${label.toLowerCase()}`,
  ...config,
})

export const createDateFilter = (
  key: string,
  label: string,
  placeholder?: string,
  config?: Partial<FilterConfig>
): FilterConfig => ({
  type: "dateRange",
  key,
  label,
  placeholder: placeholder || `Select ${label.toLowerCase()}`,
  ...config,
})

export const createAmountFilter = (
  key: string,
  label: string,
  currency = "USD",
  config?: Partial<FilterConfig>
): FilterConfig => ({
  type: "amountRange",
  key,
  label,
  placeholder: `Enter ${label.toLowerCase()}`,
  currency,
  ...config,
})

 
