import { useParams, useNavigate } from 'react-router-dom'
import { DetailHeader } from '../components/detail/DetailHeader'
import { ActivitySection } from '../components/detail/ActivitySection'
import { HardwareSection } from '../components/detail/HardwareSection'
import { ConfigurationSection } from '../components/detail/ConfigurationSection'
import { OrderSection } from '../components/detail/OrderSection'
import { Settings, Package, AlertTriangle } from 'lucide-react'

export function InventoryDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data - in real app, fetch based on ID
  const inventory = {
    id: id || 'INV001',
    name: `Inventory Item ${id}`,
    status: 'in_stock',
    location: 'Warehouse A - Shelf 12',
    store: 'Downtown Location'
  }

  const activities = [
    {
      id: '1',
      type: 'Stock Update',
      description: 'Inventory count updated: 45 units available',
      timestamp: new Date().toISOString(),
      status: 'success',
      user: 'System'
    },
    {
      id: '2',
      type: 'Reorder',
      description: 'Automatic reorder triggered for 100 units',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'success',
      user: 'Inventory Manager'
    },
    {
      id: '3',
      type: 'Low Stock Alert',
      description: 'Stock level below minimum threshold (10 units)',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'warning',
      user: 'System'
    }
  ]

  const hardware = {
    model: 'Zebra ZT230 Barcode Printer',
    serialNumber: 'ZT230-2024-INV001',
    firmwareVersion: '1.2.3',
    storage: {
      total: '8 GB',
      used: '2.1 GB',
      available: '5.9 GB'
    },
    connectivity: {
      wifi: true,
      ethernet: true,
      cellular: false
    },
    lastMaintenance: '2024-08-01',
    warrantyExpires: '2026-12-31'
  }

  const configurations = [
    {
      key: 'auto_reorder',
      label: 'Auto Reorder',
      value: true,
      type: 'boolean' as const,
      editable: true
    },
    {
      key: 'min_stock_level',
      label: 'Minimum Stock Level',
      value: 10,
      type: 'number' as const,
      editable: true
    },
    {
      key: 'max_stock_level',
      label: 'Maximum Stock Level',
      value: 500,
      type: 'number' as const,
      editable: true
    },
    {
      key: 'supplier_code',
      label: 'Supplier Code',
      value: 'SUP_001',
      type: 'text' as const,
      editable: false
    }
  ]

  const orders = [
    {
      id: 'ORD-INV-001',
      date: new Date().toISOString(),
      status: 'processing' as const,
      total: 1250.00,
      items: [
        { id: '1', name: 'Product Units', quantity: 100, price: 12.50, status: 'processing' as const }
      ],
      trackingNumber: 'TRK987654321',
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString()
    },
    {
      id: 'ORD-INV-002',
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      status: 'delivered' as const,
      total: 875.00,
      items: [
        { id: '2', name: 'Product Units', quantity: 70, price: 12.50, status: 'delivered' as const }
      ],
      trackingNumber: 'TRK123987456'
    }
  ]

  const handleBack = () => {
    navigate('/in-stores/inventory')
  }

  const headerActions = [
    {
      label: 'Update Stock',
      onClick: () => console.log('Update stock'),
      icon: Package
    },
    {
      label: 'Configure',
      onClick: () => console.log('Configure inventory'),
      icon: Settings
    },
    {
      label: 'Report Issue',
      onClick: () => console.log('Report issue'),
      icon: AlertTriangle
    }
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'in_stock': return 'default'
      case 'low_stock': return 'outline'
      case 'out_of_stock': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DetailHeader
        title={inventory.name}
        subtitle={inventory.location}
        status={inventory.status.replace('_', ' ')}
        statusVariant={getStatusVariant(inventory.status)}
        onBack={handleBack}
        actions={headerActions}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-none w-full">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Activity */}
            <div className="xl:col-span-2 space-y-6">
              <ActivitySection activities={activities} />
            </div>

            {/* Middle Column - Hardware */}
            <div className="space-y-6">
              <HardwareSection hardware={hardware} title="Equipment Information" />
            </div>

            {/* Right Column - Configuration & Orders */}
            <div className="space-y-6">
              <ConfigurationSection configurations={configurations} />
              <OrderSection orders={orders} title="Supply Orders" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
