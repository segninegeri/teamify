"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function OrderSummary() {
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "premium">("premium")

  const plans = {
    standard: {
      name: "Standard",
      price: 1000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    premium: {
      name: "Premium",
      price: 1800,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      recommended: true,
    },
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Office background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="opacity-30"
        />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="mb-8">
            Your Order <span className="text-orange-500">Summary</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Select Plan</h2>

          <div className="flex justify-end mb-4">
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              <span className="text-orange-500 font-medium">Monthly</span> |{" "}
              <span className="text-gray-300">Yearly</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Standard Plan */}
            <motion.div
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPlan === "standard" ? "border-orange-500 bg-gray-700/50" : "border-gray-700 bg-gray-800/30"
              }`}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedPlan("standard")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedPlan === "standard" ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    {selectedPlan === "standard" && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                  <h3 className="font-bold">Standard</h3>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${plans.standard.price}</p>
                  <p className="text-sm text-gray-400">Per Month</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300 pl-9">{plans.standard.description}</p>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPlan === "premium" ? "border-orange-500 bg-gray-700/50" : "border-gray-700 bg-gray-800/30"
              }`}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedPlan("premium")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedPlan === "premium" ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    {selectedPlan === "premium" && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                  <h3 className="font-bold">Premium</h3>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${plans.premium.price}</p>
                  <p className="text-sm text-gray-400">Per Month</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="mt-2 text-sm text-gray-300 pl-9">{plans.premium.description}</p>
                {plans.premium.recommended && (
                  <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-medium">Recommended</span>
                )}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center">
            <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Continue to Payment
            </motion.button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

