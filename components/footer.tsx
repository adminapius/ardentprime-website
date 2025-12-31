"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { validateEmail } from "@/lib/email-validator"
import { useRouter, usePathname } from "next/navigation"

const MAX_EMAIL = 100

export function Footer() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubscribeStatus(null)

    const validation = validateEmail(email)
    if (!validation.valid) {
      setIsLoading(false)
      setSubscribeStatus({ type: "error", message: validation.error || "Invalid email" })
      setTimeout(() => setSubscribeStatus(null), 5000)
      return
    }

    const result = await subscribeToNewsletter(email)

    setIsLoading(false)

    if (result.success) {
      setSubscribeStatus({ type: "success", message: "Successfully subscribed!" })
      setEmail("")
    } else {
      setSubscribeStatus({ type: "error", message: result.error || "Failed to subscribe" })
    }

    setTimeout(() => setSubscribeStatus(null), 5000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      router.push(`/?scrollTo=${sectionId}`)
    }
  }

  const handleLogoClick = () => {
    router.push("/")
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-16 mb-12 max-w-7xl mx-auto">
          {/* Logo Section - Left Most */}
          <div className="lg:mr-auto">
            <button onClick={handleLogoClick} className="block cursor-pointer">
              <div className="relative h-12 w-48 mb-6">
                <Image
                  src="/images/company-logo.png"
                  alt="Ardent Prime Innovations"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </button>
            <p className="text-secondary-foreground/80 leading-relaxed max-w-xs">
              Your trusted partner for comprehensive IT solutions. We transform businesses through innovative technology
              and exceptional service.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex-shrink-0 mr-[30px]">
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavClick("who-we-are")}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("who-we-are")}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <Link
                  href="/support-center"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="flex-shrink-0 mr-5">
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavClick("what-we-do")}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  IT Infrastructure Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("what-we-do")}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Professional Installation & Integration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("what-we-do")}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Managed IT & Web Services
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-shrink-0">
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_EMAIL) {
                    setEmail(e.target.value)
                  }
                }}
                required
                maxLength={MAX_EMAIL}
                disabled={isLoading}
                className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
              {subscribeStatus && (
                <p className={`text-sm ${subscribeStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {subscribeStatus.message}
                </p>
              )}
            </form>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Contact Info</h4>
              <p className="text-sm text-secondary-foreground/80">info@ardentprime.com</p>
              <p className="text-sm text-secondary-foreground/80">+1 (219) 999-2867</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/80">
              © 2025 ARDENT PRIME INNOVATIONS LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex gap-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookie-policy"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
              {isVisible && (
                <Button
                  onClick={scrollToTop}
                  size="icon"
                  className="h-10 w-10 rounded-full shadow-lg hover:scale-110 transition-transform"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
