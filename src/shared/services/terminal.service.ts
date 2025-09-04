import { mockTerminals } from '@shared/data/mockTerminals';
import type { Terminal } from '@shared/types/terminals';

export interface TerminalFilters {
  status?: string;
  location?: string;
  deviceType?: string;
  serialNumber?: string;
  connectionType?: string;
  lowBattery?: boolean;
}

export const terminalService = {
  async getTerminalsForNavigation(page: number = 1, filters?: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = [...mockTerminals];
    
    // Handle statusFilter (used by EntityListPageWithPanel)
    if (filters?.statusFilter && filters.statusFilter !== 'all') {
      filteredData = filteredData.filter(terminal => terminal.status === filters.statusFilter);
    }
    
    // Handle legacy status filter
    if (filters?.status && filters.status !== 'all') {
      filteredData = filteredData.filter(terminal => terminal.status === filters.status);
    }
    
    if (filters?.model && filters.model !== 'all') {
      filteredData = filteredData.filter(terminal => terminal.model === filters.model);
    }
    
    if (filters?.location && filters.location !== 'all') {
      filteredData = filteredData.filter(terminal => {
        if (typeof terminal.location === 'string') {
          return terminal.location === filters.location;
        } else {
          return terminal.location.name === filters.location;
        }
      });
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(terminal => 
        terminal.model.toLowerCase().includes(searchLower) ||
        terminal.serialNumber.toLowerCase().includes(searchLower) ||
        terminal.name.toLowerCase().includes(searchLower) ||
        (typeof terminal.location === 'string' 
          ? terminal.location.toLowerCase().includes(searchLower)
          : terminal.location.name.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      total: filteredData.length
    };
  },

  async getSingleTerminal(id: string): Promise<Terminal | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const terminal = mockTerminals.find(item => item.id === id);
    return terminal || null;
  },

  async updateTerminalStatus(id: string, status: 'online' | 'offline' | 'error' | 'maintenance') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockTerminals.findIndex(item => item.id === id);
    if (index !== -1) {
      mockTerminals[index].status = status;
      return mockTerminals[index];
    }
    throw new Error('Terminal not found');
  }
};
