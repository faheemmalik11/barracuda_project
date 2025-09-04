import { forwardRef, useRef, useState, useCallback, useEffect, Children, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@shared/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { Z_INDEX_CLASSES } from "@shared/lib/z-index"

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  itemWidth?: string
  gap?: string
  showNavigation?: boolean
  navigationClassName?: string
  itemClassName?: string
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    className,
    children,
    itemWidth = "220px",
    gap = "1rem",
    showNavigation = true,
    navigationClassName,
    itemClassName,
    ...props 
  }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)

    const checkScrollability = useCallback(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }, [])

    useEffect(() => {
      checkScrollability()
      
      const container = scrollContainerRef.current
      if (!container) return

      const handleScroll = () => checkScrollability()
      
      container.addEventListener('scroll', handleScroll, { passive: true })
      
      const resizeObserver = new ResizeObserver(checkScrollability)
      resizeObserver.observe(container)
      
      // Add MutationObserver to detect DOM changes
      const mutationObserver = new MutationObserver(checkScrollability)
      mutationObserver.observe(container, { 
        childList: true, 
        subtree: true 
      })

      return () => {
        container.removeEventListener('scroll', handleScroll)
        resizeObserver.disconnect()
        mutationObserver.disconnect()
      }
    }, [checkScrollability, Children.count(children)])

    const scroll = (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current
      if (!container || isScrolling) return

      const gapValue = parseFloat(gap.replace('rem', '')) * 16
      const itemWidthValue = parseFloat(itemWidth.replace('px', ''))
      const scrollAmount = itemWidthValue + gapValue

      const currentScroll = container.scrollLeft
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, currentScroll + scrollAmount)

      const startTime = performance.now()
      const duration = 300
      const startScroll = currentScroll
      const distance = targetScroll - startScroll

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        container.scrollLeft = startScroll + (distance * easeProgress)

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          setIsScrolling(false)
        }
      }

      setIsScrolling(true)
      requestAnimationFrame(animateScroll)
    }

    const NavigationButton = ({ direction, visible }: { direction: 'left' | 'right'; visible: boolean }) => {
      if (!visible) return null

      const isLeft = direction === 'left'
      
      return (
        <div
          className={cn(
            `absolute top-1/2 -translate-y-1/2 ${Z_INDEX_CLASSES.POPOVER} w-12 h-full flex items-center justify-center`,
            isLeft ? "left-0" : "right-0"
          )}
        >
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full bg-background border border-border",
              "transition-all duration-150 opacity-0 group-hover:opacity-100",
              "hover:bg-background hover:border-primary",
              navigationClassName
            )}
            onClick={() => scroll(direction)}
            disabled={isScrolling}
            onMouseDown={(e) => e.preventDefault()}
          >
            {isLeft ? (
              <ChevronLeft className="h-4 w-4 text-primary" />
            ) : (
              <ChevronRight className="h-4 w-4 text-primary" />
            )}
          </Button>
        </div>
      )
    }

    return (
      <div className={cn("relative group", className)} ref={ref} {...props}>
        {showNavigation && (
          <>
            <NavigationButton direction="left" visible={canScrollLeft} />
            <NavigationButton direction="right" visible={canScrollRight} />
          </>
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-hidden py-1 px-1"
          style={{ gap }}
        >
          {Children.map(children, (child, index) => (
            <div
              key={index}
              className={cn("flex-shrink-0", itemClassName)}
              style={{ minWidth: itemWidth }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

export { Carousel }
