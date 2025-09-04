import * as React from "react"
import { cn } from "@shared/lib/utils"

const Typography = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "code" | "lead" | "large" | "small" | "muted"
    as?: React.ElementType
  }
>(({ className, variant = "p", as, ...props }, ref) => {
  const Comp = as || getDefaultElement(variant)

  return <Comp className={cn(getVariantClasses(variant), className)} ref={ref} {...props} />
})

Typography.displayName = "Typography"

function getDefaultElement(variant: string) {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "blockquote":
      return "blockquote"
    case "code":
      return "code"
    default:
      return "p"
  }
}

function getVariantClasses(variant: string) {
  switch (variant) {
    case "h1":
      return "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
    case "h2":
      return "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    case "h3":
      return "scroll-m-20 text-2xl font-semibold tracking-tight"
    case "h4":
      return "scroll-m-20 text-xl font-semibold tracking-tight"
    case "p":
      return "leading-7 [&:not(:first-child)]:mt-6"
    case "blockquote":
      return "mt-6 border-l-2 pl-6 italic"
    case "code":
      return "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
    case "lead":
      return "text-xl text-muted-foreground"
    case "large":
      return "text-lg font-semibold"
    case "small":
      return "text-sm font-medium leading-none"
    case "muted":
      return "text-sm text-muted-foreground"
    default:
      return ""
  }
}

export { Typography }
