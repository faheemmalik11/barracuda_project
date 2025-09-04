import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { CheckoutConfigForm, type FormData } from "@shared/components/forms/CheckoutConfigForm"
import { checkoutConfigService } from "@shared/services"
import { defaultCheckoutConfig } from "@shared/types/checkout-config"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@shared/components/ui/button"

export default function CreateCheckoutConfigPage() {
  const [searchParams] = useSearchParams()
  const merchantId = searchParams.get('merchantId')
  const orgId = Number(searchParams.get('orgId'))
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: FormData) => {
    if (!merchantId) {
      toast.error("Merchant ID is required")
      return
    }
    
    if (!orgId) {
      toast.error("Organization ID is required")
      return
    }

    setIsSubmitting(true)
    try {
      await checkoutConfigService.createCheckoutConfig(orgId, merchantId, data)
      toast.success("Checkout configuration created successfully")
      navigate('/merchants')
    } catch (error) {
      console.error("Failed to create checkout configuration:", error)
      toast.error("Failed to create checkout configuration")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!merchantId) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Merchant ID is required</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate("/merchants")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Merchants
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container space-y-8 py-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/merchants")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Merchants
        </Button>
      </div>
      
      <CheckoutConfigForm
        initialData={defaultCheckoutConfig}
        merchantId={merchantId}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
