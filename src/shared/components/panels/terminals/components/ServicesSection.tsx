import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Switch } from '@shared/components/ui/switch'

interface ServicesSectionProps {
  terminalData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function ServicesSection({ terminalData, isExpanded = true, onToggle, isDetailView = false }: ServicesSectionProps) {
  const servicesData = {
    paymentProcessing: {
      enabled: true,
      status: 'active',
      lastTransaction: '2 minutes ago'
    },
    receiptPrinting: {
      enabled: true,
      status: 'active',
      paperLevel: 75
    },
    loyaltyProgram: {
      enabled: true,
      status: 'active',
      enrolledCustomers: 1247
    },
    giftCards: {
      enabled: false,
      status: 'inactive',
      reason: 'Not configured'
    },
    tipProcessing: {
      enabled: true,
      status: 'active',
      averageTip: '18%'
    },
    cashback: {
      enabled: true,
      status: 'active',
      dailyLimit: '$200'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Services & Features</CardTitle>
        {!isDetailView && onToggle && (
          <button
            onClick={onToggle}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Payment Processing */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Payment Processing</h4>
                <Badge variant={servicesData.paymentProcessing.status === 'active' ? 'default' : 'secondary'}>
                  {servicesData.paymentProcessing.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Last transaction: {servicesData.paymentProcessing.lastTransaction}
              </p>
            </div>
            <Switch checked={servicesData.paymentProcessing.enabled} />
          </div>

          {/* Receipt Printing */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Receipt Printing</h4>
                <Badge variant={servicesData.receiptPrinting.status === 'active' ? 'default' : 'secondary'}>
                  {servicesData.receiptPrinting.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Paper level: {servicesData.receiptPrinting.paperLevel}%
              </p>
            </div>
            <Switch checked={servicesData.receiptPrinting.enabled} />
          </div>

          {/* Loyalty Program */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Loyalty Program</h4>
                <Badge variant={servicesData.loyaltyProgram.status === 'active' ? 'default' : 'secondary'}>
                  {servicesData.loyaltyProgram.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {servicesData.loyaltyProgram.enrolledCustomers} enrolled customers
              </p>
            </div>
            <Switch checked={servicesData.loyaltyProgram.enabled} />
          </div>

          {/* Gift Cards */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Gift Cards</h4>
                <Badge variant={servicesData.giftCards.status === 'active' ? 'default' : 'secondary'}>
                  {servicesData.giftCards.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {servicesData.giftCards.reason}
              </p>
            </div>
            <Switch checked={servicesData.giftCards.enabled} />
          </div>

          {/* Tip Processing */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Tip Processing</h4>
                <Badge variant={servicesData.tipProcessing.status === 'active' ? 'default' : 'secondary'}>
                  {servicesData.tipProcessing.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Average tip: {servicesData.tipProcessing.averageTip}
              </p>
            </div>
            <Switch checked={servicesData.tipProcessing.enabled} />
          </div>

          {/* Cashback */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Cashback</h4>
                <Badge variant={servicesData.cashback.status === 'active' ? 'default' : 'secondary'}>
                  {servicesData.cashback.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Daily limit: {servicesData.cashback.dailyLimit}
              </p>
            </div>
            <Switch checked={servicesData.cashback.enabled} />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
