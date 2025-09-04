import { useState } from "react"
import * as z from "zod"
import { toast } from "sonner"
import { Label } from "@shared/components/ui/label"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Switch } from "@shared/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@shared/components/ui/card"
import { CheckoutConfig, BorderStyleOption } from "@shared/types/checkout-config"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import { Typography } from "@shared/components/ui/typography"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

// Define the form schema using zod
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  borderStyle: z.enum(["rounded", "sharp", "pill"]),
  allowBillingAddress: z.boolean(),
  allowSaveCard: z.boolean(),
  allowTaxSupport: z.boolean(),
  taxPercentage: z.number().nullable(),
  allowContactInformation: z.boolean(),
  allowAddressAutocomplete: z.boolean(),
  allowTermsAccepted: z.boolean(),
  allowShippingDetails: z.boolean(),
  allowQuantityChange: z.boolean(),
  termsUrl: z.string().url("Invalid URL").or(z.literal("")),
  privacyUrl: z.string().url("Invalid URL").or(z.literal(""))
})

// Define the form data type based on the schema
export type FormData = z.infer<typeof formSchema> & {
  cartItems?: string
}

type CheckoutConfigFormProps = {
  initialData?: Partial<CheckoutConfig>
  merchantId: string
  configId?: string
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting: boolean
}

