import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Clock, Activity } from 'lucide-react'

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
  status?: string
  user?: string
}

interface ActivitySectionProps {
  activities: ActivityItem[]
  title?: string
}

export function ActivitySection({ activities, title = "Recent Activity" }: ActivitySectionProps) {
  const getStatusVariant = (status?: string) => {
    switch (status) {
      case 'success': return 'default'
      case 'error': return 'destructive'
      case 'warning': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-muted-foreground text-sm">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{activity.type}</span>
                    {activity.status && (
                      <Badge variant={getStatusVariant(activity.status)} className="text-xs">
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                    {activity.user && (
                      <span>by {activity.user}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
