import { forwardRef, useCallback } from 'react'
import { cn } from '@shared/lib/utils'
import { Card, CardContent } from '@shared/components/ui/card'
import { Carousel } from '@shared/components/ui/carousel'
import type { HTMLAttributes } from 'react'

export interface FilterItem {
  value: string
  label: string
  disabled?: boolean
}

export interface FilterCardsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: readonly FilterItem[]
  value?: string
  onChange?: (value: string) => void
  getItemCount?: (value: string) => number
  forceCarousel?: boolean
}

const CAROUSEL_THRESHOLD = 6
const CAROUSEL_ITEM_WIDTH = '280px'
const CAROUSEL_GAP = '1rem'

const FilterCards = forwardRef<HTMLDivElement, FilterCardsProps>(
  ({ 
    className, 
    items = [], 
    value, 
    onChange,
    getItemCount,
    forceCarousel = false,
    ...props 
  }, ref) => {
    
    const handleCardClick = useCallback((filterValue: string, isDisabled?: boolean) => {
      if (isDisabled || !onChange) return
      onChange(filterValue)
    }, [onChange])

    const useCarousel = items.length > CAROUSEL_THRESHOLD || forceCarousel

    const renderCard = useCallback((item: FilterItem) => {
      const isActive = value === item.value
      const count = getItemCount?.(item.value) ?? 0
      
      return (
        <Card 
          key={item.value}
          className={cn(
            'cursor-pointer transition-all duration-200 rounded-lg border',
            isActive ? 'ring-1 ring-primary border-primary' : 'hover:border-gray-300',
            item.disabled && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => handleCardClick(item.value, item.disabled)}
        >
          <CardContent className="px-3.5 py-2.5">
            <div className="flex flex-col gap-1">
              <p className={cn(
                "text-sm line-clamp-2",
                isActive ? "text-primary font-semibold" : "text-gray-500 font-normal"
              )}>
                {item.label}
              </p>
              <span className={cn(
                "text-base",
                isActive ? "text-primary font-bold" : "text-gray-600 font-semibold"
              )}>
                {count}
              </span>
            </div>
          </CardContent>
        </Card>
      )
    }, [value, getItemCount, handleCardClick])

    if (useCarousel) {
      return (
        <Carousel
          ref={ref}
          className={cn("w-full", className)}
          itemWidth={CAROUSEL_ITEM_WIDTH}
          gap={CAROUSEL_GAP}
          showNavigation
          {...props}
        >
          {items.map(renderCard)}
        </Carousel>
      )
    }

    const gridCols = items.length <= 2 
      ? 'grid-cols-1 sm:grid-cols-2' 
      : items.length <= 3 
      ? 'grid-cols-1 sm:grid-cols-3' 
      : items.length <= 4 
      ? 'grid-cols-2 lg:grid-cols-4'
      : items.length <= 5
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'

    return (
      <div
        ref={ref}
        className={cn('w-full grid gap-3', gridCols, className)}
        {...props}
      >
        {items.map(renderCard)}
      </div>
    )
  }
)

FilterCards.displayName = 'FilterCards'

export interface StatusFilterCardsProps {
  filters: readonly FilterItem[]
  selectedStatus: string
  onStatusChange: (status: string) => void
  getStatusCount: (status: string) => number
  className?: string
  forceCarousel?: boolean
}

export const StatusFilterCards = forwardRef<HTMLDivElement, StatusFilterCardsProps>(
  ({ filters, selectedStatus, onStatusChange, getStatusCount, className, forceCarousel }, ref) => (
    <FilterCards
      ref={ref}
      items={filters}
      value={selectedStatus}
      onChange={onStatusChange}
      getItemCount={getStatusCount}
      className={className}
      forceCarousel={forceCarousel}
    />
  )
)

StatusFilterCards.displayName = 'StatusFilterCards'

export { FilterCards } 
