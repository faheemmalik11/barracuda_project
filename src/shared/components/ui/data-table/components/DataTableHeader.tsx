import { TableHead, TableHeader, TableRow } from "@shared/components/ui/table"
import { Checkbox } from "@shared/components/ui/checkbox"
import { cn } from "@shared/lib/utils"
import type { Column } from "@shared/types/data-table"
import { stickyHeaderVariants } from "../sticky-column-variants"

const HEADER_ALIGNMENT: Record<string, string> = {
  left: "text-left",
  center: "text-center", 
  right: "text-right",
}

const SELECTION_COLUMN_WIDTH = "w-9 min-w-9 max-w-9"
const CHECKBOX_STYLES = "h-4 w-4 border-2 border-gray-300 bg-background hover:bg-background data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"

interface SelectionState {
  isIndeterminate: boolean
  isAllSelected: boolean
}

interface DataTableHeaderProps<T> {
  columns: Column<T>[]
  hasSelection: boolean
  hasActions: boolean
  showRightShadow: boolean
  selectionState: SelectionState
  onToggleAllSelection: () => void
}

export function DataTableHeader<T>({
  columns,
  hasSelection,
  hasActions,
  showRightShadow,
  selectionState,
  onToggleAllSelection,
}: DataTableHeaderProps<T>) {
  return (
    <TableHeader role="rowgroup">
      <TableRow 
        className="transition-none hover:bg-transparent"
        role="row"
      >
        {hasSelection && (
          <TableHead 
            className={cn(SELECTION_COLUMN_WIDTH, "px-1 text-center")}
            role="columnheader"
            scope="col"
            aria-label="Select all items"
          >
            <div className="flex items-center justify-center">
              <Checkbox
                checked={selectionState.isIndeterminate ? "indeterminate" : selectionState.isAllSelected}
                onCheckedChange={onToggleAllSelection}
                className={CHECKBOX_STYLES}
                aria-label={`${selectionState.isAllSelected ? 'Deselect' : 'Select'} all items`}
                aria-describedby="selection-description"
              />
              <span id="selection-description" className="sr-only">
                {selectionState.isIndeterminate 
                  ? 'Some items are selected' 
                  : selectionState.isAllSelected 
                  ? 'All items are selected' 
                  : 'No items are selected'
                }
              </span>
            </div>
          </TableHead>
        )}

        {columns.map((column) => (
          <TableHead
            key={column.key}
            className={cn(
              HEADER_ALIGNMENT[column.align || "left"],
              column.headerClassName
            )}
            style={{ 
              width: column.width, 
              minWidth: column.minWidth, 
              maxWidth: column.maxWidth 
            }}
            role="columnheader"
            scope="col"
            aria-label={typeof column.header === 'string' ? column.header : `Column ${column.key}`}
          >
            {column.header}
          </TableHead>
        ))}

        <TableHead 
          className="w-full" 
          role="columnheader"
          scope="col"
          aria-hidden="true"
        />

        {hasActions && (
          <TableHead 
            className={stickyHeaderVariants({ showRightShadow })}
            data-sticky-action="true"
            role="columnheader"
            scope="col"
            aria-label="Row actions"
          >
            <span className="sr-only">Actions</span>
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  )
}