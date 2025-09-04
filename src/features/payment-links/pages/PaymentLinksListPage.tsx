import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { EntityListPageWithPanel } from '@shared/components/panels/generic/EntityListPageWithPanel'
import { PaymentLinkDetailsPanel } from '@shared/components/panels/payment-links/PaymentLinkDetailsPanel'
import { PaymentLinksTable } from '@shared/components/tables/PaymentLinksTable'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { 
  Stepper, 
  StepperFormSection,
  StepperFormFields,
  type StepConfig,
  type FieldConfig,
} from '@shared/components/ui/stepper'
import { useEntitySelection } from '@shared/hooks/useEntitySelection'
import { paymentLinkService } from '@shared/services/payment-link.service'
import type { PaymentLink } from '@shared/types/payment-links'
import { Link } from 'lucide-react'
import { Label } from '@shared/components/ui/label'
import { Input } from '@shared/components/ui/input'
import { Switch } from '@shared/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { useState } from 'react'
import {
  usePaymentLinkActions,
  usePaymentLinkFilters
} from '../hooks'

export function PaymentLinksListPage() {
  const [stepperOpen, setStepperOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentLinkFormData, setPaymentLinkFormData] = useState({
    basic: {
      title: "",
      description: "",
      type: "one-time",
      amount: "",
      currency: "USD",
    },
    settings: {
      collectCustomerInfo: false,
      allowCustomAmount: false,
      redirectUrl: "",
      expiresAt: "",
    }
  })
  
  const filters = usePaymentLinkFilters()
  const actions = usePaymentLinkActions()
  const pageSizeSelector = usePageSizeSelector()
  const selection = useEntitySelection({
    batchActions: {
      cancel: actions.handleBatchCancel,
      export: actions.handleBatchExport,
      activate: actions.handleBatchActivate
    }
  })

  // Payment link creation stepper steps
  const paymentLinkSteps: StepConfig[] = [
    {
      id: "basic-info",
      title: "Basic Information",
      substeps: [
        {
          id: "details",
          title: "Link Details"
        },
        {
          id: "type",
          title: "Payment Type"
        }
      ]
    },
    {
      id: "customization",
      title: "Customization",
      substeps: [
        {
          id: "settings",
          title: "Settings"
        },
        {
          id: "branding",
          title: "Branding"
        }
      ]
    },
    {
      id: "review",
      title: "Review & Create"
    }
  ]

  const handleCreateLink = () => {
    setStepperOpen(true)
    setCurrentStep(0)
  }

  const handleStepperClose = () => {
    setStepperOpen(false)
    setCurrentStep(0)
    setPaymentLinkFormData({
      basic: {
        title: "",
        description: "",
        type: "one-time",
        amount: "",
        currency: "USD",
      },
      settings: {
        collectCustomerInfo: false,
        allowCustomAmount: false,
        redirectUrl: "",
        expiresAt: "",
      }
    })
  }

  const updatePaymentLinkFormData = (updates: Partial<typeof paymentLinkFormData>) => {
    setPaymentLinkFormData(prev => ({ ...prev, ...updates }))
  }

  // Field configurations for the form steps
  const linkDetailsFields: FieldConfig[] = [
    {
      id: "title",
      label: "Link Title",
      type: "text",
      placeholder: "e.g., Product Purchase, Service Payment",
      required: true,
      gridSpan: "full"
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe what customers are paying for...",
      rows: 3,
      gridSpan: "full"
    },
    {
      id: "amount",
      label: "Amount",
      type: "number",
      placeholder: "0.00",
      step: 0.01,
      min: 0
    },
    {
      id: "currency",
      label: "Currency",
      type: "select",
      placeholder: "Select currency",
      options: [
        { value: "USD", label: "USD - US Dollar" },
        { value: "EUR", label: "EUR - Euro" },
        { value: "GBP", label: "GBP - British Pound" },
        { value: "CAD", label: "CAD - Canadian Dollar" }
      ]
    }
  ]




  const renderStepContent = (stepId: string, substepId: string | null) => {
    if (stepId === "basic-info") {
      if (substepId === "details") {
        return (
          <StepperFormSection
            title="Link Details"
            subtitle="Set up the basic information for your payment link"
          >
            <StepperFormFields
              fields={linkDetailsFields}
              values={paymentLinkFormData.basic}
              onChange={(id, value) => updatePaymentLinkFormData({ basic: { ...paymentLinkFormData.basic, [id]: value } })}
              gridCols={2}
            />
          </StepperFormSection>
        )
      }
      
      if (substepId === "type") {
        return (
          <div className="p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Payment Type</h2>
              <p className="text-gray-600 mb-6">Choose how customers will pay</p>
              
              <div className="grid gap-4">
                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Link className="w-4 h-4 text-blue-600" />
                      </div>
                      One-time Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Customers pay once for a product or service. Perfect for single purchases.
                    </p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Link className="w-4 h-4 text-green-600" />
                      </div>
                      Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Recurring payments for ongoing services. Set up monthly, yearly, or custom intervals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Link className="w-4 h-4 text-purple-600" />
                      </div>
                      Donation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Accept donations with optional custom amounts. Great for fundraising and tips.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
      }
    }

    if (stepId === "customization") {
      if (substepId === "settings") {
        return (
          <div className="p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Link Settings</h2>
              <p className="text-gray-600 mb-6">Configure how your payment link behaves</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="collect-info">Collect Customer Information</Label>
                    <p className="text-sm text-gray-600">Require customers to provide contact details</p>
                  </div>
                  <Switch id="collect-info" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="custom-amount">Allow Custom Amount</Label>
                    <p className="text-sm text-gray-600">Let customers enter their own amount</p>
                  </div>
                  <Switch id="custom-amount" />
                </div>
                
                <div>
                  <Label htmlFor="expires-at">Expiration Date (Optional)</Label>
                  <Input id="expires-at" type="datetime-local" />
                </div>
                
                <div>
                  <Label htmlFor="max-uses">Maximum Uses (Optional)</Label>
                  <Input id="max-uses" type="number" placeholder="Leave empty for unlimited" />
                </div>
              </div>
            </div>
          </div>
        )
      }
      
      if (substepId === "branding") {
        return (
          <div className="p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Branding & Redirect</h2>
              <p className="text-gray-600 mb-6">Customize the appearance and post-payment experience</p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="redirect-url">Success Redirect URL</Label>
                  <Input id="redirect-url" placeholder="https://your-site.com/thank-you" />
                  <p className="text-sm text-gray-500 mt-1">Where to send customers after successful payment</p>
                </div>
                
                <div>
                  <Label htmlFor="brand-color">Brand Color</Label>
                  <div className="flex gap-2">
                    <Input id="brand-color" type="color" className="w-16 h-10" />
                    <Input placeholder="#3B82F6" className="flex-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="logo-url">Logo URL (Optional)</Label>
                  <Input id="logo-url" placeholder="https://your-site.com/logo.png" />
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    if (stepId === "review") {
      return (
        <div className="p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Review Payment Link</h2>
            <p className="text-gray-600 mb-6">Review your payment link configuration</p>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Link Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Title:</span>
                    <span>{paymentLinkFormData.basic.title || "Not set"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="capitalize">{paymentLinkFormData.basic.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span>{paymentLinkFormData.basic.amount ? `${paymentLinkFormData.basic.currency} ${paymentLinkFormData.basic.amount}` : "Not set"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Custom Amount:</span>
                    <span>{paymentLinkFormData.settings.allowCustomAmount ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Collect Info:</span>
                    <span>{paymentLinkFormData.settings.collectCustomerInfo ? "Yes" : "No"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Ready to Create</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Payment link will be generated with a unique URL</li>
                  <li>• You can share the link via email, social media, or embed it</li>
                  <li>• Analytics and payment tracking will be available in your dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground">Step content not implemented</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <EntityListPageWithPanel<PaymentLink>
        fetchData={paymentLinkService.getPaymentLinksForNavigation}
        pageConfig={{
          header: {
            title: 'Payment Links',
            description: 'Create and manage payment links for your products and services',
            primaryAction: {
              label: 'Create Link',
              icon: <Link className="h-4 w-4" />,
              onClick: handleCreateLink
            }
          },
          statusFilters: [
            { label: 'All', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
          ],
          table: {
            component: PaymentLinksTable,
            props: {
              onView: actions.handleView,
              onCancel: actions.handleCancelLink
            }
          },
          tableFilters: {
            component: EntityTableFilters,
            props: {
              entity: "payment-links",
              onBulkAction: selection.handleBulkAction,
              additionalFilters: [
                {
                  key: 'type',
                  label: 'Type',
                  options: [
                    { label: 'All Types', value: 'all' },
                    { label: 'One-time', value: 'one-time' },
                    { label: 'Subscription', value: 'subscription' },
                    { label: 'Donation', value: 'donation' }
                  ]
                },
                {
                  key: 'created',
                  label: 'Created',
                  type: 'date-range'
                },
                {
                  key: 'lastSeen',
                  label: 'Last Seen',
                  type: 'date-range'
                }
              ]
            }
          }
        }}
        useFilters={() => filters}
        useSelection={() => selection}
        usePageSize={() => pageSizeSelector}
        animationKey={filters.statusFilter}
        basePath="/payment-links"
        renderPanel={(props) => (
          <PaymentLinkDetailsPanel
            open={props.open}
            onOpenChange={props.onOpenChange}
            paymentLink={props.entity}
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
        onClose={handleStepperClose}
        steps={paymentLinkSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        renderStepContent={renderStepContent}
        title="Create Payment Link"
        subtitle="Set up a new payment link for your products or services"
      />
    </div>
  )
}
