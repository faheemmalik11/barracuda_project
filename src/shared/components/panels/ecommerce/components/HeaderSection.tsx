import React from 'react'
import { Card, CardContent } from '@shared/components/ui/card'

interface HeaderSectionProps {
  ecommerceData?: any
  isDetailView?: boolean
}

export function HeaderSection({ ecommerceData, isDetailView }: HeaderSectionProps) {
  const mockData = {
    title: ecommerceData?.name || 'Ecommerce Integration',
    description: ecommerceData?.description || 'Integration details and overview',
    lastUpdated: ecommerceData?.lastUsed || '2024-01-15T10:30:00Z'
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{mockData.title}</h3>
          <p className="text-sm text-muted-foreground">{mockData.description}</p>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(mockData.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
