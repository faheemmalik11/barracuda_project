import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { type PaymentFormData } from "@shared/data/mockCreatePayment"

interface SubscriptionSettingsProps {
  formData: PaymentFormData
  updateFormData: (updates: Partial<PaymentFormData>) => void
}

const BILLING_INTERVALS = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
] as const

export const SubscriptionSettings = ({ formData, updateFormData }: SubscriptionSettingsProps) => {
  const handleSubscriptionUpdate = (updates: Partial<NonNullable<PaymentFormData['subscription']>>) => {
    updateFormData({ 
      subscription: { 
        ...formData.subscription!, 
        ...updates
      } 
    })
  }

  const handleIntervalCountChange = (value: string) => {
    const count = parseInt(value) || 1
    const validCount = Math.min(Math.max(count, 1), 365)
    handleSubscriptionUpdate({ intervalCount: validCount })
  }

  const handleTrialDaysChange = (value: string) => {
    const days = parseInt(value) || 0
    const validDays = Math.min(Math.max(days, 0), 365)
    handleSubscriptionUpdate({ trialDays: validDays })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="billing-interval">Billing interval</Label>
            <Select 
              value={formData.subscription?.interval || "month"} 
              onValueChange={(value: "day" | "week" | "month" | "year") => handleSubscriptionUpdate({ interval: value })}
            >
              <SelectTrigger id="billing-interval">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BILLING_INTERVALS.map((interval) => (
                  <SelectItem key={interval.value} value={interval.value}>
                    {interval.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval-count">Every</Label>
            <Input
              id="interval-count"
              type="number"
              min="1"
              max="365"
              value={formData.subscription?.intervalCount || 1}
              onChange={(e) => handleIntervalCountChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trial-days">Trial days</Label>
            <Input
              id="trial-days"
              type="number"
              min="0"
              max="365"
              placeholder="0"
              value={formData.subscription?.trialDays || 0}
              onChange={(e) => handleTrialDaysChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 