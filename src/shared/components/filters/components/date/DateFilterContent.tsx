import { CornerDownRight } from "lucide-react"
import { useCallback } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import { cn } from "@shared/lib/utils"
import {
  DATE_OPERATORS,
  TIME_UNITS,
  type DateFilterValue,
} from "@shared/types/dateFilter"
import { useDateFilter } from "../../hooks/useDateFilter"
import { DatePickerButton } from "./DatePickerButton"
import { 
  FILTER_STYLES, 
  FILTER_COMPONENT_STYLES 
} from "@shared/components/filters/constants/filterStyles"

interface DateFilterContentProps {
  label: string
  value: DateFilterValue | null | undefined
  onChange: (value: DateFilterValue | null) => void
  onClose: () => void
}

interface OperatorContentProps {
  formData: ReturnType<typeof useDateFilter>["formData"]
  updateFormData: ReturnType<typeof useDateFilter>["updateFormData"]
}

function LastOperatorContent({ formData, updateFormData }: OperatorContentProps) {
  const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ lastNumber: e.target.valueAsNumber || "" })
  }, [updateFormData])

  const handleUnitChange = useCallback((value: "h" | "d" | "m") => {
    updateFormData({ lastUnit: value })
  }, [updateFormData])

  return (
    <div className="flex items-center gap-1 pt-1">
      <CornerDownRight className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
      <Input
        type="number"
        value={formData.lastNumber}
        onChange={handleNumberChange}
        className={`w-[70px] rounded-lg border-2 shadow-sm ${FILTER_STYLES.HEIGHT_SM}`}
        min="1"
      />
      <Select value={formData.lastUnit} onValueChange={handleUnitChange}>
        <SelectTrigger className={`w-[100px] rounded-lg border-2 shadow-sm font-normal text-sm ${FILTER_STYLES.HEIGHT_SM}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-lg shadow-lg border-2 select-none">
          {TIME_UNITS.map(unit => (
            <SelectItem
              key={unit.value}
              value={unit.value}
              className="font-normal text-sm rounded-md"
            >
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function SingleDateOperatorContent({ formData, updateFormData }: OperatorContentProps) {
  const handleDateSelect = useCallback((date?: Date) => {
    updateFormData({ selectedDate: date })
  }, [updateFormData])

  return (
    <div className="flex items-center gap-1 pt-1">
      <CornerDownRight className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
      <DatePickerButton
        selectedDate={formData.selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  )
}

function BetweenOperatorContent({ formData, updateFormData }: OperatorContentProps) {
  const handleStartDateSelect = useCallback((date?: Date) => {
    updateFormData({ startDate: date })
  }, [updateFormData])

  const handleEndDateSelect = useCallback((date?: Date) => {
    updateFormData({ endDate: date })
  }, [updateFormData])

  const startDateDisabled = useCallback((date: Date) => {
    return formData.endDate ? date > formData.endDate : false
  }, [formData.endDate])

  const endDateDisabled = useCallback((date: Date) => {
    return formData.startDate ? date < formData.startDate : false
  }, [formData.startDate])

  return (
    <div className="space-y-2 pt-1">
      <div className="grid grid-cols-[auto_auto_auto] items-center justify-start gap-y-1 gap-x-2">
        <DatePickerButton
          selectedDate={formData.startDate}
          onDateSelect={handleStartDateSelect}
          disabled={startDateDisabled}
        />
        <span className="text-xs font-normal text-muted-foreground text-center">
          and
        </span>
        <DatePickerButton
          selectedDate={formData.endDate}
          onDateSelect={handleEndDateSelect}
          disabled={endDateDisabled}
        />
      </div>
    </div>
  )
}

export function DateFilterContent({
  label,
  value,
  onChange,
  onClose,
}: DateFilterContentProps) {
  const {
    operator,
    setOperator,
    formData,
    updateFormData,
    handleApply,
    isValidFormData,
  } = useDateFilter(value, onChange)

  const handleApplyAndClose = useCallback(() => {
    handleApply()
    onClose()
  }, [handleApply, onClose])

  const handleOperatorChange = useCallback((value: string) => {
    setOperator(value as typeof operator)
  }, [setOperator])

  const renderOperatorContent = useCallback(() => {
    const props = { formData, updateFormData }

    switch (operator) {
      case "last":
        return <LastOperatorContent {...props} />
      case "equal":
      case "before":
      case "after":
        return <SingleDateOperatorContent {...props} />
      case "between":
        return <BetweenOperatorContent {...props} />
      default:
        return null
    }
  }, [operator, formData, updateFormData])

  return (
    <div
      className={cn(
        FILTER_STYLES.CONTAINER_SPACING,
        "min-w-[260px] select-none",
        operator === "between" && "min-w-[300px]",
      )}
    >
      <div className={FILTER_COMPONENT_STYLES.FILTER_HEADER}>
        <span className={FILTER_COMPONENT_STYLES.FILTER_TITLE}>Filter by {label}</span>
      </div>

      <div className="space-y-2">
        <Select value={operator} onValueChange={handleOperatorChange}>
          <SelectTrigger className={`w-full font-semibold text-sm rounded-lg border-2 shadow-sm ${FILTER_STYLES.HEIGHT_SM}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-lg border-2 select-none">
            {DATE_OPERATORS.map(op => (
              <SelectItem
                key={op.value}
                value={op.value}
                className="font-semibold text-sm rounded-md"
              >
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {renderOperatorContent()}
      </div>

      <div className="pt-1">
        <Button
          onClick={handleApplyAndClose}
          size="sm"
          className={`w-full font-normal rounded-lg shadow-md ${FILTER_STYLES.HEIGHT_SM}`}
          disabled={!isValidFormData}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
