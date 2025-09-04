import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Progress } from '@shared/components/ui/progress'

interface HardwareSectionProps {
  terminalData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function HardwareSection({ terminalData = null, isExpanded = true, onToggle, isDetailView = false }: HardwareSectionProps) {
  // Mock hardware data
  const hardwareData = {
    model: terminalData?.model || 'PAX A920',
    serialNumber: terminalData?.serialNumber || 'PAX920-2024-001',
    firmwareVersion: terminalData?.firmwareVersion || 'v2.1.4',
    batteryLevel: terminalData?.batteryLevel || 85,
    memory: {
      total: '2GB',
      used: '1.2GB',
      usage: 60
    },
    storage: {
      total: '16GB',
      used: '8.5GB',
      usage: 53
    },
    processor: 'ARM Cortex-A53 Quad-core',
    display: '5.5" Color Touch Screen',
    connectivity: ['WiFi', 'Bluetooth', '4G LTE'],
    sensors: ['NFC', 'Magnetic Stripe', 'EMV Chip'],
    lastMaintenance: '2024-01-15',
    warrantyExpiry: '2025-12-31'
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Hardware Information</CardTitle>
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
        <CardContent className="space-y-6">
          {/* Device Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Device Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Model</p>
                <p className="text-sm font-medium">{hardwareData.model}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Serial Number</p>
                <p className="text-sm font-medium">{hardwareData.serialNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Firmware</p>
                <p className="text-sm font-medium">{hardwareData.firmwareVersion}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Processor</p>
                <p className="text-sm font-medium">{hardwareData.processor}</p>
              </div>
            </div>
          </div>

          {/* Battery Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Power Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Battery Level</span>
                <span className="text-sm font-medium">{hardwareData.batteryLevel}%</span>
              </div>
              <Progress value={hardwareData.batteryLevel} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Status: {hardwareData.batteryLevel > 20 ? 'Good' : 'Low'}</span>
                <Badge variant={hardwareData.batteryLevel > 20 ? 'default' : 'destructive'}>
                  {hardwareData.batteryLevel > 50 ? 'Healthy' : hardwareData.batteryLevel > 20 ? 'Fair' : 'Critical'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Memory & Storage */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Memory & Storage</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Memory Usage</span>
                  <span className="text-sm font-medium">{hardwareData.memory.used} / {hardwareData.memory.total}</span>
                </div>
                <Progress value={hardwareData.memory.usage} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Usage</span>
                  <span className="text-sm font-medium">{hardwareData.storage.used} / {hardwareData.storage.total}</span>
                </div>
                <Progress value={hardwareData.storage.usage} className="h-2" />
              </div>
            </div>
          </div>

          {/* Connectivity & Sensors */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Capabilities</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Connectivity</p>
                <div className="flex flex-wrap gap-1">
                  {hardwareData.connectivity.map((conn) => (
                    <Badge key={conn} variant="secondary" className="text-xs">
                      {conn}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Payment Sensors</p>
                <div className="flex flex-wrap gap-1">
                  {hardwareData.sensors.map((sensor) => (
                    <Badge key={sensor} variant="outline" className="text-xs">
                      {sensor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Maintenance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Last Maintenance</p>
                <p className="text-sm font-medium">{hardwareData.lastMaintenance}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Warranty Expires</p>
                <p className="text-sm font-medium">{hardwareData.warrantyExpiry}</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
