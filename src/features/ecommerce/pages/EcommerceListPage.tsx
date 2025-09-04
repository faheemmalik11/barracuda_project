import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { EcommerceDetailsPanel } from '@shared/components/panels/ecommerce/EcommerceDetailsPanel'
import { EntityListPageWithPanel } from '@shared/components/panels/generic/EntityListPageWithPanel'
import { EcommerceTable } from '@shared/components/tables/EcommerceTable'
import { Stepper, type StepConfig } from '@shared/components/ui/stepper'
import { useEntitySelection } from '@shared/hooks/useEntitySelection'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'
import { ecommerceService } from '@shared/services/ecommerce.service'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import {
  useEcommerceActions,
  useEcommerceFilters
} from '../hooks'
import type { Ecommerce } from '../types/ecommerce.types'
import { CheckoutPreview } from '../components/CheckoutPreview'
import { renderHostedCheckoutStepContent, type HostedCheckoutFormData } from '../components/HostedCheckoutSteps'

export function EcommerceListPage() {
  const [stepperOpen, setStepperOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hostedCheckoutFormData, setHostedCheckoutFormData] = useState<HostedCheckoutFormData>({
    general: {
      name: "",
      webAddress: "",
      description: "",
      businessCategory: "",
      paymentDescriptor: "",
      styleTemplate: "default"
    },
    products: {
      productSource: "vinr-platform", // "vinr-platform" | "direct-merchant"
      store: "",
      allowUpsales: false,
      allowPromoCodes: false
    },
    payment: {
      multiCurrencySupport: false,
      automaticCurrencyConversion: false,
      savePaymentDetails: false,
      requireBillingAddress: false,
      paymentMethods: [] as string[]
    },
    shipping: {
      requireShippingAddress: false,
      enableShippingOptions: false
    },
    advanced: {
      localizeByLocation: false,
      allowBusinessTaxIds: false,
      collectTaxAutomatically: false,
      collectPhoneNumber: false,
      allowCustomFields: false,
      requireTermsAcceptance: false
    },
    afterPayment: {
      showConfirmationPage: true,
      postPaymentInvoice: false
    }
  })
  
  const filters = useEcommerceFilters()
  const actions = useEcommerceActions()
  const pageSizeSelector = usePageSizeSelector()
  const selection = useEntitySelection({
    batchActions: {
      activate: actions.handleBatchActivate,
      deactivate: actions.handleBatchDeactivate,
      export: actions.handleBatchExport
    }
  })

  // Hosted Checkout configuration stepper steps
  const hostedCheckoutSteps: StepConfig[] = [
    {
      id: "general",
      title: "General"
    },
    {
      id: "products", 
      title: "Products"
    },
    {
      id: "payment",
      title: "Payment"
    },
    {
      id: "shipping",
      title: "Shipping"
    },
    {
      id: "advanced",
      title: "Advanced Options"
    },
    {
      id: "after-payment",
      title: "After Payment"
    }
  ]

  const handleConfigureHostedCheckout = () => {
    setStepperOpen(true)
    setCurrentStep(0)
  }

  const handleConfigureAPIIntegration = () => {
    setStepperOpen(true)
    setCurrentStep(0)
  }

  const handleConfigureDropInElements = () => {
    setStepperOpen(true)
    setCurrentStep(0)
  }


  const handleStepperClose = () => {
    setStepperOpen(false)
    setCurrentStep(0)
    setHostedCheckoutFormData({
      general: {
        name: "",
        webAddress: "",
        description: "",
        businessCategory: "",
        paymentDescriptor: "",
        styleTemplate: "default"
      },
      products: {
        productSource: "vinr-platform",
        store: "",
        allowUpsales: false,
        allowPromoCodes: false
      },
      payment: {
        multiCurrencySupport: false,
        automaticCurrencyConversion: false,
        savePaymentDetails: false,
        requireBillingAddress: false,
        paymentMethods: []
      },
      shipping: {
        requireShippingAddress: false,
        enableShippingOptions: false
      },
      advanced: {
        localizeByLocation: false,
        allowBusinessTaxIds: false,
        collectTaxAutomatically: false,
        collectPhoneNumber: false,
        allowCustomFields: false,
        requireTermsAcceptance: false
      },
      afterPayment: {
        showConfirmationPage: true,
        postPaymentInvoice: false
      }
    })
  }

  const updateHostedCheckoutFormData = (updates: any) => {
    setHostedCheckoutFormData(prev => ({ ...prev, ...updates }))
  }



  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <EntityListPageWithPanel<Ecommerce>
        fetchData={ecommerceService.getEcommerceForNavigation}
        pageConfig={{
          header: {
            title: 'Ecommerce (HostedWeb, API, Drops, Elements)',
            description: 'Manage and configure your ecommerce integrations',
            primaryAction: {
              label: 'Configure',
              icon: <Plus className="h-4 w-4" />,
              onClick: handleConfigureHostedCheckout,
              dropdown: [
                {
                  label: 'Hosted Checkout',
                  onClick: handleConfigureHostedCheckout
                },
                {
                  label: 'API Integration', 
                  onClick: handleConfigureAPIIntegration
                },
                {
                  label: 'Drop-In Elements',
                  onClick: handleConfigureDropInElements
                }
              ]
            }
          },
          statusFilters: StatusRegistry.getFilters('ecommerce'),
          table: {
            component: EcommerceTable,
            props: {
              onView: actions.handleView,
              onCopyId: actions.copyEcommerceId
            }
          },
          tableFilters: {
            component: EntityTableFilters,
            props: {
              entity: "ecommerce",
              onBulkAction: selection.handleBulkAction
            }
          }
        }}
        useFilters={() => filters}
        useSelection={() => selection}
        usePageSize={() => pageSizeSelector}
        animationKey={filters.statusFilter}
        basePath="/ecommerce"
        renderPanel={(props) => (
          <EcommerceDetailsPanel
            open={props.open}
            onOpenChange={props.onOpenChange}
            ecommerce={props.entity}
            onBack={props.onBack}
            onOpenFullDetails={props.onOpenFullDetails}
            totalItems={props.totalItems}
            navigatePrevious={props.navigatePrevious}
            navigateNext={props.navigateNext}
            canNavigatePrevious={props.canNavigatePrevious}
            canNavigateNext={props.canNavigateNext}
          />
        )}
      />
      
      <Stepper
        isOpen={stepperOpen}
        title="Create Hosted Checkout"
        subtitle="Set up your hosted checkout experience"
        steps={hostedCheckoutSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onClose={handleStepperClose}
        renderStepContent={(stepId, substepId) => (
          <div className="flex gap-6 h-full">
            <div className="flex-1">
              {renderHostedCheckoutStepContent(stepId, substepId, { formData: hostedCheckoutFormData, updateFormData: updateHostedCheckoutFormData })}
            </div>
            <div className="w-96 bg-muted/30">
              <CheckoutPreview formData={hostedCheckoutFormData} />
            </div>
          </div>
        )}
      />
    </div>
  )
}
