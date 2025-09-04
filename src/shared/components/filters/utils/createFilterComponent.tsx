import React from "react"
import { MultiSelectFilter, SearchableSelectFilter } from "../base"
import type { FilterConfig } from "@shared/types/filters"

type FilterProps = {
  value?: string[] | string | null
  onChange?: (value: string[] | string | null) => void
  className?: string
  filterConfig?: FilterConfig
}

type FilterType = "multiSelect" | "singleSelect"

/**
 * Factory function to create standardized filter components
 * Reduces code duplication across all individual filters
 */
export function createFilterComponent(
  filterKey: string,
  defaultLabel: string,
  filterType: FilterType,
  options: readonly { value: string; label: string }[]
) {
  const defaultFilterConfig: FilterConfig = {
    key: filterKey,
    label: defaultLabel,
    type: filterType === "multiSelect" ? "multiSelect" : "select",
  }

  const FilterComponent = React.memo<FilterProps>(({
    value,
    onChange,
    className,
    filterConfig = defaultFilterConfig,
  }) => {
    if (filterType === "multiSelect") {
      return (
        <MultiSelectFilter
          options={options}
          value={value as string[]}
          onChange={onChange as (value: string[] | null) => void}
          filterConfig={filterConfig}
          className={className}
        />
      )
    }

    return (
      <SearchableSelectFilter
        options={options}
        value={value as string}
        onChange={onChange as (value: string | null) => void}
        filterConfig={filterConfig}
        className={className}
      />
    )
  })

  FilterComponent.displayName = `${defaultLabel}Filter`
  return FilterComponent
} 
