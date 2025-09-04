import ApiClient from './api-client';

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export interface BaseEntityParams {
  page?: number;
  size?: number;
  offset?: number;
  query?: string;
  sortBy?: string;
  [key: string]: unknown;
}

export abstract class BaseEntityService<TResponse, TParams extends BaseEntityParams = BaseEntityParams> {
  protected apiClient: ApiClient;
  protected readonly defaultHeaders: Record<string, string>;
  private requestCache: Map<string, CacheEntry<TResponse>> = new Map();
  private pendingRequests: Map<string, Promise<TResponse>> = new Map();
  
  // Configurable cache settings
  protected readonly CACHE_TTL: number;
  protected readonly STALE_CACHE_TTL: number;
  protected readonly MAX_CACHE_SIZE = 100;

  constructor(baseURL: string, apiKey: string, cacheTTL: number = 120000) {
    this.apiClient = new ApiClient(baseURL);
    this.defaultHeaders = {
      'X-API-Key': apiKey || '',
    };
    this.CACHE_TTL = cacheTTL;
    this.STALE_CACHE_TTL = cacheTTL * 2.5; // 2.5x for stale-while-revalidate
  }

  protected handleError(error: unknown, operation: string): never {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`${this.constructor.name}.${operation}:`, error);
    throw new Error(`Failed to ${operation}: ${message}`);
  }

  private evictOldestCacheEntries(): void {
    if (this.requestCache.size <= this.MAX_CACHE_SIZE) return;
    
    const entries = Array.from(this.requestCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toDelete = entries.slice(0, entries.length - this.MAX_CACHE_SIZE);
    toDelete.forEach(([key]) => this.requestCache.delete(key));
  }

  protected abstract buildQueryString(params?: TParams): string;
  protected abstract getCacheKey(params?: TParams): string;

  protected async fetchWithCache(
    url: string,
    params?: TParams
  ): Promise<TResponse> {
    const cacheKey = this.getCacheKey(params);
    const now = Date.now();
    
    // Check for existing cache entry
    const cached = this.requestCache.get(cacheKey);
    if (cached) {
      const age = now - cached.timestamp;
      
      // Return fresh data immediately
      if (age < this.CACHE_TTL && cached.data) {
        return cached.data;
      }
      
      // For stale data, return immediately but refresh in background
      if (age < this.STALE_CACHE_TTL && cached.data) {
        this.refreshInBackground(cacheKey, url);
        return cached.data;
      }
    }

    // Check for pending request to avoid duplicates
    const pendingRequest = this.pendingRequests.get(cacheKey);
    if (pendingRequest) {
      return pendingRequest;
    }

    // Create new request
    const requestPromise = this.executeRequest(url);
    this.pendingRequests.set(cacheKey, requestPromise);
    
    try {
      const data = await requestPromise;
      
      // Store in cache with timestamp
      this.requestCache.set(cacheKey, {
        timestamp: now,
        data
      });
      
      this.evictOldestCacheEntries();
      return data;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async refreshInBackground(cacheKey: string, url: string): Promise<void> {
    if (this.pendingRequests.has(cacheKey)) return;
    
    try {
      const requestPromise = this.executeRequest(url);
      this.pendingRequests.set(cacheKey, requestPromise);
      
      const data = await requestPromise;
      this.requestCache.set(cacheKey, {
        timestamp: Date.now(),
        data
      });
    } catch (error) {
      console.warn('Background refresh failed:', error);
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async executeRequest(url: string): Promise<TResponse> {
    try {
      return await this.apiClient.get<TResponse>(url, {
        headers: this.defaultHeaders
      });
    } catch (error) {
      this.handleError(error, 'execute request');
    }
  }

}
