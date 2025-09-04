import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { Progress } from '@shared/components/ui/progress';
import { Cpu, HardDrive, Wifi, Battery, Thermometer, Signal } from 'lucide-react';

interface HardwareSectionProps {
  inventoryData?: any;
  isExpanded?: boolean;
  onToggle?: () => void;
  isDetailView?: boolean;
}

export const HardwareSection: React.FC<HardwareSectionProps> = ({ 
  inventoryData,
  isExpanded = true,
  onToggle,
  isDetailView = false 
}) => {
  // Mock hardware data
  const hardwareInfo = {
    processor: {
      model: 'ARM Cortex-A72',
      cores: 4,
      frequency: '1.5 GHz',
      temperature: 42,
      usage: 23
    },
    memory: {
      total: '4 GB',
      used: '1.2 GB',
      available: '2.8 GB',
      usage: 30
    },
    storage: {
      total: '32 GB',
      used: '8.5 GB',
      available: '23.5 GB',
      usage: 27
    },
    battery: {
      level: inventoryData?.batteryLevel || 85,
      status: 'charging',
      health: 'good',
      cycles: 342
    },
    connectivity: {
      wifi: {
        status: 'connected',
        ssid: 'Store_Network_5G',
        signal: -45,
        speed: '150 Mbps'
      },
      cellular: {
        status: 'connected',
        carrier: 'Verizon',
        signal: -78,
        type: '4G LTE'
      }
    },
    sensors: {
      accelerometer: 'active',
      gyroscope: 'active',
      magnetometer: 'active',
      proximity: 'active'
    }
  };

  const getSignalStrength = (dbm: number) => {
    if (dbm >= -50) return { strength: 'excellent', color: 'text-green-600' };
    if (dbm >= -60) return { strength: 'good', color: 'text-green-500' };
    if (dbm >= -70) return { strength: 'fair', color: 'text-yellow-500' };
    return { strength: 'poor', color: 'text-red-500' };
  };

  const getBatteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    if (level >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className={`cursor-pointer ${!isDetailView ? 'hover:bg-muted/50' : ''}`}
        onClick={!isDetailView ? onToggle : undefined}
      >
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Hardware Status
          </div>
          <Badge variant="secondary" className="ml-2">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Processor */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Processor
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Model:</span>
                <p className="font-medium">{hardwareInfo.processor.model}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Cores:</span>
                <p className="font-medium">{hardwareInfo.processor.cores} cores @ {hardwareInfo.processor.frequency}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Temperature:</span>
                <p className="font-medium flex items-center gap-1">
                  <Thermometer className="h-3 w-3" />
                  {hardwareInfo.processor.temperature}°C
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Usage:</span>
                <div className="flex items-center gap-2">
                  <Progress value={hardwareInfo.processor.usage} className="flex-1" />
                  <span className="text-xs">{hardwareInfo.processor.usage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Memory & Storage */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Memory & Storage
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory ({hardwareInfo.memory.used} / {hardwareInfo.memory.total})</span>
                  <span>{hardwareInfo.memory.usage}%</span>
                </div>
                <Progress value={hardwareInfo.memory.usage} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage ({hardwareInfo.storage.used} / {hardwareInfo.storage.total})</span>
                  <span>{hardwareInfo.storage.usage}%</span>
                </div>
                <Progress value={hardwareInfo.storage.usage} />
              </div>
            </div>
          </div>

          {/* Battery */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Battery className="h-4 w-4" />
              Battery
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Level:</span>
                <div className="flex items-center gap-2">
                  <Progress value={hardwareInfo.battery.level} className="flex-1" />
                  <span className={`font-medium ${getBatteryColor(hardwareInfo.battery.level)}`}>
                    {hardwareInfo.battery.level}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-medium capitalize">{hardwareInfo.battery.status}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Health:</span>
                <Badge variant="secondary" className="capitalize">
                  {hardwareInfo.battery.health}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Cycles:</span>
                <p className="font-medium">{hardwareInfo.battery.cycles}</p>
              </div>
            </div>
          </div>

          {/* Connectivity */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Connectivity
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Wi-Fi</span>
                  <Badge variant="secondary" className="capitalize">
                    {hardwareInfo.connectivity.wifi.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>SSID: {hardwareInfo.connectivity.wifi.ssid}</div>
                  <div>Speed: {hardwareInfo.connectivity.wifi.speed}</div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    Signal: {getSignalStrength(hardwareInfo.connectivity.wifi.signal).strength}
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Cellular</span>
                  <Badge variant="secondary" className="capitalize">
                    {hardwareInfo.connectivity.cellular.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>Carrier: {hardwareInfo.connectivity.cellular.carrier}</div>
                  <div>Type: {hardwareInfo.connectivity.cellular.type}</div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    Signal: {getSignalStrength(hardwareInfo.connectivity.cellular.signal).strength}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sensors */}
          <div className="space-y-3">
            <h4 className="font-medium">Sensors</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(hardwareInfo.sensors).map(([sensor, status]) => (
                <div key={sensor} className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm capitalize">{sensor}</span>
                  <Badge variant={status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};