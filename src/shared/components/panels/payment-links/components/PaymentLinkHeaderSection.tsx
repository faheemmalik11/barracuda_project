import React from 'react'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Copy, ExternalLink, Edit } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkHeaderSectionProps {
  paymentLink: PaymentLink
  isExpanded: boolean
  onToggle: () => void
  supportsExpansion: boolean
}

export function PaymentLinkHeaderSection({ 
  paymentLink,
  isExpanded,
  onToggle,
  supportsExpansion 
}: PaymentLinkHeaderSectionProps) {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(paymentLink.url)
  }

  const handleOpenUrl = () => {
    window.open(paymentLink.url, '_blank')
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold">{paymentLink.name}</h1>
              <Badge 
                variant={paymentLink.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {paymentLink.status}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {paymentLink.type}
              </Badge>
            </div>
            {paymentLink.description && (
              <p className="text-muted-foreground mb-4">{paymentLink.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyUrl}>
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </Button>
            <Button variant="outline" size="sm" onClick={handleOpenUrl}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Created</span>
            <div className="font-medium">
              {new Date(paymentLink.created).toLocaleDateString()}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Last Used</span>
            <div className="font-medium">
              {paymentLink.lastUsed 
                ? new Date(paymentLink.lastUsed).toLocaleDateString()
                : 'Never'
              }
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Views</span>
            <div className="font-medium">{paymentLink.views.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Conversions</span>
            <div className="font-medium">{paymentLink.conversions.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
