import { memo } from "react"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCcw,
  XCircle,
} from "lucide-react"

// Enhanced icon components with consistent sizing
export const StatusIcons = {
  CheckCircle: memo(CheckCircle),
  XCircle: memo(XCircle),
  Clock: memo(Clock),
  AlertTriangle: memo(AlertTriangle),
  RefreshCcw: memo(RefreshCcw),
} as const 
