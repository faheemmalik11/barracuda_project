import React from "react"
import { SearchableSelectFilter } from "../../base"
import type { FilterConfig } from "@shared/types/filters"

interface TerminalLocationFilterProps {
  value?: string
  onChange?: (value: string | null) => void
  className?: string
}

// Location options for filtering
const LOCATION_OPTIONS = [
  { value: "store-001", label: "Store 001 - Downtown" },
  { value: "store-002", label: "Store 002 - Mall" },
  { value: "store-003", label: "Store 003 - Airport" },
  { value: "warehouse", label: "Warehouse" },
  { value: "mobile", label: "Mobile Units" },
] as const

export function TerminalLocationFilter({
  value,
  onChange,
  className,
}: TerminalLocationFilterProps) {
  const filterConfig: FilterConfig = {
    key: "terminal-location",
    label: "Location",
    type: "select",
  }

  return (
    <div className={className}>
      <SearchableSelectFilter
        options={LOCATION_OPTIONS}
        value={value}
        onChange={onChange}
        filterConfig={filterConfig}
        searchPlaceholder="Search locations..."
      />
    </div>
  )
}

export default React.memo(TerminalLocationFilter)
