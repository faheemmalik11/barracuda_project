/* eslint-disable @typescript-eslint/no-unused-vars */


import type React from "react"

import { useState } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Textarea } from "@shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { Switch } from "@shared/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Badge } from "@shared/components/ui/badge"
import { Calendar } from "@shared/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@shared/lib/utils"
import type { PaymentLink, PaymentLinkFormData, CustomField } from "@shared/types/payment-links"
import { Typography } from "@shared/components/ui/typography"
import { Checkbox } from "@shared/components/ui/checkbox"

interface PaymentLinkFormProps {
  initialData?: PaymentLink
  onClose: () => void
}

export function PaymentLinkForm({ initialData, onClose }: PaymentLinkFormProps) {
  const [formData, setFormData] = useState<PaymentLinkFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    type: initialData?.type || "fixed",
    amount: initialData?.amount ? initialData.amount / 100 : undefined,
    currency: initialData?.currency || "USD",
    collectShipping: initialData?.collectShipping || false,
    collectTaxId: initialData?.collectTaxId || false,
    allowPromotionCodes: initialData?.allowPromotionCodes || false,
    successUrl: initialData?.successUrl || "",
    cancelUrl: initialData?.cancelUrl || "",
    expiresAt: initialData?.expiresAt,
    recurringInterval: initialData?.recurringInterval || "month",
    recurringIntervalCount: initialData?.recurringIntervalCount || 1,
    trialPeriodDays: initialData?.trialPeriodDays || 0,
    productName: initialData?.productName || "",
    productDescription: initialData?.productDescription || "",
    customFields: initialData?.customFields || [],
    metadata: initialData?.metadata || {},
  })

  const [newMetadataKey, setNewMetadataKey] = useState("")
  const [newMetadataValue, setNewMetadataValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Submitting payment link:", formData)
    onClose()
  }

  const addCustomField = () => {
    const newField: CustomField = {
      id: `cf_${Date.now()}`,
      key: `field_${formData.customFields.length + 1}`,
      label: "New Field",
      type: "text",
      required: false,
    }
    setFormData({
      ...formData,
      customFields: [...formData.customFields, newField],
    })
  }

  const updateCustomField = (index: number, field: Partial<CustomField>) => {
    const updatedFields = [...formData.customFields]
    updatedFields[index] = { ...updatedFields[index], ...field }
    setFormData({ ...formData, customFields: updatedFields })
  }

  const removeCustomField = (index: number) => {
    setFormData({
      ...formData,
      customFields: formData.customFields.filter((_, i) => i !== index),
    })
  }

  const addMetadata = () => {
    if (newMetadataKey && newMetadataValue) {
      setFormData({
        ...formData,
        metadata: { ...formData.metadata, [newMetadataKey]: newMetadataValue },
      })
      setNewMetadataKey("")
      setNewMetadataValue("")
    }
  }

  const removeMetadata = (key: string) => {
    const { [key]: removed, ...rest } = formData.metadata
    setFormData({ ...formData, metadata: rest })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <Typography variant="h4" as={CardTitle}>
            Basic Information
          </Typography>
          <Typography variant="muted" as={CardDescription}>
            Configure the basic details of your payment link
          </Typography>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter payment link name"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description for your payment link"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card>
        <CardHeader>
          <Typography variant="h4" as={CardTitle}>
            Product Information
          </Typography>
          <Typography variant="muted" as={CardDescription}>
            Details about what customers are purchasing
          </Typography>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label htmlFor="productDescription">Product Description</Label>
            <Textarea
              id="productDescription"
              value={formData.productDescription}
              onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
              placeholder="Describe your product or service"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <Typography variant="h4" as={CardTitle}>
            Pricing
          </Typography>
          <Typography variant="muted" as={CardDescription}>
            Configure pricing and payment type
          </Typography>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="type">Payment Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "fixed" | "donation" | "subscription") =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="donation">Donation (Variable)</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type !== "donation" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
                  placeholder="0.00"
                  // required={formData.type !== "donation"}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {formData.type === "subscription" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interval">Billing Interval</Label>
                  <Select
                    value={formData.recurringInterval}
                    onValueChange={(value: "day" | "week" | "month" | "year") =>
                      setFormData({ ...formData, recurringInterval: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Daily</SelectItem>
                      <SelectItem value="week">Weekly</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="intervalCount">Interval Count</Label>
                  <Input
                    id="intervalCount"
                    type="number"
                    min="1"
                    value={formData.recurringIntervalCount}
                    onChange={(e) =>
                      setFormData({ ...formData, recurringIntervalCount: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="trialDays">Trial Period (days)</Label>
                <Input
                  id="trialDays"
                  type="number"
                  min="0"
                  value={formData.trialPeriodDays}
                  onChange={(e) => setFormData({ ...formData, trialPeriodDays: Number.parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Collection Settings */}
      <Card>
        <CardHeader>
          <Typography variant="h4" as={CardTitle}>
            Collection Settings
          </Typography>
          <Typography variant="muted" as={CardDescription}>
            Configure what information to collect from customers
          </Typography>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collectShipping"
                checked={formData.collectShipping}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, collectShipping: !!checked }))
                }
              />
              <Label htmlFor="collectShipping">Require shipping address</Label>
            </div>
            <p className="text-sm text-muted-foreground">Require customers to provide shipping information</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collectTaxId"
                checked={formData.collectTaxId}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, collectTaxId: !!checked }))}
              />
              <Label htmlFor="collectTaxId">Require tax ID</Label>
            </div>
            <p className="text-sm text-muted-foreground">Require customers to provide tax identification</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowPromotionCodes"
                checked={formData.allowPromotionCodes}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, allowPromotionCodes: !!checked }))
                }
              />
              <Label htmlFor="allowPromotionCodes">Allow promotion codes</Label>
            </div>
            <p className="text-sm text-muted-foreground">Let customers enter discount codes</p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Fields */}
      <Card>
        <CardHeader>
          <Typography variant="h4" as={CardTitle}>
            Custom Fields
          </Typography>
          <Typography variant="muted" as={CardDescription}>
            Add custom fields to collect additional information
          </Typography>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.customFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Field {index + 1}</h4>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeCustomField(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Field Key</Label>
                  <Input
                    value={field.key}
                    onChange={(e) => updateCustomField(index, { key: e.target.value })}
                    placeholder="field_key"
                  />
                </div>
                <div>
                  <Label>Field Label</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => updateCustomField(index, { label: e.target.value })}
                    placeholder="Field Label"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value: "text" | "number" | "dropdown") => updateCustomField(index, { type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={field.required}
                    onCheckedChange={(checked) => updateCustomField(index, { required: checked })}
                  />
                  <Label>Required</Label>
                </div>
              </div>
              {field.type === "dropdown" && (
                <div>
                  <Label>Options (comma-separated)</Label>
                  <Input
                    value={field.options?.join(", ") || ""}
                    onChange={(e) => updateCustomField(index, { options: e.target.value.split(", ").filter(Boolean) })}
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addCustomField} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Field
          </Button>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <Typography variant="h4" as={CardTitle}>
            Advanced Settings
          </Typography>
          <Typography variant="muted" as={CardDescription}>
            Configure additional options and metadata
          </Typography>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="successUrl">Success URL</Label>
            <Input
              id="successUrl"
              value={formData.successUrl}
              onChange={(e) => setFormData({ ...formData, successUrl: e.target.value })}
              placeholder="https://example.com/success"
            />
          </div>
          <div>
            <Label htmlFor="cancelUrl">Cancel URL</Label>
            <Input
              id="cancelUrl"
              value={formData.cancelUrl}
              onChange={(e) => setFormData({ ...formData, cancelUrl: e.target.value })}
              placeholder="https://example.com/cancel"
            />
          </div>
          <div>
            <Label>Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.expiresAt && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expiresAt ? format(formData.expiresAt, "PPP") : "No expiration"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.expiresAt}
                  onSelect={(date) => setFormData({ ...formData, expiresAt: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Metadata */}
          <div>
            <Label>Metadata</Label>
            <div className="space-y-2">
              {Object.entries(formData.metadata).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {key}: {value}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeMetadata(key)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Key"
                  value={newMetadataKey}
                  onChange={(e) => setNewMetadataKey(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Value"
                  value={newMetadataValue}
                  onChange={(e) => setNewMetadataValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={addMetadata} className="sm:w-auto">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose} className="sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" className="sm:w-auto">
          {initialData ? "Update" : "Create"} Payment Link
        </Button>
      </div>
    </form>
  )
}
