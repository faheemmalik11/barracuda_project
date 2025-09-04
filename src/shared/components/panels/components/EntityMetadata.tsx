import { PANEL_SPACING } from '../constants/spacing'
import { getRiskConfig } from '@shared/utils/risk'
import { cn } from '@shared/lib/utils'

export type FieldType = 'text' | 'risk' | 'date'

export interface MetadataFieldConfig {
  key: string
  label: string
  type?: FieldType
  formatter?: (value: any, entity?: any) => string
  isVisible?: (entity?: any) => boolean
}

export interface MetadataField {
  key: string
  label: string
  value: any
  config: MetadataFieldConfig
}

interface EntityMetadataProps {
  fields: MetadataField[]
  entity?: any
}

const formatFieldValue = (field: MetadataField, entity?: any): string => {
  const { value, config } = field
  
  if (config.formatter) {
    return config.formatter(value, entity)
  }
  
  switch (config.type) {
    case 'date':
      return value instanceof Date ? value.toLocaleDateString() : new Date(value).toLocaleDateString()
    default:
      return String(value || 'Unknown')
  }
}

const renderFieldValue = (field: MetadataField, entity?: any) => {
  const { config } = field
  const formattedValue = formatFieldValue(field, entity)
  
  switch (config.type) {
    case 'risk': {
      const riskValue = Number(field.value)
      const riskConfig = getRiskConfig(riskValue)
      return (
        <span className={cn(
          "inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
          riskConfig.colorClasses
        )}>
          {formattedValue}
        </span>
      )
    }
    
    default:
      return <p className="truncate">{formattedValue}</p>
  }
}

export function EntityMetadata({ fields, entity }: EntityMetadataProps) {
  const visibleFields = fields.filter(field => 
    !field.config.isVisible || field.config.isVisible(entity)
  )
  
  return (
    <div className="gap-10 flex flex-wrap">
      {visibleFields.map((field) => (
        <div key={field.key} className={`flex flex-col ${PANEL_SPACING.FLEX_GAP_SMALL} min-w-0`}>
          <div className="text-gray-500 text-[10px] uppercase tracking-wide font-medium">
            <p>{field.label}</p>
          </div>
          <div className="text-black text-xs font-medium">
            {renderFieldValue(field, entity)}
          </div>
        </div>
      ))}
    </div>
  )
}
