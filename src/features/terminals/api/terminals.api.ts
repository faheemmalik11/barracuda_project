import ApiClient from '@shared/services/api-client'
import config from '@config/env.config'
import type { Terminal, TerminalApiResponse, TerminalFilterState } from '../types/terminals.types'

class TerminalsApi {
  private apiClient: ApiClient
  
  constructor() {
    this.apiClient = new ApiClient(config.endpoints.api)
  }
  
  async getTerminals(params?: TerminalFilterState): Promise<TerminalApiResponse> {
    return this.apiClient.get('/terminals', { params })
  }
  
  async getTerminalById(id: string): Promise<Terminal> {
    return this.apiClient.get(`/terminals/${id}`)
  }
  
  async updateTerminal(id: string, data: Partial<Terminal>): Promise<Terminal> {
    return this.apiClient.patch(`/terminals/${id}`, data)
  }
  
  async restartTerminal(id: string): Promise<void> {
    return this.apiClient.post(`/terminals/${id}/restart`)
  }
  
  async updateTerminalSettings(id: string, settings: Record<string, unknown>): Promise<void> {
    return this.apiClient.post(`/terminals/${id}/settings`, settings)
  }
}

export const terminalsApi = new TerminalsApi()