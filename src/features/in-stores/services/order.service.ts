import type { Order } from '../types/order.types';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    orderId: 'ORD-2024-001',
    description: '2x Terminal Pro X1 for Downtown Store',
    status: 'fulfilled',
    totalAmount: 1299.98,
    itemCount: 2,
    orderDate: '2024-01-15',
    expectedDelivery: '2024-01-25',
    priority: 'high',
    store: 'Downtown Location',
    customer: 'Downtown Store Manager',
    lastUpdated: '2024-01-20T14:30:00Z',
    trackingNumber: 'FX123456789',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-002',
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
    id: 'ORD-003',
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
    id: 'ORD-004',
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
    id: 'ORD-005',
    orderId: 'ORD-2024-005',
    description: '2x Card Reader Modules',
    status: 'returned',
    totalAmount: 199.98,
    itemCount: 2,
    orderDate: '2024-01-10',
    expectedDelivery: '2024-01-20',
    priority: 'medium',
    store: 'Downtown Location',
    customer: 'Downtown Store Manager',
    lastUpdated: '2024-01-25T13:10:00Z',
    trackingNumber: 'FX987654321',
    paymentStatus: 'refunded'
  }
];

export class OrderService {
  static async getOrders(filters?: {
    status?: string;
    priority?: string;
    store?: string;
    search?: string;
  }): Promise<Order[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...mockOrders];
    
    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }
    
    if (filters?.priority && filters.priority !== 'all') {
      filtered = filtered.filter(order => order.priority === filters.priority);
    }
    
    if (filters?.store) {
      filtered = filtered.filter(order => 
        order.store?.toLowerCase().includes(filters.store!.toLowerCase())
      );
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(search) ||
        order.description.toLowerCase().includes(search) ||
        order.store?.toLowerCase().includes(search) ||
        order.customer?.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }
  
  static async getOrderById(id: string): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockOrders.find(order => order.id === id) || null;
  }
  
  static async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const order = mockOrders.find(o => o.id === id);
    if (order) {
      order.status = status;
      order.lastUpdated = new Date().toISOString();
    }
    return order!;
  }
  
  static async cancelOrder(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const order = mockOrders.find(o => o.id === id);
    if (order) {
      order.status = 'cancelled';
      order.lastUpdated = new Date().toISOString();
      order.paymentStatus = 'refunded';
    }
  }
  
  static async returnOrder(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const order = mockOrders.find(o => o.id === id);
    if (order) {
      order.status = 'returned';
      order.lastUpdated = new Date().toISOString();
      order.paymentStatus = 'refunded';
    }
  }
}
