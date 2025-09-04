import { 
  DollarSign, 
  RefreshCw, 
  FileText, 
  Link, 
  QrCode, 
  MousePointer,
  Check 
} from "lucide-react"
import { cn } from "@shared/lib/utils"
import { PAYMENT_FLOWS } from "@shared/data/mockCreatePayment"

// Icon mapping with better type safety
const getFlowIcon = (iconName: string) => {
  const icons = {
    DollarSign,
    FileText,
    Link,
    RefreshCw,
    QrCode,
    MousePointer,
  } as const
  return icons[iconName as keyof typeof icons] || DollarSign
}

interface PaymentFlowCardProps {
  flow: typeof PAYMENT_FLOWS[number]
  isSelected: boolean
  onSelect: (flowValue: string) => void
}

export const PaymentFlowCard = ({ flow, isSelected, onSelect }: PaymentFlowCardProps) => {
  const IconComponent = getFlowIcon(flow.icon)

  return (
    <button
      type="button"
      onClick={() => onSelect(flow.value)}
      className={cn(
        "relative p-4 border rounded-lg text-left transition-all hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected 
          ? "border-primary bg-primary/5 ring-1 ring-primary" 
          : "border-border bg-card hover:shadow-sm"
      )}
      aria-pressed={isSelected}
      aria-describedby={`flow-${flow.value}-description`}
    >
      <div className="flex items-start gap-3">
        <IconComponent 
          className={cn("h-5 w-5 mt-0.5 shrink-0", isSelected ? "text-primary" : "text-muted-foreground")} 
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm leading-tight">{flow.label}</h3>
          <p 
            id={`flow-${flow.value}-description`}
            className="text-xs mt-1 text-muted-foreground line-clamp-2"
          >
            {flow.description}
          </p>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <Check className="h-3 w-3 text-primary-foreground" aria-hidden="true" />
          </div>
        </div>
      )}
    </button>
  )
} 