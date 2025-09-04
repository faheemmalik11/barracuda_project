import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { Card, CardContent } from '@shared/components/ui/card'
import { TABLE_ANIMATIONS } from '@shared/lib/animations'
import type { BaseEntity, Pagination, ManagedColumn } from './types'

interface TableProps<T extends BaseEntity> {
  data: T[]
  selectedItems: string[]
  onSelectionChange: (items: string[]) => void
  onRowClick: (item: T) => void
  pagination: Pagination
  loading: boolean
  statusFilter?: string
  emptyStateDescription: string
  managedColumns?: ManagedColumn[]
  [key: string]: unknown
}

export interface TableSectionProps<T extends BaseEntity> {
  tableComponent: React.ComponentType<TableProps<T>>
  tableProps: TableProps<T>
  animationKey?: string | number
  animationConfig?: {
    initial?: Record<string, number | string>
    animate?: Record<string, number | string>
    exit?: Record<string, number | string>
    transition?: Transition
  }
  showCard?: boolean
  cardClassName?: string
  contentClassName?: string
  className?: string
  beforeTable?: ReactNode
  afterTable?: ReactNode
  loadingOverlay?: ReactNode
  errorBoundary?: ReactNode
}


export function TableSection<T extends BaseEntity>({
  tableComponent: TableComponent,
  tableProps,
  animationKey,
  animationConfig = TABLE_ANIMATIONS.fade,
  showCard = true,
  cardClassName = "border-none shadow-none overflow-hidden rounded-none",
  contentClassName = "p-0",
  className = '',
  beforeTable,
  afterTable,
  loadingOverlay,
  errorBoundary
}: TableSectionProps<T>) {
  const TableContent = (
    <>
      {beforeTable}
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={animationConfig.initial}
          animate={animationConfig.animate}
          exit={animationConfig.exit}
          transition={animationConfig.transition}
        >
          <TableComponent {...tableProps} />
        </motion.div>
      </AnimatePresence>
      {afterTable}
    </>
  )

  if (!showCard) {
    return (
      <div className={className}>
        {errorBoundary ? (
          <div className="relative">
            {TableContent}
            {loadingOverlay}
          </div>
        ) : (
          <>
            {TableContent}
            {loadingOverlay}
          </>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <Card className={cardClassName}>
        <CardContent className={contentClassName}>
          {errorBoundary ? (
            <div className="relative">
              {TableContent}
              {loadingOverlay}
            </div>
          ) : (
            <>
              {TableContent}
              {loadingOverlay}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function SimpleTableSection<T extends BaseEntity>({
  tableComponent: TableComponent,
  tableProps,
  showCard = true,
  cardClassName = "border-none shadow-none overflow-hidden rounded-none",
  contentClassName = "p-0",
  className = ''
}: Pick<TableSectionProps<T>, 
  | 'tableComponent' 
  | 'tableProps' 
  | 'showCard' 
  | 'cardClassName' 
  | 'contentClassName'
  | 'className'
>) {
  if (!showCard) {
    return (
      <div className={className}>
        <TableComponent {...tableProps} />
      </div>
    )
  }

  return (
    <div className={className}>
      <Card className={cardClassName}>
        <CardContent className={contentClassName}>
          <TableComponent {...tableProps} />
        </CardContent>
      </Card>
    </div>
  )
}

export function TableSectionWithLoading<T extends BaseEntity>({
  tableComponent: TableComponent,
  tableProps,
  loading,
  loadingComponent,
  errorComponent,
  error,
  animationKey,
  showCard = true,
  cardClassName = "border-none shadow-none overflow-hidden rounded-none",
  contentClassName = "p-0",
  className = ''
}: TableSectionProps<T> & {
  loading?: boolean
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  error?: Error | null
}) {
  if (error && errorComponent) {
    return (
      <div className={className}>
        {errorComponent}
      </div>
    )
  }

  if (loading && loadingComponent) {
    return (
      <div className={className}>
        {loadingComponent}
      </div>
    )
  }

  return (
    <TableSection
      tableComponent={TableComponent}
      tableProps={tableProps}
      animationKey={animationKey}
      showCard={showCard}
      cardClassName={cardClassName}
      contentClassName={contentClassName}
      className={className}
    />
  )
}

