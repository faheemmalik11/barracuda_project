import React, { useState, useCallback, useEffect, useRef } from "react"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Label } from "@shared/components/ui/label"
import { Search } from "lucide-react"
import { Checkbox } from "@shared/components/ui/checkbox"
import { cn } from "@shared/lib/utils"
import { FilterButton } from "@shared/components/filters/base/FilterButton"
import { useFilterToggle } from "../../hooks/useFilterToggle"
import { FILTER_COMPONENT_STYLES, FILTER_ACCESSIBILITY, FILTER_STYLES } from "@shared/components/filters/constants/filterStyles"
import type { FilterConfig } from "@shared/types/filters"
import type { Customer } from "@shared/types/customers"
import { mockCustomers } from "@shared/data/mockCustomers"

interface CustomerFiltersProps {
  customersValue?: string[]
  customerOptions?: Customer[]
  onCustomersChange?: (value: string[] | null) => void
  className?: string
}

const CustomerSelectFilter = ({ 
  value = [], 
  onChange, 
  options,
  className 
}: {
  value?: string[]
  onChange?: (value: string[] | null) => void
  options?: Customer[]
  className?: string
}) => {
  const { isOpen, setIsOpen, close } = useFilterToggle()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value)
  const previousValueRef = useRef<string[]>(value)

  // Sync with external value changes only when actually different
  useEffect(() => {
    const valueString = JSON.stringify(value)
    const previousValueString = JSON.stringify(previousValueRef.current)
    
    if (valueString !== previousValueString) {
      setSelectedOptions(value)
      previousValueRef.current = value
    }
  }, [value])
  
  // Use provided options or fallback to mock data
  const customerOptions = options || mockCustomers

  const filteredOptions = customerOptions.filter(customer => {
    const query = searchQuery.toLowerCase()
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.id.toLowerCase().includes(query)
    )
  })

  const handleOptionToggle = useCallback((customerId: string) => {
    setSelectedOptions(prev => 
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }, [])

  const handleApply = useCallback(() => {
    onChange?.(selectedOptions.length > 0 ? selectedOptions : null)
    close()
  }, [selectedOptions, onChange, close])

  const handleClear = useCallback(() => {
    setSelectedOptions([])
    onChange?.(null)
  }, [onChange])

  const filterConfig: FilterConfig = {
    key: "customer-select",
    label: "Customers",
    type: "multiSelect",
  }

  const isActive = selectedOptions.length > 0
  const displayValue = {
    label: "Customers",
    displayValue: selectedOptions.length > 0 
      ? `${selectedOptions.length} selected` 
      : "",
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
        <div className={cn(FILTER_STYLES.CONTAINER_SPACING, "min-w-[300px] select-none")}>
          <div className={FILTER_COMPONENT_STYLES.FILTER_HEADER}>
            <span className={FILTER_COMPONENT_STYLES.FILTER_TITLE}>
              Select Customers
            </span>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              className="pl-8 h-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className={cn("space-y-1 overflow-y-auto", FILTER_STYLES.MAX_HEIGHT)}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((customer) => (
                <Label
                  key={customer.id}
                  htmlFor={`customer-${customer.id}`}
                  className={cn(
                    "flex items-center space-x-2 py-1.5 px-2 rounded-md cursor-pointer",
                    FILTER_STYLES.HOVER_ACCENT,
                    FILTER_STYLES.TRANSITION
                  )}
                >
                  <Checkbox
                    id={`customer-${customer.id}`}
                    checked={selectedOptions.includes(customer.id)}
                    onCheckedChange={() => handleOptionToggle(customer.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{customer.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{customer.email}</div>
                    <div className="text-xs text-muted-foreground">ID: {customer.id}</div>
                  </div>
                </Label>
              ))
            ) : (
              <div className={cn("text-sm py-4 text-center", FILTER_STYLES.TEXT_MUTED)}>
                {searchQuery ? "No customers found" : "No customers available"}
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
              Apply ({selectedOptions.length})
            </Button>
          </div>
        </div>
      </FilterButton>
    </div>
  )
}

export const CustomerFilters = ({
  customersValue,
  customerOptions,
  onCustomersChange,
  className,
}: CustomerFiltersProps) => {
  return (
    <CustomerSelectFilter
      value={customersValue}
      onChange={onCustomersChange}
      options={customerOptions}
      className={className}
    />
  )
}

export default React.memo(CustomerFilters)
