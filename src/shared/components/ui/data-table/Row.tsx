import { useMemo, useCallback, memo } from 'react'
import { TableCell, TableRow } from '@shared/components/ui/table'
import { Checkbox } from '@shared/components/ui/checkbox'
import { cn } from '@shared/lib/utils'
import { Eye } from 'lucide-react'
import type { Column, TableAction } from '@shared/types/data-table'
import { Cell } from './Cell'
import { RowActionDropdown } from './RowActions'
import { HoverActions } from './HoverActions'
import { stickyRowCellVariants } from './sticky-column-variants'

interface RowProps<T> {
  item: T
  index: number
  itemId: string
  columns: Column<T>[]
  selectedItems: string[]
  unavailableItems: string[]
  rowActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  hoverActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  onRowClick?: (item: T) => void
  onToggleSelection: (itemId: string) => void
  showRightShadow: boolean
  getItemStatus?: (item: T) => string
  allowedStatuses?: string[]
  activeItemId?: string
}

function RowComponent<T extends Record<string, unknown>>({
  item,
  index,
  itemId,
  columns,
  selectedItems,
  unavailableItems = [],
  rowActions,
  hoverActions,
  onRowClick,
  onToggleSelection,
  showRightShadow,
  getItemStatus,
  allowedStatuses = [],
  activeItemId,
}: RowProps<T>) {
  const isSelected = selectedItems.includes(itemId)
  const isUnavailable = unavailableItems.includes(itemId)
  const isActive = activeItemId === itemId
  
  const itemStatus = getItemStatus?.(item)
  const isSelectableByStatus = !getItemStatus || !allowedStatuses.length || allowedStatuses.includes(itemStatus || '')
  const isSelectable = isSelectableByStatus && !isUnavailable

  const visibleRowActions = useMemo(() => {
    const actions = rowActions ? (typeof rowActions === 'function' ? rowActions(item) : rowActions) : []
    const filtered = actions.filter(action => !action.condition || action.condition(item))
    
    if (onRowClick) {
      const viewAction = {
        key: 'view-details',
        label: 'View details',
        icon: <Eye className="h-4 w-4" />,
        onClick: () => onRowClick(item),
      }
      return [viewAction, ...filtered]
    }

    return filtered
  }, [rowActions, item, onRowClick])

  const visibleHoverActions = useMemo(() => {
    const actions = hoverActions ? (typeof hoverActions === 'function' ? hoverActions(item) : hoverActions) : []
    return actions.filter(action => !action.condition || action.condition(item))
  }, [hoverActions, item])

  const handleToggle = useCallback(() => {
    if (isSelectable) onToggleSelection(itemId)
  }, [isSelectable, onToggleSelection, itemId])

  const handleRowClick = useCallback(() => {
    if (onRowClick) onRowClick(item)
  }, [onRowClick, item])

  const handleSelectionClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    handleToggle()
  }, [handleToggle])

  return (
    <TableRow
      selected={isSelected}
      data-row-id={itemId}
      className={cn(
        "group cursor-pointer transition-colors duration-200 ease-in-out",
        isActive && "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-l-blue-500"
      )}
      onClick={handleRowClick}
      role="row"
      tabIndex={onRowClick ? 0 : undefined}
      aria-selected={isSelected}
      aria-label={`Row ${index + 1}${isActive ? ' (currently active)' : ''}${isSelected ? ' (selected)' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleRowClick()
        }
      }}
    >
      <TableCell
        className={cn(
          "w-9 min-w-9 max-w-9 px-1 text-center transition-colors duration-200 ease-in-out",
          "group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50",
          isSelected && "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800",
          isActive && "bg-blue-50 dark:bg-blue-950/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50"
        )}
        onClick={handleSelectionClick}
        role="gridcell"
        aria-label="Select row"
      >
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isSelected}
            disabled={!isSelectable}
            onCheckedChange={handleToggle}
            className={cn(
              "h-4 w-4 border-2",
              isSelectable ? 
                "border-gray-300 hover:border-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" : 
                "bg-gray-200 border-gray-300 cursor-not-allowed hover:bg-gray-200 data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400"
            )}
            aria-label={`${isSelected ? 'Deselect' : 'Select'} row ${index + 1}`}
            aria-describedby={`row-${itemId}-description`}
          />
          <span id={`row-${itemId}-description`} className="sr-only">
            {!isSelectable 
              ? 'This row cannot be selected' 
              : isSelected 
              ? 'Row is selected' 
              : 'Row is not selected'
            }
          </span>
        </div>
      </TableCell>

      {columns.map((column) => (
        <Cell<T>
          key={column.key as string}
          column={column}
          item={item}
          index={index}
          isUnavailable={isUnavailable}
          isSelected={isSelected}
          isActive={isActive}
        />
      ))}

      <TableCell 
        className={cn(
          "w-full relative transition-colors duration-200 ease-in-out",
          "group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50",
          isSelected && "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800",
          isActive && "bg-blue-50 dark:bg-blue-950/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50"
        )}
        role="gridcell"
        aria-hidden={visibleHoverActions.length === 0}
      >
        {visibleHoverActions.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-end pr-4">
            <HoverActions actions={visibleHoverActions} item={item} />
          </div>
        )}
      </TableCell>

      {visibleRowActions.length > 0 && (
        <TableCell
          className={cn(
            stickyRowCellVariants({ 
              showRightShadow, 
              selected: isSelected,
              active: isActive
            }),
            "transition-colors duration-200 ease-in-out"
          )}
          data-sticky-action="true"
          onClick={(e) => e.stopPropagation()}
          role="gridcell"
          aria-label={`Actions for row ${index + 1}`}
        >
          <div className="flex items-center justify-center">
            <RowActionDropdown 
              actions={visibleRowActions} 
              item={item}
              aria-label={`More actions for row ${index + 1}`}
            />
          </div>
        </TableCell>
      )}
      
    </TableRow>
  )
}

export const Row = memo(RowComponent) as <T extends Record<string, unknown>>(props: RowProps<T>) => JSX.Element
