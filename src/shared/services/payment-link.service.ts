import type { PaymentLink } from '@shared/types/payment-links'
import { mockPaymentLinks } from '@shared/data/mockPaymentLinks'

export interface PaymentLinkFilters {
  status?: string
  type?: string
  search?: string
}

export interface PaymentLinkPaginationParams {
  page: number
  pageSize: number
  filters?: PaymentLinkFilters
}

export interface NavigationParams {
  page: number
  pageSize: number
  status?: string
  type?: string
  search?: string
}

export interface PaymentLinkResponse {
  data: PaymentLink[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

class PaymentLinkService {
  async getPaymentLinksForNavigation(page: number, filters: any): Promise<{ data: PaymentLink[]; total: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    let filteredData = [...mockPaymentLinks]

    // Apply filters
    if (filters) {
      const { status, type, search } = filters

      if (status && status !== 'all') {
        filteredData = filteredData.filter(link => link.status === status)
      }

      if (type && type !== 'all') {
        filteredData = filteredData.filter(link => link.type === type)
      }

      if (search) {
        const searchLower = search.toLowerCase()
        filteredData = filteredData.filter(link =>
          link.name.toLowerCase().includes(searchLower) ||
          link.description?.toLowerCase().includes(searchLower)
        )
      }
    }

    return {
      data: filteredData,
      total: filteredData.length
    }
  }

  async getPaymentLinkById(id: string): Promise<PaymentLink | null> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return mockPaymentLinks.find(link => link.id === id) || null
  }

  async createPaymentLink(data: Partial<PaymentLink>): Promise<PaymentLink> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const newLink: PaymentLink = {
      id: `link_${Date.now()}`,
      name: data.name || 'New Payment Link',
      type: data.type || 'one-time',
      status: data.status || 'active',
      amount: data.amount,
      description: data.description,
      url: `https://pay.example.com/${Date.now()}`,
      views: 0,
      conversions: 0,
      totalRevenue: 0,
      created: new Date(),
      lastUsed: null,
      environment: data.environment || 'live'
    }

    mockPaymentLinks.unshift(newLink)
    return newLink
  }

  async updatePaymentLink(id: string, data: Partial<PaymentLink>): Promise<PaymentLink | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = mockPaymentLinks.findIndex(link => link.id === id)
    if (index === -1) return null

    mockPaymentLinks[index] = { ...mockPaymentLinks[index], ...data }
    return mockPaymentLinks[index]
  }

  async deletePaymentLink(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = mockPaymentLinks.findIndex(link => link.id === id)
    if (index === -1) return false

    mockPaymentLinks.splice(index, 1)
    return true
  }
}

export const paymentLinkService = new PaymentLinkService()
