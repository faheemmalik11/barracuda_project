import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { ShoppingCart, Package, Truck, CheckCircle } from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
}

interface OrderSectionProps {
  orders: Order[]
  title?: string
  onViewOrder?: (orderId: string) => void
}

export function OrderSection({ orders, title = "Recent Orders", onViewOrder }: OrderSectionProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ShoppingCart className="h-4 w-4" />
      case 'processing': return <Package className="h-4 w-4" />
      case 'shipped': return <Truck className="h-4 w-4" />
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      default: return <ShoppingCart className="h-4 w-4" />
    }
  }

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders found</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium">Order #{order.id}</span>
                    </div>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-sm text-muted-foreground">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>

                {order.trackingNumber && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Tracking: {order.trackingNumber}
                  </div>
                )}

                {order.estimatedDelivery && (
                  <div className="text-sm text-muted-foreground mb-3">
                    Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </div>
                )}

                {onViewOrder && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onViewOrder(order.id)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
