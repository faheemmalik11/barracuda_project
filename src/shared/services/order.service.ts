import type { Order } from '@features/in-stores/types/order.types';

// Mock data for orders
const mockOrderData: Order[] = [
  {
    id: 'ord_001',
    transactionRef: 'txn_ord_001_ref',
    orderId: 'ORD-2024-001',
    description: '2x Terminal Pro X1 for Downtown Store',
    status: 'fulfilled',
    totalAmount: 1299.98,
    itemCount: 2,
    orderDate: '2024-01-15',
    expectedDelivery: '2024-01-25',
    priority: 'high',
    store: 'Downtown Store',
    customer: 'Downtown Store Manager',
    lastUpdated: '2024-01-20T14:30:00Z',
    trackingNumber: 'FX123456789',
    paymentStatus: 'paid'
  },
  {
    id: 'ord_002',
    transactionRef: 'txn_ord_002_ref',
    orderId: 'ORD-2024-002',
    description: '1x Clover Mini + Accessories',
    status: 'pending',
    totalAmount: 599.99,
    itemCount: 3,
    orderDate: '2024-01-18',
    expectedDelivery: '2024-01-28',
    priority: 'medium',
    store: 'Mall Location',
    customer: 'Mall Store Manager',
    lastUpdated: '2024-01-18T09:15:00Z',
    paymentStatus: 'paid'
  },
  {
    id: 'ord_003',
    transactionRef: 'txn_ord_003_ref',
    orderId: 'ORD-2024-003',
    description: '3x Clover Flex Mobile Units',
    status: 'confirmed',
    totalAmount: 1799.97,
    itemCount: 3,
    orderDate: '2024-01-20',
    expectedDelivery: '2024-01-30',
    priority: 'high',
    store: 'Airport Location',
    customer: 'Airport Store Manager',
    lastUpdated: '2024-01-21T11:45:00Z',
    paymentStatus: 'paid'
  },
  {
    id: 'ord_004',
    transactionRef: 'txn_ord_004_ref',
    orderId: 'ORD-2024-004',
    description: '1x Terminal Replacement Unit',
    status: 'cancelled',
    totalAmount: 649.99,
    itemCount: 1,
    orderDate: '2024-01-12',
    expectedDelivery: '2024-01-22',
    priority: 'low',
    store: 'Warehouse',
    customer: 'Warehouse Manager',
    lastUpdated: '2024-01-14T16:20:00Z',
    paymentStatus: 'refunded'
  },
  {
    id: 'ord_005',
    transactionRef: 'txn_ord_005_ref',
    orderId: 'ORD-2024-005',
    description: '2x Card Reader Modules',
    status: 'returned',
    totalAmount: 199.98,
    itemCount: 2,
    orderDate: '2024-01-10',
    expectedDelivery: '2024-01-20',
    priority: 'medium',
    store: 'Downtown Store',
    customer: 'Downtown Store Manager',
    lastUpdated: '2024-01-25T13:10:00Z',
    trackingNumber: 'FX987654321',
    paymentStatus: 'refunded'
  }
];

export const orderService = {
  async getOrdersForNavigation(filters?: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = [...mockOrderData];
    
    if (filters?.status && filters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }
    
    if (filters?.priority && filters.priority !== 'all') {
      filteredData = filteredData.filter(item => item.priority === filters.priority);
    }
    
    if (filters?.store && filters.store !== 'all') {
      filteredData = filteredData.filter(item => item.store === filters.store);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.orderId.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.store?.toLowerCase().includes(searchLower) ||
        item.customer?.toLowerCase().includes(searchLower)
      );
    }
    
    return {
      data: filteredData,
      total: filteredData.length,
      page: 1,
      pageSize: 50
    };
  },

  async getSingleOrder(id: string): Promise<Order | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const order = mockOrderData.find(item => item.id === id);
    return order || null;
  },

  async updateOrderStatus(id: string, status: Order['status']) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockOrderData.findIndex(item => item.id === id);
    if (index !== -1) {
      mockOrderData[index].status = status;
      mockOrderData[index].lastUpdated = new Date().toISOString();
      return mockOrderData[index];
    }
    throw new Error('Order not found');
  }
};
