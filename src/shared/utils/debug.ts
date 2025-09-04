interface DebugOptions {
  enabled: boolean
  prefix?: string
}

class DebugLogger {
  private options: DebugOptions

  constructor(options: DebugOptions = { enabled: false }) {
    this.options = options
  }

  log(message: string, data?: any) {
    if (!this.options.enabled) return
    
    const prefix = this.options.prefix ? `[${this.options.prefix}] ` : ''
    console.log(`${prefix}${message}`, data || '')
  }

  warn(message: string, data?: any) {
    if (!this.options.enabled) return
    
    const prefix = this.options.prefix ? `[${this.options.prefix}] ` : ''
    console.warn(`${prefix}${message}`, data || '')
  }

  error(message: string, data?: any) {
    if (!this.options.enabled) return
    
    const prefix = this.options.prefix ? `[${this.options.prefix}] ` : ''
    console.error(`${prefix}${message}`, data || '')
  }

  setEnabled(enabled: boolean) {
    this.options.enabled = enabled
  }

  isEnabled() {
    return this.options.enabled
  }
}

const isDevelopment = import.meta.env.DEV
const isDebugEnabled = isDevelopment && (import.meta.env.VITE_DEBUG_FILTERS === 'true')

export const filterDebug = new DebugLogger({ 
  enabled: isDebugEnabled,
  prefix: 'Filters'
})

export const createDebugLogger = (prefix: string, enabled?: boolean) => {
  return new DebugLogger({ 
    enabled: enabled ?? isDebugEnabled,
    prefix 
  })
}

export { DebugLogger }