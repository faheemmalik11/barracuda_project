import { useState, useCallback, useRef, useEffect } from 'react'

const COPY_TIMEOUT = 2000

/**
 * A reusable hook for copying text to clipboard with visual feedback
 * @param text The text to copy to clipboard
 * @returns Object with copied state and copy function
 */
export const useClipboard = (text: string) => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const copy = useCallback(async () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Fallback: Let user know to copy manually
      setCopied(true)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setCopied(false)
      timeoutRef.current = null
    }, COPY_TIMEOUT)
  }, [text])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { copied, copy }
}