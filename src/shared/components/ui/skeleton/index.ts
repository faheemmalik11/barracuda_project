// Context and Provider
export {
  SkeletonProvider,
  type SkeletonProviderProps,
} from "./SkeletonProvider"

// Theme and Context
export {
  useSkeletonTheme,
  type SkeletonTheme,
  SkeletonContext,
} from "./SkeletonContext"

// Primitive Components
export {
  SkeletonBox,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonBadge,
  SkeletonInput,
  SkeletonIcon,
  type SkeletonBoxProps,
  type SkeletonTextProps,
  type SkeletonAvatarProps,
  type SkeletonButtonProps,
  type SkeletonBadgeProps,
  type SkeletonInputProps,
  type SkeletonIconProps,
} from "./primitives"

// Layout Components
export {
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonForm,
  SkeletonGrid,
  SkeletonHeader,
  SkeletonPage,
  type SkeletonCardProps,
  type SkeletonTableProps,
  type SkeletonListProps,
  type SkeletonFormProps,
  type SkeletonGridProps,
  type SkeletonHeaderProps,
  type SkeletonPageProps,
} from "./layouts"

// Wrapper Components
export {
  SkeletonWrapper,
  ConditionalSkeleton,
  SkeletonTableWrapper,
  SkeletonPageWrapper,
  type SkeletonWrapperProps,
  type ConditionalSkeletonProps,
  type SkeletonTableWrapperProps,
  type SkeletonPageWrapperProps,
} from "./SkeletonWrapper"

// Hook
export { useSkeletonState } from "./useSkeletonState"

// Import for internal use in convenience object
import { 
  SkeletonWrapper,
  ConditionalSkeleton,
  SkeletonTableWrapper,
  SkeletonPageWrapper,
} from "./SkeletonWrapper"
import { useSkeletonState } from "./useSkeletonState"
import {
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonForm,
  SkeletonGrid,
  SkeletonHeader,
  SkeletonPage,
} from "./layouts"
import {
  SkeletonBox,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonBadge,
  SkeletonInput,
  SkeletonIcon,
} from "./primitives"
import { SkeletonProvider } from "./SkeletonProvider"
import { useSkeletonTheme } from "./SkeletonContext"

// Convenience exports for common patterns
export const Skeleton = {
  // Wrapper components
  Wrapper: SkeletonWrapper,
  TableWrapper: SkeletonTableWrapper,
  PageWrapper: SkeletonPageWrapper,
  ConditionalWrapper: ConditionalSkeleton,
  
  // Layout components
  Card: SkeletonCard,
  Table: SkeletonTable,
  List: SkeletonList,
  Form: SkeletonForm,
  Grid: SkeletonGrid,
  Header: SkeletonHeader,
  Page: SkeletonPage,
  
  // Primitive components
  Box: SkeletonBox,
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton,
  Badge: SkeletonBadge,
  Input: SkeletonInput,
  Icon: SkeletonIcon,
  
  // Context
  Provider: SkeletonProvider,
  useTheme: useSkeletonTheme,
  
  // Hook
  useState: useSkeletonState,
}

// Default export for convenience
export default Skeleton 
