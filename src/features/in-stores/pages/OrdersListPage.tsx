import { useState, useEffect } from 'react'
import { Label } from '@shared/components/ui/label'
import { Input } from '@shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { OrdersTable } from '../components/OrdersTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { EntityListPageWithPanel } from '@shared/components/panels/generic/EntityListPageWithPanel'
import { OrderDetailsPanel } from '@shared/components/panels/orders/OrderDetailsPanel'
import { 
  Stepper,
  StepperFormSection,
  StepperFormFields,
  type StepConfig,
  type FieldConfig,
} from '@shared/components/ui/stepper'
import { DeviceTypeStep } from '@features/terminals/components/stepper/DeviceTypeStep'
import { 
  useOrderFilters, 
  useOrderActions
} from '../hooks'
import { orderService } from '@shared/services/order.service'
import type { Order } from '../types/order.types'
import { useEntitySelection } from '@shared/hooks/useEntitySelection'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

interface OrdersListPageProps {
  closePanelsTrigger?: number
  onHandlersReady?: (handlers: {
    handleOrderTerminal: () => void
  }) => void
}

export function OrdersListPage({ onHandlersReady }: OrdersListPageProps) {
  const [stepperOpen, setStepperOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [terminalFormData, setTerminalFormData] = useState({
    deviceSelection: {
      deviceType: "",
      deviceModel: "",
      accessories: [] as string[],
      quantity: 1,
    }
  })
  
  const filters = useOrderFilters()
  const actions = useOrderActions()
  const pageSizeSelector = usePageSizeSelector()
  const selection = useEntitySelection({
    batchActions: {
      cancel: actions.handleBatchCancel,
      return: actions.handleBatchReturn,
      export: actions.handleBatchExport,
      fulfill: actions.handleBatchFulfill
    }
  })

  // Terminal ordering stepper configuration
  const terminalSteps: StepConfig[] = [
    {
      id: "basic-info",
      title: "Basic Information",
      substeps: [
        {
          id: "device-type",
          title: "Device Type"
        },
        {
          id: "location",
          title: "Location"
        }
      ]
    },
    {
      id: "configuration",
      title: "Configuration",
      substeps: [
        {
          id: "network",
          title: "Network"
        },
        {
          id: "payment",
          title: "Payment"
        }
      ]
    },
    {
      id: "review",
      title: "Review & Order"
    }
  ]


  const handleOrderTerminal = () => {
    setStepperOpen(true)
    setCurrentStep(0)
  }

  // Expose handlers to parent component
  useEffect(() => {
    if (onHandlersReady) {
      onHandlersReady({
        handleOrderTerminal
      })
    }
  }, [onHandlersReady])

  const handleStepperClose = () => {
    setStepperOpen(false)
    setCurrentStep(0)
    setTerminalFormData({
      deviceSelection: {
        deviceType: "",
        deviceModel: "",
        accessories: [],
        quantity: 1,
      }
    })
  }

  const updateTerminalFormData = (updates: { deviceSelection: Partial<{ deviceType: string; deviceModel: string; accessories: string[]; quantity: number }> }) => {
    setTerminalFormData(prev => ({
      ...prev,
      deviceSelection: { ...prev.deviceSelection, ...updates.deviceSelection }
    }))
  }

  // Field configurations for order steps
  const orderLocationFields: FieldConfig[] = [
    {
      id: "storeName",
      label: "Store Name",
      type: "text", 
      placeholder: "Enter store name",
      required: true
    },
    {
      id: "terminalId",
      label: "Terminal ID",
      type: "text",
      placeholder: "Auto-generated", 
      disabled: true
    },
    {
      id: "priority",
      label: "Order Priority",
      type: "select",
      placeholder: "Select priority",
      options: [
        { value: "standard", label: "Standard (5-7 days)" },
        { value: "expedited", label: "Expedited (2-3 days)" }, 
        { value: "urgent", label: "Urgent (1 day)" }
      ],
      gridSpan: "full"
    }
  ]

  const renderStepContent = (stepId: string, substepId: string | null) => {
    if (stepId === "basic-info") {
      if (substepId === "device-type") {
        return (
          <DeviceTypeStep
            formData={terminalFormData}
            updateFormData={updateTerminalFormData}
          />
        )
      }
      
      if (substepId === "location") {
        return (
          <StepperFormSection
            title="Order Details"
            subtitle="Configure the order details and delivery information"
          >
            <StepperFormFields
              fields={orderLocationFields}
              values={{}} // Would need to expand form data structure
              onChange={() => {}} // Would need to implement proper form data updates  
              gridCols={2}
            />
          </StepperFormSection>
        )
      }
    }

    if (stepId === "configuration") {
      if (substepId === "network") {
        return (
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Network Configuration</h2>
              <p className="text-gray-600 mb-6">Configure network and connectivity settings</p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="connection-type">Connection Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select connection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethernet">Ethernet</SelectItem>
                      <SelectItem value="wifi">Wi-Fi</SelectItem>
                      <SelectItem value="cellular">Cellular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ip-address">IP Address</Label>
                    <Input id="ip-address" placeholder="Auto-assign" />
                  </div>
                  <div>
                    <Label htmlFor="subnet">Subnet Mask</Label>
                    <Input id="subnet" placeholder="255.255.255.0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
      if (substepId === "payment") {
        return (
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Payment Configuration</h2>
              <p className="text-gray-600 mb-6">Set up payment processing options</p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="merchant-id">Merchant ID</Label>
                  <Input id="merchant-id" placeholder="Enter merchant ID" />
                </div>
                
                <div>
                  <Label htmlFor="payment-processor">Payment Processor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select processor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
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
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Review Your Order</h2>
            <p className="text-gray-600 mb-6">Please review your terminal order details</p>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Device:</span>
                  <span>{terminalFormData.deviceSelection.deviceModel || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{terminalFormData.deviceSelection.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accessories:</span>
                  <span>{terminalFormData.deviceSelection.accessories.length || "None"}</span>
                </div>
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
      <EntityListPageWithPanel<Order>
      fetchData={orderService.getOrdersForNavigation}
      pageConfig={{
        header: {
          title: '',
          description: ''
        },
        statusFilters: StatusRegistry.getFilters('order'),
        table: {
          component: OrdersTable,
          props: {
            onView: actions.handleView,
            onCancel: actions.handleCancelOrder,
            onReturn: actions.handleReturnOrder
          }
        },
        tableFilters: {
          component: EntityTableFilters,
          props: {
            entity: "orders",
            onBulkAction: selection.handleBulkAction
          }
        }
      }}
      useFilters={() => filters}
      useSelection={() => selection}
      usePageSize={() => pageSizeSelector}
      animationKey={filters.statusFilter}
      basePath="/in-stores/orders"
      renderPanel={(props) => (
        <OrderDetailsPanel
          open={props.open}
          onOpenChange={props.onOpenChange}
          order={props.entity}
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
        steps={terminalSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        renderStepContent={renderStepContent}
        title="Order Terminal"
        subtitle="Configure and order a new terminal for your location"
      />
    </div>
  )
}
