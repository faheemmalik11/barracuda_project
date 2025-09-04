import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { type PaymentFormData } from "@shared/data/mockCreatePayment"

interface ButtonSettingsProps {
  formData: PaymentFormData
  updateFormData: (updates: Partial<PaymentFormData>) => void
}

const BUTTON_THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const

const BUTTON_SIZES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
] as const

export const ButtonSettings = ({ formData, updateFormData }: ButtonSettingsProps) => {
  const handleButtonUpdate = (updates: Partial<NonNullable<PaymentFormData['button']>>) => {
    updateFormData({ 
      button: { 
        ...formData.button!, 
        ...updates
      } 
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment button settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="button-text">Button text</Label>
            <Input
              id="button-text"
              placeholder="Pay Now"
              value={formData.button?.buttonText || ''}
              onChange={(e) => handleButtonUpdate({ buttonText: e.target.value })}
              maxLength={30}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="button-theme">Theme</Label>
            <Select 
              value={formData.button?.theme || "light"} 
              onValueChange={(value: "light" | "dark") => handleButtonUpdate({ theme: value })}
            >
              <SelectTrigger id="button-theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUTTON_THEMES.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="button-size">Size</Label>
            <Select 
              value={formData.button?.size || "medium"} 
              onValueChange={(value: "small" | "medium" | "large") => handleButtonUpdate({ size: value })}
            >
              <SelectTrigger id="button-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUTTON_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 