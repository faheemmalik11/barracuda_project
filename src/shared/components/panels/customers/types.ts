import type { Customer } from '@shared/types/customers'

export interface CustomerInfo {
  id: string
  name: string
  email: string
  risk: string
  created: string
  lastActivity: string
  status: Customer['status']
  statusDetails: { category: string; priority: string }
}


export interface CustomerDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
  onBack?: () => void
  onOpenFullDetails?: () => void
  totalItems: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}