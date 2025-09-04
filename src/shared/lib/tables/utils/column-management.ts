import type { Column } from "@shared/types/data-table"

export interface ColumnManagementConfig {
  id: string
  label: string
  visible: boolean
  required?: boolean
  order?: number
}

/**
 * Applies column management configuration to a set of default columns
 * @param defaultColumns - The default columns to filter and reorder
 * @param managedColumns - The column management configuration
 * @returns Filtered and reordered columns
 */
export function applyColumnManagement<T>(
  defaultColumns: Column<T>[],
  managedColumns?: ColumnManagementConfig[]
): Column<T>[] {
  if (!managedColumns?.length) {
    return defaultColumns
  }

  if (!defaultColumns?.length) {
    console.warn('applyColumnManagement: No default columns provided')
    return []
  }

  const columnMap = new Map<string, Column<T>>()
  defaultColumns.forEach(col => {
    if (col?.key) {
      columnMap.set(col.key, col)
    }
  })

  return managedColumns
    .filter(col => col?.visible && col?.id)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(col => columnMap.get(col.id))
    .filter((col): col is Column<T> => Boolean(col))
}