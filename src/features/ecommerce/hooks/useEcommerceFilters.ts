import { useState, useCallback } from 'react';
import type { EcommerceFilters } from '../types/ecommerce.types';

export function useEcommerceFilters() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  });

  const filters: EcommerceFilters = {
    status: statusFilter,
    type: typeFilter,
    environment: environmentFilter,
    search: searchQuery,
    dateRange
  };

  const updateStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const updateTypeFilter = useCallback((type: string) => {
    setTypeFilter(type);
  }, []);

  const updateEnvironmentFilter = useCallback((environment: string) => {
    setEnvironmentFilter(environment);
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const updateDateRange = useCallback((range: { from: Date | null; to: Date | null }) => {
    setDateRange(range);
  }, []);

  const clearFilters = useCallback(() => {
    setStatusFilter('all');
    setTypeFilter('all');
    setEnvironmentFilter('all');
    setSearchQuery('');
    setDateRange({ from: null, to: null });
  }, []);

  const getStatusCount = useCallback((status: string, _facets: any, totalItems: number) => {
    // For now, return totalItems for 'all' and 0 for others
    // This can be enhanced with actual facet data when available
    if (status === 'all') return totalItems;
    return 0;
  }, []);

  return {
    filters,
    statusFilter,
    setStatusFilter: updateStatusFilter,
    typeFilter,
    environmentFilter,
    searchQuery,
    dateRange,
    updateStatusFilter,
    updateTypeFilter,
    updateEnvironmentFilter,
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
