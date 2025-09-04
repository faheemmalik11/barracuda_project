import React from "react"
import { cn } from "@shared/lib/utils"
import { useSkeletonTheme } from "./SkeletonContext"

// Base skeleton component
export interface SkeletonBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width class (e.g., "w-full", "w-32") */
  width?: string
  /** Height class (e.g., "h-4", "h-8") */
  height?: string
  /** Whether to use rounded corners */
  rounded?: boolean | string
}

export const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = "w-full",
  height = "h-4",
  rounded = true,
  className,
  ...props
}) => {
  const theme = useSkeletonTheme()
  
  const roundedClass = typeof rounded === "string" 
    ? rounded 
    : rounded 
      ? theme.borderRadius 
      : ""

  return (
    <div
      className={cn(
        theme.baseColor,
        theme.animationSpeed,
        roundedClass,
        width,
        height,
        className
      )}
      {...props}
    />
  )
}

// Text skeleton component
export interface SkeletonTextProps {
  /** Number of lines to display */
  lines?: number
  /** Custom className */
  className?: string
  /** Width of the last line (defaults to 75% for natural text appearance) */
  lastLineWidth?: string
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  className,
  lastLineWidth = "w-3/4",
}) => {
  const theme = useSkeletonTheme()

  if (lines === 1) {
    return (
      <SkeletonBox
        height={theme.textHeight}
        className={className}
      />
    )
  }

  return (
    <div className={cn(theme.spacing, className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          height={theme.textHeight}
          width={index === lines - 1 ? lastLineWidth : "w-full"}
        />
      ))}
    </div>
  )
}

// Avatar skeleton component
export interface SkeletonAvatarProps {
  /** Size of the avatar */
  size?: "sm" | "md" | "lg" | "xl"
  /** Custom className */
  className?: string
  /** Whether the avatar should be square instead of circular */
  square?: boolean
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "md",
  className,
  square = false,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <SkeletonBox
      width={sizeClasses[size].split(" ")[1]}
      height={sizeClasses[size].split(" ")[0]}
      rounded={square ? "rounded-md" : "rounded-full"}
      className={className}
    />
  )
}

// Button skeleton component
export interface SkeletonButtonProps {
  /** Size of the button */
  size?: "sm" | "md" | "lg"
  /** Custom className */
  className?: string
  /** Width of the button */
  width?: string
}

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = "md",
  className,
  width = "w-24",
}) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  return (
    <SkeletonBox
      width={width}
      height={sizeClasses[size]}
      rounded="rounded-md"
      className={className}
    />
  )
}

// Badge skeleton component
export interface SkeletonBadgeProps {
  /** Custom className */
  className?: string
  /** Width of the badge */
  width?: string
}

export const SkeletonBadge: React.FC<SkeletonBadgeProps> = ({
  className,
  width = "w-16",
}) => {
  return (
    <SkeletonBox
      width={width}
      height="h-5"
      rounded="rounded-full"
      className={className}
    />
  )
}

// Input skeleton component
export interface SkeletonInputProps {
  /** Custom className */
  className?: string
  /** Width of the input */
  width?: string
}

export const SkeletonInput: React.FC<SkeletonInputProps> = ({
  className,
  width = "w-full",
}) => {
  return (
    <SkeletonBox
      width={width}
      height="h-10"
      rounded="rounded-md"
      className={className}
    />
  )
}

// Icon skeleton component
export interface SkeletonIconProps {
  /** Size of the icon */
  size?: "sm" | "md" | "lg"
  /** Custom className */
  className?: string
}

export const SkeletonIcon: React.FC<SkeletonIconProps> = ({
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <SkeletonBox
      width={sizeClasses[size].split(" ")[1]}
      height={sizeClasses[size].split(" ")[0]}
      rounded="rounded-sm"
      className={className}
    />
  )
} 
