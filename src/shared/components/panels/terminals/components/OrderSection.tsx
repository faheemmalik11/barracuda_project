import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'

interface OrderSectionProps {
  terminalData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function OrderSection({ terminalData, isExpanded = true, onToggle, isDetailView = false }: OrderSectionProps) {
  const orderData = {
    currentOrder: {
      id: 'ORD-2024-001',
      status: 'pending',
      items: [
        { name: 'Receipt Paper Rolls', quantity: 10, price: 45.00 },
        { name: 'Cleaning Kit', quantity: 2, price: 25.00 }
      ],
      total: 95.00,
      expectedDelivery: '2024-02-15'
    },
    recentOrders: [
      {
        id: 'ORD-2024-002',
        date: '2024-01-20',
        status: 'delivered',
        items: 'Terminal Stand, Power Cable',
        total: 125.00
      },
      {
        id: 'ORD-2024-003',
        date: '2024-01-15',
        status: 'delivered',
        items: 'Receipt Paper (20 rolls)',
        total: 80.00
      }
    ],
    supplies: {
      receiptPaper: {
        current: 3,
        minimum: 5,
        status: 'low'
      },
      cleaningSupplies: {
        current: 8,
        minimum: 3,
        status: 'good'
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Supply Orders</CardTitle>
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
          {/* Current Order */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Current Order</h4>
            <div className="p-3 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">{orderData.currentOrder.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Expected delivery: {orderData.currentOrder.expectedDelivery}
                  </p>
                </div>
                <Badge variant={orderData.currentOrder.status === 'pending' ? 'secondary' : 'default'}>
                  {orderData.currentOrder.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {orderData.currentOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderData.currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supply Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Supply Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Receipt Paper</p>
                  <p className="text-xs text-muted-foreground">
                    {orderData.supplies.receiptPaper.current} rolls remaining
                  </p>
                </div>
                <Badge variant={orderData.supplies.receiptPaper.status === 'low' ? 'destructive' : 'default'}>
                  {orderData.supplies.receiptPaper.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Cleaning Supplies</p>
                  <p className="text-xs text-muted-foreground">
                    {orderData.supplies.cleaningSupplies.current} kits available
                  </p>
                </div>
                <Badge variant={orderData.supplies.cleaningSupplies.status === 'good' ? 'default' : 'destructive'}>
                  {orderData.supplies.cleaningSupplies.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Orders</h4>
            <div className="space-y-2">
              {orderData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{order.id}</p>
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.date} • {order.items}
                    </p>
                  </div>
                  <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Order Supplies
              </button>
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Track Order
              </button>
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                View History
              </button>
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Set Auto-Order
              </button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
