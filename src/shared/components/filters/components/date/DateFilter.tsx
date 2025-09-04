import { useCallback } from "react"
import { FilterButton } from "@shared/components/filters/base/FilterButton"
import { DateFilterContent } from "./DateFilterContent"
import { getDisplayLabel } from "@shared/utils/dateFilterUtils"
import { useFilterToggle } from "../../hooks/useFilterToggle"
import type { DateFilterValue } from "@shared/types/dateFilter"
import type { FilterConfig } from "@shared/types/filters"
import { isFilterActive } from "@shared/utils"

interface DateFilterProps {
  value?: DateFilterValue | null
  onChange: (value: DateFilterValue | null) => void
  label?: string
}

const dateFilterConfig: FilterConfig = {
  key: "date",
  label: "Date",
  type: "dateFilter",
}

export function DateFilter({ value, onChange, label = "Date" }: DateFilterProps) {
  const { isOpen, setIsOpen, close } = useFilterToggle()

  const handleClear = useCallback(() => {
    onChange(null)
  }, [onChange])

  const config = { ...dateFilterConfig, label }
  const isActive = isFilterActive(value, config.type)
  const displayInfo = getDisplayLabel(value, config.label)

  const filterProps = {
    filter: config,
    isActive,
    isOpen,
    displayValue: displayInfo,
    onToggle: setIsOpen,
    onClear: handleClear,
  }

  return (
    <div className="relative select-none">
      <FilterButton {...filterProps}>
        <DateFilterContent
          label={label}
          value={value}
          onChange={onChange}
          onClose={close}
        />
      </FilterButton>
    </div>
  )
} 
