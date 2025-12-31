"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useEffect } from "react"

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: October 2, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing or using the services provided by ARDENT PRIME INNOVATIONS LLC, you agree to be bound by
                these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                ARDENT PRIME INNOVATIONS LLC provides IT infrastructure services, technology solutions, professional
                installation, and managed IT services. We reserve the right to modify or discontinue services at any
                time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our services for any unlawful purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-foreground/80 leading-relaxed">
                All content, trademarks, and intellectual property on our website and in our services are owned by
                ARDENT PRIME INNOVATIONS LLC. You may not use, reproduce, or distribute any content without our express
                written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="text-foreground/80 leading-relaxed">
                ARDENT PRIME INNOVATIONS LLC shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
              <p className="text-foreground/80 leading-relaxed">
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="text-foreground/80 mt-4">
                Email: info@ardentprime.com
                <br />
                Phone: +1 (219) 999-2867
                <br />
                Address: 1601 Riverside Dr, South Bend, IN 46616
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
