import { useState, useCallback, useMemo } from 'react';
import { useDebounce } from '@shared/utils/hooks/useDebounce';
import { mockTerminals } from '@shared/data/mockTerminals';

export function useTerminalFilters() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [tableFilters, setTableFilters] = useState<Record<string, unknown>>({});

  const debouncedTableFilters = useDebounce(tableFilters, 300);

  const updateStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
    // Clear table filters when changing status
    if (status === 'all') {
      setTableFilters({});
    }
  }, []);

  const updateTableFilters = useCallback((newFilters: Record<string, unknown>) => {
    setTableFilters(newFilters);
    // If there are non-status filters, clear status filter
    const hasNonStatusFilters = Object.entries(newFilters)
      .filter(([key]) => key !== 'status')
      .some(([, value]) => {
        if (value == null || value === '') return false;
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
        return true;
      });
    
    if (hasNonStatusFilters && statusFilter !== '') {
      setStatusFilter('');
    }
  }, [statusFilter]);

  const clearAllFilters = useCallback(() => {
    setStatusFilter('all');
    setTableFilters({});
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (statusFilter && statusFilter !== 'all') count++;
    count += Object.values(tableFilters).filter(value => {
      if (!value || value === 'all' || value === '') return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
      return true;
    }).length;
    return count;
  }, [statusFilter, tableFilters]);

  const getStatusCount = useCallback((status: string) => {
    if (status === 'all') return mockTerminals.length;
    const statusCounts = mockTerminals.reduce((acc, terminal) => {
      acc[terminal.status] = (acc[terminal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return statusCounts[status] || 0;
  }, []);

  return {
    statusFilter,
    setStatusFilter: updateStatusFilter,
    tableFilters: debouncedTableFilters,
    setTableFilters: updateTableFilters,
    clearAllFilters,
    activeFiltersCount,
    getStatusCount
  };
}
