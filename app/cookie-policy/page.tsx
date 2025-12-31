"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useEffect } from "react"

export default function CookiePolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: October 2, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="text-foreground/80 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit our
                website. They help us provide you with a better experience by remembering your preferences and
                understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable basic functions like
                    page navigation and access to secure areas.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Preference Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    These cookies allow our website to remember choices you make (such as your theme preference) and
                    provide enhanced, more personalized features.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
              <p className="text-foreground/80 leading-relaxed">
                You can control and manage cookies in various ways. Please note that removing or blocking cookies may
                impact your user experience and some functionality may no longer be available.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have questions about our use of cookies, please contact us at:
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
