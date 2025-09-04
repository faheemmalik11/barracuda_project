import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Clock, User, CheckCircle, AlertCircle, Package } from 'lucide-react'

interface ActivitySectionProps {
  orderData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function ActivitySection({ orderData = null, isExpanded = true, onToggle, isDetailView = false }: ActivitySectionProps) {
  // Mock activity data
  const activityData = [
    {
      id: 'act_001',
      timestamp: '2024-01-20 14:30:00',
      action: 'Order Fulfilled',
      description: 'Order has been fulfilled and shipped to destination',
      user: 'System',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 'act_002',
      timestamp: '2024-01-18 09:15:00',
      action: 'Payment Processed',
      description: 'Payment of $1,299.98 has been successfully processed',
      user: 'Payment Gateway',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 'act_003',
      timestamp: '2024-01-17 16:45:00',
      action: 'Order Confirmed',
      description: 'Order has been confirmed and is being prepared',
      user: 'John Smith',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 'act_004',
      timestamp: '2024-01-15 11:20:00',
      action: 'Order Placed',
      description: 'Order has been placed and is awaiting confirmation',
      user: 'Customer Portal',
      status: 'completed',
      icon: Package
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'secondary'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityData.map((activity, index) => {
              const { date, time } = formatTimestamp(activity.timestamp)
              const IconComponent = activity.icon
              
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{activity.action}</h4>
                      <Badge variant={getStatusColor(activity.status)} className="ml-2">
                        {activity.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {activity.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {date} at {time}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Completed Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-muted-foreground">Pending Actions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
