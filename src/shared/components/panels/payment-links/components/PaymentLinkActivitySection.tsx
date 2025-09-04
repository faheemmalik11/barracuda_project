import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkActivitySectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkActivitySection({ 
  paymentLink
}: PaymentLinkActivitySectionProps) {
  // Mock activity data - in real app this would come from API
  const recentActivity = [
    {
      id: '1',
      type: 'payment',
      description: 'Payment completed',
      amount: 2999,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: '2',
      type: 'view',
      description: 'Link viewed',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'info'
    },
    {
      id: '3',
      type: 'payment',
      description: 'Payment failed',
      amount: 2999,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'error'
    }
  ]

  return (
    <CollapsibleSection
      title="Recent Activity"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {activity.type === 'payment' ? (
                      activity.status === 'success' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )
                    ) : (
                      <Calendar className="h-4 w-4 text-blue-500" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activity.amount && (
                    <span className="text-sm font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: paymentLink.currency
                      }).format(activity.amount / 100)}
                    </span>
                  )}
                  <Badge 
                    variant={
                      activity.status === 'success' ? 'default' : 
                      activity.status === 'error' ? 'destructive' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CollapsibleSection>
  )
}
