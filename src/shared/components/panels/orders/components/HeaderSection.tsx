import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Package, Calendar, DollarSign, Hash } from 'lucide-react'

interface HeaderSectionProps {
  orderData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function HeaderSection({ orderData = null, isExpanded = true, onToggle, isDetailView = false }: HeaderSectionProps) {
  // Mock header data
  const headerData = {
    orderId: orderData?.orderId || 'ORD-2024-001',
    description: orderData?.description || '2x Terminal Pro X1 for Downtown Store',
    status: orderData?.status || 'fulfilled',
    totalAmount: orderData?.amount || 1299.98,
    itemCount: orderData?.items || 2,
    orderDate: orderData?.created || '2024-01-15',
    expectedDelivery: orderData?.expectedDelivery || '2024-01-25',
    priority: orderData?.priority || 'high'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fulfilled': return 'default'
      case 'pending': return 'secondary'
      case 'returned': return 'destructive'
      case 'cancelled': return 'outline'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="text-sm font-medium">{headerData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={getStatusColor(headerData.status)}>{headerData.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <Badge variant={getPriorityColor(headerData.priority)}>{headerData.priority}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Items</span>
                <span className="text-sm font-medium">{headerData.itemCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="text-sm font-medium">${headerData.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tax</span>
                <span className="text-sm font-medium">${(headerData.totalAmount * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Shipping</span>
                <span className="text-sm font-medium">$25.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-sm">Grand Total</span>
                <span className="text-sm">${(headerData.totalAmount + (headerData.totalAmount * 0.08) + 25).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order Date</span>
              <span className="text-sm font-medium">{headerData.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Expected Delivery</span>
              <span className="text-sm font-medium">{headerData.expectedDelivery}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{headerData.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
