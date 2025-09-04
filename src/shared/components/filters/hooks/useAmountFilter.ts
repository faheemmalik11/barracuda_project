import { useState, useEffect, useCallback, useMemo } from 'react'
import type { AmountFilterValue, AmountOperator } from '@shared/types/amountFilter'

const createInitialValue = (value?: AmountFilterValue | null): AmountFilterValue => 
  value || { operator: 'equal', min: '', max: '', value: '' }


interface UseAmountFilterReturn {
  tempValue: AmountFilterValue
  setTempValue: (value: AmountFilterValue) => void
  handleOperatorChange: (operator: AmountOperator) => void
  handleInputChange: (field: 'min' | 'max' | 'value', val: string) => void
  handleApply: () => void
  handleClear: () => void
  isValid: boolean
}

export function useAmountFilter(
  value: AmountFilterValue | null | undefined,
  onChange?: (value: AmountFilterValue | null) => void,
): UseAmountFilterReturn {
  const [tempValue, setTempValue] = useState<AmountFilterValue>(() => createInitialValue(value))

  useEffect(() => {
    setTempValue(createInitialValue(value))
  }, [value])

  const handleOperatorChange = useCallback((operator: AmountOperator) => {
    setTempValue(prev => ({
      ...prev,
      operator,
      min: operator === 'range' ? prev.min : '',
      max: operator === 'range' ? prev.max : '',
      value: operator !== 'range' ? prev.value || prev.min : '',
    }))
  }, [])

  const handleInputChange = useCallback((field: 'min' | 'max' | 'value', val: string) => {
    setTempValue(prev => ({ ...prev, [field]: val }))
  }, [])

  const isValid = useMemo(() => {
    return tempValue.operator === 'range' 
      ? !!(tempValue.min || tempValue.max)
      : !!tempValue.value
  }, [tempValue])

  const handleApply = useCallback(() => {
    if (isValid) {
      onChange?.(tempValue)
    }
  }, [tempValue, onChange, isValid])

  const handleClear = useCallback(() => {
    onChange?.(null)
  }, [onChange])

  return {
    tempValue,
    setTempValue,
    handleOperatorChange,
    handleInputChange,
    handleApply,
    handleClear,
    isValid,
  }
}
