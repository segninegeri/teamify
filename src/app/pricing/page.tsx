"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import PricingCard from "../../components/PricingCard"
import Image from "next/image"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Standard",
      price: billingCycle === "monthly" ? 99 : 990,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      recommended: false,
    },
    {
      name: "Premium",
      price: billingCycle === "monthly" ? 299 : 2990,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: null,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
      ],
      recommended: false,
      customText: "Custom Plan",
      contactUs: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
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
          <h1 className="mb-2">
            Flexible <span className="text-orange-500">Plans</span>
          </h1>
          <p className="text-xl text-gray-300">Choose a plan that work best for you & your team</p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-800 p-1 rounded-full flex">
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === "monthly" ? "bg-orange-500 text-white" : "text-gray-300"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === "yearly" ? "bg-orange-500 text-white" : "text-gray-300"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly <span className="text-xs">(Save 50%)</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <PricingCard plan={plan} billingCycle={billingCycle} />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

