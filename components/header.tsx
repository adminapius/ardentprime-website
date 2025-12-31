"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "home" },
    { name: "Who We Are", href: "who-we-are" },
    { name: "What We Do", href: "what-we-do" },
    { name: "Why Choose Us", href: "why-choose-us" },
    { name: "Partners", href: "partners" },
    { name: "Contact Us", href: "contact" },
  ]

  const handleNavClick = (sectionId: string) => {
    // If clicking "Home", always go to clean "/" root
    if (sectionId === "home") {
      router.push("/")
      setIsMobileMenuOpen(false)
      return
    }

    if (pathname === "/") {
      // Already on home page - just scroll without changing URL
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // Coming from another page - need scrollTo parameter
      router.push(`/?scrollTo=${sectionId}`)
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    router.push("/")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center cursor-pointer">
            <div className="relative h-12 w-48">
              <Image
                src="/images/company-logo.png"
                alt="Ardent Prime Innovations"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-base font-semibold text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild size="lg" className="font-semibold">
              <button onClick={() => handleNavClick("contact")}>Get Started</button>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-base font-semibold text-foreground hover:text-primary transition-colors py-2 text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button asChild size="lg" className="w-full font-semibold">
                  <button onClick={() => handleNavClick("contact")}>Get Started</button>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
