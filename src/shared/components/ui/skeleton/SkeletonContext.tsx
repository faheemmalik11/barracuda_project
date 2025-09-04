import { createContext, useContext } from "react"

export interface SkeletonTheme {
  /** Base skeleton background color */
  baseColor: string
  /** Highlight color for shimmer effect */
  highlightColor: string
  /** Animation class for skeleton elements */
  animationSpeed: string
  /** Default border radius */
  borderRadius: string
  /** Default height for text skeletons */
  textHeight: string
  /** Default spacing between skeleton elements */
  spacing: string
}

const defaultTheme: SkeletonTheme = {
  baseColor: "bg-muted",
  highlightColor: "bg-muted-foreground/10",
  animationSpeed: "animate-pulse",
  borderRadius: "rounded-md",
  textHeight: "h-4",
  spacing: "space-y-2",
}

export const SkeletonContext = createContext<SkeletonTheme>(defaultTheme)

export const useSkeletonTheme = () => {
  const context = useContext(SkeletonContext)
  if (!context) {
    throw new Error("useSkeletonTheme must be used within a SkeletonProvider")
  }
  return context
} 
