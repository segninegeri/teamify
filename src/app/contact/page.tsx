"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { fadeIn, fadeInUp } from "../../lib/animations"
import { CheckCircle, Loader2, AlertCircle, Mail, Phone, MapPin } from "lucide-react"

// Interface for form data
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

// Interface for form errors
interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

// Interface for sent messages
interface SentMessage extends FormData {
  id: string
  timestamp: string
}

// Contact info component
function ContactInfoItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: string
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-orange-500 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="font-micksenav font-bold">{title}</h3>
        <p className="text-gray-300 font-caviar">{content}</p>
      </div>
    </div>
  )
}

// Form input component
function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  rows = 1,
}: {
  id: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  disabled?: boolean
  rows?: number
}) {
  const InputComponent = rows > 1 ? ("textarea" as const) : ("input" as const)

  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label font-micksenav">
        {label} *
      </label>
      <InputComponent
        id={id}
        name={id}
        type={type}
        className={`input-field font-caviar ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center font-caviar">
          <AlertCircle className="h-3 w-3 mr-1" /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Load previously sent messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("teamify_contact_messages")
    if (!savedMessages) {
      localStorage.setItem("teamify_contact_messages", JSON.stringify([]))
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const saveMessage = (message: FormData) => {
    try {
      const savedMessages = localStorage.getItem("teamify_contact_messages")
      const messages: SentMessage[] = savedMessages ? JSON.parse(savedMessages) : []

      const newMessage: SentMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }

      messages.push(newMessage)
      localStorage.setItem("teamify_contact_messages", JSON.stringify(messages))

      return true
    } catch (error) {
      console.error("Error saving message:", error)
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call with network delay
    setTimeout(() => {
      // Save message to localStorage
      const success = saveMessage(formData)

      if (success) {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after showing success message
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
          setIsSubmitted(false)
        }, 5000)
      } else {
        setIsSubmitting(false)
        setErrors({
          ...errors,
          message: "Failed to send message. Please try again.",
        })
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Contact office background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="opacity-30"
        />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-16 pt-24">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16">
          <h1 className="mb-4 font-micksenav">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-caviar">
            Have questions or need assistance? We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <h2 className="text-2xl font-bold mb-6 font-micksenav">Get In Touch</h2>
            <p className="text-gray-300 mb-8 font-caviar">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <ContactInfoItem
                icon={<Mail className="h-6 w-6 text-white" />}
                title="Email"
                content="info@teamify.com"
              />

              <ContactInfoItem
                icon={<Phone className="h-6 w-6 text-white" />}
                title="Phone"
                content="+251 911 123 456"
              />

              <ContactInfoItem
                icon={<MapPin className="h-6 w-6 text-white" />}
                title="Location"
                content="Bole Road, Addis Ababa, Ethiopia"
              />
            </div>

            {/* Map - Updated to Addis Ababa */}
            <div className="mt-8 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39636892211!2d38.6746491!3d9.0084244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Teamify Office Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800/80 backdrop-blur-md p-8 rounded-lg flex flex-col items-center justify-center h-full border border-green-500/30"
              >
                <div className="bg-green-500/20 p-6 rounded-full mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center font-micksenav">Message Sent Successfully!</h3>
                <p className="text-gray-300 text-center mb-6 font-caviar">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md font-micksenav"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-800/80 backdrop-blur-md p-8 rounded-lg border border-gray-700"
              >
                <FormInput
                  id="name"
                  label="Your Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={isSubmitting}
                />

                <FormInput
                  id="email"
                  label="Your Email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isSubmitting}
                />

                <FormInput
                  id="subject"
                  label="Subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  disabled={isSubmitting}
                />

                <FormInput
                  id="message"
                  label="Message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  disabled={isSubmitting}
                  rows={5}
                />

                <motion.button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-all flex justify-center items-center font-micksenav"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

