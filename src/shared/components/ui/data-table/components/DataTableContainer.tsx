import { useRef, forwardRef, type ReactNode } from "react"
import { Table } from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"
import { useTableScroll } from "../hooks/use-table-scroll"
import { useScrollToActiveRow } from "../hooks/useScrollToActiveRow"
import { DataTableHeader } from "./DataTableHeader"
import { DataTableBody } from "./DataTableBody"
import type { Column, TableAction } from "@shared/types/data-table"

interface SelectionState {
  isIndeterminate: boolean
  isAllSelected: boolean
}

interface DataTableContainerProps<T extends Record<string, unknown>> {
  data: T[]
  columns: Column<T>[]
  selectedItems: string[]
  unavailableItems: string[]
  rowActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  hoverActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  onRowClick?: (item: T) => void
  onToggleSelection: (itemId: string) => void
  onToggleAllSelection: () => void
  getItemId: (item: T) => string
  getItemStatus?: (item: T) => string
  allowedStatuses: string[]
  selectionState: SelectionState
  loading: boolean
  activeItemId?: string
  className?: string
  children?: ReactNode
}

export const DataTableContainer = forwardRef<HTMLDivElement, DataTableContainerProps<any>>(({
  data,
  columns,
  selectedItems,
  unavailableItems,
  rowActions,
  hoverActions,
  onRowClick,
  onToggleSelection,
  onToggleAllSelection,
  getItemId,
  getItemStatus,
  allowedStatuses,
  selectionState,
  loading,
  activeItemId,
  className,
  children,
}: DataTableContainerProps<any>, ref: React.Ref<HTMLDivElement>) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { showRightShadow } = useTableScroll(scrollRef)
  
  const hasSelection = selectedItems !== undefined
  const hasActions = !!(rowActions || onRowClick)
  const hasData = !!(data?.length)
  
  // Add scroll-to-active-row functionality
  useScrollToActiveRow({
    activeItemId,
    disabled: loading || !hasData
  })

  return (
    <div 
      ref={ref} 
      className={cn("relative w-full", className)}
      role="region"
      aria-label="Data table"
      aria-live="polite"
      aria-busy={loading}
    >
      <div className="relative border-t">
        <div 
          ref={scrollRef} 
          className="overflow-x-auto scroll-smooth"
          role="application"
          aria-label="Scrollable table content"
        >
          <Table 
            className="w-full table-auto"
            role="grid"
            aria-label={`Data table with ${data.length} rows`}
            aria-rowcount={data.length + 1}
            aria-colcount={columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)}
          >
            <DataTableHeader
              columns={columns}
              hasSelection={hasSelection}
              hasActions={hasActions}
              showRightShadow={showRightShadow}
              selectionState={selectionState}
              onToggleAllSelection={onToggleAllSelection}
            />

            <DataTableBody
              data={data}
              columns={columns}
              selectedItems={selectedItems}
              unavailableItems={unavailableItems}
              rowActions={rowActions}
              hoverActions={hoverActions}
              onRowClick={onRowClick}
              onToggleSelection={onToggleSelection}
              showRightShadow={showRightShadow}
              getItemId={getItemId}
              getItemStatus={getItemStatus}
              allowedStatuses={allowedStatuses}
              activeItemId={activeItemId}
            />
          </Table>
        </div>
      </div>
      {children}
    </div>
  )
})

DataTableContainer.displayName = 'DataTableContainer'