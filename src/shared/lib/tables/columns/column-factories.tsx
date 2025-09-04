import type { Column } from "@shared/types/data-table"
import { AppStatusBadge } from "@shared/components/ui/status-badge/AppStatusBadge"
import { Calendar, CreditCard, MapPin, Shield } from "lucide-react"
import { 
  TextCell, 
  IdCell, 
  CurrencyCell, 
  DynamicDateCell, 
  IconTextCell 
} from "../cells/common-cells"
import { TruncatedCell } from "../cells/TruncatedCell"

// Factory functions for creating standardized columns
export function createIdColumn<T extends { id: string | number }>(key = "id"): Column<T> {
  return {
    key,
    header: "ID",
    width: 120,
    render: (item: T) => <IdCell id={item.id} />
  }
}

export function createStatusColumn<T extends { status: string }>(entityType: string, key = "status"): Column<T> {
  return {
    key,
    header: "Status",
    width: 120,
    render: (item: T) => <AppStatusBadge entityType={entityType} status={item.status} />
  }
}

export function createTextColumn<T>(
  key: keyof T, 
  header: string, 
  width?: number, 
  className?: string
): Column<T> {
  return {
    key: String(key),
    header,
    width: width || 120,
    render: (item: T) => <TextCell value={item[key] as string} className={className} />
  }
}

export function createCurrencyColumn<T>(key: keyof T, header: string, width?: number): Column<T> {
  return {
    key: String(key),
    header,
    width: width || 120,
    align: "left",
    render: (item: T) => (
      <CurrencyCell
        amount={item[key] as number || 0}
        align="left"
        className="text-sm min-w-[68px]"
      />
    )
  }
}

export function createDateColumn<T>(
  key: keyof T, 
  header: string, 
  width?: number, 
  showIcon = true
): Column<T> {
  return {
    key: String(key),
    header,
    width: width || 150,
    render: (item: T) => showIcon ? (
      <IconTextCell icon={<Calendar className="h-3 w-3 text-muted-foreground" />}>
        <DynamicDateCell
          timestamp={item[key] as string}
          placeholder="N/A"
          className="text-muted-foreground group-hover:text-foreground"
        />
      </IconTextCell>
    ) : (
      <DynamicDateCell
        timestamp={item[key] as string}
        placeholder="N/A"
        className="text-muted-foreground group-hover:text-foreground"
      />
    )
  }
}

export function createPaymentMethodColumn<T extends { paymentMethod?: string }>(width?: number): Column<T> {
  return {
    key: "paymentMethod",
    header: "Payment method",
    width: width || 150,
    render: (item: T) => (
      <IconTextCell icon={<CreditCard className="h-3 w-3 text-muted-foreground" />}>
        <div className="text-muted-foreground group-hover:text-foreground font-normal">
          {item.paymentMethod || "Unknown"}
        </div>
      </IconTextCell>
    )
  }
}

export function createLocationColumn<T extends { location?: string | { name?: string; city?: string; state?: string } }>(
  width?: number
): Column<T> {
  return {
    key: "location",
    header: "Location",
    width: width || 200,
    render: (item: T) => {
      const location = typeof item.location === 'string' 
        ? { name: item.location, city: '', state: '' } 
        : item.location
      const locationString = location?.name 
        ? `${location.name}${location.city ? ` • ${location.city}` : ''}${location.state ? `, ${location.state}` : ''}` 
        : "Unknown"
      return (
        <IconTextCell icon={<MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />}>
          <TruncatedCell maxWidth={width || 200} title={locationString}>
            {locationString}
          </TruncatedCell>
        </IconTextCell>
      )
    }
  }
}

export function createRiskColumn<T extends { riskLevel?: string; riskScore?: number }>(
  width?: number
): Column<T> {
  return {
    key: "risk",
    header: "Risk",
    width: width || 100,
    render: (item: T) => (
      <IconTextCell icon={<Shield className="h-3 w-3 text-muted-foreground" />}>
        <span className="text-foreground">{item.riskLevel || "low"}</span>
      </IconTextCell>
    )
  }
}