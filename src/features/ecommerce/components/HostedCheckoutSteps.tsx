import { Button } from '@shared/components/ui/button'
import { Checkbox } from '@shared/components/ui/checkbox'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { StepperFormSection } from '@shared/components/ui/stepper'
import { Textarea } from '@shared/components/ui/textarea'
import { Settings, Sparkles } from 'lucide-react'

interface HostedCheckoutFormData {
  general: {
    name: string
    webAddress: string
    description: string
    businessCategory: string
    paymentDescriptor: string
    styleTemplate: string
  }
  products: {
    productSource: string
    store: string
    allowUpsales: boolean
    allowPromoCodes: boolean
  }
  payment: {
    multiCurrencySupport: boolean
    automaticCurrencyConversion: boolean
    savePaymentDetails: boolean
    requireBillingAddress: boolean
    paymentMethods: string[]
  }
  shipping: {
    requireShippingAddress: boolean
    enableShippingOptions: boolean
  }
  advanced: {
    localizeByLocation: boolean
    allowBusinessTaxIds: boolean
    collectTaxAutomatically: boolean
    collectPhoneNumber: boolean
    allowCustomFields: boolean
    requireTermsAcceptance: boolean
  }
  afterPayment: {
    showConfirmationPage: boolean
    postPaymentInvoice: boolean
  }
}

interface HostedCheckoutStepsProps {
  formData: HostedCheckoutFormData
  updateFormData: (updates: any) => void
}

