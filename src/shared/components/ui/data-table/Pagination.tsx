import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Button } from '@shared/components/ui/button'
import { cn } from '@shared/lib/utils'
import { getZIndexClass } from '@shared/lib/z-index'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  loading?: boolean
  onPageChange: (page: number) => void
  className?: string
  variant?: 'default' | 'compact'
  containerRef?: React.RefObject<HTMLDivElement>
}

interface StickyBounds {
  left: number
  width: number
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  loading = false,
  onPageChange,
  className,
  variant = 'default',
  containerRef,
}: PaginationProps) {
  const [stickyBounds, setStickyBounds] = useState<StickyBounds | null>(null)
  const paginationRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(true)

  const updateStickyBounds = useCallback(() => {
    if (isVisibleRef.current || !containerRef?.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setStickyBounds({ left: rect.left, width: rect.width })
  }, [containerRef])

  useEffect(() => {
    const paginationElement = paginationRef.current
    const containerElement = containerRef?.current

    if (!paginationElement || !containerElement) return

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        isVisibleRef.current = isVisible
        
        if (isVisible) {
          setStickyBounds(null)
        } else {
          updateStickyBounds()
        }
      },
      { threshold: 0 }
    )

    const resizeObserver = new ResizeObserver(updateStickyBounds)
    
    intersectionObserver.observe(paginationElement)
    resizeObserver.observe(containerElement)

    return () => {
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [containerRef, updateStickyBounds])

  const startIndex = (currentPage - 1) * pageSize + 1
  const endIndex = Math.min(currentPage * pageSize, totalItems)

  const handlePrevious = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const handleNext = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])

  const paginationContent = useMemo(() => {
    const isCompact = variant === 'compact'
    
    return (
      <div className="flex items-center justify-between px-4 py-2">
        <div className={cn(
          "text-muted-foreground",
          isCompact ? "text-xs text-primary" : "text-sm"
        )} aria-live="polite">
          {loading ? (
            <span>Loading...</span>
          ) : isCompact ? (
            <span>{totalItems} {totalItems === 1 ? 'result' : 'results'}</span>
          ) : (
            <span>
              Showing <span className="font-bold">{startIndex.toLocaleString()}–{endIndex.toLocaleString()}</span> of{" "}
              <span className="font-bold">{totalItems.toLocaleString()}</span> results
            </span>
          )}
        </div>

        <div className={cn(
          "flex items-center",
          isCompact ? "gap-1" : "gap-2"
        )} role="group" aria-label="Pagination controls">
          <Button
            variant={isCompact ? "ghost" : "outline"}
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1 || loading}
            className={cn(
              isCompact 
                ? "h-6 w-6 p-0" 
                : "h-8 px-3 text-sm rounded-full font-semibold"
            )}
            aria-label="Previous page"
          >
            {isCompact ? (
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 18-6-6 6-6" />
              </svg>
            ) : (
              "Previous"
            )}
          </Button>
          <Button
            variant={isCompact ? "ghost" : "outline"}
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages || loading}
            className={cn(
              isCompact 
                ? "h-6 w-6 p-0" 
                : "h-8 px-3 text-sm rounded-full font-semibold"
            )}
            aria-label="Next page"
          >
            {isCompact ? (
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
              </svg>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    )
  }, [variant, loading, totalItems, startIndex, endIndex, currentPage, totalPages, handlePrevious, handleNext])

  if (totalPages <= 1) return null

  return (
    <>
      <nav
        ref={paginationRef}
        className={cn("bg-background border-t", className)}
        role="navigation"
        aria-label="Table pagination"
      >
        {paginationContent}
      </nav>

      {stickyBounds && (
        <nav
          className={cn(
            `fixed bottom-0 bg-background border-t shadow-lg ${getZIndexClass('POPOVER')}`,
            className
          )}
          style={stickyBounds}
          role="navigation"
          aria-label="Sticky table pagination"
        >
          {paginationContent}
        </nav>
      )}
    </>
  )
} 