export function CheckoutConfigForm({
  initialData,
  merchantId,
  configId,
  onSubmit,
  isSubmitting
}: CheckoutConfigFormProps) {
  const [cartItems] = useState<CartItem[]>([
    { id: '1', name: 'Premium Widget', price: 2999, quantity: 1 },
    { id: '2', name: 'Deluxe Gadget', price: 4999, quantity: 2 },
    { id: '3', name: 'Essential Package', price: 1999, quantity: 1 },
  ])
  
  const [formData, setFormData] = useState<FormData>({
    email: initialData?.email || "",
    primaryColor: initialData?.primaryColor || "#4285F4",
    backgroundColor: initialData?.backgroundColor || "#FFFFFF",
    borderStyle: (initialData?.borderStyle || "rounded") as BorderStyleOption,
    allowBillingAddress: initialData?.allowBillingAddress ?? true,
    allowSaveCard: initialData?.allowSaveCard ?? true,
    allowTaxSupport: initialData?.allowTaxSupport ?? false,
    taxPercentage: initialData?.taxPercentage ?? null,
    allowContactInformation: initialData?.allowContactInformation ?? true,
    allowAddressAutocomplete: initialData?.allowAddressAutocomplete ?? true,
    allowTermsAccepted: initialData?.allowTermsAccepted ?? false,
    allowShippingDetails: initialData?.allowShippingDetails ?? false,
    allowQuantityChange: initialData?.allowQuantityChange ?? true,
    termsUrl: initialData?.termsUrl || "",
    privacyUrl: initialData?.privacyUrl || "",
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate the form data using zod
      const validatedData = formSchema.parse(formData)
      
      // Add cart items to the submission data
      const submissionData = {
        ...validatedData,
        cartItems: JSON.stringify(cartItems)
      }
      
      await onSubmit(submissionData as FormData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormData
          formattedErrors[path] = err.message
        })
        setErrors(formattedErrors)
      }
      console.error("Form submission error:", error)
      toast.error("Failed to save checkout configuration")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{configId ? "Edit" : "Create"} Checkout Configuration</CardTitle>
          <Typography variant="muted" className="text-muted-foreground">
            Configure the checkout experience for merchant {merchantId}
          </Typography>
        </CardHeader>
        <CardContent className="pt-4 space-y-8">
            
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Typography variant="h4" className="font-medium">General Information</Typography>
              <div className="h-px bg-border flex-1"></div>
            </div>
            
            <div>
              <Label htmlFor="email" className="mb-2 block">Contact Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@example.com"
                className="max-w-md"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              <p className="text-sm text-muted-foreground mt-1">Email address for checkout notifications</p>
            </div>
            
            <div className="border rounded-lg p-3 max-w-lg">
              <Label className="mb-3 block font-medium">Cart Items</Label>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-3 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium text-primary">${(item.price / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">Quantity: {item.quantity}</span>
                      <span className="text-sm font-medium">
                        Subtotal: ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 border-t mt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-primary">
                    ${(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
            
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Typography variant="h4" className="font-medium">Appearance</Typography>
              <div className="h-px bg-border flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor" className="mb-2 block">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="max-w-[180px]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
                {errors.primaryColor && <p className="text-sm text-red-500 mt-1">{errors.primaryColor}</p>}
              </div>
              
              <div>
                <Label htmlFor="backgroundColor" className="mb-2 block">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="text"
                    value={formData.backgroundColor}
                    onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                    className="max-w-[180px]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
                {errors.backgroundColor && <p className="text-sm text-red-500 mt-1">{errors.backgroundColor}</p>}
              </div>
            </div>
            
            <div className="max-w-xs">
              <Label htmlFor="borderStyle" className="mb-2 block">Border Style</Label>
              <Select 
                value={formData.borderStyle}
                onValueChange={(value) => setFormData({ ...formData, borderStyle: value as BorderStyleOption })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select border style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="sharp">Sharp</SelectItem>
                  <SelectItem value="pill">Pill</SelectItem>
                </SelectContent>
              </Select>
              {errors.borderStyle && <p className="text-sm text-red-500 mt-1">{errors.borderStyle}</p>}
            </div>
          </div>
            
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Typography variant="h4" className="font-medium">Features</Typography>
              <div className="h-px bg-border flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowBillingAddress">Billing Address</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to enter billing address</p>
                  </div>
                  <Switch
                    id="allowBillingAddress"
                    checked={formData.allowBillingAddress}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowBillingAddress: checked })}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowSaveCard">Save Card</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to save card details</p>
                  </div>
                  <Switch
                    id="allowSaveCard"
                    checked={formData.allowSaveCard}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowSaveCard: checked })}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowTaxSupport">Tax Support</Label>
                    <p className="text-sm text-muted-foreground">Enable tax calculation</p>
                  </div>
                  <Switch
                    id="allowTaxSupport"
                    checked={formData.allowTaxSupport}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowTaxSupport: checked })}
                  />
                </div>
                
                {formData.allowTaxSupport && (
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <Label htmlFor="taxPercentage" className="mb-2 block">Tax Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="taxPercentage"
                        type="number"
                        value={formData.taxPercentage?.toString() || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          taxPercentage: e.target.value ? parseFloat(e.target.value) : null 
                        })}
                        placeholder="Enter tax percentage"
                        className="max-w-xs"
                      />
                      <span className="text-muted-foreground">%</span>
                    </div>
                    {errors.taxPercentage && <p className="text-sm text-red-500 mt-1">{errors.taxPercentage}</p>}
                    <p className="text-sm text-muted-foreground mt-2">Applied to the subtotal at checkout</p>
                  </div>
                )}
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowContactInformation">Contact Information</Label>
                    <p className="text-sm text-muted-foreground">Collect customer contact information</p>
                  </div>
                  <Switch
                    id="allowContactInformation"
                    checked={formData.allowContactInformation}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowContactInformation: checked })}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowAddressAutocomplete">Address Autocomplete</Label>
                    <p className="text-sm text-muted-foreground">Enable address autocomplete</p>
                  </div>
                  <Switch
                    id="allowAddressAutocomplete"
                    checked={formData.allowAddressAutocomplete}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowAddressAutocomplete: checked })}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowTermsAccepted">Terms Acceptance</Label>
                    <p className="text-sm text-muted-foreground">Require customers to accept terms</p>
                  </div>
                  <Switch
                    id="allowTermsAccepted"
                    checked={formData.allowTermsAccepted}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowTermsAccepted: checked })}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowShippingDetails">Shipping Details</Label>
                    <p className="text-sm text-muted-foreground">Collect shipping information</p>
                  </div>
                  <Switch
                    id="allowShippingDetails"
                    checked={formData.allowShippingDetails}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowShippingDetails: checked })}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowQuantityChange">Quantity Change</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to change item quantity</p>
                  </div>
                  <Switch
                    id="allowQuantityChange"
                    checked={formData.allowQuantityChange}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowQuantityChange: checked })}
                  />
                </div>
              </div>
            </div>
            
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Typography variant="h4" className="font-medium">Links</Typography>
              <div className="h-px bg-border flex-1"></div>
            </div>
            
            <div>
              <Label htmlFor="termsUrl" className="mb-2 block">Terms and Conditions URL</Label>
              <Input
                id="termsUrl"
                value={formData.termsUrl}
                onChange={(e) => setFormData({ ...formData, termsUrl: e.target.value })}
                placeholder="https://example.com/terms"
                className="max-w-md"
              />
              {errors.termsUrl && <p className="text-sm text-red-500 mt-1">{errors.termsUrl}</p>}
              <p className="text-sm text-muted-foreground mt-1">URL to terms and conditions page</p>
            </div>
            
            <div>
              <Label htmlFor="privacyUrl" className="mb-2 block">Privacy Policy URL</Label>
              <Input
                id="privacyUrl"
                value={formData.privacyUrl}
                onChange={(e) => setFormData({ ...formData, privacyUrl: e.target.value })}
                placeholder="https://example.com/privacy"
                className="max-w-md"
              />
              {errors.privacyUrl && <p className="text-sm text-red-500 mt-1">{errors.privacyUrl}</p>}
              <p className="text-sm text-muted-foreground mt-1">URL to privacy policy page</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-6 pb-2">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : configId ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
