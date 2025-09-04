

import { useMemo } from "react"
import { DataTable } from "@shared/components/ui/data-table"
import { getMemberColumns } from "@shared/lib/tables/columns/member-columns"
import { getMemberRowActions, getMemberHoverActions } from "@shared/lib/tables/actions/member-actions"
import type { Member } from "@shared/types/members"

interface MemberTableProps {
  members: Member[]
  selectedMembers?: string[]
  onSelectionChange?: (selected: string[]) => void
  onViewMember?: (member: Member) => void
  onEditMember?: (member: Member) => void
  onAdjustPoints?: (member: Member) => void
  unavailableItems?: string[]
  loading?: boolean
  emptyStateDescription?: string
}

export function MemberTable({ 
  members = [], 
  selectedMembers = [],
  onSelectionChange = () => {},
  onViewMember, 
  onEditMember = () => {},
  onAdjustPoints = () => {},
  unavailableItems = [],
  loading = false,
  emptyStateDescription = "No members have been added yet.",
}: MemberTableProps) {
  const rowActions = useMemo(() => getMemberRowActions({ 
    onView: onViewMember, 
    onEdit: onEditMember, 
    onAdjustPoints 
  }), [onViewMember, onEditMember, onAdjustPoints])

  const hoverActions = useMemo(() => getMemberHoverActions({ 
    onEdit: onEditMember 
  }), [onEditMember])

  return (
    <DataTable
      data={members}
      columns={getMemberColumns() as any}
      selectedItems={selectedMembers}
      onSelectionChange={onSelectionChange}
      getItemId={(member) => member.id}
      onRowClick={onViewMember}
      rowActions={rowActions}
      hoverActions={hoverActions}
      unavailableItems={unavailableItems}
      loading={loading}
      emptyStateDescription={emptyStateDescription}
    />
  )
}
