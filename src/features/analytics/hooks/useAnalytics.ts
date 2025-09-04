import { useState, useEffect, useCallback } from 'react'
import { mockPaymentLinks } from '@shared/data/mockPaymentLinks'
import type { PaymentLink, AnalyticsMetric } from '../types/analytics.types'
import { calculateConversionRate } from '../utils'

// Mock metrics data for demonstration
const generateMockMetrics = (paymentLinks: PaymentLink[]): AnalyticsMetric[] => {
  const totalRevenue = paymentLinks.reduce((sum, link) => sum + link.totalRevenue, 0)
  const totalViews = paymentLinks.reduce((sum, link) => sum + link.views, 0)
  const totalConversions = paymentLinks.reduce((sum, link) => sum + link.conversions, 0)
  const activeLinks = paymentLinks.filter(link => link.status === 'active').length
  
  return [
    { 
      id: '1', 
      name: 'Total Revenue', 
      value: totalRevenue, 
      change: 12.5, 
      period: 'month' 
    },
    { 
      id: '2', 
      name: 'Conversion Rate', 
      value: calculateConversionRate(totalConversions, totalViews), 
      change: -2.1, 
      period: 'month' 
    },
    { 
      id: '3', 
      name: 'Average Order Value', 
      value: totalConversions > 0 ? totalRevenue / totalConversions : 0, 
      change: 5.8, 
      period: 'month' 
    },
    { 
      id: '4', 
      name: 'Active Links', 
      value: activeLinks, 
      change: 0, 
      period: 'month' 
    }
  ]
}

interface UseAnalyticsState {
  paymentLinks: PaymentLink[]
  metrics: AnalyticsMetric[]
  loading: boolean
  error: string | null
}

/**
 * Hook for managing analytics data including payment links and metrics
 */
export function useAnalytics() {
  const [state, setState] = useState<UseAnalyticsState>({
    paymentLinks: [],
    metrics: [],
    loading: true,
    error: null
  })

  const loadAnalytics = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const links = mockPaymentLinks
      const metrics = generateMockMetrics(links)
      
      setState({
        paymentLinks: links,
        metrics,
        loading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load analytics'
      }))
    }
  }, [])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  return {
    ...state,
    refresh: loadAnalytics
  }
}

/**
 * Hook for managing individual payment link analytics
 */
export function usePaymentLinkAnalytics(linkId: string) {
  const [state, setState] = useState<{
    link: PaymentLink | null
    loading: boolean
    error: string | null
  }>({
    link: null,
    loading: true,
    error: null
  })

  const loadLinkAnalytics = useCallback(async () => {
    if (!linkId) return

    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundLink = mockPaymentLinks.find(l => l.id === linkId)
      setState({
        link: foundLink || null,
        loading: false,
        error: foundLink ? null : 'Payment link not found'
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load link analytics'
      }))
    }
  }, [linkId])

  useEffect(() => {
    loadLinkAnalytics()
  }, [loadLinkAnalytics])

  return {
    ...state,
    refresh: loadLinkAnalytics
  }
}