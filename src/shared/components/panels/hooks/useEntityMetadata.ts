import { useMemo } from 'react'
import type { MetadataField, MetadataFieldConfig } from '../components/EntityMetadata'
import { createMetadataFields } from '../utils/metadata-utils'

export function useEntityMetadata<T>(
  entity: T | undefined,
  fieldConfigs: MetadataFieldConfig[]
) {
  const metadataFields = useMemo((): MetadataField[] => {
    if (!entity) return []
    return createMetadataFields(entity, fieldConfigs)
  }, [entity, fieldConfigs])
  
  const visibleFields = useMemo(() => {
    return metadataFields.filter(field => 
      !field.config.isVisible || field.config.isVisible(entity)
    )
  }, [metadataFields, entity])
  
  const fieldsByType = useMemo(() => {
    const grouped = visibleFields.reduce((acc, field) => {
      const type = field.config.type || 'text'
      if (!acc[type]) acc[type] = []
      acc[type].push(field)
      return acc
    }, {} as Record<string, MetadataField[]>)
    
    return grouped
  }, [visibleFields])
  
  return {
    allFields: metadataFields,
    visibleFields,
    fieldsByType,
    hasVisibleFields: visibleFields.length > 0,
    fieldCount: visibleFields.length
  }
}