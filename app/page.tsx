/**
 * Link in Bio
 * Author: nayandas69
 * GitHub: https://github.com/nayandas69/linkinbio-nextjs
 * Email: nayanchandradas@hotmail.com
 * License: Custom License - Do Not Remove Author Credit
 * Description: Modern Link in Bio portfolio built with Next.js, featuring glassmorphism design and smooth animations.
 *
 * IMPORTANT: Please do not remove this author credit comment.
 * You are free to use and modify this code under Custom License,
 * but please keep the author attribution intact.
 *
 *
 * Main Page Component - Link in Bio Portfolio
 *
 * This is the main landing page that displays:
 * - Profile section with image and bio
 * - Social media links with glassmorphism effects
 * - Blog carousel with modal functionality
 * - Dark/light theme toggle
 *
 * Features:
 * - Responsive design for all screen sizes
 * - Smooth animations and transitions
 * - Accessibility support with proper ARIA labels
 * - Verified badge with tooltip
 * - Modern glassmorphism UI design
 * - Auto-playing blog carousel with manual controls
 * - Modal for blog details with embedded YouTube videos
 * - Custom social media icons with hover effects
 * - Theme persistence using cookies
 * - We use api from Blogverse (https://blogverse-five-omega.vercel.app/api/v1/posts/recent) to fetch latest blogs.
 * - vercel speed-insights and analytics
 * - Note: This is a client-side component using Next.js App Router.
 *
 * Support me:
 * If you like my work and want to support me, consider:
 * - Following me on Patreon: https://patreon.com/NayanDas69
 * - Subscribing to my YouTube channel: https://youtube.com/@dasnayan69
 * - Joining my Discord community: https://discord.gg/skHyssu
 * - Starring this project on GitHub: https://github.com/nayandas69/linkinbio-nextjs
 */

"use client"

import DevPopup from "@/components/dev-popup"
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  VerificationBadgeIcon,
  YouTubeIcon,
} from "@/components/social-icons"
import { motion } from "framer-motion"
import { Moon, Settings, Sun } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

// Social media links configuration with custom icons
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/tamannaah159",
    icon: GitHubIcon,
    bgColor: "bg-gray-800",
  },
  {
    name: "Instagram",
    url: "#",
    icon: InstagramIcon,
    bgColor: "bg-pink-600",
  },
  {
    name: "YouTube",
    url: "#",
    icon: YouTubeIcon,
    bgColor: "bg-red-600",
  },
  {
    name: "Facebook",
    url: "#",
    icon: FacebookIcon,
    bgColor: "bg-blue-600",
  },
]

