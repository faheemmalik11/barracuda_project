import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { FileText, Download, Calendar, User, CreditCard, AlertCircle } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkEventsLogsSectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkEventsLogsSection({ 
  paymentLink
}: PaymentLinkEventsLogsSectionProps) {
  // Mock events data - in real app this would come from API
  const events = [
    {
      id: '1',
      type: 'payment.succeeded',
      description: 'Payment completed successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      data: {
        amount: 2999,
        customer: 'john@example.com',
        paymentMethod: '•••• 4242'
      }
    },
    {
      id: '2',
      type: 'payment_link.viewed',
      description: 'Payment link was viewed',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      data: {
        userAgent: 'Chrome/120.0.0.0',
        ip: '192.168.1.1'
      }
    },
    {
      id: '3',
      type: 'payment.failed',
      description: 'Payment attempt failed',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      data: {
        amount: 2999,
        customer: 'jane@example.com',
        error: 'Your card was declined'
      }
    },
    {
      id: '4',
      type: 'payment_link.created',
      description: 'Payment link was created',
      timestamp: new Date(paymentLink.created),
      data: {
        creator: 'admin@company.com'
      }
    }
  ]

  const getEventIcon = (type: string) => {
    if (type.includes('payment.succeeded')) return <CreditCard className="h-4 w-4 text-green-500" />
    if (type.includes('payment.failed')) return <AlertCircle className="h-4 w-4 text-red-500" />
    if (type.includes('viewed')) return <User className="h-4 w-4 text-blue-500" />
    return <Calendar className="h-4 w-4 text-muted-foreground" />
  }

  const getEventBadgeVariant = (type: string) => {
    if (type.includes('succeeded')) return 'default'
    if (type.includes('failed')) return 'destructive'
    if (type.includes('viewed')) return 'secondary'
    return 'outline'
  }

  return (
    <CollapsibleSection
      title="Events & Logs"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing recent events for this payment link
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <div>
                        <div className="font-medium text-sm">{event.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant={getEventBadgeVariant(event.type)} className="text-xs">
                      {event.type}
                    </Badge>
                  </div>

                  {event.data && (
                    <div className="mt-2 p-2 bg-muted rounded text-xs">
                      <div className="font-mono">
                        {JSON.stringify(event.data, null, 2)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {events.length} events shown • Last updated: {new Date().toLocaleTimeString()}
                </div>
                <Button variant="outline" size="sm">
                  Load More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CollapsibleSection>
  )
}
