import { useState, useCallback } from 'react';
import type { InventoryFilters } from '../types/inventory.types';

export function useInventoryFilters() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  });

  const filters: InventoryFilters = {
    status: statusFilter,
    model: modelFilter,
    store: storeFilter,
    ordered: '',
    search: searchQuery,
    dateRange
  };

  const updateStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const updateModelFilter = useCallback((model: string) => {
    setModelFilter(model);
  }, []);

  const updateStoreFilter = useCallback((store: string) => {
    setStoreFilter(store);
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const updateDateRange = useCallback((range: { from: Date | null; to: Date | null }) => {
    setDateRange(range);
  }, []);

  const clearFilters = useCallback(() => {
    setStatusFilter('all');
    setModelFilter('all');
    setStoreFilter('all');
    setSearchQuery('');
    setDateRange({ from: null, to: null });
  }, []);

  const getStatusCount = useCallback((status: string, _facets: any, totalItems: number) => {
    if (status === 'all') return totalItems;
    return 0;
  }, []);

  return {
    filters,
    statusFilter,
    setStatusFilter: updateStatusFilter,
    modelFilter,
    storeFilter,
    searchQuery,
    dateRange,
    updateStatusFilter,
    updateModelFilter,
    updateStoreFilter,
    updateSearchQuery,
    updateDateRange,
    clearFilters,
    getStatusCount,
    // Required by UseFiltersHook interface
    tableFilters: {},
    setTableFilters: () => {},
    clearAllFilters: clearFilters,
    activeFiltersCount: 0
  };
}
