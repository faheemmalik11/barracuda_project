import { useState } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Textarea } from "@shared/components/ui/textarea"
import { Sheet, SheetContent, SheetTitle } from "@shared/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible"
import { Checkbox } from "@shared/components/ui/checkbox"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { toast } from "sonner"

interface CreateCustomerSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CustomerFormData {
  customerType: string
  name: string
  email: string
  description: string
  sameAsAccountEmail: boolean
  billingEmail: string
  invoiceTemplate: string
  billingCountry: string
  billingPhone: string
  billingCountryCode: string
  sameAsShipping: boolean
  shippingCountry: string
  shippingPhone: string
  shippingCountryCode: string
  timeZone: string
  language: string
  currency: string
  taxStatus: string
  paymentTerms: string
  taxIds: Array<{
    id: string
    idType: string
    taxId: string
    customRate: string
  }>
}

const INITIAL_FORM_DATA: CustomerFormData = {
  customerType: "private",
  name: "",
  email: "",
  description: "",
  sameAsAccountEmail: true,
  billingEmail: "",
  invoiceTemplate: "",
  billingCountry: "",
  billingPhone: "",
  billingCountryCode: "US",
  sameAsShipping: true,
  shippingCountry: "",
  shippingPhone: "",
  shippingCountryCode: "US",
  timeZone: "",
  language: "",
  currency: "USD",
  taxStatus: "taxable",
  paymentTerms: "",
  taxIds: []
}

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "AU", label: "Australia" },
  { value: "JP", label: "Japan" }
]

const PHONE_CODES = [
  { value: "US", label: "US +1" },
  { value: "CA", label: "CA +1" },
  { value: "GB", label: "GB +44" },
  { value: "DE", label: "DE +49" },
  { value: "FR", label: "FR +33" },
  { value: "AU", label: "AU +61" },
  { value: "JP", label: "JP +81" }
]


