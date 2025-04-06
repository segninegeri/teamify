"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { fadeIn, fadeInUp, staggerContainer } from "../../lib/animations"
import { Heart, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

export default function About() {
  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      bio: "Former Google executive with 15+ years in tech leadership",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      bio: "MIT graduate with expertise in AI and distributed systems",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Mike Johnson",
      role: "Head of Design",
      bio: "Award-winning designer with a passion for user experience",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Sarah Williams",
      role: "Head of Marketing",
      bio: "Digital marketing expert who previously led campaigns at Spotify",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      twitter: "#",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Teamify was founded in response to the global shift to remote work",
    },
    {
      year: "2021",
      title: "First Major Release",
      description: "Launched our core platform with virtual office and collaboration tools",
    },
    {
      year: "2022",
      title: "Rapid Growth",
      description: "Reached 100,000 users and secured Series A funding of $12M",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Opened offices in London, Singapore, and expanded our team to 100+ employees",
    },
  ]

  const values = [
    {
      icon: <Lightbulb className="h-10 w-10 text-orange-500" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in virtual collaboration.",
    },
    {
      icon: <Users className="h-10 w-10 text-orange-500" />,
      title: "Community",
      description: "We build with our users in mind and value their feedback above all else.",
    },
    {
      icon: <Heart className="h-10 w-10 text-orange-500" />,
      title: "Passion",
      description: "We're passionate about creating technology that brings people together.",
    },
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
                About <span className="text-orange-500">Teamify</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10">
                We're on a mission to transform how teams work together in the digital age
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Founded in 2020, Teamify was born out of the need for better virtual collaboration tools in the
                  post-pandemic world. We noticed that existing solutions were fragmented and difficult to use, so we
                  set out to create a unified platform that would make virtual teamwork seamless and enjoyable.
                </p>
                <p className="text-gray-300 mb-6 text-lg">
                  Our founders, having experienced the challenges of remote work firsthand, were determined to build a
                  solution that would not just replicate the office experience online, but enhance it with digital
                  capabilities that weren't possible in traditional settings.
                </p>
                <p className="text-gray-300 text-lg">
                  Today, Teamify is used by thousands of teams around the world, from small startups to large
                  enterprises. Our platform continues to evolve based on feedback from our users, as we strive to create
                  the best virtual office experience possible.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-xl blur-xl opacity-70"></div>
                <div className="relative rounded-xl overflow-hidden border border-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Team collaboration"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section - Improved for mobile */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16 text-center"
            >
              Our Journey
            </motion.h2>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-orange-500"
                >
                  <div className="absolute left-[-8px] top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
                    <span className="text-orange-500 text-xl font-bold">{milestone.year}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="relative hidden md:block">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-500/30"></div>

              <div className="space-y-20">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange-500 rounded-full"></div>

                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"}`}>
                      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-all duration-300">
                        <span className="text-orange-500 text-xl font-bold">{milestone.year}</span>
                        <h3 className="text-2xl font-bold mt-2 mb-3">{milestone.title}</h3>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-900/50 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16 text-center"
            >
              Meet Our Team
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div key={index} variants={fadeInUp} className="group">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <div className="aspect-square relative">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <p className="text-white">{member.bio}</p>
                        <div className="flex mt-4 space-x-3">
                          <a href={member.linkedin} className="text-white hover:text-orange-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                          <a href={member.twitter} className="text-white hover:text-orange-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-orange-500">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-300">
                At Teamify, we believe in creating technology that brings people together, enhances productivity, and
                makes work more enjoyable. Our core values guide everything we do.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all flex flex-col items-center text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
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
              <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl text-gray-300 mb-10">
                Be part of the future of work. Join thousands of teams already using Teamify to transform how they
                collaborate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <motion.button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-md border border-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
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

