import { useMemo } from 'react'
import { DataTable } from "@shared/components/ui/data-table"
import { mockDisputes } from "@shared/data/mockDisputes"
import { getDisputeColumns } from "@shared/lib/tables/columns/dispute-columns"
import { getDisputeRowActions, getDisputeHoverActions } from "@shared/lib/tables/actions/dispute-actions"
import type { Dispute } from "@features/disputes/types/disputes.types"

interface DisputeTableProps {
  data?: Dispute[]
  selectedDisputes?: string[]
  onSelectionChange?: (selected: string[]) => void
  onViewDetails?: (dispute: Dispute) => void
  onSubmitEvidence?: (dispute: Dispute) => void
  unavailableItems?: string[]
  loading?: boolean
  emptyStateDescription?: string
}

export function DisputeTable({
  data = mockDisputes,
  selectedDisputes = [],
  onSelectionChange = () => {},
  onViewDetails = () => {},
  onSubmitEvidence = () => {},
  unavailableItems = [],
  loading = false,
  emptyStateDescription = "No disputes found.",
}: DisputeTableProps) {
  
  const rowActions = useMemo(
    () => (dispute: Dispute) => getDisputeRowActions(dispute, { onSubmitEvidence }),
    [onSubmitEvidence]
  )

  const hoverActions = useMemo(
    () => (dispute: Dispute) => getDisputeHoverActions(dispute, { onSubmitEvidence }),
    [onSubmitEvidence]
  )

  return (
    <DataTable
      data={data}
      columns={getDisputeColumns() as any}
      selectedItems={selectedDisputes}
      onSelectionChange={onSelectionChange}
      getItemId={(dispute) => dispute.id}
      onRowClick={onViewDetails}
      rowActions={rowActions}
      hoverActions={hoverActions}
      loading={loading}
      unavailableItems={unavailableItems}
      emptyStateDescription={emptyStateDescription}
    />
  )
}
