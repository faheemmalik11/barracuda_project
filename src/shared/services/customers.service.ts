import config from '@config/env.config';
import { BaseEntityService } from './base-entity.service';
import { mockCustomers } from '@shared/data/mockCustomers';
import type { Customer } from '@shared/types/customers';
import type { EntityFacets } from '@shared/types/status-filter.types';
import { createQueryUtils } from '@shared/utils/query/createQueryUtils';
import { CUSTOMER_QUERY_CONFIG, type CustomerQueryFilters } from '@shared/utils/query/configs';

interface GetCustomersParams {
  page?: number;
  pageSize?: number;
  status?: string;
  filters?: CustomerQueryFilters;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  query?: string;
  [key: string]: unknown;
}

interface ListCustomersResponse {
  results: Customer[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  facets?: EntityFacets;
}

class CustomersService extends BaseEntityService<ListCustomersResponse, GetCustomersParams> {
  private queryUtils = createQueryUtils(CUSTOMER_QUERY_CONFIG);

  constructor() {
    super(config.endpoints.warehouse || '', config.apiKey || '', 180000); // 3 minutes cache for customers
  }

  protected buildQueryString(params?: GetCustomersParams): string {
    if (!params) return '';
    
    const {
      page = 0,
      pageSize = 20,
      status,
      filters = {},
      sortBy = 'created',
      sortOrder = 'desc',
      query
    } = params;

    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('size', pageSize.toString());
    queryParams.append('sort', `${sortBy},${sortOrder}`);

    if (status && status !== 'all') {
      queryParams.append('status', status);
    }

    if (query && query.trim()) {
      queryParams.append('query', query.trim());
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value != null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  protected getCacheKey(params?: GetCustomersParams): string {
    const normalized = {
      page: params?.page ?? 0,
      pageSize: params?.pageSize ?? 20,
      status: params?.status,
      query: params?.query?.trim(),
      sortBy: params?.sortBy ?? 'created',
      sortOrder: params?.sortOrder ?? 'desc',
      filters: params?.filters
    };
    
    const cleanedParams = Object.fromEntries(
      Object.entries(normalized).filter(([, value]) => value !== undefined)
    );
    
    return JSON.stringify(cleanedParams, Object.keys(cleanedParams).sort());
  }

  private transformDateField(value: string | Date | undefined): Date | undefined {
    if (!value) return undefined;
    return typeof value === 'string' ? new Date(value) : value;
  }

  private transformCustomer(customer: Customer): Customer {
    return {
      ...customer,
      created: this.transformDateField(customer.created) || new Date(),
      lastPayment: this.transformDateField(customer.lastPayment),
      lastActivity: this.transformDateField(customer.lastActivity),
      restricted: this.transformDateField(customer.restricted),
      terminated: this.transformDateField(customer.terminated),
    };
  }

  private applyFilters(data: Customer[], params: GetCustomersParams): Customer[] {
    let filtered = data;

    // Handle status filtering - consolidate logic
    const statusFilter = params.filters?.status || (params.status && params.status !== 'all' ? [params.status] : null);
    if (statusFilter && Array.isArray(statusFilter) && statusFilter.length > 0) {
      filtered = filtered.filter(customer => statusFilter.includes(customer.status));
    }

    // Handle search query
    if (params.query?.trim()) {
      const searchTerm = params.query.toLowerCase().trim();
      filtered = filtered.filter(customer =>
        [customer.name, customer.email, customer.id]
          .some(field => field.toLowerCase().includes(searchTerm))
      );
    }

    // Handle risk level filter
    if (params.filters?.riskLevel?.length) {
      filtered = filtered.filter(customer =>
        customer.riskLevel && params.filters?.riskLevel?.includes(customer.riskLevel)
      );
    }

    // Handle verified filter
    if (params.filters?.verified !== undefined) {
      filtered = filtered.filter(customer => customer.verified === params.filters.verified);
    }

    return filtered;
  }

  private calculateFacets(data: Customer[]): EntityFacets {
    const statusCounts = data.reduce((acc, customer) => {
      const status = customer.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const statusFacets = Object.entries(statusCounts).map(([value, count]) => ({
      value,
      count
    }));

    return { status: statusFacets };
  }

  async getCustomers(params: GetCustomersParams = {}): Promise<ListCustomersResponse> {
    const transformedData = mockCustomers.map(customer => this.transformCustomer(customer));
    
    // Calculate facets from ALL data for consistent status counts
    const allDataFacets = this.calculateFacets(transformedData);
    
    // Apply filters for the actual results
    const filteredData = this.applyFilters(transformedData, params);
    
    // Apply pagination
    const pageSize = params.pageSize || 20;
    const startIndex = (params.page || 0) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    return {
      results: paginatedData,
      totalElements: filteredData.length,
      totalPages: Math.ceil(filteredData.length / pageSize),
      pageNumber: params.page || 0,
      pageSize,
      facets: allDataFacets
    };
  }

  getCustomersForNavigation = async (
    page: number,
    filters: { pageSize?: number; statusFilter?: string; query?: string }
  ): Promise<{ data: Customer[]; total: number; facets?: EntityFacets }> => {
    // Parse the query string to get actual filter values
    const parsedFilters = filters.query ? this.queryUtils.parseQueryStringToFilters(filters.query) : {};
    
    const params: GetCustomersParams = {
      page: page - 1,
      pageSize: filters.pageSize || 20,
      filters: parsedFilters,
    };

    // Legacy status filter handling (for backward compatibility)
    if (filters.statusFilter && filters.statusFilter !== 'all' && !parsedFilters.status) {
      params.status = filters.statusFilter;
    }

    const response = await this.getCustomers(params);

    return {
      data: response.results,
      total: response.totalElements,
      facets: response.facets,
    };
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
      throw new Error(`Customer ${customerId} not found`);
    }

    return this.transformCustomer(customer);
  }
}

export const customersService = new CustomersService();