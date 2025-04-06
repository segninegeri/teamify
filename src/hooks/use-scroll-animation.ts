"use client"

import { useEffect, useState, type RefObject } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollAnimation(ref: RefObject<HTMLElement>, options: ScrollAnimationOptions = {}): boolean {
  const [isVisible, setIsVisible] = useState(false)
  const { threshold = 0.1, rootMargin = "0px" } = options

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, threshold, rootMargin])

  return isVisible
}

