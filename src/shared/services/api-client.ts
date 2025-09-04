import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

class ApiClient {
  private client: AxiosInstance;
  
  constructor(serviceEndpoint: string, axiosConfig?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL: serviceEndpoint,
      timeout: 30000,
      ...axiosConfig,
      headers: {
        'Content-Type': 'application/json',
        ...axiosConfig?.headers,
      },
    });
    
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          const token = localStorage.getItem('auth_token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(this.normalizeError(error));
      }
    );
    
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const normalizedError = this.normalizeError(error);
        
        if (error.response) {
          const { status } = error.response;
          
          if (status === 401) {
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.removeItem('auth_token');
            }
            normalizedError.message = 'Authentication failed. Please log in again.';
          } else if (status === 403) {
            normalizedError.message = 'Access forbidden. You do not have permission to access this resource.';
          } else if (status >= 500) {
            normalizedError.message = 'Server error. Please try again later.';
          }
        } else if (error.request) {
          normalizedError.message = 'Unable to connect to the server. Please check your internet connection.';
        } else {
          normalizedError.message = 'An unexpected error occurred. Please try again.';
        }
        
        return Promise.reject(normalizedError);
      }
    );
  }

  private normalizeError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      status: error.response?.status || 0,
      message: error.message || 'Unknown error occurred',
      data: error.response?.data,
    };
    
    return apiError;
  }
  
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }
  
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }
  
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }
  
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export default ApiClient;