export function renderHostedCheckoutStepContent(
  stepId: string,
  _substepId: string | null,
  { formData, updateFormData }: HostedCheckoutStepsProps
) {
  switch (stepId) {
    case "general":
      return (
        <StepperFormSection title="General Information">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Store Name *</Label>
              <Input
                id="name"
                value={formData.general.name}
                onChange={(e) => updateFormData({
                  general: { ...formData.general, name: e.target.value }
                })}
                placeholder="Your Store Name"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <Label htmlFor="webAddress">Web Address *</Label>
              <Input
                id="webAddress"
                value={formData.general.webAddress}
                onChange={(e) => updateFormData({
                  general: { ...formData.general, webAddress: e.target.value }
                })}
                placeholder="https://yourstore.com"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-muted-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Generate with AI
                </Button>
              </div>
              <Textarea
                id="description"
                value={formData.general.description}
                onChange={(e) => updateFormData({
                  general: { ...formData.general, description: e.target.value }
                })}
                placeholder="Brief description of your store"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="businessCategory">Business Category</Label>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-muted-foreground">
                  Request to change
                </Button>
              </div>
              <Input
                id="businessCategory"
                value={formData.general.businessCategory}
                onChange={(e) => updateFormData({
                  general: { ...formData.general, businessCategory: e.target.value }
                })}
                placeholder="e.g., Retail, Services, Digital Products"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="paymentDescriptor">Payment Descriptor</Label>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-muted-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Generate with AI
                </Button>
              </div>
              <Input
                id="paymentDescriptor"
                value={formData.general.paymentDescriptor}
                onChange={(e) => updateFormData({
                  general: { ...formData.general, paymentDescriptor: e.target.value }
                })}
                placeholder="How it appears on customer statements"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="styleTemplate">Style & Branding</Label>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-muted-foreground">
                  <Settings className="h-3 w-3 mr-1" />
                  Change look and feel
                </Button>
              </div>
              <Select
                value={formData.general.styleTemplate}
                onValueChange={(value) => updateFormData({
                  general: { ...formData.general, styleTemplate: value }
                })}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="default">Default Template</SelectItem>
                  <SelectItem value="modern">Modern Template</SelectItem>
                  <SelectItem value="minimal">Minimal Template</SelectItem>
                  <SelectItem value="dark">Dark Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </StepperFormSection>
      )

    case "products":
      return (
        <StepperFormSection title="Products">
          <div className="space-y-4">
            <div>
              <Label>Product Source</Label>
              <Select
                value={formData.products.productSource}
                onValueChange={(value) => updateFormData({
                  products: { ...formData.products, productSource: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vinr-platform">Products sourced from Vinr platform</SelectItem>
                  <SelectItem value="direct-merchant">Product sources direct from merchant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="store">Store</Label>
              <Select
                value={formData.products.store}
                onValueChange={(value) => updateFormData({
                  products: { ...formData.products, store: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select store (for physical products)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-store">Main Store</SelectItem>
                  <SelectItem value="warehouse-1">Warehouse 1</SelectItem>
                  <SelectItem value="warehouse-2">Warehouse 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowUpsales"
                checked={formData.products.allowUpsales}
                onCheckedChange={(checked) => updateFormData({
                  products: { ...formData.products, allowUpsales: checked }
                })}
              />
              <Label htmlFor="allowUpsales">Allow upsales</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowPromoCodes"
                checked={formData.products.allowPromoCodes}
                onCheckedChange={(checked) => updateFormData({
                  products: { ...formData.products, allowPromoCodes: checked }
                })}
              />
              <Label htmlFor="allowPromoCodes">Allow promo codes</Label>
            </div>
          </div>
        </StepperFormSection>
      )

    case "payment":
      return (
        <StepperFormSection title="Payment">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiCurrencySupport"
                checked={formData.payment.multiCurrencySupport}
                onCheckedChange={(checked) => updateFormData({
                  payment: { ...formData.payment, multiCurrencySupport: checked }
                })}
              />
              <div>
                <Label htmlFor="multiCurrencySupport">Enable multi currency support</Label>
                <p className="text-sm text-muted-foreground">Allow customers to pay in their local currency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="automaticCurrencyConversion"
                checked={formData.payment.automaticCurrencyConversion}
                onCheckedChange={(checked) => updateFormData({
                  payment: { ...formData.payment, automaticCurrencyConversion: checked }
                })}
              />
              <div>
                <Label htmlFor="automaticCurrencyConversion">Enable automatic currency conversion</Label>
                <p className="text-sm text-muted-foreground">Automatically convert prices based on customer location</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="savePaymentDetails"
                checked={formData.payment.savePaymentDetails}
                onCheckedChange={(checked) => updateFormData({
                  payment: { ...formData.payment, savePaymentDetails: checked }
                })}
              />
              <div>
                <Label htmlFor="savePaymentDetails">Save payment details for future use</Label>
                <p className="text-sm text-muted-foreground">Allow customers to save cards for faster checkout</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireBillingAddress"
                checked={formData.payment.requireBillingAddress}
                onCheckedChange={(checked) => updateFormData({
                  payment: { ...formData.payment, requireBillingAddress: checked }
                })}
              />
              <Label htmlFor="requireBillingAddress">Billing address</Label>
            </div>
            
            <div>
              <Label>Payment Methods</Label>
              <div className="space-y-2 mt-2">
                {['card', 'paypal', 'apple-pay', 'google-pay'].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={formData.payment.paymentMethods.includes(method)}
                      onCheckedChange={(checked) => {
                        const methods = checked
                          ? [...formData.payment.paymentMethods, method]
                          : formData.payment.paymentMethods.filter(m => m !== method)
                        updateFormData({
                          payment: { ...formData.payment, paymentMethods: methods }
                        })
                      }}
                    />
                    <Label htmlFor={method} className="capitalize">
                      {method.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StepperFormSection>
      )

    case "shipping":
      return (
        <StepperFormSection title="Shipping">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Only applicable if merchant is selling physical goods
            </p>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireShippingAddress"
                checked={formData.shipping.requireShippingAddress}
                onCheckedChange={(checked) => updateFormData({
                  shipping: { ...formData.shipping, requireShippingAddress: checked }
                })}
              />
              <Label htmlFor="requireShippingAddress">Shipping address</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableShippingOptions"
                checked={formData.shipping.enableShippingOptions}
                onCheckedChange={(checked) => updateFormData({
                  shipping: { ...formData.shipping, enableShippingOptions: checked }
                })}
              />
              <Label htmlFor="enableShippingOptions">Shipping options</Label>
            </div>
          </div>
        </StepperFormSection>
      )

    case "advanced":
      return (
        <StepperFormSection title="Advanced Options">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="localizeByLocation"
                checked={formData.advanced.localizeByLocation}
                onCheckedChange={(checked) => updateFormData({
                  advanced: { ...formData.advanced, localizeByLocation: checked }
                })}
              />
              <div>
                <Label htmlFor="localizeByLocation">Localize pages based on customer location</Label>
                <p className="text-sm text-muted-foreground">Automatically adapt language and currency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowBusinessTaxIds"
                checked={formData.advanced.allowBusinessTaxIds}
                onCheckedChange={(checked) => updateFormData({
                  advanced: { ...formData.advanced, allowBusinessTaxIds: checked }
                })}
              />
              <div>
                <Label htmlFor="allowBusinessTaxIds">Allow business customers to provide Tax IDs</Label>
                <p className="text-sm text-muted-foreground">Enable B2B tax exemption handling</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collectTaxAutomatically"
                checked={formData.advanced.collectTaxAutomatically}
                onCheckedChange={(checked) => updateFormData({
                  advanced: { ...formData.advanced, collectTaxAutomatically: checked }
                })}
              />
              <div>
                <Label htmlFor="collectTaxAutomatically">Collect tax automatically</Label>
                <p className="text-sm text-muted-foreground">Automatically calculate and collect applicable taxes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collectPhoneNumber"
                checked={formData.advanced.collectPhoneNumber}
                onCheckedChange={(checked) => updateFormData({
                  advanced: { ...formData.advanced, collectPhoneNumber: checked }
                })}
              />
              <Label htmlFor="collectPhoneNumber">Collect customers' phone number</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowCustomFields"
                checked={formData.advanced.allowCustomFields}
                onCheckedChange={(checked) => updateFormData({
                  advanced: { ...formData.advanced, allowCustomFields: checked }
                })}
              />
              <Label htmlFor="allowCustomFields">Allow custom fields (Stripe)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireTermsAcceptance"
                checked={formData.advanced.requireTermsAcceptance}
                onCheckedChange={(checked) => updateFormData({
                  advanced: { ...formData.advanced, requireTermsAcceptance: checked }
                })}
              />
              <Label htmlFor="requireTermsAcceptance">Require customers to accept terms</Label>
            </div>
          </div>
        </StepperFormSection>
      )

    case "after-payment":
      return (
        <StepperFormSection title="After Payment">
          <div className="space-y-4">
            <div>
              <Label>Confirmation Page</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="showConfirmation"
                    name="confirmationPage"
                    checked={formData.afterPayment.showConfirmationPage}
                    onChange={() => updateFormData({
                      afterPayment: { ...formData.afterPayment, showConfirmationPage: true }
                    })}
                  />
                  <Label htmlFor="showConfirmation">Show Confirmation page (Stripe)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="hideConfirmation"
                    name="confirmationPage"
                    checked={!formData.afterPayment.showConfirmationPage}
                    onChange={() => updateFormData({
                      afterPayment: { ...formData.afterPayment, showConfirmationPage: false }
                    })}
                  />
                  <Label htmlFor="hideConfirmation">Don't show Confirmation page (Stripe)</Label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="postPaymentInvoice"
                checked={formData.afterPayment.postPaymentInvoice}
                onCheckedChange={(checked) => updateFormData({
                  afterPayment: { ...formData.afterPayment, postPaymentInvoice: checked }
                })}
              />
              <Label htmlFor="postPaymentInvoice">Post payment invoice (Stripe)</Label>
            </div>
          </div>
        </StepperFormSection>
      )

    default:
      return (
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground">Step content not implemented yet</p>
          </div>
        </div>
      )
  }
}

export type { HostedCheckoutFormData, HostedCheckoutStepsProps }
