import React from "react"
import { SearchableSelectFilter } from "../../base"
import type { FilterConfig } from "@shared/types/filters"

interface TerminalModelFilterProps {
  value?: string
  onChange?: (value: string | null) => void
  className?: string
}

// Model options for filtering
const MODEL_OPTIONS = [
  { value: "bbpos-wisepad-3", label: "BBPOS WisePad 3" },
  { value: "stripe-reader-m2", label: "Stripe Reader M2" },
  { value: "square-terminal", label: "Square Terminal" },
  { value: "verifone-p400", label: "Verifone P400" },
  { value: "ingenico-move-5000", label: "Ingenico Move/5000" },
] as const

export function TerminalModelFilter({
  value,
  onChange,
  className,
}: TerminalModelFilterProps) {
  const filterConfig: FilterConfig = {
    key: "terminal-model",
    label: "Model",
    type: "select",
  }

  return (
    <div className={className}>
      <SearchableSelectFilter
        options={MODEL_OPTIONS}
        value={value}
        onChange={onChange}
        filterConfig={filterConfig}
        searchPlaceholder="Search models..."
      />
    </div>
  )
}

export default React.memo(TerminalModelFilter)
