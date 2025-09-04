import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { copyEntityId } from '@shared/utils/formatters'
import type { Dispute } from '../types/disputes.types'

interface UseDisputeActionsReturn {
  respondToDispute: (dispute: Dispute) => void
  acceptDispute: (dispute: Dispute) => void
  challengeDispute: (dispute: Dispute) => void
  uploadEvidence: (dispute: Dispute) => void
  copyDisputeId: (dispute: Dispute) => void
  exportDisputes: (disputeIds: string[]) => void
  navigateToDisputeDetails: (dispute: Dispute) => void
  // Index signature to match UseActionsHook interface
  [key: string]: (...args: any[]) => void
}

export const useDisputeActions = (): UseDisputeActionsReturn => {
  const navigate = useNavigate()

  const respondToDispute = useCallback((dispute: Dispute) => {
    toast.success(`Responding to dispute ${dispute.id}`)
  }, [])

  const acceptDispute = useCallback((dispute: Dispute) => {
    toast.success(`Dispute ${dispute.id} accepted`)
  }, [])

  const challengeDispute = useCallback((dispute: Dispute) => {
    toast.success(`Dispute ${dispute.id} challenged`)
  }, [])

  const uploadEvidence = useCallback((dispute: Dispute) => {
    toast.success(`Evidence upload started for dispute ${dispute.id}`)
  }, [])

  const copyDisputeId = useCallback((dispute: Dispute) => {
    copyEntityId(dispute.id, 'Dispute')
  }, [])

  const exportDisputes = useCallback((disputeIds: string[]) => {
    toast.success(`Exporting ${disputeIds.length} disputes`)
  }, [])

  const navigateToDisputeDetails = useCallback((dispute: Dispute) => {
    navigate(`/disputes/${dispute.id}`)
  }, [navigate])

  return {
    respondToDispute,
    acceptDispute,
    challengeDispute,
    uploadEvidence,
    copyDisputeId,
    exportDisputes,
    navigateToDisputeDetails,
  }
}