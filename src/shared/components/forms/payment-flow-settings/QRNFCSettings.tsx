import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { type PaymentFormData } from "@shared/data/mockCreatePayment"

interface QRNFCSettingsProps {
  formData: PaymentFormData
  updateFormData: (updates: Partial<PaymentFormData>) => void
}

const QR_NFC_TYPES = [
  { value: "qr", label: "QR Code" },
  { value: "nfc", label: "NFC Tag" },
] as const

export const QRNFCSettings = ({ formData, updateFormData }: QRNFCSettingsProps) => {
  const handleQRNFCUpdate = (updates: Partial<NonNullable<PaymentFormData['qrNfc']>>) => {
    updateFormData({ 
      qrNfc: { 
        ...formData.qrNfc!, 
        ...updates
      } 
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR/NFC settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="qr-nfc-type">Type</Label>
            <Select 
              value={formData.qrNfc?.type || "qr"} 
              onValueChange={(value: "qr" | "nfc") => handleQRNFCUpdate({ type: value })}
            >
              <SelectTrigger id="qr-nfc-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QR_NFC_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qr-nfc-label">Label (optional)</Label>
            <Input
              id="qr-nfc-label"
              placeholder="Payment for Order #123"
              value={formData.qrNfc?.label || ''}
              onChange={(e) => handleQRNFCUpdate({ label: e.target.value })}
              maxLength={50}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 