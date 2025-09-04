import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'

interface ActivitySectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function ActivitySection({ ecommerceData, isExpanded, onToggle, isDetailView }: ActivitySectionProps) {
  const mockActivities = [
    {
      id: '1',
      type: 'transaction',
      description: 'Payment processed successfully',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'success'
    },
    {
      id: '2',
      type: 'configuration',
      description: 'API key regenerated',
      timestamp: '2024-01-15T12:15:00Z',
      status: 'info'
    },
    {
      id: '3',
      type: 'error',
      description: 'Connection timeout',
      timestamp: '2024-01-15T10:45:00Z',
      status: 'error'
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
    <CollapsibleSection
      title="Recent Activity"
      isDetailView={isDetailView}
    >
      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            <Badge className={getStatusColor(activity.status)}>
              {activity.type}
            </Badge>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.description}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  )
}
