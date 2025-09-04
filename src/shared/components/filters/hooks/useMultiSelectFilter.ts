import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface UseMultiSelectFilterProps<T extends FilterOption> {
  options: readonly T[]
  value?: string[]
  onChange?: (value: string[] | null) => void
  filterLabel?: string
}

interface UseMultiSelectFilterReturn {
  // State
  isOpen: boolean
  selectedOptions: string[]
  
  // Actions
  setIsOpen: (open: boolean) => void
  handleOptionToggle: (optionValue: string) => void
  handleApply: () => void
  handleClear: () => void
  
  // Computed values
  isActive: boolean
  displayValue: {
    label: string
    displayValue: string
  }
}

export function useMultiSelectFilter<T extends FilterOption>({
  options,
  value = [],
  onChange,
  filterLabel = 'Filter',
}: UseMultiSelectFilterProps<T>): UseMultiSelectFilterReturn {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value)
  const [isOpen, setIsOpen] = useState(false)
  const prevValueRef = useRef<string[]>(value)

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(prevValueRef.current)) {
      setSelectedOptions(value)
      prevValueRef.current = value
    }
  }, [value])

  const handleOptionToggle = useCallback((optionValue: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionValue)
        ? prev.filter(item => item !== optionValue)
        : [...prev, optionValue]
    )
  }, [])

  const handleApply = useCallback(() => {
    onChange?.(selectedOptions.length ? selectedOptions : null)
    setIsOpen(false)
  }, [selectedOptions, onChange])

  const handleClear = useCallback(() => {
    setSelectedOptions([])
    onChange?.(null)
  }, [onChange])

  const isActive = useMemo(() => !!selectedOptions.length, [selectedOptions.length])
  
  const displayValue = useMemo(() => {
    if (!isActive) {
      return { label: filterLabel, displayValue: '' }
    }
    
    const optionMap = new Map(options.map(opt => [opt.value, opt.label]))
    const selectedLabels = selectedOptions.map(value => optionMap.get(value) || value)

    return {
      label: filterLabel,
      displayValue: selectedLabels.length > 3
        ? `${selectedLabels[0]} and ${selectedLabels.length - 1} more`
        : selectedLabels.join(', '),
    }
  }, [isActive, selectedOptions, options, filterLabel])

  return {
    isOpen,
    selectedOptions,
    setIsOpen,
    handleOptionToggle,
    handleApply,
    handleClear,
    isActive,
    displayValue,
  }
} 
