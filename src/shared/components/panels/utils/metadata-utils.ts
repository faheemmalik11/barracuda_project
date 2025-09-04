import type { MetadataField, MetadataFieldConfig } from '../components/EntityMetadata'

export function createMetadataFields<T>(
  entity: T,
  fieldConfigs: MetadataFieldConfig[]
): MetadataField[] {
  return fieldConfigs.map(config => ({
    key: config.key,
    label: config.label,
    value: (entity as any)[config.key],
    config
  }))
}

export function createMetadataFieldConfig(
  key: string,
  label: string,
  options?: Omit<MetadataFieldConfig, 'key' | 'label'>
): MetadataFieldConfig {
  return {
    key,
    label,
    ...options
  }
}