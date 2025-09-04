import { PageHeader } from './PageHeader'
import { FilterSection } from './FilterSection'
import { TableSection } from './TableSection'
import { useEntityListState } from './hooks/useEntityListState'
import type { BaseEntity, EntityListPageProps, ManagedColumn } from './types'

export function EntityListPage<T extends BaseEntity>({
  header,
  statusFilters,
  table,
  tableFilters,
  sheets = [],
  useData,
  useFilters,
  useSheets,
  useSelection,
  usePageSize,
  customSections = {} as NonNullable<EntityListPageProps<T>['customSections']>,
  animationKey,
  animationConfig,
  containerClassName = "flex flex-col gap-2"
}: EntityListPageProps<T>) {
  const data = useData()
  const filters = useFilters()
  const sheetsState = useSheets?.()
  const selection = useSelection?.()
  const pageSize = usePageSize()
  
  const entityState = useEntityListState({
    statusFilter: filters.statusFilter,
    tableFilters: filters.tableFilters,
    query: filters.query
  })

  const handlePageSizeChange = (newPageSize: number) =>
    entityState.handlePageSizeChange(newPageSize, pageSize.setPageSize)

  const handleColumnsChange = (columns: ManagedColumn[]) =>
    entityState.setManagedColumns(columns)

  const tableProps = {
    data: data.data,
    selectedItems: selection?.selectedItems || [],
    onSelectionChange: selection?.setSelectedItems || (() => {}),
    onRowClick: table.props?.onRowClick as (item: T) => void,
    pagination: data.pagination || {
      pageSize: pageSize.pageSize,
      currentPage: entityState.currentPage,
      onPageChange: entityState.setCurrentPage,
      totalItems: data.totalItems,
      totalPages: data.totalPages
    },
    loading: data.isLoading,
    statusFilter: filters.statusFilter,
    emptyStateDescription: filters.activeFiltersCount > 0
      ? "Try adjusting your filters to see more results."
      : `No ${header.title.toLowerCase()} available yet.`,
    managedColumns: entityState.managedColumns,
    ...table.props
  }

  const tableFiltersProps = {
    onFiltersChange: filters.setTableFilters,
    onClearAllFilters: filters.clearAllFilters,
    initialValues: filters.tableFilters,
    totalRecords: data.totalItems,
    hasSelection: selection?.hasSelectedItems || false,
    selectedItems: selection?.selectedItems || [],
    selectedCount: selection?.selectedItems.length || 0,
    onClearSelection: selection?.handleClearSelection || (() => {}),
    status: filters.statusFilter,
    onColumnsChange: handleColumnsChange,
    managedColumns: entityState.managedColumns,
    currentPageSize: pageSize.pageSize,
    onPageSizeChange: handlePageSizeChange,
    availablePageSizes: pageSize.availablePageSizes,
    ...tableFilters.props
  }

  return (
    <div className={containerClassName}>
      {customSections.beforeHeader}

      <PageHeader
        title={header.title}
        description={header.description}
        icon={header.icon}
        primaryAction={header.primaryAction}
        secondaryActions={header.secondaryActions}
      />

      {customSections.afterHeader}

      {customSections.beforeStatusFilters}

      <FilterSection
        statusFilters={statusFilters}
        selectedStatus={filters.statusFilter}
        onStatusChange={filters.setStatusFilter}
        getStatusCount={(status: string) => 
          filters.getStatusCount(status, data.facets || {}, data.totalItems)
        }
        hasSelection={selection?.hasSelectedItems || false}
        selectedCount={selection?.selectedItems.length || 0}
        onClearSelection={selection?.handleClearSelection || (() => {})}
        tableFiltersComponent={tableFilters.component}
        tableFiltersProps={tableFiltersProps}
        beforeStatusFilters={customSections.beforeStatusFilters}
        afterStatusFilters={customSections.afterStatusFilters}
        beforeTableFilters={customSections.beforeTableFilters}
        afterTableFilters={customSections.afterTableFilters}
      />

      {customSections.beforeTable}

      <TableSection
        tableComponent={table.component}
        tableProps={tableProps}
        animationKey={animationKey || filters.statusFilter}
        animationConfig={animationConfig}
      />

      {customSections.afterTable}

      {customSections.beforeSheets}

      {sheets?.length > 0 && sheetsState && (
        <>
          {sheets.map((sheet, index) => {
            const SheetComponent = sheet.component
            const sheetKey = (sheet.props?.sheetKey as string) || `sheet-${index}`
            const sheetState = sheetsState.getSheetProps(sheetKey)
            
            return (
              <SheetComponent
                key={sheetKey}
                isOpen={sheetState?.isOpen || false}
                onClose={sheetState?.onClose || (() => {})}
                entity={sheetState?.entity}
                {...sheet.props}
              />
            )
          })}
        </>
      )}

      {customSections.afterSheets}
    </div>
  )
}