export class FilterSessionManager {
  private static readonly PREFIX = 'table-filters-'
  private static readonly ACTIVATED_SUFFIX = '-activated'
  private static readonly ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/

  private static getKey(baseKey: string, suffix = ''): string {
    return `${this.PREFIX}${baseKey}${suffix}`
  }

  private static deserializeDates(obj: unknown): unknown {
    if (obj === null || obj === undefined) return obj
    
    if (typeof obj === 'string') {
      if (this.ISO_DATE_REGEX.test(obj)) {
        try {
          const date = new Date(obj)
          return isNaN(date.getTime()) ? obj : date
        } catch {
          return obj
        }
      }
      return obj
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.deserializeDates(item))
    }
    
    if (typeof obj === 'object') {
      const result: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.deserializeDates(value)
      }
      return result
    }
    
    return obj
  }

  private static isValidFiltersData(data: unknown): data is Record<string, unknown> {
    return data !== null && typeof data === 'object' && !Array.isArray(data)
  }

  private static safeSessionStorage<T>(
    operation: () => T,
    fallback: T,
    errorMessage: string
  ): T {
    try {
      return operation()
    } catch (error) {
      console.warn(errorMessage, error)
      return fallback
    }
  }

  static saveFilters(sessionKey: string, filters: Record<string, unknown>): void {
    this.safeSessionStorage(
      () => {
        const key = this.getKey(sessionKey)
        sessionStorage.setItem(key, JSON.stringify(filters))
      },
      undefined,
      'Failed to save filters to session storage:'
    )
  }

  static loadFilters(sessionKey: string): Record<string, unknown> {
    return this.safeSessionStorage(
      () => {
        const key = this.getKey(sessionKey)
        const stored = sessionStorage.getItem(key)
        
        if (!stored) return {}
        
        const parsed = JSON.parse(stored)
        
        if (!this.isValidFiltersData(parsed)) {
          console.warn('Invalid filter data found in session storage, clearing...')
          this.clearFilters(sessionKey)
          return {}
        }
        
        return this.deserializeDates(parsed) as Record<string, unknown>
      },
      {},
      'Failed to load filters from session storage:'
    )
  }

  static saveActivatedFilters(sessionKey: string, activatedFilters: string[]): void {
    this.safeSessionStorage(
      () => {
        const key = this.getKey(sessionKey, this.ACTIVATED_SUFFIX)
        sessionStorage.setItem(key, JSON.stringify(activatedFilters))
      },
      undefined,
      'Failed to save activated filters to session storage:'
    )
  }

  static loadActivatedFilters(sessionKey: string): string[] {
    return this.safeSessionStorage(
      () => {
        const key = this.getKey(sessionKey, this.ACTIVATED_SUFFIX)
        const stored = sessionStorage.getItem(key)
        
        if (!stored) return []
        
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
      },
      [],
      'Failed to load activated filters from session storage:'
    )
  }

  static clearFilters(sessionKey: string): void {
    this.safeSessionStorage(
      () => {
        const filtersKey = this.getKey(sessionKey)
        const activatedKey = this.getKey(sessionKey, this.ACTIVATED_SUFFIX)
        sessionStorage.removeItem(filtersKey)
        sessionStorage.removeItem(activatedKey)
      },
      undefined,
      'Failed to clear filters from session storage:'
    )
  }

  static clearAllFilters(): void {
    this.safeSessionStorage(
      () => {
        const keysToRemove: string[] = []
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          if (key?.startsWith(this.PREFIX)) {
            keysToRemove.push(key)
          }
        }
        keysToRemove.forEach(key => sessionStorage.removeItem(key))
      },
      undefined,
      'Failed to clear all filters from session storage:'
    )
  }
}