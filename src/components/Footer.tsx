"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="relative z-10 py-4 px-6 mt-auto"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
        <div className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Teamify. All rights reserved.</div>
      </div>
    </motion.footer>
  )
}

