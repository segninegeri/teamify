"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { initializeAuthDatabase } from "../lib/auth"

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const router = useRouter()

  useEffect(() => {
    // Initialize auth database with demo users
    initializeAuthDatabase()
  }, [])

  const plans = [
    {
      id: "standard",
      name: "Standard",
      price: billingCycle === "monthly" ? 99 : 49,
      description: "Perfect for small teams just getting started with virtual collaboration.",
      features: [
        "Up to 10 team members",
        "Basic virtual office",
        "Video conferencing",
        "Team chat",
        "File sharing",
        "Basic integrations",
      ],
      recommended: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: billingCycle === "monthly" ? 299 : 149,
      description: "Ideal for growing teams that need advanced collaboration features.",
      features: [
        "Up to 50 team members",
        "Advanced virtual office",
        "HD video conferencing",
        "Team chat with channels",
        "Advanced file sharing",
        "Priority support",
        "All integrations",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: null,
      description: "Custom solutions for large organizations with specific requirements.",
      features: [
        "Unlimited team members",
        "Custom virtual office",
        "4K video conferencing",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantees",
      ],
      recommended: false,
      customText: "Custom Plan",
      contactUs: true,
    },
  ]

  const handleChoosePlan = (planId: string) => {
    if (planId === "enterprise") {
      router.push("/contact")
    } else {
      // Store selected plan in session storage
      sessionStorage.setItem("selectedPlan", planId)
      router.push("/signup")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%201-okixeTll5TtAYkR8Y4wERzcCJxaH7Q.png"
          alt="Remote office workspace"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="opacity-40"
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-200px)] flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h1 className="mb-4 text-5xl md:text-6xl font-bold">
                  Welcome To Your <span className="text-orange-500">Virtual Office</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Connect, collaborate, and manage your team from anywhere in the world
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/demo">
                  <motion.button
                    className="btn-primary flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Instant Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </Link>
                <Link href="/setup">
                  <motion.button className="btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Setup Your Company
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="mb-2 text-4xl font-bold">
                Flexible <span className="text-orange-500">Plans</span>
              </h2>
              <p className="text-xl text-gray-300">Choose a plan that works best for you & your team</p>
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
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border-2 ${
                    plan.recommended ? "border-orange-500" : "border-gray-700"
                  } h-full flex flex-col`}
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
                        <span className="text-gray-400 ml-1">
                          /{billingCycle === "monthly" ? "mo" : "mo (billed yearly)"}
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold">{plan.customText}</div>
                    )}
                  </div>

                  <ul className="space-y-2 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-orange-500 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-2 px-4 rounded-md font-bold ${
                      plan.recommended
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    } transition-colors mt-auto`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleChoosePlan(plan.id)}
                  >
                    {plan.contactUs ? "Contact Us" : "Choose Plan"}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

