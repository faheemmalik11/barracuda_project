import { useEffect, useRef } from "react"
import { cn } from "@shared/lib/utils"
import type { DataTableProps } from "@shared/types/data-table"
import { LoadingSkeleton } from "./LoadingSkeleton"
import { EmptyState } from "./EmptyState"
import { Pagination } from "./Pagination"
import { DataTableContainer } from "./components/DataTableContainer"
import { useDataTableSelection } from "@shared/components/ui/data-table/hooks/useDataTableSelection"

// Strict type constraint for better type safety
type StrictDataTableProps<T extends Record<string, unknown>> = DataTableProps<T>

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  selectedItems,
  onSelectionChange,
  getItemId,
  onRowClick,
  rowActions,
  hoverActions,
  pagination,
  loading = false,
  loadingRows = 10,
  emptyState,
  emptyStateTitle,
  emptyStateDescription,
  className,
  unavailableItems = [],
  getItemStatus,
  allowedStatuses = [],
  onSelectSucceededOnly,
  activeItemId,
}: StrictDataTableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasSelection = !!onSelectionChange
  const hasActions = !!(rowActions || onRowClick)
  const hasData = !!(data?.length)

  const { 
    toggleItemSelection, 
    toggleAllSelection, 
    selectSucceededOnly, 
    selectionState 
  } = useDataTableSelection({
    paginatedData: data || [],
    selectedItems: selectedItems || [],
    onSelectionChange,
    getItemId,
    unavailableItems,
    getItemStatus,
    allowedStatuses,
  })

  // Handle selectSucceededOnly callback with proper cleanup
  useEffect(() => {
    if (onSelectSucceededOnly && selectSucceededOnly) {
      onSelectSucceededOnly(selectSucceededOnly)
    }
  }, [onSelectSucceededOnly, selectSucceededOnly])

  if (loading) {
    return (
      <LoadingSkeleton
        columns={columns.length}
        rows={loadingRows}
        hasActions={hasActions}
        hasSelection={hasSelection}
        showPagination={!!pagination}
      />
    )
  }

  if (!hasData) {
    if (emptyState) return <>{emptyState}</>
    return (
      <div className={cn("relative w-full border-b border-t", className)}>
        <EmptyState title={emptyStateTitle} description={emptyStateDescription} />
      </div>
    )
  }

  return (
    <DataTableContainer
      data={data}
      columns={columns}
      selectedItems={selectedItems || []}
      unavailableItems={unavailableItems}
      rowActions={rowActions}
      hoverActions={hoverActions}
      onRowClick={onRowClick}
      onToggleSelection={hasSelection ? toggleItemSelection : () => {}}
      onToggleAllSelection={toggleAllSelection}
      getItemId={getItemId}
      getItemStatus={getItemStatus}
      allowedStatuses={allowedStatuses}
      selectionState={selectionState}
      loading={loading}
      activeItemId={activeItemId}
      className={className}
      ref={containerRef}
    >
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          loading={loading}
          onPageChange={pagination.onPageChange}
          containerRef={containerRef}
        />
      )}
    </DataTableContainer>
  )
}