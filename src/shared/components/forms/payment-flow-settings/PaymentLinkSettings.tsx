import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Checkbox } from "@shared/components/ui/checkbox"
import { type PaymentFormData } from "@shared/data/mockCreatePayment"

interface PaymentLinkSettingsProps {
  formData: PaymentFormData
  updateFormData: (updates: Partial<PaymentFormData>) => void
}

export const PaymentLinkSettings = ({ formData, updateFormData }: PaymentLinkSettingsProps) => {
  const handlePaymentLinkUpdate = (updates: Partial<NonNullable<PaymentFormData['paymentLink']>>) => {
    updateFormData({ 
      paymentLink: { 
        ...formData.paymentLink, 
        ...updates
      } 
    })
  }

  const formatDateTimeForInput = (date?: Date) => {
    if (!date) return ''
    return date.toISOString().slice(0, 16)
  }

  const handleExpiresAtChange = (value: string) => {
    handlePaymentLinkUpdate({ 
      expiresAt: value ? new Date(value) : undefined 
    })
  }

  const minDateTime = new Date().toISOString().slice(0, 16)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment link settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="expires-at">Expires at</Label>
            <Input
              id="expires-at"
              type="datetime-local"
              value={formatDateTimeForInput(formData.paymentLink?.expiresAt)}
              onChange={(e) => handleExpiresAtChange(e.target.value)}
              min={minDateTime}
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collect-shipping"
                checked={formData.paymentLink?.collectShipping || false}
                onCheckedChange={(checked) => handlePaymentLinkUpdate({ collectShipping: !!checked })}
              />
              <Label htmlFor="collect-shipping" className="cursor-pointer text-sm">
                Collect shipping address
              </Label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="success-url">Success URL</Label>
            <Input
              id="success-url"
              type="url"
              placeholder="https://yoursite.com/success"
              value={formData.paymentLink?.successUrl || ''}
              onChange={(e) => handlePaymentLinkUpdate({ successUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cancel-url">Cancel URL</Label>
            <Input
              id="cancel-url"
              type="url"
              placeholder="https://yoursite.com/cancel"
              value={formData.paymentLink?.cancelUrl || ''}
              onChange={(e) => handlePaymentLinkUpdate({ cancelUrl: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 