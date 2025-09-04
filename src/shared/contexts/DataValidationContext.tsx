import { createContext } from "react"

// Simplified validation context for future API integration
export interface ValidationError {
  field: string
  message: string
  value?: unknown
}

export interface DataValidationContextType {
  isValidationEnabled: boolean
  enableValidation: () => void
  disableValidation: () => void
  validateApiResponse: <T>(data: T) => ValidationError[]
  validationErrors: ValidationError[]
  clearErrors: () => void
}

export const DataValidationContext = createContext<DataValidationContextType | undefined>(undefined) 