import React, { useMemo } from "react"
import { Button } from "@shared/components/ui/button"
import { Checkbox } from "@shared/components/ui/checkbox"
import { Label } from "@shared/components/ui/label"
import { cn } from "@shared/lib/utils"
import { FilterButton } from "./FilterButton"
import { useMultiSelectFilter } from "../hooks/useMultiSelectFilter"
import type { FilterConfig } from "@shared/types/filters"
import { 
  FILTER_STYLES, 
  FILTER_COMPONENT_STYLES, 
  FILTER_ACCESSIBILITY 
} from "@shared/components/filters/constants/filterStyles"

interface FilterOption {
  value: string
  label: string
}

interface MultiSelectFilterProps<T extends FilterOption> {
  options: readonly T[]
  value?: string[]
  onChange?: (value: string[] | null) => void
  filterConfig: FilterConfig
  maxHeight?: string
  className?: string
}

export function MultiSelectFilter<T extends FilterOption>({
  options = [],
  value = [],
  onChange,
  filterConfig,
  maxHeight,
  className,
}: MultiSelectFilterProps<T>) {
  const safeOptions = useMemo(() => 
    Array.isArray(options) ? options : [], 
    [options]
  )

  const heightClass = useMemo(() => 
    maxHeight || FILTER_STYLES.MAX_HEIGHT, 
    [maxHeight]
  )

  const {
    isOpen,
    selectedOptions,
    setIsOpen,
    handleOptionToggle,
    handleApply,
    handleClear,
    isActive,
    displayValue,
  } = useMultiSelectFilter({
    options: safeOptions,
    value,
    onChange,
    filterLabel: filterConfig.label,
  })

  return (
    <div className={cn("relative select-none", className)}>
      <FilterButton
        filter={filterConfig}
        isActive={isActive}
        isOpen={isOpen}
        displayValue={displayValue}
        onToggle={setIsOpen}
        onClear={handleClear}
      >
        <div className={cn(FILTER_STYLES.CONTAINER_SPACING, "min-w-[220px] select-none")}>
          <div className={FILTER_COMPONENT_STYLES.FILTER_HEADER}>
            <span className={FILTER_COMPONENT_STYLES.FILTER_TITLE}>{filterConfig.label}</span>
          </div>

          <div className={cn("space-y-1 overflow-y-auto", heightClass)}>
            {safeOptions.length > 0 ? (
              safeOptions.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`${filterConfig.key}-${option.value}`}
                  className={cn(
                    "flex items-center space-x-2 py-1.5 px-2 rounded-md cursor-pointer",
                    FILTER_STYLES.HOVER_ACCENT,
                    FILTER_STYLES.TRANSITION
                  )}
                >
                  <Checkbox
                    id={`${filterConfig.key}-${option.value}`}
                    checked={selectedOptions.includes(option.value)}
                    onCheckedChange={() => handleOptionToggle(option.value)}
                  />
                  <span className="text-sm font-normal flex-1 text-foreground leading-none">
                    {option.label}
                  </span>
                </Label>
              ))
            ) : (
              <div className={cn("text-sm py-4 text-center", FILTER_STYLES.TEXT_MUTED)}>
                {FILTER_ACCESSIBILITY.NO_RESULTS_TEXT}
              </div>
            )}
          </div>

          <div className={FILTER_COMPONENT_STYLES.SEPARATOR}>
            <Button
              onClick={handleApply}
              size="sm"
              className={FILTER_COMPONENT_STYLES.APPLY_BUTTON}
              disabled={selectedOptions.length === 0}
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

export default React.memo(MultiSelectFilter) as typeof MultiSelectFilter 
