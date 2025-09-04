import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Wifi, Globe, Signal, Router } from 'lucide-react'

interface ConnectivityInfo {
  wifi: {
    connected: boolean
    ssid?: string
    signalStrength?: number
    ipAddress?: string
  }
  ethernet: {
    connected: boolean
    ipAddress?: string
    speed?: string
  }
  cellular: {
    connected: boolean
    carrier?: string
    signalStrength?: number
  }
  lastConnected?: string
  uptime?: string
}

interface ConnectivitySectionProps {
  connectivity: ConnectivityInfo
  title?: string
}

export function ConnectivitySection({ connectivity, title = "Connectivity Status" }: ConnectivitySectionProps) {
  const getSignalColor = (strength?: number) => {
    if (!strength) return 'text-muted-foreground'
    if (strength > 75) return 'text-green-600'
    if (strength > 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Signal className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* WiFi */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5" />
              <div>
                <p className="font-medium">WiFi</p>
                {connectivity.wifi.ssid && (
                  <p className="text-sm text-muted-foreground">{connectivity.wifi.ssid}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <Badge variant={connectivity.wifi.connected ? 'default' : 'secondary'}>
                {connectivity.wifi.connected ? 'Connected' : 'Disconnected'}
              </Badge>
              {connectivity.wifi.signalStrength && (
                <p className={`text-sm mt-1 ${getSignalColor(connectivity.wifi.signalStrength)}`}>
                  {connectivity.wifi.signalStrength}% signal
                </p>
              )}
            </div>
          </div>

          {/* Ethernet */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5" />
              <div>
                <p className="font-medium">Ethernet</p>
                {connectivity.ethernet.speed && (
                  <p className="text-sm text-muted-foreground">{connectivity.ethernet.speed}</p>
                )}
              </div>
            </div>
            <Badge variant={connectivity.ethernet.connected ? 'default' : 'secondary'}>
              {connectivity.ethernet.connected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>

          {/* Cellular */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Router className="h-5 w-5" />
              <div>
                <p className="font-medium">Cellular</p>
                {connectivity.cellular.carrier && (
                  <p className="text-sm text-muted-foreground">{connectivity.cellular.carrier}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <Badge variant={connectivity.cellular.connected ? 'default' : 'secondary'}>
                {connectivity.cellular.connected ? 'Connected' : 'Disconnected'}
              </Badge>
              {connectivity.cellular.signalStrength && (
                <p className={`text-sm mt-1 ${getSignalColor(connectivity.cellular.signalStrength)}`}>
                  {connectivity.cellular.signalStrength}% signal
                </p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          {(connectivity.lastConnected || connectivity.uptime) && (
            <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectivity.lastConnected && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Connected</label>
                  <p className="text-sm">{new Date(connectivity.lastConnected).toLocaleString()}</p>
                </div>
              )}
              {connectivity.uptime && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Uptime</label>
                  <p className="text-sm">{connectivity.uptime}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
