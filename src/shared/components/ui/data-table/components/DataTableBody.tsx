import { TableBody } from "@shared/components/ui/table"
import type { Column, TableAction } from "@shared/types/data-table"
import { Row } from "../Row"

interface DataTableBodyProps<T extends Record<string, unknown>> {
  data: T[]
  columns: Column<T>[]
  selectedItems: string[]
  unavailableItems: string[]
  rowActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  hoverActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  onRowClick?: (item: T) => void
  onToggleSelection: (itemId: string) => void
  showRightShadow: boolean
  getItemId: (item: T) => string
  getItemStatus?: (item: T) => string
  allowedStatuses: string[]
  activeItemId?: string
}

export function DataTableBody<T extends Record<string, unknown>>({
  data,
  columns,
  selectedItems,
  unavailableItems,
  rowActions,
  hoverActions,
  onRowClick,
  onToggleSelection,
  showRightShadow,
  getItemId,
  getItemStatus,  
  allowedStatuses,
  activeItemId,
}: DataTableBodyProps<T>) {
  return (
    <TableBody role="rowgroup">
      {data.map((item, index) => {
        const itemId = getItemId(item)
        return (
          <Row<T>
            key={itemId}
            item={item}
            index={index}
            itemId={itemId}
            columns={columns}
            selectedItems={selectedItems}
            unavailableItems={unavailableItems}
            rowActions={rowActions}
            hoverActions={hoverActions}
            onRowClick={onRowClick}
            onToggleSelection={onToggleSelection}
            showRightShadow={showRightShadow}
            getItemStatus={getItemStatus}
            allowedStatuses={allowedStatuses}
            activeItemId={activeItemId}
          />
        )
      })}
    </TableBody>
  )
}