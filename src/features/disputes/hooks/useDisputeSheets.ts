import { useState } from 'react'
import type { Dispute } from '../types/disputes.types'

export function useDisputeSheets() {
  const [openSheets, setOpenSheets] = useState<Record<string, boolean>>({
    disputeDetails: false,
    disputeResponse: false,
    disputeEvidence: false
  })

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)

  const openDisputeDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute)
    setOpenSheets(prev => ({ ...prev, disputeDetails: true }))
  }

  const openDisputeResponse = (dispute: Dispute) => {
    setSelectedDispute(dispute)
    setOpenSheets(prev => ({ ...prev, disputeResponse: true }))
  }

  const openDisputeEvidence = (dispute: Dispute) => {
    setSelectedDispute(dispute)
    setOpenSheets(prev => ({ ...prev, disputeEvidence: true }))
  }

  const closeSheet = (sheetName: keyof typeof openSheets) => {
    setOpenSheets(prev => ({ ...prev, [sheetName]: false }))
    if (Object.values({ ...openSheets, [sheetName]: false }).every(open => !open)) {
      setSelectedDispute(null)
    }
  }

  const getSheetProps = (sheetName: 'disputeDetails' | 'disputeResponse' | 'disputeEvidence') => ({
    open: openSheets[sheetName],
    onOpenChange: (open: boolean) => {
      if (!open) {
        closeSheet(sheetName)
      }
    }
  })

  return {
    selectedDispute,
    openDisputeDetails,
    openDisputeResponse,
    openDisputeEvidence,
    closeSheet,
    getSheetProps,
    openSheets
  }
}