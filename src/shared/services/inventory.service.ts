import type { Inventory } from '@features/in-stores/types/inventory.types';

// Mock data for inventory items
const mockInventoryData: Inventory[] = [
  {
    id: 'inv_001',
    transactionRef: 'txn_inv_001_ref',
    model: 'Terminal Pro X1',
    serialNumber: 'TPX1-2024-001',
    store: 'Downtown Store',
    order: 'ORD-2024-001',
    ordered: '2024-01-15T10:00:00Z',
    fulfilled: '2024-01-20T14:30:00Z',
    status: 'active',
    location: 'Counter 1',
    lastActivity: '2024-01-28T16:45:00Z',
    firmwareVersion: '2.1.4',
    batteryLevel: 85,
    connectionStatus: 'online'
  },
  {
    id: 'inv_002',
    transactionRef: 'txn_inv_002_ref',
    model: 'Terminal Lite V2',
    serialNumber: 'TLV2-2024-002',
    store: 'Mall Location',
    order: 'ORD-2024-002',
    ordered: '2024-01-16T09:30:00Z',
    fulfilled: '2024-01-22T11:15:00Z',
    status: 'inactive',
    location: 'Storage',
    lastActivity: '2024-01-25T12:20:00Z',
    firmwareVersion: '1.8.2',
    batteryLevel: 45,
    connectionStatus: 'offline'
  },
  {
    id: 'inv_003',
    transactionRef: 'txn_inv_003_ref',
    model: 'Terminal Pro X1',
    serialNumber: 'TPX1-2024-003',
    store: 'Airport Branch',
    order: 'ORD-2024-003',
    ordered: '2024-01-18T14:20:00Z',
    fulfilled: '2024-01-24T10:45:00Z',
    status: 'active',
    location: 'Gate A12',
    lastActivity: '2024-01-29T08:30:00Z',
    firmwareVersion: '2.1.4',
    batteryLevel: 92,
    connectionStatus: 'online'
  },
  {
    id: 'inv_004',
    transactionRef: 'txn_inv_004_ref',
    model: 'Terminal Compact',
    serialNumber: 'TC-2024-004',
    store: 'Food Court',
    order: 'ORD-2024-004',
    ordered: '2024-01-20T11:00:00Z',
    fulfilled: '2024-01-26T15:20:00Z',
    status: 'pending',
    location: 'Kiosk 3',
    lastActivity: '2024-01-28T19:15:00Z',
    firmwareVersion: '1.5.1',
    batteryLevel: 67,
    connectionStatus: 'online'
  }
];

export const inventoryService = {
  async getInventoryForNavigation(filters?: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = [...mockInventoryData];
    
    if (filters?.status && filters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }
    
    if (filters?.model && filters.model !== 'all') {
      filteredData = filteredData.filter(item => item.model === filters.model);
    }
    
    if (filters?.store && filters.store !== 'all') {
      filteredData = filteredData.filter(item => item.store === filters.store);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.model.toLowerCase().includes(searchLower) ||
        item.serialNumber.toLowerCase().includes(searchLower) ||
        item.store.toLowerCase().includes(searchLower)
      );
    }
    
    return {
      data: filteredData,
      total: filteredData.length,
      page: 1,
      pageSize: 50
    };
  },

  async getSingleInventory(id: string): Promise<Inventory | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const inventory = mockInventoryData.find(item => item.id === id);
    return inventory || null;
  },

  async updateInventoryStatus(id: string, status: 'active' | 'inactive' | 'pending') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockInventoryData.findIndex(item => item.id === id);
    if (index !== -1) {
      mockInventoryData[index].status = status;
      return mockInventoryData[index];
    }
    throw new Error('Inventory item not found');
  }
};
