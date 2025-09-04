import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Settings, Calendar, Link, Edit } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkConfigurationSectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkConfigurationSection({ 
  paymentLink
}: PaymentLinkConfigurationSectionProps) {
  return (
    <CollapsibleSection
      title="Configuration"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Payment Link URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-sm font-mono bg-muted p-2 rounded flex-1 truncate">
                    {paymentLink.url}
                  </div>
                  <Button variant="outline" size="sm">
                    <Link className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Currency</label>
                <div className="text-sm font-medium mt-1">
                  <Badge variant="outline">{paymentLink.currency}</Badge>
                </div>
              </div>

              {paymentLink.expiresAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expires</label>
                    <div className="text-sm font-medium mt-1">
                      {new Date(paymentLink.expiresAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge 
                    variant={paymentLink.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {paymentLink.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Collect shipping information</div>
                  <div className="text-xs text-muted-foreground">
                    Ask customers for their shipping address
                  </div>
                </div>
                <Badge variant={paymentLink.collectShipping ? 'default' : 'secondary'}>
                  {paymentLink.collectShipping ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Collect tax ID</div>
                  <div className="text-xs text-muted-foreground">
                    Ask customers for their tax identification number
                  </div>
                </div>
                <Badge variant={paymentLink.collectTaxId ? 'default' : 'secondary'}>
                  {paymentLink.collectTaxId ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Allow promotion codes</div>
                  <div className="text-xs text-muted-foreground">
                    Let customers enter discount codes
                  </div>
                </div>
                <Badge variant={paymentLink.allowPromotionCodes ? 'default' : 'secondary'}>
                  {paymentLink.allowPromotionCodes ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Last modified: {new Date(paymentLink.created).toLocaleDateString()}
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Configuration
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CollapsibleSection>
  )
}
