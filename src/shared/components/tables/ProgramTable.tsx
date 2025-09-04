
import { useMemo } from "react"
import { DataTable } from "@shared/components/ui/data-table"
import { getProgramColumns } from "@shared/lib/tables/columns/program-columns"
import { getProgramRowActions, getProgramHoverActions } from "@shared/lib/tables/actions/program-actions"
import type { Program } from "@shared/types/programs"

interface ProgramTableProps {
  programs: Program[]
  selectedPrograms?: string[]
  onSelectionChange?: (selected: string[]) => void
  onViewProgram?: (program: Program) => void
  onEditProgram?: (program: Program) => void
  onArchiveProgram?: (program: Program) => void
  loading?: boolean
}

export function ProgramTable({ 
  programs, 
  selectedPrograms = [],
  onSelectionChange = () => {},
  onViewProgram,
  onEditProgram = () => {},
  onArchiveProgram = () => {},
  loading = false,
}: ProgramTableProps) {
  const rowActions = useMemo(() => getProgramRowActions({ 
    onView: onViewProgram, 
    onEdit: onEditProgram, 
    onArchive: onArchiveProgram 
  }), [onViewProgram, onEditProgram, onArchiveProgram])

  const hoverActions = useMemo(() => getProgramHoverActions({ 
    onEdit: onEditProgram 
  }), [onEditProgram])

  return (
    <DataTable
      data={programs}
      columns={getProgramColumns() as any}
      selectedItems={selectedPrograms}
      onSelectionChange={onSelectionChange}
      getItemId={(program) => program.id}
      onRowClick={onViewProgram}
      rowActions={rowActions}
      hoverActions={hoverActions}
      loading={loading}
      emptyStateDescription="No programs have been created yet."
    />
  )
}
