import { ReactNode } from 'react'

export interface ManagedColumn {
  id: string
  label: string
  visible: boolean
  required?: boolean
  order?: number
}

export interface ExportFormat {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  extension: string
  features: string[]
}

export interface ExportConfig {
  format: string
  dateRange: [string, string]
  columns: string[]
  includeFilters: boolean
  fileName: string
}

export interface BaseSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface ExportTableSheetProps extends BaseSheetProps {
  tableName?: string
  totalRecords?: number
  availableColumns?: ManagedColumn[]
  onExport?: (config: ExportConfig) => void
}

export interface ColumnManagementSheetProps extends BaseSheetProps {
  columns?: ManagedColumn[]
  onColumnsChange?: (columns: ManagedColumn[]) => void
}

export interface StepProgressProps {
  steps: Array<{
    id: number
    title: string
    description: string
  }>
  currentStep: number
  completedIcon?: ReactNode
}