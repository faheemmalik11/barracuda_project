import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { type PaymentFormData } from "@shared/data/mockCreatePayment"

interface InvoiceSettingsProps {
  formData: PaymentFormData
  updateFormData: (updates: Partial<PaymentFormData>) => void
}

export const InvoiceSettings = ({ formData, updateFormData }: InvoiceSettingsProps) => {
  const handleInvoiceUpdate = (updates: Partial<NonNullable<PaymentFormData['invoice']>>) => {
    updateFormData({ 
      invoice: { 
        ...formData.invoice, 
        ...updates
      } 
    })
  }

  const formatDateForInput = (date?: Date) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const handleDateChange = (value: string) => {
    handleInvoiceUpdate({ 
      dueDate: value ? new Date(value) : undefined 
    })
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="due-date">Due date</Label>
            <Input
              id="due-date"
              type="date"
              value={formatDateForInput(formData.invoice?.dueDate)}
              onChange={(e) => handleDateChange(e.target.value)}
              min={minDate}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment-terms">Payment terms</Label>
            <Input
              id="payment-terms"
              placeholder="e.g., Net 30"
              value={formData.invoice?.terms || ''}
              onChange={(e) => handleInvoiceUpdate({ terms: e.target.value })}
              maxLength={50}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="invoice-notes">Notes</Label>
          <Input
            id="invoice-notes"
            placeholder="Thank you for your business"
            value={formData.invoice?.notes || ''}
            onChange={(e) => handleInvoiceUpdate({ notes: e.target.value })}
            maxLength={200}
          />
        </div>
      </CardContent>
    </Card>
  )
} 