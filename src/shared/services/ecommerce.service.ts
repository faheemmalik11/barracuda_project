import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types';

// Mock data for ecommerce configurations
const mockEcommerceData: Ecommerce[] = [
  {
    id: 'ecom_1',
    transactionRef: 'txn_ecom_1_ref',
    name: 'Main Store Checkout',
    status: 'active',
    type: 'hosted_checkout',
    environment: 'live',
    description: 'Primary checkout flow for main store',
    transactions30d: 1250,
    volume30d: 125000,
    successRate: 98.5,
    lastUsed: '2024-01-15T10:30:00Z',
    created: '2023-06-15T09:00:00Z'
  },
  {
    id: 'ecom_2',
    transactionRef: 'txn_ecom_2_ref',
    name: 'Mobile App API',
    status: 'active',
    type: 'api',
    environment: 'live',
    description: 'API integration for mobile application',
    transactions30d: 890,
    volume30d: 67500,
    successRate: 97.2,
    lastUsed: '2024-01-14T16:45:00Z',
    created: '2023-08-20T14:30:00Z'
  },
  {
    id: 'ecom_3',
    transactionRef: 'txn_ecom_3_ref',
    name: 'Test Environment',
    status: 'active',
    type: 'elements',
    environment: 'test',
    description: 'Testing configuration for new features',
    transactions30d: 45,
    volume30d: 2250,
    successRate: 95.6,
    lastUsed: '2024-01-12T11:20:00Z',
    created: '2024-01-01T10:00:00Z'
  },
  {
    id: 'ecom_4',
    transactionRef: 'txn_ecom_4_ref',
    name: 'Legacy Drops',
    status: 'inactive',
    type: 'drops',
    environment: 'live',
    description: 'Legacy drop-in payment solution',
    transactions30d: 0,
    volume30d: 0,
    successRate: 0,
    lastUsed: '2023-12-20T08:15:00Z',
    created: '2023-03-10T12:00:00Z'
  },
  {
    id: 'ecom_5',
    transactionRef: 'txn_ecom_5_ref',
    name: 'Subscription Portal',
    status: 'active',
    type: 'hosted_checkout',
    environment: 'live',
    description: 'Recurring payment checkout for subscriptions',
    transactions30d: 320,
    volume30d: 48000,
    successRate: 99.1,
    lastUsed: '2024-01-15T09:15:00Z',
    created: '2023-09-05T11:30:00Z'
  }
];

export const ecommerceService = {
  async getEcommerceForNavigation(filters?: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = [...mockEcommerceData];
    
    if (filters?.status && filters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }
    
    if (filters?.type && filters.type !== 'all') {
      filteredData = filteredData.filter(item => item.type === filters.type);
    }
    
    if (filters?.environment && filters.environment !== 'all') {
      filteredData = filteredData.filter(item => item.environment === filters.environment);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }
    
    return {
      data: filteredData,
      total: filteredData.length,
      page: 1,
      pageSize: 50
    };
  },

  async getSingleEcommerce(id: string): Promise<Ecommerce | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const ecommerce = mockEcommerceData.find(item => item.id === id);
    return ecommerce || null;
  },

  async updateEcommerceStatus(id: string, status: 'active' | 'inactive') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockEcommerceData.findIndex(item => item.id === id);
    if (index !== -1) {
      mockEcommerceData[index].status = status;
      return mockEcommerceData[index];
    }
    throw new Error('Ecommerce configuration not found');
  }
};