export default function CreateCustomerSheet({
  open,
  onOpenChange,
}: CreateCustomerSheetProps) {
  const [formData, setFormData] = useState<CustomerFormData>(INITIAL_FORM_DATA)

  const [isBillingOpen, setIsBillingOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof CustomerFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTaxId = () => {
    const newTaxId = {
      id: `tax_${Date.now()}`,
      idType: "",
      taxId: "",
      customRate: "0.00"
    }
    setFormData(prev => ({
      ...prev,
      taxIds: [...prev.taxIds, newTaxId]
    }))
  }

  const removeTaxId = (taxIdToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      taxIds: prev.taxIds.filter(taxId => taxId.id !== taxIdToRemove)
    }))
  }

  const updateTaxId = (taxIdId: string, field: 'idType' | 'taxId' | 'customRate', value: string) => {
    setFormData(prev => ({
      ...prev,
      taxIds: prev.taxIds.map(taxId =>
        taxId.id === taxIdId ? { ...taxId, [field]: value } : taxId
      )
    }))
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
    setIsBillingOpen(false)
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name.trim()) {
      toast.error("Customer name is required")
      return
    }

    if (!formData.email.trim()) {
      toast.error("Email address is required")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    
    try {
      // TODO: Implement actual customer creation API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast.success("Customer created successfully!")
      
      resetForm()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to create customer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-hidden flex flex-col p-0 select-none focus:outline-none focus-visible:outline-none">
        {/* Header */}
        <div className="px-6 py-6 border-b bg-card">
          <SheetTitle className="text-lg font-semibold">
            Create customer
          </SheetTitle>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-6">
            {/* Account Information Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-foreground">
                ACCOUNT INFORMATION
              </h3>
              
              {/* Customer Type */}
              <div className="space-y-2">
                <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                  CUSTOMER TYPE
                </Label>
                  <Select
                    value={formData.customerType}
                    onValueChange={(value) => handleInputChange('customerType', value)}
                  >
                    <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private" className="text-xs">Private Customer</SelectItem>
                      <SelectItem value="business" className="text-xs">Business Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              {/* Customer Name */}
              <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground tracking-wide">
                    Customer's full name for identification and billing purposes{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Enter customer name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                  />
                </div>

              {/* Email Address */}
              <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground tracking-wide">
                    Primary email address for account notifications and communication{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="customer@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                  />
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                DESCRIPTION
              </h3>
              <Textarea
                placeholder="Optional description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={"bg-muted border-0 min-h-[80px] placeholder:text-muted-foreground/60 resize-none text-xs"}
              />
            </div>

            {/* Billing Information Section */}
            <div className="space-y-2">
              <Collapsible open={isBillingOpen} onOpenChange={setIsBillingOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto text-xs font-medium text-foreground hover:bg-transparent"
                  >
                    <span>BILLING INFORMATION</span>
                    {isBillingOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-6 pt-4">
                  {/* Billing Email */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      BILLING EMAIL
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.sameAsAccountEmail}
                        onCheckedChange={(checked) => 
                          handleInputChange('sameAsAccountEmail', checked === true)
                        }
                      />
                      <label className="text-xs text-foreground tracking-wide">Same as account email</label>
                    </div>
                    {!formData.sameAsAccountEmail && (
                      <Input
                        type="email"
                        placeholder="billing@example.com"
                        value={formData.billingEmail}
                        onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                        className="bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                      />
                    )}
                  </div>

                  {/* Default Invoice Template */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      DEFAULT INVOICE TEMPLATE
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Apply this template to all future invoices sent to this customer, including from pre-existing subscriptions.{" "}
                      <button className="text-primary hover:underline text-xs">Learn more.</button>
                    </p>
                    <Select
                      value={formData.invoiceTemplate}
                      onValueChange={(value) => handleInputChange('invoiceTemplate', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue placeholder="Select a template..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default" className="text-xs">Default Template</SelectItem>
                        <SelectItem value="minimal" className="text-xs">Minimal Template</SelectItem>
                        <SelectItem value="professional" className="text-xs">Professional Template</SelectItem>
                        <SelectItem value="custom" className="text-xs">Custom Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Billing Details */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      BILLING DETAILS
                    </Label>
                    <Select
                      value={formData.billingCountry}
                      onValueChange={(value) => handleInputChange('billingCountry', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue placeholder="Choose a country..." />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country.value} value={country.value} className="text-xs">
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Select
                        value={formData.billingCountryCode}
                        onValueChange={(value) => handleInputChange('billingCountryCode', value)}
                      >
                        <SelectTrigger className="w-20 bg-muted border-0 h-9 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PHONE_CODES.map(code => (
                            <SelectItem key={code.value} value={code.value} className="text-xs">
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="tel"
                        placeholder="(201) 555-0123"
                        value={formData.billingPhone}
                        onChange={(e) => handleInputChange('billingPhone', e.target.value)}
                        className="flex-1 bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                      />
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      SHIPPING DETAILS
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.sameAsShipping}
                        onCheckedChange={(checked) => 
                          handleInputChange('sameAsShipping', checked === true)
                        }
                      />
                      <label className="text-xs text-foreground tracking-wide">Same as billing details</label>
                    </div>
                    {!formData.sameAsShipping && (
                      <div className="space-y-2">
                        <Select
                          value={formData.shippingCountry}
                          onValueChange={(value) => handleInputChange('shippingCountry', value)}
                        >
                          <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                            <SelectValue placeholder="Choose a country..." />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map(country => (
                              <SelectItem key={country.value} value={country.value} className="text-xs">
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                          <Select
                            value={formData.shippingCountryCode}
                            onValueChange={(value) => handleInputChange('shippingCountryCode', value)}
                          >
                            <SelectTrigger className="w-20 bg-muted border-0 h-9 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PHONE_CODES.map(code => (
                                <SelectItem key={code.value} value={code.value} className="text-xs">
                                  {code.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="tel"
                            placeholder="(201) 555-0123"
                            value={formData.shippingPhone}
                            onChange={(e) => handleInputChange('shippingPhone', e.target.value)}
                            className="flex-1 bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time Zone */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      TIME ZONE
                    </Label>
                    <Select
                      value={formData.timeZone}
                      onValueChange={(value) => handleInputChange('timeZone', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue placeholder="Choose a time zone..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ET" className="text-xs">Eastern Time (ET)</SelectItem>
                        <SelectItem value="CT" className="text-xs">Central Time (CT)</SelectItem>
                        <SelectItem value="MT" className="text-xs">Mountain Time (MT)</SelectItem>
                        <SelectItem value="PT" className="text-xs">Pacific Time (PT)</SelectItem>
                        <SelectItem value="GMT" className="text-xs">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="CET" className="text-xs">Central European Time (CET)</SelectItem>
                        <SelectItem value="JST" className="text-xs">Japan Standard Time (JST)</SelectItem>
                        <SelectItem value="AET" className="text-xs">Australian Eastern Time (AET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      LANGUAGE
                    </Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => handleInputChange('language', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue placeholder="Choose a language..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en" className="text-xs">English</SelectItem>
                        <SelectItem value="es" className="text-xs">Spanish</SelectItem>
                        <SelectItem value="fr" className="text-xs">French</SelectItem>
                        <SelectItem value="de" className="text-xs">German</SelectItem>
                        <SelectItem value="it" className="text-xs">Italian</SelectItem>
                        <SelectItem value="pt" className="text-xs">Portuguese</SelectItem>
                        <SelectItem value="ja" className="text-xs">Japanese</SelectItem>
                        <SelectItem value="ko" className="text-xs">Korean</SelectItem>
                        <SelectItem value="zh" className="text-xs">Chinese (Simplified)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      CURRENCY
                    </Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleInputChange('currency', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD" className="text-xs">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR" className="text-xs">EUR - Euro</SelectItem>
                        <SelectItem value="GBP" className="text-xs">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD" className="text-xs">CAD - Canadian Dollar</SelectItem>
                        <SelectItem value="AUD" className="text-xs">AUD - Australian Dollar</SelectItem>
                        <SelectItem value="JPY" className="text-xs">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tax Status */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      TAX STATUS
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      <button className="text-primary hover:underline text-xs">Review our guide on tax statuses</button>{" "}
                      to select the best fit for your customer.
                    </p>
                    <Select
                      value={formData.taxStatus}
                      onValueChange={(value) => handleInputChange('taxStatus', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="taxable" className="text-xs">Taxable</SelectItem>
                        <SelectItem value="exempt" className="text-xs">Tax Exempt</SelectItem>
                        <SelectItem value="reverse" className="text-xs">Reverse Charge</SelectItem>
                      </SelectContent>
                    </Select>


                    <button 
                      type="button"
                      className="text-primary hover:underline text-xs"
                      onClick={addTaxId}
                    >
                      Add another ID
                    </button>
                  </div>

                  {/* Tax ID Sections - Separate from Tax Status */}
                  {formData.taxIds.map((taxId) => (
                    <div key={taxId.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                          TAX ID
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted"
                          onClick={() => removeTaxId(taxId.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={taxId.idType}
                          onValueChange={(value) => updateTaxId(taxId.id, 'idType', value)}
                        >
                          <SelectTrigger className="w-32 bg-muted border-0 h-9 text-xs">
                            <SelectValue placeholder="ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vat" className="text-xs">VAT</SelectItem>
                            <SelectItem value="gst" className="text-xs">GST</SelectItem>
                            <SelectItem value="tin" className="text-xs">TIN</SelectItem>
                            <SelectItem value="ein" className="text-xs">EIN</SelectItem>
                            <SelectItem value="other" className="text-xs">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Enter tax ID"
                          value={taxId.taxId}
                          onChange={(e) => updateTaxId(taxId.id, 'taxId', e.target.value)}
                          className="flex-1 bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                          CUSTOM TAX RATE
                        </Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={taxId.customRate}
                          onChange={(e) => updateTaxId(taxId.id, 'customRate', e.target.value)}
                          className="w-full bg-muted border-0 h-9 placeholder:text-muted-foreground/60 text-xs"
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter custom tax rate as percentage (e.g., 8.25 for 8.25%)
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Payment Terms */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-medium text-foreground uppercase tracking-wide">
                      PAYMENT TERMS
                    </Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => handleInputChange('paymentTerms', value)}
                    >
                      <SelectTrigger className="w-full bg-muted border-0 h-9 text-xs">
                        <SelectValue placeholder="Select payment terms..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receipt" className="text-xs">Due on Receipt</SelectItem>
                        <SelectItem value="net7" className="text-xs">Net 7 Days</SelectItem>
                        <SelectItem value="net15" className="text-xs">Net 15 Days</SelectItem>
                        <SelectItem value="net30" className="text-xs">Net 30 Days</SelectItem>
                        <SelectItem value="net45" className="text-xs">Net 45 Days</SelectItem>
                        <SelectItem value="net60" className="text-xs">Net 60 Days</SelectItem>
                        <SelectItem value="net90" className="text-xs">Net 90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t bg-card">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.name.trim() || !formData.email.trim()}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg"
          >
            {isLoading ? "Creating..." : "Add customer"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
