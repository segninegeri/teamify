"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { registerUser, findUserByEmail, isAuthenticated } from "../../lib/auth"

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      router.push("/dashboard")
      return
    }

    // Get selected plan from session storage
    const plan = sessionStorage.getItem("selectedPlan")
    if (plan) {
      setSelectedPlan(plan)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Calculate password strength when password field changes
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak"
    if (passwordStrength === 1) return "Weak"
    if (passwordStrength === 2) return "Medium"
    if (passwordStrength === 3) return "Strong"
    return "Very Strong"
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-red-500"
    if (passwordStrength === 1) return "bg-orange-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-green-500"
    return "bg-green-600"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      // Check if user already exists
      if (findUserByEmail(formData.email)) {
        throw new Error("An account with this email already exists")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Register user
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        plan: selectedPlan || undefined,
      })

      // Redirect to setup page
      router.push("/setup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1565617681196-9de7be64dbff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Office background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="opacity-30"
        />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-16 pt-24 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="form-container"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Signup</h2>

          {selectedPlan && (
            <div className="mb-6 p-3 bg-orange-500/20 border border-orange-500 rounded-md text-center">
              <p className="text-sm font-medium">
                You selected the <span className="font-bold capitalize">{selectedPlan}</span> plan
              </p>
              <p className="text-xs mt-1 text-gray-300">You can change your plan anytime after signup</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500 text-white p-3 rounded-md mb-4 flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Enter Your Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input-field"
                placeholder="First & Last Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Enter Your Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-field"
                placeholder="Email Here"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Create Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="Type Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Password Strength:</span>
                    <span
                      className={`text-xs ${
                        passwordStrength <= 1
                          ? "text-red-400"
                          : passwordStrength === 2
                            ? "text-yellow-400"
                            : "text-green-400"
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        {formData.password.length >= 8 ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-500 mr-1" />
                        )}
                        At least 8 characters
                      </li>
                      <li className="flex items-center">
                        {/[A-Z]/.test(formData.password) ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-500 mr-1" />
                        )}
                        At least one uppercase letter
                      </li>
                      <li className="flex items-center">
                        {/[0-9]/.test(formData.password) ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-500 mr-1" />
                        )}
                        At least one number
                      </li>
                      <li className="flex items-center">
                        {/[^A-Za-z0-9]/.test(formData.password) ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-500 mr-1" />
                        )}
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {formData.password && formData.confirmPassword && (
                <div className="mt-1 flex items-center">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-500">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-all flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Processing..." : "Continue"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">Already have an account?</p>
            <Link href="/login" className="text-orange-500 hover:underline font-bold">
              Sign In
            </Link>
          </div>

          <p className="mt-4 text-sm text-center">
            By proceeding you are agreeing to the{" "}
            <Link href="#" className="text-orange-500 hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-orange-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

