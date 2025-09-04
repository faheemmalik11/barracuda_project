import { useParams, useNavigate } from 'react-router-dom'
import { DetailHeader } from '../components/detail/DetailHeader'
import { ActivitySection } from '../components/detail/ActivitySection'
import { OrderSection } from '../components/detail/OrderSection'
import { Settings, Package, AlertTriangle, Truck } from 'lucide-react'

export function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data - in real app, fetch based on ID
  const order = {
    id: id || 'ORD001',
    name: `Order #${id}`,
    status: 'processing',
    customer: 'John Smith',
    store: 'Downtown Location'
  }

  const activities = [
    {
      id: '1',
      type: 'Order Update',
      description: 'Order status changed to processing',
      timestamp: new Date().toISOString(),
      status: 'success',
      user: 'System'
    },
    {
      id: '2',
      type: 'Payment',
      description: 'Payment of $299.99 processed successfully',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: 'success',
      user: 'Payment Gateway'
    },
    {
      id: '3',
      type: 'Order Created',
      description: 'Order created by customer',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'success',
      user: 'Customer Portal'
    }
  ]

  const orderDetails = [
    {
      id: order.id,
      date: new Date(Date.now() - 3600000).toISOString(),
      status: order.status as 'pending' | 'processing' | 'shipped' | 'delivered',
      total: 299.99,
      items: [
        { id: '1', name: 'Wireless Headphones', quantity: 1, price: 199.99, status: 'processing' as const },
        { id: '2', name: 'Phone Case', quantity: 2, price: 49.99, status: 'processing' as const },
        { id: '3', name: 'Screen Protector', quantity: 1, price: 0.01, status: 'processing' as const }
      ],
      trackingNumber: 'TRK456789123',
      estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString()
    }
  ]

  const handleBack = () => {
    navigate('/in-stores/orders')
  }

  const headerActions = [
    {
      label: 'Update Status',
      onClick: () => console.log('Update order status'),
      icon: Package
    },
    {
      label: 'Track Shipment',
      onClick: () => console.log('Track shipment'),
      icon: Truck
    },
    {
      label: 'Configure',
      onClick: () => console.log('Configure order'),
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
      case 'delivered': return 'default'
      case 'shipped': return 'outline'
      case 'processing': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DetailHeader
        title={order.name}
        subtitle={`Customer: ${order.customer}`}
        status={order.status}
        statusVariant={getStatusVariant(order.status)}
        onBack={handleBack}
        actions={headerActions}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ActivitySection activities={activities} title="Order Timeline" />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <OrderSection orders={orderDetails} title="Order Details" />
          </div>
        </div>
      </div>
    </div>
  )
}
