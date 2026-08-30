import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import { headers } from "next/headers"
import { Analytics } from "@vercel/analytics/react"
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema } from "@/components/structured-data"
import "./globals.css"

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-D9HQELL9FM"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const siteConfig = {
  name: "Ardent Prime Innovations LLC",
  description: "Enterprise IT solutions, infrastructure services, and managed IT support. From startups to Fortune 500 companies, we deliver technology that drives growth.",
  url: "https://ardentprime.com",
  ogImage: "/og-image.jpg",
  author: "Ardent Prime Innovations LLC",
  keywords: [
    "IT solutions",
    "network infrastructure", 
    "managed IT services",
    "technology consulting",
    "IT support South Bend Indiana",
    "enterprise IT solutions",
    "cybersecurity services",
    "cloud infrastructure",
    "IT consulting",
    "business technology solutions",
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Your Trusted Technology Innovation Partner`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  generator: "v0.app",
  applicationName: siteConfig.name,
  referrer: "strict-origin-when-cross-origin",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Enterprise IT Solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ardentprime",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined

  return (
    <html lang="en" className="theme-3">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          nonce={nonce}
        />
        <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* JSON-LD Structured Data for SEO */}
        <OrganizationSchema nonce={nonce} />
        <LocalBusinessSchema nonce={nonce} />
        <WebsiteSchema nonce={nonce} />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
