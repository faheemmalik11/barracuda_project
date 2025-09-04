import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { Button } from '@shared/components/ui/button';
import { ShoppingCart, Package, Truck, Calendar, DollarSign, User } from 'lucide-react';

interface OrderSectionProps {
  inventoryData?: any;
  isExpanded?: boolean;
  onToggle?: () => void;
  isDetailView?: boolean;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ 
  inventoryData: _inventoryData,
  isExpanded = true,
  onToggle,
  isDetailView = false 
}) => {
  // Mock order data
  const orderData = {
    currentOrder: {
      id: 'ORD-2024-001234',
      status: 'processing',
      items: [
        {
          id: 'item_001',
          name: 'Clover Station Pro',
          quantity: 2,
          unitPrice: 1299.99,
          total: 2599.98
        },
        {
          id: 'item_002',
          name: 'Receipt Paper Rolls (50 pack)',
          quantity: 1,
          unitPrice: 89.99,
          total: 89.99
        }
      ],
      subtotal: 2689.97,
      tax: 215.20,
      shipping: 25.00,
      total: 2930.17,
      orderDate: '2024-01-25T14:30:00Z',
      estimatedDelivery: '2024-02-02T00:00:00Z',
      shippingAddress: {
        name: 'Downtown Electronics Store',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      },
      trackingNumber: 'TRK789456123'
    },
    recentOrders: [
      {
        id: 'ORD-2024-001233',
        status: 'delivered',
        total: 1599.99,
        orderDate: '2024-01-15T10:15:00Z',
        deliveryDate: '2024-01-22T16:45:00Z'
      },
      {
        id: 'ORD-2024-001232',
        status: 'delivered',
        total: 899.50,
        orderDate: '2024-01-08T09:30:00Z',
        deliveryDate: '2024-01-15T14:20:00Z'
      },
      {
        id: 'ORD-2024-001231',
        status: 'cancelled',
        total: 2199.99,
        orderDate: '2024-01-03T11:45:00Z',
        cancelDate: '2024-01-04T08:30:00Z'
      }
    ],
    orderHistory: {
      totalOrders: 47,
      totalSpent: 89567.43,
      averageOrderValue: 1905.05,
      lastOrderDate: '2024-01-25T14:30:00Z'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className={`cursor-pointer ${!isDetailView ? 'hover:bg-muted/50' : ''}`}
        onClick={!isDetailView ? onToggle : undefined}
      >
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">
              {orderData.orderHistory.totalOrders} total
            </Badge>
            <Badge className={getStatusColor(orderData.currentOrder.status)}>
              {orderData.currentOrder.status}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Current Order */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Current Order
            </h4>
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{orderData.currentOrder.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Ordered: {formatDate(orderData.currentOrder.orderDate)}
                  </p>
                </div>
                <Badge className={getStatusColor(orderData.currentOrder.status)}>
                  {orderData.currentOrder.status}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                {orderData.currentOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(item.total)}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(item.unitPrice)} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(orderData.currentOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(orderData.currentOrder.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{formatCurrency(orderData.currentOrder.shipping)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1 border-t">
                  <span>Total:</span>
                  <span>{formatCurrency(orderData.currentOrder.total)}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4" />
                  <span>Estimated delivery: {formatDate(orderData.currentOrder.estimatedDelivery)}</span>
                </div>
                {orderData.currentOrder.trackingNumber && (
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="text-muted-foreground">Tracking:</span>
                    <span className="font-mono">{orderData.currentOrder.trackingNumber}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  Track Order
                </Button>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Shipping Address
            </h4>
            <div className="p-3 rounded-lg border bg-card text-sm">
              <p className="font-medium">{orderData.currentOrder.shippingAddress.name}</p>
              <p>{orderData.currentOrder.shippingAddress.street}</p>
              <p>
                {orderData.currentOrder.shippingAddress.city}, {orderData.currentOrder.shippingAddress.state} {orderData.currentOrder.shippingAddress.zip}
              </p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Orders
            </h4>
            <div className="space-y-2">
              {orderData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.orderDate)}
                      {order.deliveryDate && ` • Delivered ${formatDate(order.deliveryDate)}`}
                      {order.cancelDate && ` • Cancelled ${formatDate(order.cancelDate)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{formatCurrency(order.total)}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Statistics */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Order History
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border bg-card text-center">
                <p className="text-2xl font-bold">{orderData.orderHistory.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="p-3 rounded-lg border bg-card text-center">
                <p className="text-2xl font-bold">{formatCurrency(orderData.orderHistory.totalSpent)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
              <div className="p-3 rounded-lg border bg-card text-center">
                <p className="text-2xl font-bold">{formatCurrency(orderData.orderHistory.averageOrderValue)}</p>
                <p className="text-sm text-muted-foreground">Average Order</p>
              </div>
              <div className="p-3 rounded-lg border bg-card text-center">
                <p className="text-sm font-medium">{formatDate(orderData.orderHistory.lastOrderDate)}</p>
                <p className="text-sm text-muted-foreground">Last Order</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex gap-2">
            <Button size="sm">
              Place New Order
            </Button>
            <Button size="sm" variant="outline">
              View All Orders
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};