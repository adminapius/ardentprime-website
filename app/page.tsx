"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { HeroSection } from "@/components/hero-section"
import { WhoWeAre } from "@/components/who-we-are"
import { WhatWeDo } from "@/components/what-we-do"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ArdentPrimeNews } from "@/components/ardent-prime-news"
import { Partners } from "@/components/partners"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo")
    if (scrollTo) {
      // Small delay to ensure elements are rendered
      setTimeout(() => {
        const element = document.getElementById(scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhoWeAre />
      <ArdentPrimeNews />
      <WhatWeDo />
      <WhyChooseUs />
      <Partners />
      <ContactSection />
      <Footer />
    </main>
  )
}
