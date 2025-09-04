import { useState, memo, useMemo } from "react"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import ExportTableSheet from "@shared/components/sheets/ExportTableSheet"
import ColumnManagementSheet from "@shared/components/sheets/ColumnManagementSheet"
import type { TableFiltersProps, FilterConfig } from "@shared/types/filters"
import { useFilterManager } from "./hooks/useFilterManager"
import { useFilterDisplayHelpers } from "./hooks/useFilterDisplayHelpers"
import { BulkActions } from "@shared/components/BulkActions"
import { FilterActionsMenu } from "./components/FilterActionsMenu"
import { SelectionActions } from "./components/SelectionActions"
import { FILTER_RENDERERS, renderGenericFilter } from "./components/FilterRenderers"

type DisplayMode = 'bulk' | 'selection' | 'filters'

const getDisplayMode = (showBulkActions: boolean, showSelectionActions: boolean): DisplayMode => {
  if (showBulkActions) return 'bulk'
  if (showSelectionActions) return 'selection'
  return 'filters'
}

const TableFilters = memo(function TableFilters({
  config,
  onFiltersChange,
  onClearAllFilters,
  onBulkAction,
  className,
  initialValues = {},
  availableColumns = [],
  totalRecords = 0,
  selectedItems = [],
  hasSelection = false,
  selectedCount = 0,
  onSelectionCancel,
  onSelectionFlag,
  onClearSelection,
  onColumnsChange,
  managedColumns,
  currentPageSize,
  onPageSizeChange,
  availablePageSizes,
  status,
}: TableFiltersProps) {
  const {
    filterValues,
    defaultVisibleFilters,
    activatedHiddenFilterConfigs,
    availableHiddenFilters,
    hasActiveFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters,
    activateHiddenFilter,
    removeAllAdditionalFilters,
  } = useFilterManager({
    config,
    initialValues,
    onFiltersChange,
  })

  const { getFilterDisplayValue } = useFilterDisplayHelpers()
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [exportSheetOpen, setExportSheetOpen] = useState(false)
  const [columnSheetOpen, setColumnSheetOpen] = useState(false)


  const showBulkActions = hasSelection && !!config.bulkActions
  const showSelectionActions = hasSelection && !!(onSelectionCancel && onSelectionFlag && onClearSelection)
  const displayMode = getDisplayMode(showBulkActions, showSelectionActions)

  const computedAvailableColumns = useMemo(() => {
    const columns = config.getColumnsForStatus?.(status) ?? availableColumns

    if (!managedColumns?.length) return columns

    const managedMap = new Map(managedColumns.map(col => [col.id, col]))
    
    return columns.map(col => {
      const managed = managedMap.get(col.id)
      return managed ? { ...col, visible: managed.visible, order: managed.order } : col
    })
  }, [config.getColumnsForStatus, status, availableColumns, managedColumns])


  const renderFilter = (filter: FilterConfig) => {
    const value = filterValues[filter.key]
    const onChange = (newValue: unknown) => handleFilterChange(filter.key, newValue)
    
    const renderer = FILTER_RENDERERS[filter.key] ?? FILTER_RENDERERS[filter.type]
    if (renderer) return renderer(filter, value, onChange)

    return renderGenericFilter(
      filter,
      value,
      openFilter === filter.key,
      (open) => setOpenFilter(open ? filter.key : null),
      () => clearFilter(filter.key),
      getFilterDisplayValue(filter, value)
    )
  }

  const handleClearAllFilters = () => {
    clearAllFilters()
    onClearAllFilters?.()
  }

  if (!config?.filters?.length) return null

  const allFilters: FilterConfig[] = [
    ...(defaultVisibleFilters as FilterConfig[]),
    ...(activatedHiddenFilterConfigs as FilterConfig[]).sort((a, b) => a.label.localeCompare(b.label))
  ]


  const renderMainContent = () => {
    if (displayMode === 'bulk') {
      return (
        <BulkActions
          actions={config.bulkActions!}
          selectedItems={selectedItems}
          onBulkAction={onBulkAction!}
          onClearSelection={onClearSelection}
        />
      )
    }
    
    if (displayMode === 'selection') {
      return (
        <SelectionActions
          selectedCount={selectedCount}
          entityType={config.entityType}
          onCancel={onSelectionCancel!}
          onFlag={onSelectionFlag!}
          onExport={config.onExport}
          onUpdateStatus={config.onUpdateStatus}
          onUpdateCapabilities={config.onUpdateCapabilities}
          onClearSelection={onClearSelection!}
        />
      )
    }

    return (
      <div className="w-full flex items-center justify-between gap-4 select-none min-h-[48px]">
        <div className="flex items-center gap-3 flex-wrap min-w-0 flex-1">
          {allFilters.map((filter) => (
            <div key={filter.key} className="flex-shrink-0">
              {renderFilter(filter)}
            </div>
          ))}
          
          {hasActiveFilters && (
            <Button
              variant="link"
              onClick={handleClearAllFilters}
              className="px-0 text-sm font-medium text-primary hover:text-primary hover:bg-transparent whitespace-nowrap flex-shrink-0"
            >
              Clear filters
            </Button>
          )}
        </div>
        
        <div className="flex-shrink-0 ml-auto">
          <FilterActionsMenu
            availableHiddenFilters={availableHiddenFilters as FilterConfig[]}
            activatedHiddenFilterConfigs={activatedHiddenFilterConfigs as FilterConfig[]}
            onExportOpen={setExportSheetOpen}
            onColumnOpen={setColumnSheetOpen}
            onActivateHiddenFilter={activateHiddenFilter}
            onRemoveAllAdditionalFilters={removeAllAdditionalFilters}
            currentPageSize={currentPageSize}
            onPageSizeChange={onPageSizeChange}
            availablePageSizes={availablePageSizes}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="min-h-[48px] flex items-center">
        {renderMainContent()}
      </div>

      <ExportTableSheet
        open={exportSheetOpen}
        onOpenChange={setExportSheetOpen}
        tableName={config.title?.toLowerCase() || "data"}
        totalRecords={totalRecords}
        availableColumns={computedAvailableColumns}
      />

      <ColumnManagementSheet
        open={columnSheetOpen}
        onOpenChange={setColumnSheetOpen}
        columns={computedAvailableColumns.map((col, index) => ({
          id: col.id,
          label: col.label,
          visible: col.visible ?? true,
          required: col.required ?? false,
          order: col.order ?? index,
        }))}
        onColumnsChange={onColumnsChange}
      />
    </div>
  )
})

export default TableFilters