import { cn } from "@shared/lib/utils"
import { Label } from "@shared/components/ui/label"
import { Input } from "@shared/components/ui/input"
import { Textarea } from "@shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { Switch } from "@shared/components/ui/switch"
import { Checkbox } from "@shared/components/ui/checkbox"

export interface FieldConfig {
  id: string
  label: string
  type: "text" | "number" | "email" | "password" | "textarea" | "select" | "switch" | "checkbox" | "date" | "datetime-local" | "color"
  placeholder?: string
  description?: string
  options?: Array<{ value: string; label: string }>
  rows?: number
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  className?: string
  gridSpan?: 1 | 2 | 3 | "full"
}

interface StepperFormFieldsProps {
  fields: FieldConfig[]
  values: Record<string, any>
  onChange: (id: string, value: any) => void
  gridCols?: 1 | 2 | 3
  className?: string
}

export function StepperFormFields({
  fields,
  values,
  onChange,
  gridCols = 1,
  className,
}: StepperFormFieldsProps) {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }

  const getGridSpanClass = (span?: 1 | 2 | 3 | "full") => {
    if (span === "full" || span === gridCols) return "col-span-full"
    if (span === 2) return "col-span-2"
    if (span === 3) return "col-span-3"
    return ""
  }

  const renderField = (field: FieldConfig) => {
    const value = values[field.id] ?? ""

    switch (field.type) {
      case "textarea":
        return (
          <>
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              value={value}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              disabled={field.disabled}
              className={field.className}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
            )}
          </>
        )

      case "select":
        return (
          <>
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
              value={value}
              onValueChange={(val) => onChange(field.id, val)}
              disabled={field.disabled}
            >
              <SelectTrigger className={field.className}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
            )}
          </>
        )

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
            </div>
            <Switch
              id={field.id}
              checked={value || false}
              onCheckedChange={(checked) => onChange(field.id, checked)}
              disabled={field.disabled}
            />
          </div>
        )

      case "checkbox":
        return (
          <div className="flex items-start space-x-3">
            <Checkbox
              id={field.id}
              checked={value || false}
              onCheckedChange={(checked) => onChange(field.id, checked)}
              disabled={field.disabled}
            />
            <div className="flex-1">
              <Label htmlFor={field.id} className="cursor-pointer">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.description && (
                <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
              )}
            </div>
          </div>
        )

      case "color":
        return (
          <>
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="flex gap-2">
              <Input
                id={field.id}
                type="color"
                value={value}
                onChange={(e) => onChange(field.id, e.target.value)}
                disabled={field.disabled}
                className="w-16 h-10"
              />
              <Input
                value={value}
                onChange={(e) => onChange(field.id, e.target.value)}
                placeholder={field.placeholder || "#000000"}
                disabled={field.disabled}
                className="flex-1"
              />
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
            )}
          </>
        )

      default:
        return (
          <>
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => onChange(field.id, field.type === "number" ? e.target.valueAsNumber : e.target.value)}
              placeholder={field.placeholder}
              disabled={field.disabled}
              min={field.min}
              max={field.max}
              step={field.step}
              className={field.className}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
            )}
          </>
        )
    }
  }

  return (
    <div className={cn(
      gridCols > 1 ? `grid ${gridColumns[gridCols]} gap-4` : "space-y-6",
      className
    )}>
      {fields.map((field) => (
        <div
          key={field.id}
          className={cn(
            field.type === "switch" || field.type === "checkbox" ? "" : "space-y-2",
            getGridSpanClass(field.gridSpan)
          )}
        >
          {renderField(field)}
        </div>
      ))}
    </div>
  )
}