import type { ReactNode } from "react"

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

/**
 * Bulk action configuration for performing operations on multiple items
 */
export interface BulkAction {
  key: string
  label: string
  icon?: ReactNode
  variant?: ButtonVariant
  onClick: (selectedIds: string[]) => void | Promise<void>
  disabled?: (selectedIds: string[]) => boolean
  requiresConfirmation?: boolean
  confirmationMessage?: string
}