import ApiClient from './api-client';
import config from '@config/env.config';
import { CheckoutConfig } from '@shared/types/checkout-config';

interface CheckoutConfigServiceError extends Error {
  status?: number;
  code?: string;
}

class CheckoutConfigService {
  private apiClient: ApiClient;
  private readonly defaultHeaders: Record<string, string>;

  constructor() {
    this.apiClient = new ApiClient(config.endpoints.merchants);
    this.defaultHeaders = {
      'X-API-Key': config.apiKey || '',
    };
  }

  private buildUrl(orgId: number, merchantId: string, configId?: string): string {
    const basePath = `organizations/${orgId}/accounts/${merchantId}/checkout-configs`;
    return configId ? `${basePath}/${configId}` : basePath;
  }

  private handleError(error: unknown, operation: string): never {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const serviceError: CheckoutConfigServiceError = new Error(`Failed to ${operation}: ${message}`);
    
    if (error && typeof error === 'object' && 'status' in error) {
      serviceError.status = error.status as number;
    }
    
    console.error(`CheckoutConfigService.${operation}:`, error);
    throw serviceError;
  }

  async getCheckoutConfig(orgId: number, merchantId: string, configId: string): Promise<CheckoutConfig> {
    const url = this.buildUrl(orgId, merchantId, configId);
    
    try {
      return await this.apiClient.get<CheckoutConfig>(url, {
        headers: this.defaultHeaders,
      });
    } catch (error) {
      this.handleError(error, 'fetch checkout configuration');
    }
  }

  async createCheckoutConfig(orgId: number, merchantId: string, checkoutConfig: Partial<CheckoutConfig>): Promise<CheckoutConfig> {
    const url = this.buildUrl(orgId, merchantId);
    
    try {
      return await this.apiClient.post<CheckoutConfig>(url, checkoutConfig, {
        headers: this.defaultHeaders,
      });
    } catch (error) {
      this.handleError(error, 'create checkout configuration');
    }
  }

  async updateCheckoutConfig(orgId: number, merchantId: string, configId: string, checkoutConfig: Partial<CheckoutConfig>): Promise<CheckoutConfig> {
    const url = this.buildUrl(orgId, merchantId, configId);
    
    try {
      return await this.apiClient.put<CheckoutConfig>(url, checkoutConfig, {
        headers: this.defaultHeaders,
      });
    } catch (error) {
      this.handleError(error, 'update checkout configuration');
    }
  }

  async deleteCheckoutConfig(orgId: number, merchantId: string, configId: string): Promise<void> {
    const url = this.buildUrl(orgId, merchantId, configId);
    
    try {
      await this.apiClient.delete<void>(url, {
        headers: this.defaultHeaders,
      });
    } catch (error) {
      this.handleError(error, 'delete checkout configuration');
    }
  }
}

export const checkoutConfigService = new CheckoutConfigService();
