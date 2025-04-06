"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export default function AnimatedButton({
  children,
  className = "btn-primary",
  onClick,
  type = "button",
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

