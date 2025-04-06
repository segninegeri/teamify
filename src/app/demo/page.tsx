"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import AnimatedButton from "../../components/AnimatedButton"

export default function Demo() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%201-KhhOJB9ZnLNfAvlXuQrsSqhlY80kET.png"
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
          <h1 className="mb-4">
            Teamify <span className="text-orange-500">Demo</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Experience the power of our virtual office platform</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`relative flex flex-col items-center ${
                  s < step ? "text-orange-500" : s === step ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    s < step ? "bg-orange-500 border-orange-500" : s === step ? "border-orange-500" : "border-gray-500"
                  }`}
                >
                  {s < step ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                <span className="mt-2 text-sm">{s === 1 ? "Setup" : s === 2 ? "Customize" : "Launch"}</span>
                {s < 3 && (
                  <div
                    className={`absolute top-5 left-full w-[calc(100%-2.5rem)] h-0.5 ${
                      s < step ? "bg-orange-500" : "bg-gray-500"
                    }`}
                    style={{ transform: "translateX(1.25rem)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg mb-8"
          >
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Step 1: Setup Your Virtual Office</h2>
                <p className="text-gray-300 mb-6">
                  Create your account and set up your company profile. This will be the foundation of your virtual
                  office.
                </p>
                <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    alt="Setup demo"
                    fill
                    className="object-cover"
                  />
                </div>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Create your admin account</li>
                  <li>Set up your company profile</li>
                  <li>Configure basic settings</li>
                  <li>Invite your team members</li>
                </ul>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Step 2: Customize Your Workspace</h2>
                <p className="text-gray-300 mb-6">
                  Personalize your virtual office to match your company's branding and workflow needs.
                </p>
                <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    alt="Customize demo"
                    fill
                    className="object-cover"
                  />
                </div>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Customize your workspace layout</li>
                  <li>Set up departments and teams</li>
                  <li>Configure communication channels</li>
                  <li>Integrate with your existing tools</li>
                </ul>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Step 3: Launch Your Virtual Office</h2>
                <p className="text-gray-300 mb-6">
                  Your virtual office is ready! Start collaborating with your team and enjoy the benefits of remote
                  work.
                </p>
                <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    alt="Launch demo"
                    fill
                    className="object-cover"
                  />
                </div>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Onboard your team members</li>
                  <li>Start your first virtual meeting</li>
                  <li>Collaborate on projects in real-time</li>
                  <li>Track progress and productivity</li>
                </ul>
              </div>
            )}
          </motion.div>

          <div className="flex justify-between">
            <AnimatedButton
              className={`btn-secondary ${step === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={prevStep}
            >
              Previous
            </AnimatedButton>

            {step < totalSteps ? (
              <AnimatedButton onClick={nextStep}>Next</AnimatedButton>
            ) : (
              <Link href="/signup">
                <AnimatedButton>Get Started</AnimatedButton>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

