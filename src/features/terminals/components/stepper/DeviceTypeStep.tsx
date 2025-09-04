"use client"

import { memo, useRef, useState } from "react"
import { cn } from "@shared/lib/utils"
import { Button } from "@shared/components/ui/button"
import { Label } from "@shared/components/ui/label"
import { Checkbox } from "@shared/components/ui/checkbox"

interface DeviceSelection {
  deviceType: string
  deviceModel: string
  accessories: string[]
  quantity: number
}

interface DeviceTypeStepProps {
  formData?: { deviceSelection: DeviceSelection }
  updateFormData?: (updates: { deviceSelection: Partial<DeviceSelection> }) => void
  onNext?: () => void
  onBack?: () => void
}

const deviceTypes = [
  {
    id: "countertop",
    name: "Countertop Terminal",
    description: "Perfect for retail stores and restaurants",
    models: [
      {
        id: "CT-100",
        name: "CT-100",
        description: "Basic countertop model",
        price: "$299",
        specs: {
          display: '2.8" Color LCD',
          connectivity: "Ethernet, WiFi",
          cardReader: "EMV Chip & PIN, Magnetic Stripe",
          dimensions: '6.5" x 3.2" x 2.1"',
          weight: "1.2 lbs",
        },
      },
      {
        id: "CT-200",
        name: "CT-200 Pro",
        description: "Advanced features with NFC",
        price: "$399",
        specs: {
          display: '4.3" Color Touchscreen',
          connectivity: "Ethernet, WiFi, Bluetooth",
          cardReader: "EMV Chip & PIN, Magnetic Stripe, NFC",
          dimensions: '7.1" x 3.8" x 2.3"',
          weight: "1.5 lbs",
        },
      },
      {
        id: "CT-300",
        name: "CT-300 Advanced",
        description: "Premium model with touchscreen",
        price: "$499",
        specs: {
          display: '5.5" HD Color Touchscreen',
          connectivity: "Ethernet, WiFi, Bluetooth, 4G",
          cardReader: "EMV Chip & PIN, Magnetic Stripe, NFC, Contactless",
          dimensions: '8.2" x 4.1" x 2.5"',
          weight: "1.8 lbs",
        },
      },
    ],
  },
  {
    id: "mobile",
    name: "Mobile Terminal",
    description: "Portable solution for on-the-go payments",
    models: [
      {
        id: "MB-50",
        name: "MB-50",
        description: "Compact mobile terminal",
        price: "$199",
        specs: {
          display: '2.4" Monochrome LCD',
          connectivity: "WiFi, Bluetooth",
          cardReader: "EMV Chip & PIN, Magnetic Stripe",
          battery: "8 hours continuous use",
          weight: "0.8 lbs",
        },
      },
      {
        id: "MB-75",
        name: "MB-75 Plus",
        description: "Extended battery life",
        price: "$249",
        specs: {
          display: '3.2" Color LCD',
          connectivity: "WiFi, Bluetooth, 4G",
          cardReader: "EMV Chip & PIN, Magnetic Stripe, NFC",
          battery: "12 hours continuous use",
          weight: "1.0 lbs",
        },
      },
      {
        id: "MB-100",
        name: "MB-100 Enterprise",
        description: "Rugged design for heavy use",
        price: "$349",
        specs: {
          display: '4.0" Color Touchscreen',
          connectivity: "WiFi, Bluetooth, 4G, GPS",
          cardReader: "EMV Chip & PIN, Magnetic Stripe, NFC, Contactless",
          battery: "16 hours continuous use",
          weight: "1.3 lbs",
        },
      },
    ],
  },
  {
    id: "integrated",
    name: "Integrated Terminal",
    description: "Built-in solution for POS systems",
    models: [
      {
        id: "INT-400",
        name: "INT-400",
        description: "Standard integration module",
        price: "$179",
        specs: {
          interface: "USB, Serial",
          cardReader: "EMV Chip & PIN, Magnetic Stripe",
          dimensions: '4.5" x 2.8" x 1.2"',
          power: "USB Powered",
          weight: "0.6 lbs",
        },
      },
      {
        id: "INT-500",
        name: "INT-500 Pro",
        description: "Enhanced processing power",
        price: "$229",
        specs: {
          interface: "USB, Serial, Ethernet",
          cardReader: "EMV Chip & PIN, Magnetic Stripe, NFC",
          dimensions: '5.1" x 3.2" x 1.4"',
          power: "USB or External Adapter",
          weight: "0.8 lbs",
        },
      },
      {
        id: "INT-600",
        name: "INT-600 Max",
        description: "Maximum performance integration",
        price: "$299",
        specs: {
          interface: "USB, Serial, Ethernet, WiFi",
          cardReader: "EMV Chip & PIN, Magnetic Stripe, NFC, Contactless",
          dimensions: '5.8" x 3.6" x 1.6"',
          power: "External Adapter Required",
          weight: "1.1 lbs",
        },
      },
    ],
  },
]

