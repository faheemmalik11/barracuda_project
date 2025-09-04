import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { Monitor, MapPin, Calendar, User } from 'lucide-react';

interface InventoryHeaderSectionProps {
  inventoryData?: any;
  isExpanded?: boolean;
  onToggle?: () => void;
  isDetailView?: boolean;
}

export const InventoryHeaderSection: React.FC<InventoryHeaderSectionProps> = ({ 
  inventoryData,
  isExpanded = true,
  onToggle,
  isDetailView = false 
}) => {
  // Use inventory data or fallback to mock data
  const headerData = {
    serialNumber: inventoryData?.serialNumber || 'CLV-2024-001',
    model: inventoryData?.model || 'Clover Station Pro',
    status: inventoryData?.status || 'active',
    location: inventoryData?.location || 'Downtown Store - Register 1',
    lastSeen: inventoryData?.lastSeen || '2024-01-29T16:45:00Z',
    assignedTo: inventoryData?.assignedTo || 'John Smith',
    installDate: inventoryData?.installDate || '2024-01-15T09:00:00Z',
    firmwareVersion: inventoryData?.firmwareVersion || '2.1.4',
    batteryLevel: inventoryData?.batteryLevel || 85
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className={`cursor-pointer ${!isDetailView ? 'hover:bg-muted/50' : ''}`}
        onClick={!isDetailView ? onToggle : undefined}
      >
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Terminal Overview
          </div>
          <Badge className={getStatusColor(headerData.status)}>
            {headerData.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Serial Number:</span>
              <p className="font-medium font-mono">{headerData.serialNumber}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Model:</span>
              <p className="font-medium">{headerData.model}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Firmware:</span>
              <p className="font-medium">v{headerData.firmwareVersion}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Battery:</span>
              <p className="font-medium">{headerData.batteryLevel}%</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Location:</span>
              <span className="font-medium">{headerData.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Assigned to:</span>
              <span className="font-medium">{headerData.assignedTo}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Installed:</span>
              <span className="font-medium">{formatDate(headerData.installDate)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last seen:</span>
              <span className="font-medium">{formatDate(headerData.lastSeen)}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
