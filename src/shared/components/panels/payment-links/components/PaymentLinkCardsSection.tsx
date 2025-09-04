import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { TrendingUp, DollarSign, Eye, Users } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkCardsSectionProps {
  paymentLink: PaymentLink
  isExpanded: boolean
  onToggle: () => void
  supportsExpansion: boolean
}

export function PaymentLinkCardsSection({ 
  paymentLink 
}: PaymentLinkCardsSectionProps) {
  const conversionRate = paymentLink.views > 0 
    ? ((paymentLink.conversions / paymentLink.views) * 100).toFixed(1)
    : '0.0'

  const averageValue = paymentLink.conversions > 0
    ? paymentLink.totalRevenue / paymentLink.conversions / 100
    : 0

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: paymentLink.currency
            }).format(paymentLink.totalRevenue / 100)}
          </div>
          <p className="text-xs text-muted-foreground">
            From {paymentLink.conversions} conversions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paymentLink.views.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Total page views
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {paymentLink.conversions} of {paymentLink.views} views
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Value</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: paymentLink.currency
            }).format(averageValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            Per conversion
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
