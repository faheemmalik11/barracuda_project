import { useState, useCallback } from 'react';
import type { OrderFilters } from '../types/order.types';

export function useOrderFilters() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  });

  const filters: OrderFilters = {
    status: statusFilter,
    priority: priorityFilter,
    store: storeFilter,
    orderDate: '',
    search: searchQuery,
    dateRange
  };

  const updateStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const updatePriorityFilter = useCallback((priority: string) => {
    setPriorityFilter(priority);
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
    setPriorityFilter('all');
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
    priorityFilter,
    storeFilter,
    searchQuery,
    dateRange,
    updateStatusFilter,
    updatePriorityFilter,
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
