import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge'
import { useAnalytics } from '../hooks/useAnalytics'
import { PaymentLinkAnalytics } from '../components/PaymentLinkAnalytics'
import { MetricCard } from '../components/MetricCard'
import { formatCurrency, formatPercentage, calculateConversionRate } from '../utils'
import type { PaymentLink } from '../types/analytics.types'

const getMetricIcon = (metricName: string) => {
  if (metricName.includes('Revenue') || metricName.includes('Order')) return DollarSign
  if (metricName.includes('Conversion')) return TrendingUp
  if (metricName.includes('Active')) return Activity
  return BarChart3
}

export function AnalyticsPage() {
  const { paymentLinks, metrics, loading, error } = useAnalytics()
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null)

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Loading analytics data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-red-500 mt-1">Error: {error}</p>
      </div>
    )
  }

  if (selectedLink) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">Detailed analytics for payment link</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedLink(null)}>
            Back to Overview
          </Button>
        </div>
        <PaymentLinkAnalytics link={selectedLink} />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track performance and insights across your payment platform
          </p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard 
            key={metric.id} 
            metric={metric} 
            icon={getMetricIcon(metric.name)} 
          />
        ))}
      </div>

      {/* Payment Links Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Links Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentLinks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payment links found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentLinks.map((link) => {
                const conversionRate = calculateConversionRate(link.conversions, link.views)
                
                return (
                  <div 
                    key={link.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLink(link)}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium">{link.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {link.views.toLocaleString()} views • {link.conversions.toLocaleString()} conversions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(link.totalRevenue, 'USD', 2)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatPercentage(conversionRate)} conversion
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <AppStatusBadge 
                          variant="generic" 
                          text={link.type.replace('_', ' ')}
                          color="neutral"
                        />
                        <AppStatusBadge 
                          variant="generic" 
                          text={link.status}
                          color={link.status === "active" ? "success" : "neutral"}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}