const accessoriesByModel = {
  "CT-100": [
    { id: "receipt-printer", name: "Receipt Printer", price: "$149" },
    { id: "cash-drawer", name: "Cash Drawer", price: "$199" },
    { id: "customer-display", name: "Customer Display", price: "$129" },
  ],
  "CT-200": [
    { id: "receipt-printer", name: "Receipt Printer", price: "$149" },
    { id: "barcode-scanner", name: "Barcode Scanner", price: "$89" },
    { id: "cash-drawer", name: "Cash Drawer", price: "$199" },
    { id: "customer-display", name: "Customer Display", price: "$129" },
    { id: "nfc-reader", name: "External NFC Reader", price: "$79" },
  ],
  "CT-300": [
    { id: "receipt-printer", name: "Receipt Printer", price: "$149" },
    { id: "barcode-scanner", name: "Barcode Scanner", price: "$89" },
    { id: "cash-drawer", name: "Cash Drawer", price: "$199" },
    { id: "customer-display", name: "Customer Display", price: "$129" },
    { id: "signature-pad", name: "Signature Pad", price: "$99" },
  ],
  "MB-50": [
    { id: "protective-case", name: "Protective Case", price: "$39" },
    { id: "car-charger", name: "Car Charger", price: "$29" },
    { id: "belt-holster", name: "Belt Holster", price: "$19" },
  ],
  "MB-75": [
    { id: "protective-case", name: "Protective Case", price: "$39" },
    { id: "car-charger", name: "Car Charger", price: "$29" },
    { id: "belt-holster", name: "Belt Holster", price: "$19" },
    { id: "extended-battery", name: "Extended Battery", price: "$59" },
  ],
  "MB-100": [
    { id: "protective-case", name: "Rugged Protective Case", price: "$59" },
    { id: "car-charger", name: "Car Charger", price: "$29" },
    { id: "belt-holster", name: "Heavy Duty Belt Holster", price: "$29" },
    { id: "extended-battery", name: "Extended Battery", price: "$59" },
    { id: "vehicle-mount", name: "Vehicle Mount", price: "$79" },
  ],
  "INT-400": [
    { id: "integration-cable", name: "Integration Cable Kit", price: "$49" },
    { id: "mounting-bracket", name: "Mounting Bracket", price: "$29" },
  ],
  "INT-500": [
    { id: "integration-cable", name: "Integration Cable Kit", price: "$49" },
    { id: "mounting-bracket", name: "Mounting Bracket", price: "$29" },
    { id: "power-adapter", name: "External Power Adapter", price: "$39" },
  ],
  "INT-600": [
    { id: "integration-cable", name: "Integration Cable Kit", price: "$49" },
    { id: "mounting-bracket", name: "Mounting Bracket", price: "$29" },
    { id: "power-adapter", name: "External Power Adapter", price: "$39" },
    { id: "cooling-fan", name: "Cooling Fan Module", price: "$69" },
  ],
}

