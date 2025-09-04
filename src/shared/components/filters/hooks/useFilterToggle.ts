import { useState, useCallback } from 'react'

export function useFilterToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    setIsOpen,
    toggle,
    open,
    close,
  }
} 
