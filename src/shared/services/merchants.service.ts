import config from '@config/env.config';
import { BaseEntityService } from './base-entity.service';
import { Merchant, ListMerchantsResponse } from '@features/merchants/types/merchants.types';

interface GetMerchantsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  filters?: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  query?: string;
  orgId?: number;
  [key: string]: unknown;
}

interface ApiMerchant {
  id: number;
  orgId: number;
  merchantId: string;
  programId: string | null;
  originCountry: string;
  legalBusinessName: string;
  acceptorName: string;
  mcc: number;
  address: {
    country: string;
    state?: string;
    city: string;
    cityShort: string;
    postCode: string;
    streetAddress: string;
  };
  contactInfo: {
    websiteUrl: string;
    phoneNumber: string;
    customerSupportPhoneNumber: string;
    email: string;
    additional: string;
  };
  merchantVolumeIndicator: string | null;
  taxId: string;
  paymentFacilitatorId: string | null;
  paymentFacilitatorName: string | null;
  visaCpsParticipant: boolean;
  visaMerchantId: string | null;
  mastercardAssignedId: string | null;
  mastercardPartnerIdCode: string | null;
  mastercardMerchantPaymentGatewayId: string | null;
  sponsoredMerchantId: string | null;
  independentSalesOrgId: string | null;
  apiKey: string;
  created: string;
  updated: string;
  guaranteedReservationsParticipant: boolean;
  applePayTRID: string | null;
  checkoutConfigId: string | null;
}

interface ApiMerchantsResponse {
  results: ApiMerchant[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

class MerchantsService extends BaseEntityService<ApiMerchantsResponse, GetMerchantsParams> {
  private readonly defaultOrgId: number;

  constructor() {
    super(config.endpoints.merchants, config.apiKey || '', 300000); // 5 minutes cache for merchants (more stable data)
    this.defaultOrgId = config.defaultOrgId;
  }

  protected buildQueryString(params?: GetMerchantsParams): string {
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

    if (status && status !== 'all' && status !== 'rule_match') {
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

  protected getCacheKey(params?: GetMerchantsParams): string {
    const normalized = {
      page: params?.page ?? 0,
      pageSize: params?.pageSize ?? 20,
      status: params?.status,
      query: params?.query?.trim(),
      sortBy: params?.sortBy ?? 'created',
      sortOrder: params?.sortOrder ?? 'desc',
      orgId: params?.orgId ?? this.defaultOrgId,
      filters: params?.filters
    };
    
    const cleanedParams = Object.fromEntries(
      Object.entries(normalized).filter(([, value]) => value !== undefined)
    );
    
    return JSON.stringify(cleanedParams, Object.keys(cleanedParams).sort());
  }

  private mapApiMerchantToMerchant(apiMerchant: ApiMerchant): Merchant {
    return {
      id: apiMerchant.merchantId,
      name: apiMerchant.acceptorName || apiMerchant.legalBusinessName,
      email: apiMerchant.contactInfo.email,
      status: 'active',
      type: apiMerchant.paymentFacilitatorId ? 'enterprise' : 'business',
      created: new Date(apiMerchant.created),
      lastActivity: new Date(apiMerchant.updated),
      country: apiMerchant.address.country,
      industry: this.getMccDescription(apiMerchant.mcc),
      monthlyVolume: 0,
      riskLevel: 'low',
      verified: true,
      flags: [],
    };
  }

  private getMccDescription(mcc: number): string {
    const mccMap: Record<number, string> = {
      5999: 'Miscellaneous and Specialty Retail Stores',
      5411: 'Grocery Stores and Supermarkets',
      5812: 'Eating Places and Restaurants',
    };
    return mccMap[mcc] || 'Other';
  }

  async getMerchants(params: GetMerchantsParams = {}): Promise<ListMerchantsResponse> {
    const { orgId = this.defaultOrgId } = params;
    const url = `/organizations/${orgId}/accounts${this.buildQueryString(params)}`;
    
    const apiResponse = await this.fetchWithCache(url, params);

    return {
      results: apiResponse.results.map(merchant => this.mapApiMerchantToMerchant(merchant)),
      totalElements: apiResponse.totalCount,
      totalPages: apiResponse.totalPages,
      pageNumber: apiResponse.page,
      pageSize: apiResponse.pageSize,
    };
  }

  async getMerchantById(merchantId: string, orgId: number = this.defaultOrgId): Promise<Merchant> {
    const url = `/organizations/${orgId}/accounts/${merchantId}`;
    
    try {
      // For single merchant, use direct API call instead of cached list response
      const apiMerchant = await this.apiClient.get<ApiMerchant>(url, {
        headers: this.defaultHeaders
      });
      return this.mapApiMerchantToMerchant(apiMerchant);
    } catch (error) {
      this.handleError(error, `fetch merchant ${merchantId}`);
    }
  }
}

export const merchantsService = new MerchantsService();