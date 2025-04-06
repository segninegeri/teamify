"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useRouter } from "next/navigation"
import { Upload, AlertCircle } from "lucide-react"
import { getCurrentUser, isAuthenticated, getUsers } from "../../lib/auth"

export default function Setup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    // Get current user data
    const userData = getCurrentUser()
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }))
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoClick = () => {
    fileInputRef.current?.click()
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate form
      if (!formData.companyName) {
        throw new Error("Company name is required")
      }

      if (!formData.companySize) {
        throw new Error("Please select your company size")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data in localStorage
      const users = getUsers()
      const currentUser = getCurrentUser()

      if (currentUser && currentUser.id) {
        const userIndex = users.findIndex((u) => u.id === currentUser.id)

        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            companySize: formData.companySize,
          }

          localStorage.setItem("teamify_users", JSON.stringify(users))

          // Update current session
          const authData = JSON.parse(localStorage.getItem("teamify_auth") || "{}")
          authData.user = {
            ...authData.user,
            companyName: formData.companyName,
          }
          localStorage.setItem("teamify_auth", JSON.stringify(authData))
        }
      }

      // Redirect to dashboard
      router.push("/dashboard")
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
          src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
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
          className="form-container max-w-lg w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Set Up Your Office</h2>

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

          <div className="flex justify-center mb-6">
            <motion.div
              className={`w-24 h-24 rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden border-2 ${logoPreview ? "border-orange-500" : "border-gray-600"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoClick}
            >
              {logoPreview ? (
                <Image src={logoPreview || "/placeholder.svg"} alt="Company logo" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center bg-gray-800 w-full h-full">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-xs text-gray-400 mt-1">Upload Logo</span>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoChange} />
            </motion.div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Your Name *
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
                Your Email *
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
                readOnly
              />
            </div>

            <div className="mb-4">
              <label htmlFor="companyName" className="form-label">
                Your Company Name *
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                className="input-field"
                placeholder="Teamify Here"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="companyWebsite" className="form-label">
                Your Company Website
              </label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                type="url"
                className="input-field"
                placeholder="Website URL"
                value={formData.companyWebsite}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="companySize" className="form-label">
                Company Size *
              </label>
              <select
                id="companySize"
                name="companySize"
                className="input-field bg-gray-800 text-white"
                value={formData.companySize}
                onChange={handleChange}
                required
              >
                <option value="">Choose Your Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
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
              {isLoading ? "Processing..." : "Continue to Dashboard"}
            </motion.button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

