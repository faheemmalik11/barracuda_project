import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Badge } from "@shared/components/ui/badge"
import { CreditCard, ArrowLeft } from "lucide-react"
import { cn } from "@shared/lib/utils"
import { getZIndexClass } from "@shared/lib/z-index"
import { PaymentFlowCard } from "@shared/components/forms/PaymentFlowCard"
import { ToggleButtonGroup } from "@shared/components/forms/ToggleButtonGroup"
import { 
  InvoiceSettings,
  PaymentLinkSettings,
  SubscriptionSettings,
  QRNFCSettings,
  ButtonSettings
} from "@shared/components/forms/payment-flow-settings"
import {
  type PaymentFormData,
  currencies,
  mockCustomers,
  mockPaymentMethods,
  generateMonthOptions,
  generateYearOptions,
  getInitialFormData,
  PAYMENT_FLOWS,
  getActionText as getActionTextFromFlow,
  getFlowDescription,
  validateForm
} from "@shared/data/mockCreatePayment"

// Main component
export default function CreatePaymentPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<PaymentFormData>(getInitialFormData())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedCurrency = currencies.find((currency) => currency.code === formData.currency)
  const customerPaymentMethods = mockPaymentMethods.filter(
    (method) => formData.customer.id && method.customerId === formData.customer.id
  )
  const isFormValid = validateForm(formData)

  const updateFormData = (updates: Partial<PaymentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const updateCustomer = (updates: Partial<PaymentFormData["customer"]>) => {
    setFormData(prev => ({ 
      ...prev, 
      customer: { ...prev.customer, ...updates } 
    }))
  }

  const updatePaymentMethod = (updates: Partial<PaymentFormData["paymentMethod"]>) => {
    setFormData(prev => ({ 
      ...prev, 
      paymentMethod: { ...prev.paymentMethod, ...updates } 
    }))
  }

  const getActionText = () => getActionTextFromFlow(formData.flow, formData.qrNfc?.type)

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      amount: 0,
      description: "",
      paymentMethod: { 
        type: "existing", 
        existingMethodId: customerPaymentMethods[0]?.id,
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        cardholderName: "",
      }
    }))
  }

  const handleSubmit = async (createAnother: boolean = false) => {
    if (!isFormValid || isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      // await paymentsService.createPayment(formData)
      
      if (createAnother) {
        resetForm()
      } else {
        navigate("/payments", { replace: true })
      }
    } catch (error) {
      console.error(`Failed to ${getActionText().toLowerCase()}:`, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCustomerSelect = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId)
    if (customer) {
      updateCustomer({
        type: "existing",
        id: customer.id,
        name: customer.name,
        email: customer.email,
      })
    }
  }

  const handlePaymentMethodToggle = (value: string) => {
    const type = value as "existing" | "new"
    const baseUpdate = {
      type,
      cardNumber: "", 
      expiryMonth: "", 
      expiryYear: "", 
      cvv: "", 
      cardholderName: ""
    }
    
    updatePaymentMethod({
      ...baseUpdate,
      existingMethodId: type === "existing" ? customerPaymentMethods[0]?.id : ""
    })
  }

  const handleCustomerToggle = (value: string) => {
    const type = value as "existing" | "new"
    updateCustomer({ type, id: "", name: "", email: "" })
  }

  // Flow-specific settings component mapping
  const renderFlowSettings = () => {
    const settingsProps = { formData, updateFormData }
    
    switch (formData.flow) {
      case "invoice":
        return <InvoiceSettings {...settingsProps} />
      case "payment-link":
        return <PaymentLinkSettings {...settingsProps} />
      case "subscription":
        return <SubscriptionSettings {...settingsProps} />
      case "qr-nfc":
        return <QRNFCSettings {...settingsProps} />
      case "button":
        return <ButtonSettings {...settingsProps} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className={cn(
        "bg-card border-b sticky top-0",
        getZIndexClass('OVERLAY')
      )}>
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/payments")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  {getActionText()}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {getFlowDescription(formData.flow)}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => handleSubmit(false)} 
              disabled={!isFormValid || isSubmitting}
              className="px-6"
            >
              {isSubmitting ? "Processing..." : getActionText()}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-8">
          {/* Payment Flow Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Payment method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {PAYMENT_FLOWS.map((flow) => (
                  <PaymentFlowCard
                    key={flow.value}
                    flow={flow}
                    isSelected={formData.flow === flow.value}
                    onSelect={(flowValue) => updateFormData({ flow: flowValue as typeof PAYMENT_FLOWS[number]["value"] })}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Amount */}
          <Card>
            <CardHeader>
              <CardTitle>Amount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">
                    Amount <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium pointer-events-none">
                      {selectedCurrency?.symbol || '$'}
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.amount || ''}
                      onChange={(e) => updateFormData({ amount: parseFloat(e.target.value) || 0 })}
                      className="pl-8 text-lg font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => updateFormData({ currency: value })}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{currency.symbol}</span>
                            <span>{currency.code}</span>
                            <span className="text-muted-foreground">— {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="What is this payment for?"
                  value={formData.description}
                  onChange={(e) => updateFormData({ description: e.target.value })}
                  maxLength={200}
                />
              </div>
            </CardContent>
          </Card>

          {/* Flow-specific Configuration */}
          {renderFlowSettings()}

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToggleButtonGroup
                value={formData.customer.type}
                options={[
                  { value: "existing", label: "Existing customer" },
                  { value: "new", label: "New customer" }
                ]}
                onChange={handleCustomerToggle}
                aria-label="Customer type selection"
              />

              {formData.customer.type === "existing" ? (
                <div className="space-y-2">
                  <Label htmlFor="existing-customer">
                    Select customer <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.customer.id || ""} onValueChange={handleCustomerSelect}>
                    <SelectTrigger id="existing-customer">
                      <SelectValue placeholder="Choose a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          <div className="flex flex-col text-left">
                            <span className="font-medium">{customer.name}</span>
                            <span className="text-sm text-muted-foreground">{customer.email}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">
                      Customer name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="customer-name"
                      placeholder="John Doe"
                      value={formData.customer.name || ''}
                      onChange={(e) => updateCustomer({ name: e.target.value })}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">
                      Email address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.customer.email || ''}
                      onChange={(e) => updateCustomer({ email: e.target.value })}
                      required
                      maxLength={254}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method - Only for manual payments */}
          {formData.flow === "manual" && (
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
                  onChange={handlePaymentMethodToggle}
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
                        onValueChange={(value) => updatePaymentMethod({ existingMethodId: value })}
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
                        onClick={() => handlePaymentMethodToggle("new")}
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
                        onChange={(e) => updatePaymentMethod({ cardNumber: e.target.value })}
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
                          onValueChange={(value) => updatePaymentMethod({ expiryMonth: value })}
                        >
                          <SelectTrigger id="expiry-month">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {generateMonthOptions().map((month) => (
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
                          onValueChange={(value) => updatePaymentMethod({ expiryYear: value })}
                        >
                          <SelectTrigger id="expiry-year">
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            {generateYearOptions().map((year) => (
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
                          onChange={(e) => updatePaymentMethod({ cvv: e.target.value.replace(/\D/g, '') })}
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
                        onChange={(e) => updatePaymentMethod({ cardholderName: e.target.value })}
                        maxLength={100}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <footer className="flex items-center justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/payments")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Processing..." : `${getActionText()} & create another`}
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                disabled={!isFormValid || isSubmitting}
                className="px-8"
              >
                {isSubmitting ? "Processing..." : getActionText()}
              </Button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
} 
