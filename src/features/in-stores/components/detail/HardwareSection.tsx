import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Cpu, HardDrive, Wifi, Battery } from 'lucide-react'

interface HardwareInfo {
  model: string
  serialNumber: string
  firmwareVersion: string
  batteryLevel?: number
  storage?: {
    total: string
    used: string
    available: string
  }
  connectivity?: {
    wifi: boolean
    ethernet: boolean
    cellular: boolean
  }
  lastMaintenance?: string
  warrantyExpires?: string
}

interface HardwareSectionProps {
  hardware: HardwareInfo
  title?: string
}

export function HardwareSection({ hardware, title = "Hardware Information" }: HardwareSectionProps) {
  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-muted-foreground'
    if (level > 50) return 'text-green-600'
    if (level > 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Model</label>
              <p className="text-sm font-mono">{hardware.model}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Serial Number</label>
              <p className="text-sm font-mono">{hardware.serialNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Firmware Version</label>
              <p className="text-sm font-mono">{hardware.firmwareVersion}</p>
            </div>
          </div>

          {/* Status Info */}
          <div className="space-y-3">
            {hardware.batteryLevel !== undefined && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Battery Level</label>
                <div className="flex items-center gap-2">
                  <Battery className={`h-4 w-4 ${getBatteryColor(hardware.batteryLevel)}`} />
                  <span className={`text-sm font-medium ${getBatteryColor(hardware.batteryLevel)}`}>
                    {hardware.batteryLevel}%
                  </span>
                </div>
              </div>
            )}

            {hardware.storage && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Storage</label>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span className="text-sm">
                    {hardware.storage.used} / {hardware.storage.total} used
                  </span>
                </div>
              </div>
            )}

            {hardware.connectivity && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Connectivity</label>
                <div className="flex gap-2 mt-1">
                  {hardware.connectivity.wifi && (
                    <Badge variant="outline" className="text-xs">
                      <Wifi className="h-3 w-3 mr-1" />
                      WiFi
                    </Badge>
                  )}
                  {hardware.connectivity.ethernet && (
                    <Badge variant="outline" className="text-xs">
                      Ethernet
                    </Badge>
                  )}
                  {hardware.connectivity.cellular && (
                    <Badge variant="outline" className="text-xs">
                      Cellular
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        {(hardware.lastMaintenance || hardware.warrantyExpires) && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
            {hardware.lastMaintenance && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Maintenance</label>
                <p className="text-sm">{new Date(hardware.lastMaintenance).toLocaleDateString()}</p>
              </div>
            )}
            {hardware.warrantyExpires && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Warranty Expires</label>
                <p className="text-sm">{new Date(hardware.warrantyExpires).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
