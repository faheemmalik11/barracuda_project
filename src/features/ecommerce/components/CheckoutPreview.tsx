import { Card, CardContent } from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Separator } from '@shared/components/ui/separator'
import { CreditCard, Lock, MapPin, Phone, User, Smartphone, Wallet } from 'lucide-react'

interface CheckoutPreviewProps {
  formData: {
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
}

export function CheckoutPreview({ formData }: CheckoutPreviewProps) {
  const getStyleClasses = () => {
    switch (formData.general.styleTemplate) {
      case 'modern':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200'
      case 'minimal':
        return 'bg-white border-gray-200'
      case 'dark':
        return 'bg-gray-900 border-gray-700 text-white'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className={`${getStyleClasses()} shadow-lg rounded-xl`}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {formData.general.name || 'Your Store'}
            </h2>
            {formData.general.description && (
              <p className="text-sm text-muted-foreground">
                {formData.general.description}
              </p>
            )}
          </div>

          {/* Product Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Sample Product</h3>
                <p className="text-sm text-muted-foreground">Premium item</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$99.00</p>
                {formData.payment.multiCurrencySupport && (
                  <p className="text-xs text-muted-foreground">≈ €85.00</p>
                )}
              </div>
            </div>

            {formData.products.allowUpsales && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-blue-900">Recommended Add-on</p>
                <p className="text-xs text-blue-700">Extended warranty (+$19.99)</p>
              </div>
            )}

            {formData.products.allowPromoCodes && (
              <div className="mb-4">
                <Label htmlFor="promo" className="text-sm">Promo Code</Label>
                <Input id="promo" placeholder="Enter code" className="mt-1 rounded-lg" />
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Customer Information */}
          <div className="space-y-4 mb-6">
            <div>
              <Label className="text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </Label>
              <Input placeholder="Email address" className="mt-1 rounded-lg" />
            </div>

            {formData.advanced.collectPhoneNumber && (
              <div>
                <Label className="text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input placeholder="Phone number" className="mt-1 rounded-lg" />
              </div>
            )}

            {formData.payment.requireBillingAddress && (
              <div>
                <Label className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Billing Address
                </Label>
                <Input placeholder="Street address" className="mt-1 rounded-lg" />
              </div>
            )}

            {formData.shipping.requireShippingAddress && (
              <div>
                <Label className="text-sm">Shipping Address</Label>
                <Input placeholder="Shipping address" className="mt-1 rounded-lg" />
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="mb-6">
            <Label className="text-sm flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4" />
              Payment Information
            </Label>
            
            {formData.payment.paymentMethods.length > 0 && (
              <div className="space-y-4 mb-4">
                {formData.payment.paymentMethods.includes('card') && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm font-medium">Credit/Debit Card</span>
                    </div>
                    <Input placeholder="Card number" className="rounded-lg" />
                    <Input placeholder="Cardholder name" className="rounded-lg" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="MM/YY" className="rounded-lg" />
                      <Input placeholder="CVC" className="rounded-lg" />
                    </div>
                  </div>
                )}
                
                {formData.payment.paymentMethods.includes('paypal') && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-4 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">P</div>
                      <span className="text-sm font-medium">PayPal</span>
                    </div>
                    <Input placeholder="PayPal email address" type="email" className="rounded-lg" />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700">You'll be redirected to PayPal to complete your payment securely.</p>
                    </div>
                  </div>
                )}
                
                {formData.payment.paymentMethods.includes('apple-pay') && (
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-3 flex items-center justify-center gap-2"
                      variant="default"
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>Pay with Apple Pay</span>
                    </Button>
                  </div>
                )}
                
                {formData.payment.paymentMethods.includes('google-pay') && (
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 flex items-center justify-center gap-2"
                      variant="default"
                    >
                      <Wallet className="h-4 w-4" />
                      <span>Pay with Google Pay</span>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {formData.payment.savePaymentDetails && (
              <div className="flex items-center gap-2 mt-3">
                <input type="checkbox" id="save-payment" className="rounded" />
                <Label htmlFor="save-payment" className="text-sm">
                  Save for future purchases
                </Label>
              </div>
            )}
          </div>

          {/* Advanced Options */}
          {formData.advanced.allowBusinessTaxIds && (
            <div className="mb-4">
              <Label className="text-sm">Tax ID (Optional)</Label>
              <Input placeholder="Business tax ID" className="mt-1 rounded-lg" />
            </div>
          )}

          {formData.advanced.requireTermsAcceptance && (
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="terms" className="rounded" />
              <Label htmlFor="terms" className="text-sm">
                I accept the terms and conditions
              </Label>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm">$99.00</span>
            </div>
            {formData.advanced.collectTaxAutomatically && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Tax</span>
                <span className="text-sm">$8.91</span>
              </div>
            )}
            {formData.shipping.enableShippingOptions && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Shipping</span>
                <span className="text-sm">$9.99</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>
                ${formData.advanced.collectTaxAutomatically && formData.shipping.enableShippingOptions 
                  ? '117.90' 
                  : formData.advanced.collectTaxAutomatically 
                    ? '107.91'
                    : formData.shipping.enableShippingOptions
                      ? '108.99'
                      : '99.00'
                }
              </span>
            </div>
          </div>

          {/* Pay Button */}
          <Button className="w-full flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" />
            Complete Payment
          </Button>

          {/* Payment Descriptor */}
          {formData.general.paymentDescriptor && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              Appears as "{formData.general.paymentDescriptor}" on your statement
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}