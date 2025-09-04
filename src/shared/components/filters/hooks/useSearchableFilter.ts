import { useState, useEffect, useMemo, useCallback, useDeferredValue } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface UseSearchableFilterProps<T extends FilterOption> {
  options: readonly T[]
  value?: string | null
  onChange?: (value: string | null) => void
  searchFields?: (keyof T)[]
  filterLabel?: string
}

interface UseSearchableFilterReturn<T extends FilterOption> {
  // State
  isOpen: boolean
  selectedOption: T | undefined
  searchQuery: string
  filteredOptions: readonly T[]
  
  // Actions
  setIsOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  handleOptionSelect: (optionValue: string) => void
  handleApply: () => void
  handleClear: () => void
  
  // Computed values
  isActive: boolean
  displayValue: {
    label: string
    displayValue: string
  }
}

export function useSearchableFilter<T extends FilterOption>({
  options,
  value,
  onChange,
  searchFields = ['label', 'value'] as (keyof T)[],
  filterLabel = 'Filter',
}: UseSearchableFilterProps<T>): UseSearchableFilterReturn<T> {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingSelection, setPendingSelection] = useState<string>(value || '')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setPendingSelection(value || '')
  }, [value])

  const deferredQuery = useDeferredValue(searchQuery)

  const filteredOptions = useMemo(() => {
    if (!deferredQuery.trim()) return options
    
    const query = deferredQuery.toLowerCase().trim()
    return options.filter(option => 
      searchFields.some(field => 
        String(option[field]).toLowerCase().includes(query)
      )
    )
  }, [options, deferredQuery, searchFields])

  const selectedOptionData = useMemo(() => 
    options.find(option => option.value === pendingSelection),
    [options, pendingSelection]
  )

  const handleOptionSelect = useCallback((optionValue: string) => {
    setPendingSelection(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }, [onChange])

  const handleApply = useCallback(() => {
    onChange?.(pendingSelection || null)
    setIsOpen(false)
  }, [pendingSelection, onChange])

  const handleClear = useCallback(() => {
    setPendingSelection('')
    setSearchQuery('')
    onChange?.(null)
  }, [onChange])

  const isActive = useMemo(() => !!value, [value])
  const displayValue = useMemo(
    () => ({
      label: filterLabel,
      displayValue: selectedOptionData?.label || '',
    }),
    [selectedOptionData, filterLabel],
  )

  return {
    isOpen,
    selectedOption: selectedOptionData,
    searchQuery,
    filteredOptions,
    setIsOpen,
    setSearchQuery,
    handleOptionSelect,
    handleApply,
    handleClear,
    isActive,
    displayValue,
  }
} 
