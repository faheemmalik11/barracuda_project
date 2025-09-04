export class UserPreferencesManager {
  private static readonly PREFIX = 'user-preference-'
  private static readonly PAGE_SIZE_KEY = 'page-size'
  private static readonly MIN_PAGE_SIZE = 10
  private static readonly MAX_PAGE_SIZE = 100
  private static readonly DEFAULT_PAGE_SIZE = 20

  private static getKey(preferenceKey: string): string {
    return `${this.PREFIX}${preferenceKey}`
  }

  private static safeLocalStorage<T>(
    operation: () => T,
    fallback: T,
    errorMessage: string
  ): T {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return fallback
      }
      return operation()
    } catch (error) {
      console.warn(errorMessage, error)
      return fallback
    }
  }

  static getPageSize(): number {
    return this.safeLocalStorage(
      () => {
        const key = this.getKey(this.PAGE_SIZE_KEY)
        const stored = localStorage.getItem(key)
        
        if (!stored) return this.DEFAULT_PAGE_SIZE
        
        const size = parseInt(stored, 10)
        
        if (isNaN(size) || size < this.MIN_PAGE_SIZE || size > this.MAX_PAGE_SIZE) {
          this.clearPageSize()
          return this.DEFAULT_PAGE_SIZE
        }
        
        return size
      },
      this.DEFAULT_PAGE_SIZE,
      'Failed to load page size preference:'
    )
  }

  static setPageSize(size: number): void {
    this.safeLocalStorage(
      () => {
        if (size < this.MIN_PAGE_SIZE || size > this.MAX_PAGE_SIZE) {
          return
        }
        
        const key = this.getKey(this.PAGE_SIZE_KEY)
        localStorage.setItem(key, size.toString())
      },
      undefined,
      'Failed to save page size preference:'
    )
  }

  static clearPageSize(): void {
    this.safeLocalStorage(
      () => {
        const key = this.getKey(this.PAGE_SIZE_KEY)
        localStorage.removeItem(key)
      },
      undefined,
      'Failed to clear page size preference:'
    )
  }
}