export default function HomePage() {
  // State management for various UI components
  // Track both system theme and user override
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system")
  const [systemTheme, setSystemTheme] = useState(false) // System preference (false = light, true = dark)

  // Computed theme: user override takes precedence, fallback to system
  const isDarkMode = themeMode === "dark" || (themeMode === "system" && systemTheme)

  /**
   * Cookie utility functions for theme persistence
   * Using cookies for better SSR compatibility and production-level persistence
   */
  const setCookie = (name: string, value: string, days = 365) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  /**
   * System Theme Detection and Live Updates
   * This effect sets up a listener for system theme changes and loads saved theme preference
   */
  useEffect(() => {
    // Load saved theme preference from cookie
    const savedTheme = getCookie("theme-preference") as "light" | "dark" | "system" | null
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setThemeMode(savedTheme)
    }

    // Function to check and update system theme
    const updateSystemTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setSystemTheme(prefersDark)
    }

    // Set initial system theme
    updateSystemTheme()

    // Create media query listener for live system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    // Handle system theme changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches)
    }

    // Add event listener for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange)

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [])

  /**
   * Apply theme changes to DOM when theme mode or system preference changes
   */
  useEffect(() => {
    const shouldBeDark = themeMode === "dark" || (themeMode === "system" && systemTheme)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [themeMode, systemTheme])

  /**
   * Three-state theme toggle function
   * Cycles through: Light (Moon) -> Dark (Settings) -> System (Sun) -> Light (Moon)
   * Each state persists across browser refreshes using cookies
   */
  const toggleTheme = () => {
    let newTheme: "light" | "dark" | "system"

    if (themeMode === "light") {
      // Light -> Dark (Moon icon clicked, go to dark)
      newTheme = "dark"
    } else if (themeMode === "dark") {
      // Dark -> System (Settings icon clicked, go to system)
      newTheme = "system"
    } else {
      // System -> Light (Sun icon clicked, go to light)
      newTheme = "light"
    }

    setThemeMode(newTheme)
    setCookie("theme-preference", newTheme) // Persist theme preference
  }

  /**
   * Get the appropriate icon for current theme state
   * Shows the NEXT state icon (what will happen when clicked)
   * Light mode shows Moon (next: dark), Dark mode shows Settings (next: system), System shows Sun (next: light)
   */
  const getThemeIcon = () => {
    if (themeMode === "light") {
      // Light mode -> next is dark, so show Moon
      return <Moon size={20} />
    } else if (themeMode === "dark") {
      // Dark mode -> next is system, so show Settings
      return <Settings size={20} />
    } else {
      // System mode -> next is light, so show Sun
      return <Sun size={20} />
    }
  }

  /**
   * Get appropriate aria-label for theme button based on current state
   */
  const getThemeAriaLabel = () => {
    if (themeMode === "light") {
      return "Switch to dark theme"
    } else if (themeMode === "dark") {
      return "Switch to system theme"
    } else {
      return "Switch to light theme"
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Animated background elements for visual appeal */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -right-40 -top-40 h-80 w-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-purple-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-pink-500" : "bg-purple-400"
          }`}
        />
      </div>

      {/* Theme Toggle Button - allows manual override and system following */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed right-6 top-6 z-50 rounded-full border p-3 backdrop-blur-md transition-all duration-300 ${
          isDarkMode
            ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
            : "border-white/40 bg-white/30 text-gray-800 hover:bg-white/40"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={getThemeAriaLabel()}
        title={`Current: ${themeMode} theme`}
      >
        {getThemeIcon()}
      </motion.button>

      {/* Main content container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {/* Main card container with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8 ${
            isDarkMode ? "border-white/10 bg-white/5" : "border-white/30 bg-white/20"
          }`}
        >
          {/* Profile Section */}
          <motion.div
            className="mb-6 text-center sm:mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Profile image with hover animation */}
            <motion.div
              className="relative mx-auto mb-4 h-24 w-24 sm:h-28 sm:w-28"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Gradient glow ring behind the avatar */}
              <div
                className={`absolute -inset-1 rounded-full bg-gradient-to-tr blur-sm ${
                  isDarkMode ? "from-purple-500 via-pink-500 to-violet-500" : "from-blue-400 via-indigo-400 to-purple-400"
                }`}
              />
              <Image
                src="/images/profile.jpg"
                alt="Tamannaah profile picture"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="relative rounded-full border-4 border-white/60 object-cover shadow-lg"
                priority
              />
            </motion.div>

            {/* Name and bio text */}
            <motion.h1
              className={`mb-1 text-xl font-bold sm:text-2xl ${isDarkMode ? "text-white" : "text-gray-800"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="flex items-center justify-center gap-2">
                Tamannaah
                <div className="group relative">
                  <VerificationBadgeIcon
                    size={20}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  />
                  {/* Verification tooltip */}
                  <div
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 transform rounded-lg px-3 py-2 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    } pointer-events-none z-20 origin-bottom scale-0 whitespace-nowrap border shadow-xl backdrop-blur-sm group-hover:scale-100`}
                  >
                    Identity verified
                    <div
                      className={`absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-[4px] border-r-[4px] border-t-[4px] border-transparent ${
                        isDarkMode ? "border-t-gray-800" : "border-t-white"
                      }`}
                    />
                  </div>
                </div>
              </span>
            </motion.h1>
            <motion.p
              className={`text-xs font-medium ${isDarkMode ? "text-purple-300" : "text-indigo-500"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              @tamannaah159
            </motion.p>
            <motion.p
              className={`mt-2 px-2 text-xs opacity-80 sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Creating, sharing, and connecting across the web.
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="mx-auto flex max-w-xs items-center justify-center gap-4 sm:gap-5">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url === "#" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group relative ${link.bgColor} flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent active:translate-y-0 active:scale-95 sm:h-14 sm:w-14`}
                  whileHover={{
                    scale: 1.1,
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    y: 0,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  aria-label={`Visit ${link.name}`}
                >
                  <link.icon size={22} className="drop-shadow-sm" />

                  {/* Enhanced tooltip with better positioning */}
                  <div
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 transform rounded-lg px-2 py-1 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 sm:-top-12 sm:px-3 sm:py-2 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} pointer-events-none z-20 origin-bottom scale-0 whitespace-nowrap border shadow-xl backdrop-blur-sm group-hover:scale-100`}
                  >
                    {link.name}
                    <div
                      className={`absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-[4px] border-r-[4px] border-t-[4px] border-transparent ${isDarkMode ? "border-t-gray-800" : "border-t-white"}`}
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className={`mx-auto mt-6 h-px w-2/3 ${isDarkMode ? "bg-white/10" : "bg-gray-800/10"}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />

          {/* Footer */}
          <motion.p
            className={`mt-4 text-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {`© ${new Date().getFullYear()} Tamannaah`}
          </motion.p>
        </motion.div>
      </div>

      {/* DevPopup Component */}
      <DevPopup isDarkMode={isDarkMode} />
    </div>
  )
}
