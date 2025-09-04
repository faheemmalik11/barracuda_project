import React, { useCallback } from "react"
import { TerminalSearchFilter } from "./TerminalSearchFilter"
import { TerminalLocationFilter } from "./TerminalLocationFilter"
import { TerminalModelFilter } from "./TerminalModelFilter"
import { TerminalStatusFilter } from "./TerminalStatusFilter"

interface TerminalFiltersProps {
  searchValue?: string
  locationValue?: string
  modelValue?: string
  statusValues?: string[]
  onSearchChange?: (value: string | null) => void
  onLocationChange?: (value: string | null) => void
  onModelChange?: (value: string | null) => void
  onStatusChange?: (value: string[] | null) => void
  onFiltersChange?: (filters: Record<string, unknown>) => void
  className?: string
}

/**
 * Main TerminalFilters component
 * Composed of individual filter components for better maintainability
 */
export function TerminalFilters({
  searchValue,
  locationValue,
  modelValue,
  statusValues,
  onSearchChange,
  onLocationChange,
  onModelChange,
  onStatusChange,
  onFiltersChange,
  className,
}: TerminalFiltersProps) {
  const handleFilterChange = useCallback(
    (
      newValues: Partial<{
        search: string | null
        location: string | null
        model: string | null
        status: string[] | null
      }>,
    ) => {
      const updatedFilters = {
        search: searchValue,
        location: locationValue,
        model: modelValue,
        status: statusValues,
        ...newValues,
      }
      onFiltersChange?.(updatedFilters)
    },
    [searchValue, locationValue, modelValue, statusValues, onFiltersChange],
  )

  const handleSearchChange = useCallback(
    (value: string | null) => {
      onSearchChange?.(value)
      handleFilterChange({ search: value })
    },
    [onSearchChange, handleFilterChange],
  )

  const handleLocationChange = useCallback(
    (value: string | null) => {
      onLocationChange?.(value)
      handleFilterChange({ location: value })
    },
    [onLocationChange, handleFilterChange],
  )

  const handleModelChange = useCallback(
    (value: string | null) => {
      onModelChange?.(value)
      handleFilterChange({ model: value })
    },
    [onModelChange, handleFilterChange],
  )

  const handleStatusChange = useCallback(
    (value: string[] | null) => {
      onStatusChange?.(value)
      handleFilterChange({ status: value })
    },
    [onStatusChange, handleFilterChange],
  )

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <TerminalSearchFilter
        value={searchValue}
        onChange={handleSearchChange}
      />
      <TerminalLocationFilter
        value={locationValue}
        onChange={handleLocationChange}
      />
      <TerminalModelFilter
        value={modelValue}
        onChange={handleModelChange}
      />
      <TerminalStatusFilter
        value={statusValues}
        onChange={handleStatusChange}
      />
    </div>
  )
}

export default React.memo(TerminalFilters)
