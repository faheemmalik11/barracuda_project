import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { Badge } from "@shared/components/ui/badge"
import { CreditCard } from "lucide-react"
import { ToggleButtonGroup } from "@shared/components/forms/ToggleButtonGroup"
import type { PaymentFormData } from "@shared/data/mockCreatePayment"

interface PaymentMethodSectionProps {
  formData: PaymentFormData
  customerPaymentMethods: Array<{
    id: string
    brand: string
    last4: string
    expiryMonth: number
    expiryYear: string
  }>
  onPaymentMethodChange: (updates: Partial<PaymentFormData["paymentMethod"]>) => void
  onTogglePaymentMethod: (value: string) => void
  monthOptions: Array<{ value: string; label: string }>
  yearOptions: Array<{ value: string; label: string }>
}

export function PaymentMethodSection({
  formData,
  customerPaymentMethods,
  onPaymentMethodChange,
  onTogglePaymentMethod,
  monthOptions,
  yearOptions,
}: PaymentMethodSectionProps) {
  if (formData.flow !== "manual") return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ToggleButtonGroup
          value={formData.paymentMethod.type}
          options={[
            { value: "existing", label: "Existing method" },
            { value: "new", label: "New card" }
          ]}
          onChange={onTogglePaymentMethod}
          disabled={customerPaymentMethods.length === 0}
          aria-label="Payment method type selection"
        />

        {formData.paymentMethod.type === "existing" ? (
          customerPaymentMethods.length > 0 ? (
            <div className="space-y-2">
              <Label htmlFor="existing-method">
                Select payment method <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={formData.paymentMethod.existingMethodId || ""} 
                onValueChange={(value) => onPaymentMethodChange({ existingMethodId: value })}
              >
                <SelectTrigger id="existing-method">
                  <SelectValue placeholder="Choose a payment method" />
                </SelectTrigger>
                <SelectContent>
                  {customerPaymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{method.brand.toUpperCase()}</span>
                        <span className="text-muted-foreground">•••• {method.last4}</span>
                        <Badge variant="outline" className="text-xs">
                          {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="p-8 border border-dashed rounded-lg text-center bg-muted/30">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-sm font-medium mb-2">No saved payment methods</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This customer doesn't have any saved payment methods
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTogglePaymentMethod("new")}
              >
                Add new card
              </Button>
            </div>
          )
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="card-number">
                Card number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={formData.paymentMethod.cardNumber || ''}
                onChange={(e) => onPaymentMethodChange({ cardNumber: e.target.value })}
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-month">
                  Month <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={formData.paymentMethod.expiryMonth || ""} 
                  onValueChange={(value) => onPaymentMethodChange({ expiryMonth: value })}
                >
                  <SelectTrigger id="expiry-month">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthOptions.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry-year">
                  Year <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={formData.paymentMethod.expiryYear || ""} 
                  onValueChange={(value) => onPaymentMethodChange({ expiryYear: value })}
                >
                  <SelectTrigger id="expiry-year">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">
                  CVV <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  maxLength={4}
                  value={formData.paymentMethod.cvv || ''}
                  onChange={(e) => onPaymentMethodChange({ cvv: e.target.value.replace(/\D/g, '') })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholder-name">Cardholder name (optional)</Label>
              <Input
                id="cardholder-name"
                placeholder="John Doe"
                value={formData.paymentMethod.cardholderName || ''}
                onChange={(e) => onPaymentMethodChange({ cardholderName: e.target.value })}
                maxLength={100}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
