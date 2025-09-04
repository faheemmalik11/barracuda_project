import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Package, DollarSign, Clock, Repeat } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkProductSectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkProductSection({ 
  paymentLink
}: PaymentLinkProductSectionProps) {
  return (
    <CollapsibleSection
      title="What is the customer paying for?"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                <div className="text-sm font-medium mt-1">
                  {paymentLink.productName || paymentLink.name}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <div className="mt-1">
                  <Badge variant="outline" className="capitalize">
                    {paymentLink.type}
                  </Badge>
                </div>
              </div>
            </div>

            {paymentLink.productDescription && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <div className="text-sm mt-1">{paymentLink.productDescription}</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <div className="text-sm font-medium">
                    {paymentLink.amount 
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: paymentLink.currency
                        }).format(paymentLink.amount / 100)
                      : 'Variable amount'
                    }
                  </div>
                </div>
              </div>

              {paymentLink.type === 'subscription' && (
                <div className="flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Billing</label>
                    <div className="text-sm font-medium">
                      Every {paymentLink.recurringIntervalCount || 1} {paymentLink.recurringInterval}
                      {(paymentLink.recurringIntervalCount || 1) > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              )}

              {paymentLink.trialPeriodDays && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trial Period</label>
                    <div className="text-sm font-medium">
                      {paymentLink.trialPeriodDays} days
                    </div>
                  </div>
                </div>
              )}
            </div>

            {paymentLink.customFields && paymentLink.customFields.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Custom Fields</label>
                <div className="mt-2 space-y-2">
                  {paymentLink.customFields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div>
                        <div className="text-sm font-medium">{field.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {field.type} • {field.required ? 'Required' : 'Optional'}
                        </div>
                      </div>
                      {field.options && (
                        <Badge variant="secondary" className="text-xs">
                          {field.options.length} options
                        </Badge>
                      )}
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
