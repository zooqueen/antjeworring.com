'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { rootMargin = '100px', threshold = 0, once = false } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        if (visible && once) {
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return [ref, isVisible]
}
