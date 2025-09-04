import React from 'react'
import type { EntityStatusPanelConfig } from '../components/StatusPanel'
import { EntityMetadata } from '../components/EntityMetadata'
import type { MetadataFieldConfig } from '../components/EntityMetadata'
import { EntityActions } from '../components/EntityActions'
import { PAYMENT_ACTIONS_CONFIG, CUSTOMER_ACTIONS_CONFIG, ECOMMERCE_ACTIONS_CONFIG, INVENTORY_ACTIONS_CONFIG, TERMINAL_ACTIONS_CONFIG } from './entity-action-configs'
import { createMetadataFields, createMetadataFieldConfig } from '../utils/metadata-utils'
import type { PaymentInfo } from '../types/payment-details.types'
import type { CustomerInfo } from '../customers/types'
import type { EcommerceInfo } from '../../../../features/ecommerce/types/ecommerce-details.types'
import type { InventoryInfo } from '@features/in-stores/types/inventory-details.types'
import type { TerminalInfo } from '@shared/utils/terminal-converters'
import type { OrderInfo } from '@shared/utils/order-converters'

// Payment configuration
export const PAYMENT_CONFIG: EntityStatusPanelConfig<PaymentInfo> = {
  entityType: 'payment',
  entityLabel: 'Payment',
  primaryField: 'amount'
}

// Payment metadata field configurations
const PAYMENT_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('customer', 'Customer'),
  createMetadataFieldConfig('paymentMethod', 'Payment Method'),
  createMetadataFieldConfig('risk', 'Risk', { 
    type: 'risk',
    formatter: (value) => String(value || '0')
  }),
  createMetadataFieldConfig('lastUpdate', 'Last Update', {
    type: 'date',
    formatter: (value) => value || new Date().toLocaleString()
  })
]

export const PaymentMetadata: React.FC<{ info: PaymentInfo }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, PAYMENT_METADATA_FIELDS)}
    entity={info}
  />
)

export const PaymentActionsWrapper: React.FC<{ entityInfo: PaymentInfo }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={PAYMENT_ACTIONS_CONFIG} />
)

// Customer configuration
export const CUSTOMER_CONFIG: EntityStatusPanelConfig<CustomerInfo> = {
  entityType: 'customer',
  entityLabel: 'Customer',
  primaryField: 'name'
}

// Customer metadata field configurations
const CUSTOMER_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('email', 'Email', { 
    type: 'text',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('risk', 'Risk', { 
    type: 'risk',
    formatter: (value) => String(value || '0')
  }),
  createMetadataFieldConfig('created', 'Created', {
    type: 'date',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('lastActivity', 'Last Activity', {
    formatter: (value) => value || 'Unknown'
  })
]

export const CustomerMetadata: React.FC<{ info: CustomerInfo }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, CUSTOMER_METADATA_FIELDS)}
    entity={info}
  />
)

export const CustomerActionsWrapper: React.FC<{ entityInfo: CustomerInfo }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={CUSTOMER_ACTIONS_CONFIG} />
)

// Ecommerce configuration
export const ECOMMERCE_CONFIG: EntityStatusPanelConfig<EcommerceInfo> = {
  entityType: 'ecommerce',
  entityLabel: 'Ecommerce Integration',
  primaryField: 'name'
}

// Ecommerce metadata field configurations
const ECOMMERCE_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('type', 'Type', {
    type: 'text',
    formatter: (value) => {
      const typeMap: Record<string, string> = {
        'hosted_checkout': 'Hosted Web',
        'api': 'API',
        'drops': 'Drops',
        'elements': 'Elements',
        'link': 'Link'
      }
      return typeMap[value as string] || value
    }
  }),
  createMetadataFieldConfig('environment', 'Environment', {
    type: 'text',
    formatter: (value) => value === 'live' ? 'Live' : 'Test'
  }),
  createMetadataFieldConfig('successRate', 'Success Rate', {
    type: 'text',
    formatter: (value) => `${value}%`
  }),
  createMetadataFieldConfig('lastUsed', 'Last Used', {
    type: 'date',
    formatter: (value) => value || 'Never'
  })
]

export const EcommerceMetadata: React.FC<{ info: EcommerceInfo }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, ECOMMERCE_METADATA_FIELDS)}
    entity={info}
  />
)

export const EcommerceActionsWrapper: React.FC<{ entityInfo: EcommerceInfo }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={ECOMMERCE_ACTIONS_CONFIG} />
)

// Inventory configuration
export const INVENTORY_CONFIG: EntityStatusPanelConfig<InventoryInfo> = {
  entityType: 'inventory',
  entityLabel: 'Terminal',
  primaryField: 'model'
}

// Inventory metadata field configurations
const INVENTORY_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('serialNumber', 'Serial Number', {
    type: 'text',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('store', 'Store', {
    type: 'text',
    formatter: (value) => value || 'Unassigned'
  }),
  createMetadataFieldConfig('location', 'Location', {
    type: 'text',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('lastActivity', 'Last Activity', {
    type: 'date',
    formatter: (value) => value || 'Never'
  })
]

export const InventoryMetadata: React.FC<{ info: InventoryInfo }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, INVENTORY_METADATA_FIELDS)}
    entity={info}
  />
)

