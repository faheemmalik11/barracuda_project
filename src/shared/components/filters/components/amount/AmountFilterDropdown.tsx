import { useState, useMemo } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import { FilterButton } from "@shared/components/filters/base/FilterButton"
import { useAmountFilter } from "../../hooks/useAmountFilter"
import type { AmountFilterValue } from "@shared/types/amountFilter"
import type { FilterConfig } from "@shared/types/filters"
import { CornerDownRight } from "lucide-react"

interface AmountFilterDropdownProps {
  value?: AmountFilterValue | null
  onChange?: (value: AmountFilterValue | null) => void
  currency?: string
  className?: string
  filterConfig: FilterConfig
}

const OPERATOR_OPTIONS = [
  { value: "equal" as const, label: "is equal to" },
  { value: "range" as const, label: "is between" },
  { value: "greater_than" as const, label: "is greater than" },
  { value: "less_than" as const, label: "is less than" },
] as const

const OPERATOR_DISPLAY_MAP = {
  equal: (amount: string, currency: string) => `Exactly ${currency}${amount}`,
  less_than: (amount: string, currency: string) => `Less than ${currency}${amount}`,
  greater_than: (amount: string, currency: string) => `Greater than ${currency}${amount}`,
} as const

export function AmountFilterDropdown({
  value,
  onChange,
  currency = "$",
  filterConfig,
}: AmountFilterDropdownProps) {
  const {
    tempValue,
    handleOperatorChange,
    handleInputChange,
    handleApply,
    handleClear,
    isValid,
    setTempValue,
  } = useAmountFilter(value, onChange)

  const [isOpen, setIsOpen] = useState(false)

  const handleApplyAndClose = () => {
    handleApply()
    setIsOpen(false)
  }

  const handleClearAndReset = () => {
    handleClear()
    setTempValue({ operator: "equal", min: "", max: "", value: "" })
  }

  const displayValue = useMemo(() => {
    if (!value) return ""

    if (value.operator === "range") {
      const min = value.min ? `${currency}${value.min}` : ""
      const max = value.max ? `${currency}${value.max}` : ""
      if (min && max) return `${min} to ${max}`
      if (min) return `From ${min}`
      if (max) return `Up to ${max}`
      return ""
    }

    if (value.value && value.operator in OPERATOR_DISPLAY_MAP) {
      return OPERATOR_DISPLAY_MAP[
        value.operator as keyof typeof OPERATOR_DISPLAY_MAP
      ](String(value.value), currency)
    }

    return value.value ? `${currency}${value.value}` : ""
  }, [value, currency])

  const filterButtonProps = {
    filter: filterConfig,
    isActive: !!value,
    isOpen,
    displayValue: {
      label: filterConfig.label,
      displayValue,
    },
    onToggle: setIsOpen,
    onClear: handleClearAndReset,
  }

  return (
    <FilterButton {...filterButtonProps}>
      <div className="p-3 space-y-4 select-none">
        <div className="font-medium text-sm">Filter by Amount</div>

        <div className="space-y-2">
          <Select
            value={tempValue.operator}
            onValueChange={handleOperatorChange}
          >
            <SelectTrigger className="h-8 rounded-lg border-2 shadow-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-xl border-2 select-none">
              {OPERATOR_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="font-medium text-sm rounded-md"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {tempValue.operator === "range" ? (
            <div className="flex items-center gap-2 pt-1">
              <CornerDownRight className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
              <Input
                type="number"
                placeholder="0"
                value={tempValue.min || ""}
                onChange={(e) => handleInputChange("min", e.target.value)}
                className="h-8 rounded-lg border-2 shadow-sm w-20 select-text"
              />
              <span className="text-sm text-muted-foreground">and</span>
              <Input
                type="number"
                placeholder="0"
                value={tempValue.max || ""}
                onChange={(e) => handleInputChange("max", e.target.value)}
                className="h-8 rounded-lg border-2 shadow-sm w-20 select-text"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 pt-1">
              <CornerDownRight className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
              <Input
                type="number"
                placeholder="0"
                value={tempValue.value || ""}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="h-8 rounded-lg border-2 shadow-sm w-full select-text"
              />
            </div>
          )}
        </div>

        <Button
          onClick={handleApplyAndClose}
          disabled={!isValid}
          className="w-full h-9"
          size="sm"
        >
          Apply
        </Button>
      </div>
    </FilterButton>
  )
} 
