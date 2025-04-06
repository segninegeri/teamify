"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { fadeInUp, staggerContainer } from "../../lib/animations"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, CheckCircle, Globe, MessageSquare, Users, Video, Play, Pause } from "lucide-react"
import Link from "next/link"

export default function Features() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Clean up video event listeners on unmount
  useEffect(() => {
    const videoElement = videoRef.current

    const handleVideoEnd = () => {
      setIsPlaying(false)
    }

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd)

      // Preload video metadata
      videoElement.preload = "metadata"

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd)
        // Ensure video is paused when component unmounts
        if (!videoElement.paused) {
          videoElement.pause()
        }
      }
    }
  }, [])

  const handleVideoToggle = () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          // Use play() as a promise
          const playPromise = videoRef.current.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
              })
              .catch((error) => {
                console.error("Error playing video:", error)
              })
          }
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Video playback error:", error)
      }
    }
  }

  const features = [
    {
      title: "Virtual Workspace",
      description:
        "Collaborate with your team in a fully customizable virtual environment that feels like you're all in the same room.",
      icon: <Globe className="w-10 h-10 text-orange-500" />,
      color: "from-orange-500/20 to-transparent",
    },
    {
      title: "Team Management",
      description:
        "Manage your team members, roles, and permissions with ease. Assign tasks and track progress in real-time.",
      icon: <Users className="w-10 h-10 text-orange-500" />,
      color: "from-orange-500/20 to-transparent",
    },
    {
      title: "Video Conferencing",
      description: "Crystal clear video meetings with screen sharing, recording, and AI-powered transcription.",
      icon: <Video className="w-10 h-10 text-orange-500" />,
      color: "from-orange-500/20 to-transparent",
    },
    {
      title: "Messaging & Chat",
      description: "Instant messaging, group chats, and channels to keep communication flowing smoothly.",
      icon: <MessageSquare className="w-10 h-10 text-orange-500" />,
      color: "from-orange-500/20 to-transparent",
    },
  ]

  const benefits = [
    "Increase team productivity by up to 35%",
    "Reduce meeting time by 25%",
    "Improve team collaboration and communication",
    "Seamless integration with your existing tools",
    "Enterprise-grade security and compliance",
    "24/7 dedicated customer support",
  ]

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

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mx-auto">
              <h1 className="mb-6 text-5xl md:text-6xl leading-tight">
                Powerful <span className="text-orange-500">Features</span> for Modern Teams
              </h1>
              <p className="text-xl text-gray-300 mb-10 font-caviar">
                Everything you need to manage your virtual office and team in one place
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-video relative rounded-xl overflow-hidden border border-gray-700">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-team-of-professionals-working-in-an-office-4854-large.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Virtual Office Experience</h3>
                    <p className="text-gray-300">Connect with your team like never before</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleVideoToggle}
                  >
                    {isPlaying ? (
                      <Pause className="h-10 w-10 text-white" />
                    ) : (
                      <Play className="h-10 w-10 text-white ml-1" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative overflow-hidden rounded-xl p-8 border border-gray-800 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:border-orange-500 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-orange-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Why Teams <span className="text-orange-500">Love Teamify</span>
                </h2>
                <p className="text-gray-300 mb-8">
                  Our platform is designed to make remote work feel natural and collaborative. Here's why thousands of
                  teams choose Teamify for their virtual office needs:
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <CheckCircle className="text-orange-500 mr-3 h-6 w-6 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-10"
                >
                  <Link href="/signup">
                    <motion.button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-xl blur-xl opacity-70"></div>
                <div className="relative rounded-xl overflow-hidden border border-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Team collaboration"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Ready to transform your team's workflow?</h2>
              <p className="text-xl text-gray-300 mb-10">
                Join thousands of teams already using Teamify to boost productivity and collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <motion.button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial
                  </motion.button>
                </Link>
                <Link href="/demo">
                  <motion.button
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-md border border-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Demo
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