export const DeviceTypeStep = memo(function DeviceTypeStep({
  formData = { deviceSelection: { deviceType: "", deviceModel: "", accessories: [], quantity: 1 } },
  updateFormData = () => {},
  onNext,
  onBack,
}: DeviceTypeStepProps) {
  const { deviceSelection } = formData

  const deviceModelRef = useRef<HTMLDivElement>(null)
  const accessoriesRef = useRef<HTMLDivElement>(null)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)

  const handleDeviceTypeChange = (deviceType: string) => {
    updateFormData({
      deviceSelection: {
        ...deviceSelection,
        deviceType,
        deviceModel: "", // Reset model when type changes
        accessories: [], // Reset accessories when type changes
      },
    })

    setTimeout(() => {
      deviceModelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  const handleModelChange = (deviceModel: string) => {
    updateFormData({
      deviceSelection: {
        ...deviceSelection,
        deviceModel,
        accessories: [], // Reset accessories when model changes
      },
    })

    setTimeout(() => {
      accessoriesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  const handleQuantityChange = (quantity: number) => {
    updateFormData({
      deviceSelection: {
        ...deviceSelection,
        quantity: Math.max(1, quantity),
      },
    })
  }

  const handleAccessoryToggle = (accessoryId: string, checked: boolean) => {
    const updatedAccessories = checked
      ? [...deviceSelection.accessories, accessoryId]
      : deviceSelection.accessories.filter((id) => id !== accessoryId)

    updateFormData({
      deviceSelection: {
        ...deviceSelection,
        accessories: updatedAccessories,
      },
    })
  }

  const selectedDeviceType = deviceTypes.find((type) => type.id === deviceSelection.deviceType)
  const selectedModel = selectedDeviceType?.models.find((model) => model.id === deviceSelection.deviceModel)
  const availableAccessories = deviceSelection.deviceModel
    ? accessoriesByModel[deviceSelection.deviceModel as keyof typeof accessoriesByModel] || []
    : []
  const isFormValid = deviceSelection.deviceType && deviceSelection.deviceModel && deviceSelection.quantity > 0

  const getUseCases = (modelId: string) => {
    const useCases = {
      "CT-100": ["Small retail stores", "Coffee shops", "Quick service restaurants"],
      "CT-200": ["Medium retail stores", "Restaurants", "Service businesses"],
      "CT-300": ["Large retail chains", "Full-service restaurants", "Enterprise businesses"],
      "MB-50": ["Food trucks", "Market vendors", "Delivery services"],
      "MB-75": ["Field sales", "Trade shows", "Mobile services"],
      "MB-100": ["Construction sites", "Outdoor events", "Industrial applications"],
      "INT-400": ["Small POS systems", "Kiosks", "Basic integrations"],
      "INT-500": ["Medium POS systems", "Retail chains", "Advanced integrations"],
      "INT-600": ["Enterprise POS systems", "Complex integrations", "High-volume processing"],
    }
    return useCases[modelId as keyof typeof useCases] || []
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Select Device</h2>

            {/* Device Type Selection */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <h3 className="col-span-3 text-lg font-medium text-gray-900 mb-2">Device Type</h3>
              {deviceTypes.map((type) => (
                <div
                  key={type.id}
                  className={cn(
                    "p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg",
                    deviceSelection.deviceType === type.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => handleDeviceTypeChange(type.id)}
                >
                  <div className="text-center">
                    {/* Device Image Placeholder */}
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        {type.name.split(' ').map(word => word[0]).join('')}
                      </div>
                    </div>

                    {/* Radio Button */}
                    <div className="flex justify-center mb-3">
                      <input
                        type="radio"
                        name="deviceType"
                        value={type.id}
                        checked={deviceSelection.deviceType === type.id}
                        onChange={() => handleDeviceTypeChange(type.id)}
                        className="w-5 h-5 text-blue-600"
                      />
                    </div>

                    {/* Device Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{type.name}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Device Model Selection */}
            {selectedDeviceType && (
              <div className="mb-8" ref={deviceModelRef}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Device Model</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedDeviceType.models.map((model) => (
                    <div
                      key={model.id}
                      className={cn(
                        "p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg",
                        deviceSelection.deviceModel === model.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                      onClick={() => handleModelChange(model.id)}
                    >
                      <div className="text-center">
                        {/* Model Image Placeholder */}
                        <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            {model.name.replace(/[^A-Z0-9]/g, '')}
                          </div>
                        </div>

                        {/* Radio Button */}
                        <div className="flex justify-center mb-2">
                          <input
                            type="radio"
                            name="deviceModel"
                            value={model.id}
                            checked={deviceSelection.deviceModel === model.id}
                            onChange={() => handleModelChange(model.id)}
                            className="w-4 h-4 text-blue-600"
                          />
                        </div>

                        {/* Model Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{model.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{model.description}</p>
                          <p className="text-sm font-medium text-blue-600">{model.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accessories Selection */}
            {deviceSelection.deviceModel && availableAccessories.length > 0 && (
              <div className="space-y-4 mb-8" ref={accessoriesRef}>
                <h3 className="text-lg font-medium text-gray-900">
                  Available Accessories for {deviceSelection.deviceModel}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {availableAccessories.map((accessory) => (
                    <div
                      key={accessory.id}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      {/* Accessory Image */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          {accessory.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </div>
                      </div>
                      <Checkbox
                        id={accessory.id}
                        checked={deviceSelection.accessories.includes(accessory.id)}
                        onCheckedChange={(checked) => handleAccessoryToggle(accessory.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={accessory.id} className="font-medium cursor-pointer">
                          {accessory.name}
                        </Label>
                        <span className="ml-2 text-sm text-gray-600">{accessory.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex gap-2">
                {onBack && (
                  <Button variant="outline" onClick={onBack}>
                    Back
                  </Button>
                )}
                <Button
                  onClick={onNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex-1"
                  disabled={!isFormValid}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Preview Panel */}
      {selectedModel && (
        <div
          className={cn(
            "fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 z-50",
            isPreviewExpanded ? "w-1/2" : "w-96",
          )}
        >
          {isPreviewExpanded && (
            <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={() => setIsPreviewExpanded(false)} />
          )}

          <div className="relative z-50 h-full overflow-y-auto p-6">
            <div className="sticky top-0 bg-white pb-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Device Preview</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateFormData({ deviceSelection: { ...deviceSelection, deviceModel: "" } })}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </Button>
                </div>
              </div>

              {/* Large Device Image */}
              <div
                className={cn(
                  "bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center justify-center mb-6",
                  isPreviewExpanded ? "w-full h-80" : "w-full h-64",
                )}
              >
                <div className={cn(
                  "bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold",
                  isPreviewExpanded ? "w-60 h-40 text-2xl" : "w-40 h-32 text-xl"
                )}>
                  {selectedModel.name}
                </div>
              </div>

              {/* Device Info */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedModel.name}</h4>
                <p className="text-gray-600 mb-3">{selectedModel.description}</p>
                <p className="text-2xl font-bold text-blue-600">{selectedModel.price}</p>
              </div>

              {/* Device Specifications */}
              <div className="mb-6">
                <h5 className="text-md font-semibold text-gray-900 mb-3">Specifications</h5>
                <div className={cn("space-y-2", isPreviewExpanded ? "grid grid-cols-1 gap-3" : "")}>
                  {Object.entries(selectedModel.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className={cn(
                        "flex text-sm",
                        isPreviewExpanded ? "flex-col space-y-1 p-3 bg-gray-50 rounded-lg border" : "justify-between",
                      )}
                    >
                      <span
                        className={cn(
                          "text-gray-600 capitalize",
                          isPreviewExpanded ? "font-medium text-xs uppercase tracking-wide" : "",
                        )}
                      >
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span className={cn("text-gray-900 font-medium", isPreviewExpanded ? "text-base" : "")}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Use Cases */}
              {isPreviewExpanded && (
                <div className="mb-6">
                  <h5 className="text-md font-semibold text-gray-900 mb-3">Ideal Use Cases</h5>
                  <div className="space-y-2">
                    {getUseCases(selectedModel.id).map((useCase, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h5 className="text-md font-semibold text-gray-900 mb-3">Quantity</h5>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(deviceSelection.quantity - 1)}
                    disabled={deviceSelection.quantity <= 1}
                    className="w-8 h-8 p-0"
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                    {deviceSelection.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(deviceSelection.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Total: {selectedModel.price.replace("$", "")} × {deviceSelection.quantity} = $
                  {(parseInt(selectedModel.price.replace("$", "")) * deviceSelection.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
