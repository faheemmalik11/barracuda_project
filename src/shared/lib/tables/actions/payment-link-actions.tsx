import React from 'react'
import { Eye, X, Copy, ExternalLink } from 'lucide-react'
import type { TableAction } from '@shared/types/data-table'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkActionsConfig {
  onView?: (link: PaymentLink) => void
  onCancel?: (id: string) => void
  onCopyLink?: (link: PaymentLink) => void
  onOpenLink?: (link: PaymentLink) => void
}

export const getPaymentLinkRowActions = ({
  onView,
  onCancel,
  onCopyLink,
  onOpenLink
}: PaymentLinkActionsConfig): TableAction<PaymentLink>[] => {
  const actions: TableAction<PaymentLink>[] = []

  if (onView) {
    actions.push({
      key: 'view',
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: onView
    })
  }

  if (onCopyLink) {
    actions.push({
      key: 'copy',
      label: 'Copy Link',
      icon: <Copy className="h-4 w-4" />,
      onClick: onCopyLink
    })
  }

  if (onOpenLink) {
    actions.push({
      key: 'open',
      label: 'Open Link',
      icon: <ExternalLink className="h-4 w-4" />,
      onClick: onOpenLink
    })
  }

  if (onCancel) {
    actions.push({
      key: 'cancel',
      label: 'Cancel',
      icon: <X className="h-4 w-4" />,
      onClick: (link) => onCancel(link.id),
      variant: 'destructive'
    })
  }

  return actions
}

export const getPaymentLinkHoverActions = (): TableAction<PaymentLink>[] => {
  return [
    {
      key: 'quick-view',
      label: 'Quick View',
      icon: <Eye className="h-4 w-4" />,
      onClick: () => {} // Will be handled by onRowClick
    }
  ]
}
