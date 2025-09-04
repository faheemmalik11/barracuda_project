import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent } from '@shared/components/ui/card'
import { StatusFilterCards } from '@shared/components/ui/status-filter-cards'
import { Download, Plus, Monitor } from 'lucide-react'
import type { ManagedColumn } from '@shared/types/table.types'

import { TerminalTable } from '../components/TerminalTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'

import { useTerminals } from '../hooks'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'


export function TerminalsListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTerminals, setSelectedTerminals] = useState<string[]>([])
  const [managedColumns, setManagedColumns] = useState<ManagedColumn[] | undefined>(undefined)
  const previousFiltersRef = useRef<Record<string, unknown>>({})
  
  const pageSizeSelector = usePageSizeSelector()
  const terminals = useTerminals({ 
    pageSize: pageSizeSelector.pageSize,
    currentPage,
  })

  useEffect(() => {
    const filtersChanged = JSON.stringify(terminals.tableFilters) !== JSON.stringify(previousFiltersRef.current)
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1)
    }
    previousFiltersRef.current = terminals.tableFilters
  }, [terminals.tableFilters, currentPage])

  useEffect(() => {
    setManagedColumns(undefined)
  }, [terminals.statusFilter])

  const handleColumnsChange = useCallback((newColumns: ManagedColumn[]) => {
    setManagedColumns(newColumns)
  }, [])

  const handlePageSizeChange = (newPageSize: number) => {
    pageSizeSelector.setPageSize(newPageSize)
    setCurrentPage(1) // Reset to first page when page size changes
  }

  const clearSelection = () => setSelectedTerminals([])

  const handleExportTerminals = () => {
    terminals.exportTerminals(selectedTerminals)
  }

  const emptyMessage = terminals.activeFiltersCount > 0
    ? "Try adjusting your filters to see more results."
    : "No terminals found."

  const getStatusCountForFilter = (status: string) => {
    if (status === 'all') return terminals.totalItems || 0
    const statusCounts = terminals.facets?.status as Array<{value: string, count: number}> || []
    const statusCount = statusCounts.find(s => s.value === status)
    return statusCount?.count || 0
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Terminals</h1>
            <p className="text-muted-foreground">
              Manage and monitor payment terminals
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportTerminals}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={terminals.createTerminal} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Terminal
          </Button>
        </div>
      </div>

      {/* Status Filter Cards */}
      <StatusFilterCards
        filters={StatusRegistry.getFilters('terminal')}
        selectedStatus={terminals.statusFilter}
        onStatusChange={terminals.setStatusFilter}
        getStatusCount={getStatusCountForFilter}
        hasSelection={selectedTerminals.length > 0}
        selectedCount={selectedTerminals.length}
        onClearSelection={clearSelection}
      />

      {/* Table Filters */}
      <EntityTableFilters
        entity="terminals"
        onFiltersChange={terminals.setTableFilters}
        onClearAllFilters={terminals.clearAllFilters}
        initialValues={terminals.tableFilters}
        totalRecords={terminals.totalItems || 0}
        hasSelection={selectedTerminals.length > 0}
        selectedCount={selectedTerminals.length}
        onClearSelection={clearSelection}
        status={terminals.statusFilter}
        onColumnsChange={handleColumnsChange}
        managedColumns={managedColumns}
        currentPageSize={pageSizeSelector.pageSize}
        onPageSizeChange={handlePageSizeChange}
        availablePageSizes={pageSizeSelector.availablePageSizes}
      />

      {/* Terminal Table */}
      <Card className="border-none shadow-none overflow-hidden rounded-none">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={terminals.statusFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TerminalTable
                terminals={terminals.terminals || []}
                selectedTerminals={selectedTerminals}
                onSelectionChange={setSelectedTerminals}
                onViewTerminal={terminals.viewTerminalDetails}
                pagination={{
                  pageSize: pageSizeSelector.pageSize,
                  currentPage,
                  onPageChange: setCurrentPage,
                  totalItems: terminals.totalItems || 0,
                  totalPages: terminals.totalPages || 0,
                }}
                loading={terminals.isLoading}
                onRestartTerminal={terminals.restartTerminal}
                onConfigureTerminal={terminals.configureTerminal}
                onUpdateStatus={terminals.updateTerminalStatus}
                status={terminals.statusFilter}
                emptyStateDescription={emptyMessage}
                managedColumns={managedColumns}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
