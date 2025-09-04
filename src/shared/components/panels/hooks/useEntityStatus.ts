import { useMemo } from 'react'
import { useEntityStatusStyling } from '../utils/entityStatusStyling'

export function useEntityStatus<T extends { status: string }>(
  entityType: string,
  entity: T | undefined
) {
  const statusStyling = useEntityStatusStyling(entityType, entity?.status || 'unknown')
  
  const statusInfo = useMemo(() => ({
    status: entity?.status || 'unknown',
    styling: statusStyling,
    isActive: entity?.status === 'active' || entity?.status === 'succeeded',
    isInactive: entity?.status === 'inactive' || entity?.status === 'terminated',
    isError: entity?.status === 'failed' || entity?.status === 'error',
    isProcessing: entity?.status === 'processing' || entity?.status === 'pending'
  }), [entity?.status, statusStyling])
  
  return statusInfo
}