import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { CheckoutConfigForm, type FormData } from "@shared/components/forms/CheckoutConfigForm"
import { checkoutConfigService } from "@shared/services"
import type { CheckoutConfig } from "@shared/types/checkout-config"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { Skeleton } from "@shared/components/ui/skeleton"

export default function EditCheckoutConfigPage() {
  const [searchParams] = useSearchParams()
  const merchantId = searchParams.get('merchantId')
  const configId = searchParams.get('configId')
  const orgId = Number(searchParams.get('orgId'))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfig | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCheckoutConfig = async () => {
      if (!merchantId || !configId) {
        setError("Merchant ID and Config ID are required")
        setIsLoading(false)
        return
      }
      
      if (!orgId) {
        setError("Organization ID is required")
        setIsLoading(false)
        return
      }

      try {
        const data = await checkoutConfigService.getCheckoutConfig(orgId, merchantId, configId)
        setCheckoutConfig(data)
      } catch (error) {
        console.error("Failed to fetch checkout configuration:", error)
        setError("Failed to load checkout configuration")
        toast.error("Failed to load checkout configuration")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCheckoutConfig()
  }, [merchantId, configId, orgId])

  const handleSubmit = async (data: FormData) => {
    if (!merchantId || !configId) {
      toast.error("Merchant ID and Config ID are required")
      return
    }
    
    if (!orgId) {
      toast.error("Organization ID is required")
      return
    }

    setIsSubmitting(true)
    try {
      await checkoutConfigService.updateCheckoutConfig(orgId, merchantId, configId, data)
      toast.success("Checkout configuration updated successfully")
      navigate('/merchants')
    } catch (error) {
      console.error("Failed to update checkout configuration:", error)
      toast.error("Failed to update checkout configuration")
    } finally {
      setIsSubmitting(false)
      
    }
  }

  if (isLoading) {
    return (
      <div className="container space-y-8 py-6 max-w-3xl mx-auto">
        <div className="mb-4 flex items-center">
          <Skeleton.Box width="w-32" height="h-9" />
        </div>
        <Skeleton.Form />
      </div>
    )
  }

  if (error || !merchantId || !configId) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Merchant ID and Config ID are required"}</p>
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
      
      {checkoutConfig && (
        <CheckoutConfigForm
          initialData={checkoutConfig}
          merchantId={merchantId}
          configId={configId}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
