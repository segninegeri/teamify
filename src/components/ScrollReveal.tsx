"use client"

import { useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

interface ScrollRevealProps {
  children: ReactNode
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scale"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollAnimation(ref, { threshold })

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants[animation]}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

