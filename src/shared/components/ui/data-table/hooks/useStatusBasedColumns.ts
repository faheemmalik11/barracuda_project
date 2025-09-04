import { useMemo } from 'react'
import type { Column } from '@shared/types/data-table'

export type StatusBasedColumnsConfig<T> = {
  [status: string]: Column<T>[]
}

export type ColumnManagementConfig = {
  id: string
  label: string
  visible: boolean
  required?: boolean
  order?: number
}

export function useStatusBasedColumns<T>(
  status: string,
  columnsConfig: StatusBasedColumnsConfig<T>,
  managedColumns?: ColumnManagementConfig[]
): Column<T>[] {
  return useMemo(() => {
    const baseColumns = columnsConfig[status] || columnsConfig.all || []
    
    if (!managedColumns) {
      return baseColumns
    }

    const columnMap = new Map<string, Column<T>>()
    baseColumns.forEach(col => {
      columnMap.set(col.key, col)
    })

    return managedColumns
      .filter(col => col.visible && columnMap.has(col.id))
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(col => columnMap.get(col.id)!)
      .filter(Boolean)
  }, [status, columnsConfig, managedColumns])
}

export function getAvailableColumnsForStatus<T>(
  status: string,
  columnsConfig: StatusBasedColumnsConfig<T>
): ColumnManagementConfig[] {
  const statusColumns = columnsConfig[status] || columnsConfig.all || []
  
  return statusColumns.map((col, index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: true,
    required: col.key === 'id' || col.key === 'status',
    order: index,
  }))
} 
