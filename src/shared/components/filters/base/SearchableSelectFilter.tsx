import React from "react"
import { Button } from "@shared/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@shared/lib/utils"
import { FilterButton } from "./FilterButton"
import { useSearchableFilter } from "../hooks/useSearchableFilter"
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

interface SearchableSelectFilterProps<T extends FilterOption> {
  options: readonly T[]
  value?: string | null
  onChange?: (value: string | null) => void
  filterConfig: FilterConfig
  searchPlaceholder?: string
  className?: string
  searchFields?: (keyof T)[]
}

export function SearchableSelectFilter<T extends FilterOption>({
  options,
  value,
  onChange,
  filterConfig,
  searchPlaceholder = "Search options...",
  className,
  searchFields = ["label", "value"] as (keyof T)[],
}: SearchableSelectFilterProps<T>) {
  const { label = "Filter" } = filterConfig
  const {
    isOpen,
    selectedOption,
    searchQuery,
    filteredOptions,
    setIsOpen,
    setSearchQuery,
    handleOptionSelect,
    handleApply,
    handleClear,
    isActive,
    displayValue,
  } = useSearchableFilter({
    options,
    value,
    onChange,
    searchFields,
    filterLabel: label,
  })

  return (
    <div className={cn("relative select-none", className)}>
      <FilterButton
        filter={{ ...filterConfig, label }}
        isActive={isActive}
        isOpen={isOpen}
        displayValue={displayValue}
        onToggle={setIsOpen}
        onClear={handleClear}
      >
        <div className={cn(FILTER_STYLES.CONTAINER_SPACING, "select-none")}>
          <div className={FILTER_COMPONENT_STYLES.FILTER_HEADER}>
            <span className={FILTER_COMPONENT_STYLES.FILTER_TITLE}>{label}</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={cn(
                "w-full px-3 py-2 border border-input rounded-lg text-sm bg-background select-text",
                FILTER_STYLES.HEIGHT_SM,
                FILTER_STYLES.FOCUS_RING
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={`Search ${label || "options"}`}
              autoFocus
            />
          </div>

          <div className={cn("overflow-y-auto", FILTER_STYLES.MAX_HEIGHT)}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center cursor-pointer text-sm",
                    FILTER_STYLES.ITEM_SPACING,
                    FILTER_STYLES.HOVER_ACCENT,
                    FILTER_STYLES.TRANSITION,
                    selectedOption?.value === option.value && FILTER_STYLES.SELECTED_BG
                  )}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">{option.label}</span>
                  </div>
                  {selectedOption?.value === option.value && (
                    <Check className="h-3 w-3 text-primary shrink-0" />
                  )}
                </div>
              ))
            ) : (
              <div className={cn("text-sm", FILTER_STYLES.ITEM_SPACING, FILTER_STYLES.TEXT_MUTED)}>
                {FILTER_ACCESSIBILITY.NO_RESULTS_TEXT}
              </div>
            )}
          </div>

          <div className={FILTER_COMPONENT_STYLES.SEPARATOR}>
            <Button
              onClick={handleApply}
              disabled={!selectedOption}
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

export default React.memo(SearchableSelectFilter) as typeof SearchableSelectFilter 
