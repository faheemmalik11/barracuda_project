/**
 * DataValidationProvider - Essential for financial API integration
 * 
 * Currently disabled for development with mock data.
 * Enable when transitioning to real financial APIs for:
 * - Payment data validation
 * - Transaction integrity
 * - Regulatory compliance
 * - Error detection
 */

import type React from "react"
import { useState, useCallback } from "react"
import { DataValidationContext, type DataValidationContextType, type ValidationError } from "@shared/contexts/DataValidationContext"

interface Props {
  children: React.ReactNode
  enabledByDefault?: boolean
}

export function DataValidationProvider({ children, enabledByDefault = false }: Props) {
  const [isValidationEnabled, setIsValidationEnabled] = useState(enabledByDefault)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const enableValidation = useCallback(() => {
    setIsValidationEnabled(true)
  }, [])

  const disableValidation = useCallback(() => {
    setIsValidationEnabled(false)
    setValidationErrors([])
  }, [])

  const clearErrors = useCallback(() => {
    setValidationErrors([])
  }, [])

  const validateApiResponse = useCallback(<T,>(data: T): ValidationError[] => {
    if (!isValidationEnabled) {
      return []
    }

    const errors: ValidationError[] = []

    // Basic validation - extend this when integrating real APIs
    if (!data) {
      errors.push({
        field: "root",
        message: "Response data is null or undefined"
      })
    }

    // Add more validation logic here when transitioning to real APIs
    // Examples:
    // - Validate payment amounts are positive numbers
    // - Check required fields exist
    // - Verify data types match expected schema
    // - Validate currency codes
    // - Check date formats

    setValidationErrors(errors)
    return errors
  }, [isValidationEnabled])

  const value: DataValidationContextType = {
    isValidationEnabled,
    enableValidation,
    disableValidation,
    validateApiResponse,
    validationErrors,
    clearErrors,
  }

  return (
    <DataValidationContext.Provider value={value}>
      {children}
    </DataValidationContext.Provider>
  )
} 
