import React from "react"
import { MultiSelectFilter } from "../../base"
import type { FilterConfig } from "@shared/types/filters"

interface TerminalStatusFilterProps {
  value?: string[]
  onChange?: (value: string[] | null) => void
  className?: string
}

// Status options for filtering
const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "maintenance", label: "Maintenance" },
] as const

export function TerminalStatusFilter({
  value,
  onChange,
  className,
}: TerminalStatusFilterProps) {
  const filterConfig: FilterConfig = {
    key: "terminal-status",
    label: "Status",
    type: "multiSelect",
  }

  return (
    <div className={className}>
      <MultiSelectFilter
        options={STATUS_OPTIONS}
        value={value}
        onChange={onChange}
        filterConfig={filterConfig}
      />
    </div>
  )
}

export default React.memo(TerminalStatusFilter)