export const InventoryActionsWrapper: React.FC<{ entityInfo: InventoryInfo }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={INVENTORY_ACTIONS_CONFIG} />
)

// Terminal configuration
export const TERMINAL_CONFIG: EntityStatusPanelConfig<TerminalInfo> = {
  entityType: 'terminal',
  entityLabel: 'Terminal',
  primaryField: 'title'
}

// Terminal metadata field configurations
const TERMINAL_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('serialNumber', 'Serial Number', {
    type: 'text',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('model', 'Model', {
    type: 'text',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('location', 'Location', {
    type: 'text',
    formatter: (value) => value || 'Unassigned'
  }),
  createMetadataFieldConfig('lastActivity', 'Last Activity', {
    type: 'date',
    formatter: (value) => value || 'Never'
  })
]

export const TerminalMetadata: React.FC<{ info: TerminalInfo }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, TERMINAL_METADATA_FIELDS)}
    entity={info}
  />
)

export const TerminalActionsWrapper: React.FC<{ entityInfo: TerminalInfo }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={TERMINAL_ACTIONS_CONFIG} />
)

// Order metadata and actions functions
const getOrderMetadata = (order: any) => OrderMetadata;
const getOrderActions = (order: any) => OrderActionsWrapper;

// Payment Link metadata and actions functions
const getPaymentLinkMetadata = (paymentLink: any) => PaymentLinkMetadata;
const getPaymentLinkActions = (paymentLink: any) => PaymentLinkActionsWrapper;

// Order configuration
export const ORDER_CONFIG = {
  entityType: 'order' as const,
  id: 'id',
  entityLabel: 'Order',
  primaryField: 'id',
  getMetadata: getOrderMetadata,
  getActions: getOrderActions,
}

export const PAYMENT_LINK_CONFIG = {
  entityType: 'payment-link' as const,
  getMetadata: getPaymentLinkMetadata,
  getActions: getPaymentLinkActions,
}

// Order metadata field configurations
const ORDER_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('customer', 'Customer', {
    type: 'text',
    formatter: (value) => value || 'Unknown'
  }),
  createMetadataFieldConfig('store', 'Store', {
    type: 'text',
    formatter: (value) => value || 'Unassigned'
  }),
  createMetadataFieldConfig('totalAmount', 'Total Amount', {
    type: 'text',
    formatter: (value) => `$${value || '0.00'}`
  }),
  createMetadataFieldConfig('orderDate', 'Order Date', {
    type: 'date',
    formatter: (value) => value || 'Unknown'
  })
]

export const OrderMetadata: React.FC<{ info: OrderInfo }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, ORDER_METADATA_FIELDS)}
    entity={info}
  />
)

export const OrderActionsWrapper: React.FC<{ entityInfo: OrderInfo }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={TERMINAL_ACTIONS_CONFIG} />
)

// Payment Link metadata field configurations
const PAYMENT_LINK_METADATA_FIELDS: MetadataFieldConfig[] = [
  createMetadataFieldConfig('name', 'Name', {
    type: 'text',
    formatter: (value) => value || 'Unnamed Link'
  }),
  createMetadataFieldConfig('type', 'Type', {
    type: 'text',
    formatter: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'
  }),
  createMetadataFieldConfig('status', 'Status', {
    type: 'text',
    formatter: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'
  }),
  createMetadataFieldConfig('amount', 'Amount', {
    type: 'text',
    formatter: (value, entity) => {
      if (!value) return 'Variable';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: entity?.currency || 'USD'
      }).format(value / 100);
    }
  }),
  createMetadataFieldConfig('created', 'Created', {
    type: 'date',
    formatter: (value) => value ? new Date(value).toLocaleDateString() : 'Unknown'
  }),
  createMetadataFieldConfig('views', 'Views', {
    type: 'text',
    formatter: (value) => value?.toLocaleString() || '0'
  }),
  createMetadataFieldConfig('conversions', 'Conversions', {
    type: 'text',
    formatter: (value) => value?.toLocaleString() || '0'
  }),
  createMetadataFieldConfig('totalRevenue', 'Total Revenue', {
    type: 'text',
    formatter: (value, entity) => {
      if (!value) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: entity?.currency || 'USD'
      }).format(value / 100);
    }
  })
];

export const PaymentLinkMetadata: React.FC<{ info: any }> = ({ info }) => (
  <EntityMetadata 
    fields={createMetadataFields(info, PAYMENT_LINK_METADATA_FIELDS)}
    entity={info}
  />
)

export const PaymentLinkActionsWrapper: React.FC<{ entityInfo: any }> = ({ entityInfo }) => (
  <EntityActions entityInfo={entityInfo} config={TERMINAL_ACTIONS_CONFIG} />
)

