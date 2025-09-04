import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { Clock, Zap, Power, AlertTriangle } from 'lucide-react';

interface ActivitySectionProps {
  inventoryData?: any;
  isExpanded?: boolean;
  onToggle?: () => void;
  isDetailView?: boolean;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({ 
  inventoryData: _inventoryData,
  isExpanded = true,
  onToggle,
  isDetailView = false 
}) => {
  // Mock activity data
  const mockActivities = [
    {
      id: 'act_001',
      timestamp: '2024-01-29T16:45:00Z',
      type: 'transaction',
      description: 'Payment processed successfully',
      amount: '$45.67',
      status: 'success',
      icon: Zap
    },
    {
      id: 'act_002',
      timestamp: '2024-01-29T14:30:00Z',
      type: 'system',
      description: 'Terminal restarted',
      status: 'info',
      icon: Power
    },
    {
      id: 'act_003',
      timestamp: '2024-01-29T12:15:00Z',
      type: 'transaction',
      description: 'Payment processed successfully',
      amount: '$23.45',
      status: 'success',
      icon: Zap
    },
    {
      id: 'act_004',
      timestamp: '2024-01-29T10:20:00Z',
      type: 'error',
      description: 'Connection timeout - retrying',
      status: 'warning',
      icon: AlertTriangle
    },
    {
      id: 'act_005',
      timestamp: '2024-01-29T08:30:00Z',
      type: 'system',
      description: 'Terminal activated',
      status: 'success',
      icon: Power
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className={`cursor-pointer ${!isDetailView ? 'hover:bg-muted/50' : ''}`}
        onClick={!isDetailView ? onToggle : undefined}
      >
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </div>
          {!isDetailView && (
            <Badge variant="secondary" className="ml-2">
              {mockActivities.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {mockActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {activity.description}
                      </p>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600">
                          {activity.amount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="pt-2 border-t">
            <button className="text-sm text-primary hover:underline">
              View all activity →
            </button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
