"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { isAuthenticated, getCurrentUser, logoutUser } from "../lib/auth"
import { User, Settings, LogOut, Menu, X, Home, CreditCard, HelpCircle } from "lucide-react"

// Types
interface NavItem {
  name: string
  path: string
}

interface MenuLinkProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  delay?: number
  onClick?: () => void
}

interface UserMenuProps {
  user: any
  onLogout: () => void
}

// Menu link component
function MenuLink({ href, icon, children, delay = 0, onClick }: MenuLinkProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link
        href={href}
        className="flex items-center space-x-3 p-3 rounded-lg text-gray-200 hover:bg-gray-700/50 transition-colors"
        onClick={onClick}
      >
        <div className="text-orange-500">{icon}</div>
        <span className="font-caviar">{children}</span>
      </Link>
    </motion.div>
  )
}

// User menu component for desktop
function UserMenuDesktop({ user, onLogout }: UserMenuProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg border border-gray-700/50"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.05, duration: 0.2 }}
    >
      {/* Header with user info */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-sm"></div>

        <div className="relative p-5 flex items-center space-x-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-micksenav"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
          >
            {user?.name?.charAt(0) || "U"}
          </motion.div>
          <div>
            <motion.p
              className="font-micksenav text-white"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {user?.name}
            </motion.p>
            <motion.p
              className="text-xs font-caviar text-gray-300"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {user?.email}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-2">
        <MenuLink href="/dashboard" icon={<Home className="h-4 w-4" />} delay={0.25}>
          Dashboard
        </MenuLink>
        <MenuLink href="/profile" icon={<User className="h-4 w-4" />} delay={0.3}>
          Profile
        </MenuLink>
        <MenuLink href="/settings" icon={<Settings className="h-4 w-4" />} delay={0.35}>
          Settings
        </MenuLink>
        <MenuLink href="/billing" icon={<CreditCard className="h-4 w-4" />} delay={0.4}>
          Billing
        </MenuLink>
      </div>

      {/* Logout button */}
      <div className="p-2 border-t border-gray-700/50">
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-red-400 hover:bg-gray-700/50 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-caviar">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAuthenticated_, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check authentication status
  useEffect(() => {
    setIsAuthenticated(isAuthenticated())
    setUser(getCurrentUser())
  }, [pathname])

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showUserMenu && !target.closest("[data-user-menu]")) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserMenu])

  const handleLogout = () => {
    logoutUser()
    setIsAuthenticated(false)
    setUser(null)
    window.location.href = "/login"
  }

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teamify%20-%201%20-%20Logo%20Name%20White%20Orange%20I%201-1hbbxfiTchwKSqlvjHzQR8CylRNsN0.png"
            alt="Teamify Logo"
            width={120}
            height={30}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-caviar transition-colors ${
                pathname === item.path ? "text-orange-500 font-bold" : "text-white hover:text-orange-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated_ ? (
            <div className="relative" data-user-menu>
              <button
                className="flex items-center space-x-2 bg-gray-800 rounded-full py-1 px-3 hover:bg-gray-700 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-micksenav">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-caviar">{user?.name?.split(" ")[0] || "User"}</span>
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 10,
                      transition: { duration: 0.2 },
                    }}
                    className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl shadow-2xl z-10"
                  >
                    <UserMenuDesktop user={user} onLogout={handleLogout} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login">
              <motion.button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition-all font-micksenav"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-6 h-6">
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-3 mx-2 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg border border-gray-700/50 shadow-2xl overflow-hidden">
              <div className="px-4 py-3 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={`block py-2 px-3 rounded-lg font-caviar ${
                        pathname === item.path
                          ? "text-orange-500 font-bold bg-orange-500/10"
                          : "text-white hover:text-orange-500 hover:bg-gray-700/50"
                      } transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {isAuthenticated_ ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + navItems.length * 0.05 }}
                      className="py-2 border-t border-gray-700/50 mt-2"
                    >
                      <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-micksenav">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-micksenav text-white">{user?.name}</p>
                          <p className="text-xs font-caviar text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (navItems.length + 1) * 0.05 }}
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-700/50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Home className="h-4 w-4 text-orange-500" />
                        <span className="font-caviar">Dashboard</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (navItems.length + 2) * 0.05 }}
                    >
                      <Link
                        href="/help"
                        className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-700/50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <HelpCircle className="h-4 w-4 text-orange-500" />
                        <span className="font-caviar">Help & Support</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (navItems.length + 3) * 0.05 }}
                    >
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-caviar">Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navItems.length * 0.05 }}
                  >
                    <Link
                      href="/login"
                      className="block py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-micksenav font-bold rounded-lg text-center transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

