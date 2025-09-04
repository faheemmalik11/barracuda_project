import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Package, MapPin, Truck, CreditCard, User, Building } from 'lucide-react'

interface OrderSectionProps {
  orderData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function OrderSection({ orderData = null, isExpanded = true, onToggle, isDetailView = false }: OrderSectionProps) {
  // Mock order details data
  const orderDetails = {
    items: [
      {
        id: 'item_001',
        name: 'Terminal Pro X1',
        sku: 'TPX1-001',
        quantity: 2,
        unitPrice: 599.99,
        totalPrice: 1199.98,
        category: 'Hardware'
      },
      {
        id: 'item_002',
        name: 'Card Reader Module',
        sku: 'CRM-002',
        quantity: 2,
        unitPrice: 50.00,
        totalPrice: 100.00,
        category: 'Accessories'
      }
    ],
    shipping: {
      method: 'Express Delivery',
      carrier: 'FedEx',
      trackingNumber: 'FX123456789',
      estimatedDelivery: '2024-01-25',
      shippingCost: 25.00
    },
    billing: {
      method: 'Credit Card',
      last4: '4242',
      cardType: 'Visa',
      billingAddress: {
        street: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      }
    },
    delivery: {
      address: {
        name: 'Downtown Store',
        street: '456 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10002',
        country: 'USA'
      },
      instructions: 'Deliver to loading dock. Contact manager on arrival.'
    }
  }

  return (
    <div className="space-y-4">
      {/* Order Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">SKU: {item.sku}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Qty: {item.quantity}</span>
                    <span>Unit: ${item.unitPrice}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${item.totalPrice}</div>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${orderDetails.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>${orderDetails.shipping.shippingCost}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax</span>
                <span>${(orderDetails.items.reduce((sum, item) => sum + item.totalPrice, 0) * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2 mt-2">
                <span>Total</span>
                <span>${(orderDetails.items.reduce((sum, item) => sum + item.totalPrice, 0) + orderDetails.shipping.shippingCost + (orderDetails.items.reduce((sum, item) => sum + item.totalPrice, 0) * 0.08)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium">{orderDetails.shipping.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Carrier</span>
                <span className="text-sm font-medium">{orderDetails.shipping.carrier}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tracking</span>
                <span className="text-sm font-medium">{orderDetails.shipping.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Est. Delivery</span>
                <span className="text-sm font-medium">{orderDetails.shipping.estimatedDelivery}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{orderDetails.delivery.address.name}</span>
            </div>
            <div className="text-sm text-muted-foreground ml-6">
              <div>{orderDetails.delivery.address.street}</div>
              <div>{orderDetails.delivery.address.city}, {orderDetails.delivery.address.state} {orderDetails.delivery.address.zip}</div>
              <div>{orderDetails.delivery.address.country}</div>
            </div>
            {orderDetails.delivery.instructions && (
              <div className="mt-3 p-2 bg-muted rounded text-sm">
                <strong>Delivery Instructions:</strong> {orderDetails.delivery.instructions}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Payment Method</span>
                  <span className="text-sm font-medium">{orderDetails.billing.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Card</span>
                  <span className="text-sm font-medium">{orderDetails.billing.cardType} ****{orderDetails.billing.last4}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Billing Address</h4>
              <div className="text-sm text-muted-foreground">
                <div>{orderDetails.billing.billingAddress.street}</div>
                <div>{orderDetails.billing.billingAddress.city}, {orderDetails.billing.billingAddress.state} {orderDetails.billing.billingAddress.zip}</div>
                <div>{orderDetails.billing.billingAddress.country}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
