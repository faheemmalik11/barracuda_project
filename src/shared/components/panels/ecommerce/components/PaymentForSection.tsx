import React from 'react'
import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'
import { ShoppingCart, Package, CreditCard } from 'lucide-react'

interface PaymentForSectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function PaymentForSection({ ecommerceData, isExpanded, onToggle, isDetailView }: PaymentForSectionProps) {
  const mockPaymentItems = [
    {
      id: '1',
      type: 'product',
      name: 'Premium Subscription',
      description: 'Monthly premium plan with advanced features',
      price: 29.99,
      currency: 'USD',
      icon: <Package className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'service',
      name: 'Consultation Service',
      description: '1-hour expert consultation',
      price: 150.00,
      currency: 'USD',
      icon: <CreditCard className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'digital',
      name: 'Digital Download',
      description: 'E-book and resources bundle',
      price: 19.99,
      currency: 'USD',
      icon: <ShoppingCart className="h-4 w-4" />
    }
  ]

  return (
    <CollapsibleSection
      title="What is the customer paying for?"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isDetailView={isDetailView}
    >
      <div className="space-y-3">
        {mockPaymentItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            <div className="p-2 bg-muted rounded">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{item.name}</h4>
                <Badge variant="outline">
                  {item.currency} {item.price}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              <Badge variant="secondary" className="mt-2">
                {item.type}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  )
}
