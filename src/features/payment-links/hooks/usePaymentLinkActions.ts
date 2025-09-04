import { useCallback } from 'react'
import type { PaymentLink } from '@shared/types/payment-links'

export function usePaymentLinkActions() {
  const handleView = useCallback((link: PaymentLink) => {
    console.log('View payment link:', link.id)
  }, [])

  const handleCreateLink = useCallback(() => {
    console.log('Create new payment link')
  }, [])

  const handleCancelLink = useCallback((id: string) => {
    console.log('Cancel payment link:', id)
  }, [])

  const handleBatchCancel = useCallback((ids: string[]) => {
    console.log('Batch cancel payment links:', ids)
  }, [])

  const handleBatchExport = useCallback((ids: string[]) => {
    console.log('Batch export payment links:', ids)
  }, [])

  const handleBatchActivate = useCallback((ids: string[]) => {
    console.log('Batch activate payment links:', ids)
  }, [])

  return {
    handleView,
    handleCreateLink,
    handleCancelLink,
    handleBatchCancel,
    handleBatchExport,
    handleBatchActivate
  }
}
