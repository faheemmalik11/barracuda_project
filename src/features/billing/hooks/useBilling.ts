import { useState, useEffect, useCallback } from 'react'
import type { BillingOverview, BillingMetric, Invoice } from '../types/billing.types'

// Mock data generator for development
const generateMockMetrics = (): BillingMetric[] => [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    trend: 'up',
    icon: 'dollar',
    period: 'month'
  },
  {
    id: '2',
    title: 'Outstanding',
    value: '$8,750',
    change: -5.2,
    trend: 'down',
    icon: 'file',
    period: 'month'
  },
  {
    id: '3',
    title: 'Invoices',
    value: '342',
    change: 8.1,
    trend: 'up',
    icon: 'file',
    period: 'month'
  },
  {
    id: '4',
    title: 'Customers',
    value: '89',
    change: 2.3,
    trend: 'up',
    icon: 'users',
    period: 'month'
  }
]

const generateMockInvoices = (): Invoice[] => [
  {
    id: 'INV-001',
    customerId: 'cust-1',
    customerName: 'Acme Corp',
    customerEmail: 'billing@acme.com',
    amount: 250000, // $2500.00 in cents
    currency: 'USD',
    status: 'paid',
    dueDate: new Date('2024-12-15'),
    created: new Date('2024-11-15'),
    items: [
      {
        id: 'item-1',
        description: 'Professional Services',
        quantity: 10,
        unitPrice: 25000, // $250.00 in cents
        total: 250000
      }
    ]
  },
  {
    id: 'INV-002',
    customerId: 'cust-2',
    customerName: 'TechStart Inc',
    customerEmail: 'finance@techstart.com',
    amount: 180000, // $1800.00 in cents
    currency: 'USD',
    status: 'sent',
    dueDate: new Date('2024-12-20'),
    created: new Date('2024-11-20'),
    items: [
      {
        id: 'item-2',
        description: 'Monthly Subscription',
        quantity: 1,
        unitPrice: 180000,
        total: 180000
      }
    ]
  },
  {
    id: 'INV-003',
    customerId: 'cust-3',
    customerName: 'Global Ltd',
    customerEmail: 'accounts@global.com',
    amount: 320000, // $3200.00 in cents
    currency: 'USD',
    status: 'overdue',
    dueDate: new Date('2024-12-10'),
    created: new Date('2024-11-10'),
    items: [
      {
        id: 'item-3',
        description: 'Consulting Services',
        quantity: 16,
        unitPrice: 20000, // $200.00 in cents
        total: 320000
      }
    ]
  }
]

interface UseBillingState {
  overview: BillingOverview | null
  loading: boolean
  error: string | null
}

/**
 * Hook for managing billing overview data
 */
export function useBilling() {
  const [state, setState] = useState<UseBillingState>({
    overview: null,
    loading: true,
    error: null
  })

  const loadBillingData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const metrics = generateMockMetrics()
      const recentInvoices = generateMockInvoices()
      
      // Calculate overview totals
      const totalRevenue = recentInvoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0)
      
      const outstandingAmount = recentInvoices
        .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + invoice.amount, 0)
      
      const overview: BillingOverview = {
        totalRevenue,
        outstandingAmount,
        invoiceCount: recentInvoices.length,
        customerCount: new Set(recentInvoices.map(inv => inv.customerId)).size,
        recentInvoices,
        metrics
      }
      
      setState({
        overview,
        loading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load billing data'
      }))
    }
  }, [])

  useEffect(() => {
    loadBillingData()
  }, [loadBillingData])

  return {
    ...state,
    refresh: loadBillingData
  }
}

/**
 * Hook for managing invoice actions
 */
export function useBillingActions() {
  const handleExport = useCallback(() => {
    console.log('Exporting billing data...')
  }, [])

  const handleSettings = useCallback(() => {
    console.log('Opening billing settings...')
  }, [])

  const handleCreateInvoice = useCallback(() => {
    console.log('Creating new invoice...')
  }, [])

  const handleViewInvoice = useCallback((invoice: Invoice) => {
    console.log('Viewing invoice:', invoice.id)
  }, [])

  return {
    handleExport,
    handleSettings,
    handleCreateInvoice,
    handleViewInvoice
  }
}
