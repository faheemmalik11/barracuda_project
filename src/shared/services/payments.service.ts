import config from '@config/env.config';
import { BaseEntityService } from './base-entity.service';
import { 
  transactionToPayment, 
  transformBackendFacetsToPaymentFacets 
} from '@features/payments/utils/paymentTransformers';
import type { Payment } from '@features/payments/types/payments.types';
import type { EntityFacets } from '@shared/types/status-filter.types';
import type {
  ListTransactionsResponse,
  Transaction,
  TransactionListParams,
  TransactionState
} from '../types/payment.types';

interface TransactionQueryParams extends TransactionListParams {
  query?: string;
  sortBy?: string;
  offset?: number;
  facets?: string;
  [key: string]: unknown;
}

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_SORT = '-date';
const DEFAULT_FACETS = 'status,type';

class PaymentsService extends BaseEntityService<ListTransactionsResponse, TransactionQueryParams> {
  constructor() {
    super(config.endpoints.warehouse, config.apiKey || '', 120000);
  }

  protected getCacheKey(params?: TransactionQueryParams): string {
    if (!params) return 'transactions:default';
    
    const keyParts = ['transactions'];
    const pageSize = params.size || DEFAULT_PAGE_SIZE;
    const offset = params.page !== undefined ? params.page * pageSize : params.offset || 0;
    
    keyParts.push(
      `offset:${offset}`,
      `size:${pageSize}`,
      `sort:${params.sortBy || DEFAULT_SORT}`,
      `facets:${params.facets || DEFAULT_FACETS}`
    );
    
    if (params.state) keyParts.push(`state:${params.state}`);
    if (params.query?.trim()) keyParts.push(`query:${params.query.trim()}`);
    
    return keyParts.join(':');
  }

  protected buildQueryString(params?: TransactionQueryParams): string {
    if (!params) return '';
    
    const queryParams = new URLSearchParams();
    const pageSize = params.size || DEFAULT_PAGE_SIZE;
    const offset = params.page !== undefined ? params.page * pageSize : params.offset || 0;
    
    queryParams.append('facets', params.facets || DEFAULT_FACETS);
    queryParams.append('sortBy', params.sortBy || DEFAULT_SORT);
    queryParams.append('offset', offset.toString());
    queryParams.append('size', pageSize.toString());
    
    if (params.state) queryParams.append('state', params.state);
    if (params.query?.trim()) queryParams.append('query', params.query.trim());
    
    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }
  
  getTransactions = async (params?: TransactionQueryParams): Promise<ListTransactionsResponse> => {
    const queryString = this.buildQueryString(params);
    const url = `/organizations/14791296/accounts/1000000/transactions${queryString}`;
    return this.fetchWithCache(url, params);
  }

  getSingleTransaction = async (transactionRef: string): Promise<Transaction> => {
    const url = `/organizations/14791296/accounts/1000000/transactions/${transactionRef}`;
    const response = await this.apiClient.get<Transaction>(url, {
      headers: this.defaultHeaders
    });
    return response;
  }

  getPaymentsForNavigation = async (
    page: number,
    filters: { pageSize?: number; statusFilter?: string; query?: string }
  ): Promise<{ data: Payment[]; total: number; facets?: EntityFacets }> => {
    const params: TransactionQueryParams = {
      page: page - 1,
      size: filters.pageSize || DEFAULT_PAGE_SIZE,
    };

    if (filters.statusFilter && filters.statusFilter !== 'all') {
      params.state = filters.statusFilter as TransactionState;
    }

    if (filters.query?.trim()) {
      params.query = filters.query.trim();
    }

    const response = await this.getTransactions(params);
    if (!response) throw new Error('No response received from server');

    return {
      data: response.results?.map(transactionToPayment) || [],
      total: response.totalElements || 0,
      facets: response.facets ? transformBackendFacetsToPaymentFacets(response.facets) : undefined,
    };
  }

}

export const paymentsService = new PaymentsService();