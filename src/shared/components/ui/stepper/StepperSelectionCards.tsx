import { cn } from "@shared/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import React from "react"

export interface SelectionOption {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  iconBgColor?: string
  iconColor?: string
  price?: string
  disabled?: boolean
}

interface StepperSelectionCardsProps {
  options: SelectionOption[]
  selected?: string | string[]
  onSelect: (id: string) => void
  columns?: 1 | 2 | 3 | 4
  multiple?: boolean
  variant?: "card" | "compact" | "radio"
  className?: string
}

export function StepperSelectionCards({
  options,
  selected,
  onSelect,
  columns = 2,
  multiple = false,
  variant = "card",
  className,
}: StepperSelectionCardsProps) {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }

  const isSelected = (id: string) => {
    if (multiple) {
      return Array.isArray(selected) && selected.includes(id)
    }
    return selected === id
  }

  if (variant === "compact") {
    return (
      <div className={cn(`grid ${gridColumns[columns]} gap-4`, className)}>
        {options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg",
              isSelected(option.id)
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-border/80",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !option.disabled && onSelect(option.id)}
          >
            <div className="text-center">
              {option.icon && (
                <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
                  {option.icon}
                </div>
              )}
              <div className="flex justify-center mb-2">
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={multiple ? undefined : "selection"}
                  checked={isSelected(option.id)}
                  onChange={() => !option.disabled && onSelect(option.id)}
                  disabled={option.disabled}
                  className="w-4 h-4 text-primary"
                />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{option.title}</h4>
              {option.description && (
                <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
              )}
              {option.price && (
                <p className="text-sm font-medium text-primary">{option.price}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "radio") {
    return (
      <div className={cn("space-y-3", className)}>
        {options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
              isSelected(option.id)
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/30",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={multiple ? undefined : "selection"}
              checked={isSelected(option.id)}
              onChange={() => !option.disabled && onSelect(option.id)}
              disabled={option.disabled}
              className="w-4 h-4 text-primary mr-3"
            />
            <div className="flex-1">
              <div className="font-medium text-foreground">{option.title}</div>
              {option.description && (
                <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
              )}
            </div>
            {option.price && (
              <div className="text-sm font-medium text-primary ml-4">{option.price}</div>
            )}
          </label>
        ))}
      </div>
    )
  }

  return (
    <div className={cn(`grid ${gridColumns[columns]} gap-4`, className)}>
      {options.map((option) => (
        <Card
          key={option.id}
          className={cn(
            "cursor-pointer transition-colors",
            isSelected(option.id) 
              ? "ring-2 ring-primary bg-primary/5" 
              : "hover:bg-muted/30",
            option.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !option.disabled && onSelect(option.id)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {option.icon && (
                <div 
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    option.iconBgColor || "bg-muted"
                  )}
                >
                  <div className={cn("w-4 h-4", option.iconColor || "text-muted-foreground")}>
                    {option.icon}
                  </div>
                </div>
              )}
              <span className="text-base">{option.title}</span>
            </CardTitle>
          </CardHeader>
          {(option.description || option.price) && (
            <CardContent>
              {option.description && (
                <p className="text-sm text-muted-foreground">{option.description}</p>
              )}
              {option.price && (
                <p className="text-sm font-medium text-primary mt-2">{option.price}</p>
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}