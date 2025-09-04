import { mockRefunds } from '@shared/data/mockRefunds';
import type { Refund } from '@shared/types/refunds';
import type { EntityFacets } from '@shared/types/status-filter.types';
import { STATUS_REGISTRY } from '@shared/lib/filters/status-registry';

interface GetRefundsParams {
  page?: number;
  pageSize?: number;
  statusFilter?: string;
  status?: string;
  filters?: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  query?: string;
}

interface ListRefundsResponse {
  data: Refund[];
  total: number;
  totalPages: number;
  facets?: EntityFacets;
}

interface CreateRefundRequest {
  paymentId: string;
  amount: number;
  reason?: string;
}

interface CreateRefundResponse {
  refund: Refund;
  success: boolean;
}

interface ProcessRefundResponse {
  success: boolean;
  refund: Refund;
}

interface CancelRefundResponse {
  success: boolean;
  refund: Refund;
}

interface RetryRefundResponse {
  success: boolean;
  refund: Refund;
}

interface ExportRefundsResponse {
  success: boolean;
  url?: string;
}

class RefundsService {
  private applyFilters(data: Refund[], params: GetRefundsParams): Refund[] {
    let filtered = data;

    // Handle status filtering using STATUS_REGISTRY mappings like other entities
    const statusFilterParam = params.statusFilter || params.status;
    
    if (statusFilterParam && statusFilterParam !== 'all') {
      // Get the mapped status values from the registry
      const statusMappings = STATUS_REGISTRY.refund.mappings;
      const mappedStatuses = statusMappings[statusFilterParam as keyof typeof statusMappings] || [statusFilterParam];
      
      filtered = filtered.filter(refund => 
        (mappedStatuses as readonly string[]).includes(refund.status)
      );
    }

    // Handle complex filters (array-based status filters from advanced filtering)
    if (params.filters?.status && Array.isArray(params.filters.status) && params.filters.status.length > 0) {
      filtered = filtered.filter(refund => (params.filters!.status as string[]).includes(refund.status));
    }

    // Handle search query
    if (params.query?.trim()) {
      const searchTerm = params.query.toLowerCase().trim();
      filtered = filtered.filter(refund =>
        refund.id.toLowerCase().includes(searchTerm) ||
        refund.paymentId.toLowerCase().includes(searchTerm) ||
        refund.customer.name.toLowerCase().includes(searchTerm) ||
        refund.customer.email.toLowerCase().includes(searchTerm) ||
        refund.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  private calculateFacets(data: Refund[]): EntityFacets {
    const statusCounts = data.reduce((acc, refund) => {
      const status = refund.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const statusFacets = Object.entries(statusCounts).map(([value, count]) => ({
      value,
      count
    }));

    return { status: statusFacets };
  }

  async getRefundsForNavigation(page: number, params: GetRefundsParams = {}): Promise<ListRefundsResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Start with all refunds
      let allRefunds = [...mockRefunds];

      // Calculate facets from ALL data for consistent status counts
      const allDataFacets = this.calculateFacets(allRefunds);

      // Apply filters for the actual results
      const filteredData = this.applyFilters(allRefunds, params);

      // Sort the results
      const sortBy = params.sortBy || 'created';
      const sortOrder = params.sortOrder || 'desc';
      
      filteredData.sort((a, b) => {
        let aValue: any = a[sortBy as keyof Refund];
        let bValue: any = b[sortBy as keyof Refund];

        // Handle nested customer fields
        if (sortBy.includes('customer.')) {
          const field = sortBy.split('.')[1];
          aValue = a.customer[field as keyof typeof a.customer];
          bValue = b.customer[field as keyof typeof b.customer];
        }

        // Convert to comparable values
        if (aValue instanceof Date) aValue = aValue.getTime();
        if (bValue instanceof Date) bValue = bValue.getTime();
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      // Pagination
      const pageNumber = page - 1; // Convert to 0-based
      const pageSize = params.pageSize || 20;
      const total = filteredData.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = pageNumber * pageSize;
      const end = start + pageSize;
      const data = filteredData.slice(start, end);

      return {
        data,
        total,
        totalPages,
        facets: allDataFacets
      };
    } catch (error) {
      console.error('Error in getRefundsForNavigation:', error);
      throw new Error('Failed to fetch refunds');
    }
  }

  async createRefund(request: CreateRefundRequest): Promise<CreateRefundResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newRefund: Refund = {
        id: `re_${Date.now()}`,
        paymentId: request.paymentId,
        amount: request.amount,
        currency: 'USD',
        status: 'pending',
        reason: request.reason || 'requested_by_customer',
        created: new Date(),
        lastUpdated: new Date(),
        customer: {
          id: `cus_${Date.now()}`,
          name: 'New Customer',
          email: 'customer@example.com'
        },
        paymentMethod: 'Credit Card ••••1234',
        description: 'New refund request',
        fee: 0,
        net: -request.amount,
        transactionId: `txn_refund_${Date.now()}`,
        processingTime: 0
      };

      return {
        refund: newRefund,
        success: true
      };
    } catch (error) {
      console.error('Error creating refund:', error);
      throw new Error('Failed to create refund');
    }
  }

  async processRefund(refundId: string): Promise<ProcessRefundResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const refund = mockRefunds.find(r => r.id === refundId);
      if (!refund) {
        throw new Error('Refund not found');
      }

      const processedRefund = {
        ...refund,
        status: 'succeeded' as const,
        lastUpdated: new Date()
      };

      return {
        success: true,
        refund: processedRefund
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }

  async cancelRefund(refundId: string): Promise<CancelRefundResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const refund = mockRefunds.find(r => r.id === refundId);
      if (!refund) {
        throw new Error('Refund not found');
      }

      const canceledRefund = {
        ...refund,
        status: 'canceled' as const,
        lastUpdated: new Date()
      };

      return {
        success: true,
        refund: canceledRefund
      };
    } catch (error) {
      console.error('Error canceling refund:', error);
      throw new Error('Failed to cancel refund');
    }
  }

  async retryRefund(refundId: string): Promise<RetryRefundResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const refund = mockRefunds.find(r => r.id === refundId);
      if (!refund) {
        throw new Error('Refund not found');
      }

      const retriedRefund = {
        ...refund,
        status: 'pending' as const,
        lastUpdated: new Date()
      };

      return {
        success: true,
        refund: retriedRefund
      };
    } catch (error) {
      console.error('Error retrying refund:', error);
      throw new Error('Failed to retry refund');
    }
  }

  async exportRefunds(_refundIds: string[]): Promise<ExportRefundsResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate export URL generation
      const exportUrl = `/exports/refunds/${Date.now()}.csv`;

      return {
        success: true,
        url: exportUrl
      };
    } catch (error) {
      console.error('Error exporting refunds:', error);
      throw new Error('Failed to export refunds');
    }
  }
}

export const refundsService = new RefundsService();