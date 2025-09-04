import React, { type ReactNode } from "react"
import { SkeletonContext, type SkeletonTheme } from "./SkeletonContext"

const defaultTheme: SkeletonTheme = {
  baseColor: "bg-muted",
  highlightColor: "bg-muted-foreground/10",
  animationSpeed: "animate-pulse",
  borderRadius: "rounded-md",
  textHeight: "h-4",
  spacing: "space-y-2",
}

export interface SkeletonProviderProps {
  children: ReactNode
  theme?: Partial<SkeletonTheme>
}

export const SkeletonProvider: React.FC<SkeletonProviderProps> = ({ 
  children, 
  theme = {} 
}) => {
  const mergedTheme = { ...defaultTheme, ...theme }
  
  return (
    <SkeletonContext.Provider value={mergedTheme}>
      {children}
    </SkeletonContext.Provider>
  )
} 
