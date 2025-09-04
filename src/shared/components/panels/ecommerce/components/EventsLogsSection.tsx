import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Download, Filter } from 'lucide-react'

interface EventsLogsSectionProps {
  ecommerceData?: any
  isDetailView?: boolean
}

export function EventsLogsSection({ ecommerceData, isDetailView }: EventsLogsSectionProps) {
  const mockEvents = [
    {
      id: '1',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'payment.succeeded',
      status: 'success',
      message: 'Payment processed successfully',
      details: { amount: 99.99, currency: 'USD', customer: 'cus_123' }
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:25:00Z',
      type: 'webhook.delivered',
      status: 'success',
      message: 'Webhook delivered to endpoint',
      details: { endpoint: 'https://merchant.com/webhook', response_code: 200 }
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:20:00Z',
      type: 'api.error',
      status: 'error',
      message: 'Invalid API key provided',
      details: { error_code: 'invalid_api_key', endpoint: '/v1/payments' }
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:15:00Z',
      type: 'config.updated',
      status: 'info',
      message: 'Webhook URL updated',
      details: { old_url: 'https://old.com/webhook', new_url: 'https://new.com/webhook' }
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Events & Logs</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium mb-1">{event.message}</p>
              <details className="text-xs text-muted-foreground">
                <summary className="cursor-pointer hover:text-foreground">
                  View details
                </summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                  {JSON.stringify(event.details, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
