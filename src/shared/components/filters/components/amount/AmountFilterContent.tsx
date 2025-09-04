import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import type { AmountFilterValue, AmountOperator } from "@shared/types/amountFilter"
import { FILTER_STYLES } from "@shared/components/filters/constants/filterStyles"

interface AmountFilterContentProps {
  tempValue: AmountFilterValue
  onOperatorChange: (operator: AmountOperator) => void
  onInputChange: (field: "min" | "max" | "value", val: string) => void
  currency?: string
  operatorLabels: Record<string, string>
}

export function AmountFilterContent({
  tempValue,
  onOperatorChange,
  onInputChange,
  currency = "$",
  operatorLabels,
}: AmountFilterContentProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(operatorLabels).map(([key, label]) => (
          <Button
            key={key}
            variant={tempValue.operator === key ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onOperatorChange(key as AmountOperator)
            }}
            className={`text-xs ${FILTER_STYLES.HEIGHT_SM}`}
          >
            {label}
          </Button>
        ))}
      </div>

      {tempValue.operator === "range" ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">From</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  {currency}
                </span>
                <Input
                  placeholder="0.00"
                  value={tempValue.min || ""}
                  onChange={(e) => onInputChange("min", e.target.value)}
                  className={`pl-8 text-sm ${FILTER_STYLES.HEIGHT_SM}`}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">To</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  {currency}
                </span>
                <Input
                  placeholder="0.00"
                  value={tempValue.max || ""}
                  onChange={(e) => onInputChange("max", e.target.value)}
                  className={`pl-8 text-sm ${FILTER_STYLES.HEIGHT_SM}`}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
              {currency}
            </span>
            <Input
              placeholder="0.00"
              value={tempValue.value || ""}
              onChange={(e) => onInputChange("value", e.target.value)}
              className={`pl-8 text-sm ${FILTER_STYLES.HEIGHT_SM}`}
              type="number"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      )}
    </>
  )
} 
