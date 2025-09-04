import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { User, MapPin, CreditCard, Tag } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkProfileSectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkProfileSection({ 
  paymentLink
}: PaymentLinkProfileSectionProps) {
  return (
    <CollapsibleSection
      title="Profile"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Collect Shipping</label>
                  <div className="text-sm font-medium">
                    <Badge variant={paymentLink.collectShipping ? 'default' : 'secondary'}>
                      {paymentLink.collectShipping ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Collect Tax ID</label>
                  <div className="text-sm font-medium">
                    <Badge variant={paymentLink.collectTaxId ? 'default' : 'secondary'}>
                      {paymentLink.collectTaxId ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Promotion Codes</label>
                  <div className="text-sm font-medium">
                    <Badge variant={paymentLink.allowPromotionCodes ? 'default' : 'secondary'}>
                      {paymentLink.allowPromotionCodes ? 'Allowed' : 'Not Allowed'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {paymentLink.successUrl && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Success URL</label>
                <div className="text-sm mt-1 font-mono bg-muted p-2 rounded">
                  {paymentLink.successUrl}
                </div>
              </div>
            )}

            {paymentLink.cancelUrl && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cancel URL</label>
                <div className="text-sm mt-1 font-mono bg-muted p-2 rounded">
                  {paymentLink.cancelUrl}
                </div>
              </div>
            )}

            {paymentLink.metadata && Object.keys(paymentLink.metadata).length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Metadata</label>
                <div className="mt-2 space-y-1">
                  {Object.entries(paymentLink.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </CollapsibleSection>
  )
}
