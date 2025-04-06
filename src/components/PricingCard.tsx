"use client"

import { motion } from "framer-motion"

interface PricingCardProps {
  plan: {
    name: string
    price: number | null
    description: string
    features: string[]
    recommended?: boolean
    customText?: string
    contactUs?: boolean
  }
  billingCycle: "monthly" | "yearly"
}

export default function PricingCard({ plan, billingCycle }: PricingCardProps) {
  return (
    <motion.div
      className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border-2 ${
        plan.recommended ? "border-orange-500" : "border-gray-700"
      } h-full flex flex-col`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {plan.recommended && (
        <div className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-medium self-end mb-2">
          Recommended
        </div>
      )}

      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

      <p className="text-gray-300 text-sm mb-4">{plan.description}</p>

      <div className="mb-6">
        {plan.price ? (
          <div className="flex items-end">
            <span className="text-4xl font-bold">${plan.price}</span>
            <span className="text-gray-400 ml-1">/{billingCycle === "monthly" ? "Per Month" : "Per Year"}</span>
          </div>
        ) : (
          <div className="text-2xl font-bold">{plan.customText}</div>
        )}
      </div>

      <ul className="space-y-2 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        className={`w-full py-2 px-4 rounded-md font-bold ${
          plan.recommended ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
        } transition-colors mt-auto`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {plan.contactUs ? "Contact Us" : "Choose Plan"}
      </motion.button>
    </motion.div>
  )
}

