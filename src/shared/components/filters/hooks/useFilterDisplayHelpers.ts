import { useCallback } from 'react'
import type { FilterConfig } from '@shared/types/filters'
import { isFilterActive, formatDateSafe } from '@shared/utils'

interface FilterDisplayResult {
  label: string
  displayValue: string
}

type FilterDisplayHandler = (value: unknown, filter: FilterConfig) => FilterDisplayResult

const getOptionLabel = (
  options: readonly { value: string; label: string }[] | undefined,
  value: string
): string => options?.find(opt => opt.value === value)?.label || value

const formatMultiSelectDisplay = (
  values: string[],
  options: readonly { value: string; label: string }[] | undefined,
  label: string
): FilterDisplayResult => {
  if (values.length === 0) {
    return { label, displayValue: '' }
  }
  
  if (values.length === 1) {
    return { label, displayValue: getOptionLabel(options, values[0]) }
  }
  
  return { label, displayValue: `${values.length} selected` }
}

const filterDisplayHandlers: Record<string, FilterDisplayHandler> = {
  select: (value, filter) => ({
    label: filter.label,
    displayValue: getOptionLabel(filter.options, value as string),
  }),
  
  combobox: (value, filter) => filterDisplayHandlers.select(value, filter),
  
  multiSelect: (value, filter) => {
    const values = Array.isArray(value) ? value : []
    return formatMultiSelectDisplay(values, filter.options, filter.label)
  },
  
  datePicker: (value, filter) => ({
    label: filter.label,
    displayValue: formatDateSafe(value, 'M/d/yy'),
  }),
  
  slider: (value, filter) => ({
    label: filter.label,
    displayValue: Array.isArray(value) && value.length === 2
      ? `${value[0]}-${value[1]}`
      : '',
  }),
  
  search: (value, filter) => ({
    label: filter.label,
    displayValue: value ? `"${value}"` : '',
  }),
  
  text: (value, filter) => filterDisplayHandlers.search(value, filter),
  
  checkbox: (value, filter) => ({
    label: filter.label,
    displayValue: value ? 'Yes' : '',
  }),
  
  switch: (value, filter) => ({
    label: filter.label,
    displayValue: value ? 'On' : '',
  }),
}

export const useFilterDisplayHelpers = () => {
  const getFilterDisplayValue = useCallback(
    (filter: FilterConfig, value: unknown): FilterDisplayResult => {
      if (!isFilterActive(value, filter.type)) {
        return { label: filter.label, displayValue: '' }
      }

      const handler = filterDisplayHandlers[filter.type]
      if (!handler) {
        console.warn(`Unknown filter type: ${filter.type}`)
        return { label: filter.label, displayValue: '' }
      }

      try {
        return handler(value, filter)
      } catch (error) {
        console.warn(`Error formatting filter display for ${filter.type}:`, error)
        return { label: filter.label, displayValue: '' }
      }
    },
    []
  )

  return { getFilterDisplayValue }
} 
