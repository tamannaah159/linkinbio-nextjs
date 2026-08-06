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
 */

import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Font configurations with optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Improves loading performance
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// SEO metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/tamannaah159"),
  title: "Link in Bio | Tamannaah - Social Links",
  description: "Connect with Tamannaah across social platforms.",
  keywords: ["Tamannaah", "link in bio", "social links", "GitHub", "Instagram", "YouTube", "Facebook"],
  authors: [{ name: "Tamannaah", url: "https://github.com/tamannaah159" }],
  creator: "Tamannaah",
  publisher: "Tamannaah",

  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/tamannaah159",
    title: "Link in Bio | Tamannaah",
    description: "Connect with Tamannaah across social platforms.",
    siteName: "Tamannaah",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Tamannaah",
      },
    ],
  },

  // Twitter/X Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Link in Bio | Tamannaah",
    description: "Connect with Tamannaah across social platforms.",
    images: ["/images/profile.jpg"],
    creator: "@tamannaah159",
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // if you have own domain and dns configured, uncomment the following lines
  // to enable verification for search engines
  // This is optional and can be configured in your .env.local file
  // If you don't have a domain, you can skip this part.
  // Verification for search engines
  // Add GOOGLE_VERIFICATION_CODE=your-actual-verification-code to your .env.local file
  // verification: {
  //  google: process.env.GOOGLE_VERIFICATION_CODE, // Add your Google verification code to .env.local
  // },

  // App-specific metadata
  applicationName: "Tamannaah",
  category: "Portfolio",
}

/**
 * Root Layout Component
 *
 * @param children - Child components to be rendered within the layout
 * @returns JSX element containing the complete HTML document structure
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" href="/images/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/favicon.jpg" />

        {/* Google Search Console Verification - only rendered when env var is set */}
        {process.env.GOOGLE_VERIFICATION_CODE && (
          <meta name="google-site-verification" content={process.env.GOOGLE_VERIFICATION_CODE} />
        )}

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* Viewport configuration for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//github.com" />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tamannaah",
              url: "https://github.com/tamannaah159",
              sameAs: ["https://github.com/tamannaah159"],
              description: "Connect with Tamannaah across social platforms.",
              image: "/images/profile.jpg",
            }),
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-blue-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>

        {/* Main content wrapper */}
        <main id="main-content" className="relative">
          {children}
        </main>

        {/* Vercel Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
