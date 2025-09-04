import type { Terminal } from '../types/terminal.types';

// Mock data for terminals
const mockTerminals: Terminal[] = [
  {
    id: 'TRM-001',
    serialNumber: 'CLV-2024-001',
    model: 'Clover Station Pro',
    status: 'active',
    location: 'Downtown Store - Register 1',
    store: 'Downtown Location',
    lastSeen: '2024-01-29T16:45:00Z',
    assignedTo: 'John Smith',
    installDate: '2024-01-15T09:00:00Z',
    firmwareVersion: '2.1.4',
    batteryLevel: 85,
    transactionRef: 'TXN-789456123',
    ipAddress: '192.168.1.45',
    connectionType: 'wifi'
  },
  {
    id: 'TRM-002',
    serialNumber: 'CLV-2024-002',
    model: 'Clover Mini',
    status: 'inactive',
    location: 'Mall Store - Register 2',
    store: 'Mall Location',
    lastSeen: '2024-01-28T14:30:00Z',
    assignedTo: 'Sarah Johnson',
    installDate: '2024-01-10T11:00:00Z',
    firmwareVersion: '2.1.3',
    batteryLevel: 42,
    ipAddress: '192.168.1.46',
    connectionType: 'ethernet'
  },
  {
    id: 'TRM-003',
    serialNumber: 'CLV-2024-003',
    model: 'Clover Flex',
    status: 'pending',
    location: 'Airport Store - Mobile Unit',
    store: 'Airport Location',
    lastSeen: '2024-01-29T12:15:00Z',
    assignedTo: 'Mike Davis',
    installDate: '2024-01-20T08:30:00Z',
    firmwareVersion: '2.1.4',
    batteryLevel: 78,
    connectionType: 'cellular'
  },
  {
    id: 'TRM-004',
    serialNumber: 'CLV-2024-004',
    model: 'Clover Station Pro',
    status: 'maintenance',
    location: 'Warehouse - Testing Area',
    store: 'Warehouse',
    lastSeen: '2024-01-27T09:20:00Z',
    installDate: '2024-01-05T14:00:00Z',
    firmwareVersion: '2.1.2',
    batteryLevel: 0,
    ipAddress: '192.168.1.47',
    connectionType: 'wifi'
  }
];

export class TerminalService {
  static async getTerminals(filters?: {
    status?: string;
    model?: string;
    store?: string;
    search?: string;
  }): Promise<Terminal[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...mockTerminals];
    
    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(terminal => terminal.status === filters.status);
    }
    
    if (filters?.model) {
      filtered = filtered.filter(terminal => 
        terminal.model.toLowerCase().includes(filters.model!.toLowerCase())
      );
    }
    
    if (filters?.store) {
      filtered = filtered.filter(terminal => 
        terminal.store.toLowerCase().includes(filters.store!.toLowerCase())
      );
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(terminal =>
        terminal.serialNumber.toLowerCase().includes(search) ||
        terminal.model.toLowerCase().includes(search) ||
        terminal.location.toLowerCase().includes(search) ||
        terminal.store.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }
  
  static async getTerminalById(id: string): Promise<Terminal | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTerminals.find(terminal => terminal.id === id) || null;
  }
  
  static async updateTerminalStatus(id: string, status: Terminal['status']): Promise<Terminal> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const terminal = mockTerminals.find(t => t.id === id);
    if (terminal) {
      terminal.status = status;
      terminal.lastSeen = new Date().toISOString();
    }
    return terminal!;
  }
  
  static async restartTerminal(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const terminal = mockTerminals.find(t => t.id === id);
    if (terminal) {
      terminal.lastSeen = new Date().toISOString();
    }
  }
  
  static async configureTerminal(id: string, config: Record<string, unknown>): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Configuring terminal ${id}:`, config);
  }
}
