import React, { useState, useCallback, useEffect } from "react"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Label } from "@shared/components/ui/label"
import { Search } from "lucide-react"
import { FilterButton } from "../../base"
import { useFilterToggle } from "../../hooks/useFilterToggle"
import { FILTER_COMPONENT_STYLES, FILTER_ACCESSIBILITY } from "../../constants/filterStyles"
import type { FilterConfig } from "@shared/types/filters"

interface TerminalSearchFilterProps {
  value?: string
  onChange?: (value: string | null) => void
  className?: string
}

export function TerminalSearchFilter({
  value,
  onChange,
  className,
}: TerminalSearchFilterProps) {
  const { isOpen, setIsOpen, close } = useFilterToggle()
  const [tempValue, setTempValue] = useState(value || "")

  // Synchronize tempValue with external value changes
  useEffect(() => {
    setTempValue(value || "")
  }, [value])

  const handleApply = useCallback(() => {
    onChange?.(tempValue || null)
    close()
  }, [tempValue, onChange, close])

  const handleClear = useCallback(() => {
    setTempValue("")
    onChange?.(null)
  }, [onChange])

  const filterConfig: FilterConfig = {
    key: "terminal-search",
    label: "Search",
    type: "text",
  }

  const isActive = !!value
  const displayValue = {
    label: "Search",
    displayValue: value || "",
  }

  return (
    <div className={className}>
      <FilterButton
        filter={filterConfig}
        isActive={isActive}
        isOpen={isOpen}
        displayValue={displayValue}
        onToggle={setIsOpen}
        onClear={handleClear}
      >
        <div className="p-2 space-y-2">
          <div className={FILTER_COMPONENT_STYLES.FILTER_HEADER}>
            <span className={FILTER_COMPONENT_STYLES.FILTER_TITLE}>
              Search Terminals
            </span>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Search by ID or serial</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or serial..."
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="pl-8 h-8"
              />
            </div>
          </div>

          <div className={FILTER_COMPONENT_STYLES.SEPARATOR}>
            <Button
              onClick={handleApply}
              className={FILTER_COMPONENT_STYLES.APPLY_BUTTON}
              size="sm"
              aria-label={FILTER_ACCESSIBILITY.APPLY_ARIA_LABEL}
            >
              Apply
            </Button>
          </div>
        </div>
      </FilterButton>
    </div>
  )
}

export default React.memo(TerminalSearchFilter)
