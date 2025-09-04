import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

interface CardsSectionProps {
  ecommerceData?: any
  isDetailView?: boolean
}

export function CardsSection({ ecommerceData, isDetailView }: CardsSectionProps) {
  const mockData = {
    transactions30d: ecommerceData?.transactions30d || 1247,
    volume30d: ecommerceData?.volume30d || 45678.90,
    successRate: ecommerceData?.successRate || 98.5,
    activeUsers: 892
  }

  const cards = [
    {
      title: 'Transactions (30d)',
      value: mockData.transactions30d.toLocaleString(),
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: 'Volume (30d)',
      value: `$${mockData.volume30d.toLocaleString()}`,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Success Rate',
      value: `${mockData.successRate}%`,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'Active Users',
      value: mockData.activeUsers.toLocaleString(),
      icon: <Users className="h-4 w-4" />
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
