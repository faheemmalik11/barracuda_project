import { useState, useEffect, useCallback, useMemo } from 'react'
import type { DateFilterValue } from '@shared/types/dateFilter'

interface FormData {
  selectedDate?: Date
  startDate?: Date
  endDate?: Date
  lastNumber: string | number
  lastUnit: 'h' | 'd' | 'm'
}

const createInitialFormData = (value?: DateFilterValue | null): FormData => ({
  selectedDate: value?.value,
  startDate: value?.startDate,
  endDate: value?.endDate,
  lastNumber: value?.lastNumber ?? '',
  lastUnit: value?.lastUnit ?? 'd',
})

const resetFormFields = (formData: FormData): FormData => ({
  ...formData,
  selectedDate: undefined,
  startDate: undefined,
  endDate: undefined,
  lastNumber: '',
})

export function useDateFilter(
  value: DateFilterValue | null | undefined,
  onChange: (value: DateFilterValue | null) => void,
) {
  const [operator, setOperator] = useState<DateFilterValue['operator']>(
    value?.operator ?? 'equal',
  )
  const [formData, setFormData] = useState<FormData>(() => createInitialFormData(value))

  useEffect(() => {
    setOperator(value?.operator ?? 'equal')
    setFormData(createInitialFormData(value))
  }, [value])

  useEffect(() => {
    setFormData(prev => resetFormFields(prev))
  }, [operator])

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }, [])

  const isValidFormData = useMemo(() => {
    switch (operator) {
      case 'last':
        return Boolean(formData.lastNumber && Number(formData.lastNumber) > 0)
      case 'equal':
      case 'before':
      case 'after':
        return Boolean(formData.selectedDate)
      case 'between':
        return Boolean(formData.startDate && formData.endDate)
      default:
        return false
    }
  }, [operator, formData])

  const handleApply = useCallback(() => {
    if (!isValidFormData) return

    const createFilterValue = (): DateFilterValue | null => {
      switch (operator) {
        case 'last':
          return {
            operator: 'last',
            lastNumber: Number(formData.lastNumber),
            lastUnit: formData.lastUnit,
          }
        case 'equal':
        case 'before':
        case 'after':
          return {
            operator,
            value: formData.selectedDate!,
          }
        case 'between':
          return {
            operator: 'between',
            startDate: formData.startDate!,
            endDate: formData.endDate!,
          }
        default:
          return null
      }
    }

    onChange(createFilterValue())
  }, [operator, formData, onChange, isValidFormData])

  return {
    operator,
    setOperator,
    formData,
    updateFormData,
    handleApply,
    isValidFormData,
  }
} 
