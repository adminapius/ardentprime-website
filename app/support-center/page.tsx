"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp } from "lucide-react"
import { submitSupportTicket } from "@/app/actions/support"

const MAX_COMPANY_NAME = 100
const MAX_FIRST_NAME = 50
const MAX_LAST_NAME = 50
const MAX_EMAIL = 100
const MAX_SUBJECT = 200
const MAX_MESSAGE = 2000

export default function SupportCenterPage() {
  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    priority: "",
    message: "",
  })

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [companyError, setCompanyError] = useState<string>("")
  const [phoneError, setPhoneError] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")

    if (cleaned.length === 0) return ""
    if (cleaned.length <= 3) return `(${cleaned}`
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleaned = value.replace(/\D/g, "")

    if (cleaned.length <= 10) {
      const formatted = formatPhoneNumber(cleaned)
      setFormData({ ...formData, phone: formatted })

      if (cleaned.length > 0 && cleaned.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits")
      } else {
        setPhoneError("")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)
    setCompanyError("")
    setPhoneError("")

    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (phoneDigits.length !== 10) {
      setIsSubmitting(false)
      setPhoneError("Phone number must be exactly 10 digits")
      return
    }

    const result = await submitSupportTicket(formData)

    if (result.success) {
      setSubmitMessage({
        type: "success",
        text: "Thank you! Your support ticket has been submitted successfully. Our team will respond within 24 hours.",
      })
      setFormData({
        company: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        priority: "",
        message: "",
      })
    } else {
      if (result.error === "company_not_found") {
        setCompanyError(
          result.message ||
            "We could not find your company in our active contract records. Please contact sales@ardentprime.com.",
        )
      } else {
        setSubmitMessage({
          type: "error",
          text: result.error || "Failed to submit ticket. Please try again.",
        })
      }
    }

    setIsSubmitting(false)
  }

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "If you are a managed service client, please contact your dedicated IT support line. For other services, please refer to your onboarding documentation.",
    },
    {
      question: "What are your business hours?",
      answer:
        "Our standard business hours are Monday-Friday, 8 AM - 5 PM EST. Emergency support is available 24/7 for critical issues.",
    },
    {
      question: "Do you offer onsite support?",
      answer:
        "Yes, we offer onsite support for our managed IT service clients based on their service agreement. Please contact us for details.",
    },
    {
      question: "How can I check my service status?",
      answer:
        "For managed service clients, you can check your service status through our client portal. Alternatively, you can submit a ticket here.",
    },
  ]

  const handleContactClick = () => {
    router.push("/?scrollTo=contact")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ARDENT PRIME Support Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help! Submit a ticket, find answers to common questions, or get in touch with our support
            team.
          </p>
        </div>
      </section>

      {/* Support Ticket Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Submit a Support Ticket</h2>
            <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="company">
                  Company Name <span className="text-destructive">*</span>
                  <span className="text-muted-foreground text-xs ml-2">
                    ({formData.company.length}/{MAX_COMPANY_NAME})
                  </span>
                </Label>
                <Input
                  id="company"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_COMPANY_NAME) {
                      setFormData({ ...formData, company: e.target.value })
                      setCompanyError("")
                    }
                  }}
                  required
                  maxLength={MAX_COMPANY_NAME}
                  className="mt-2"
                />
                {companyError && (
                  <p className="text-sm text-destructive mt-2 bg-destructive/10 p-3 rounded-md border border-destructive/20">
                    {companyError}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_FIRST_NAME) {
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    }}
                    required
                    maxLength={MAX_FIRST_NAME}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_LAST_NAME) {
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    }}
                    required
                    maxLength={MAX_LAST_NAME}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_EMAIL) {
                        setFormData({ ...formData, email: e.target.value })
                      }
                    }}
                    required
                    maxLength={MAX_EMAIL}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(888) 123-4567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    maxLength={14}
                    className="mt-2"
                  />
                  {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="subject">
                    Subject <span className="text-destructive">*</span>
                    <span className="text-muted-foreground text-xs ml-2">
                      ({formData.subject.length}/{MAX_SUBJECT})
                    </span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_SUBJECT) {
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    }}
                    required
                    maxLength={MAX_SUBJECT}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="priority">
                    Priority <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    required
                  >
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General inquiry</SelectItem>
                      <SelectItem value="medium">Medium - Non-urgent issue</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                      <SelectItem value="critical">Critical - System down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                  <span className="text-muted-foreground text-xs ml-2">
                    ({formData.message.length}/{MAX_MESSAGE})
                  </span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  value={formData.message}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_MESSAGE) {
                      setFormData({ ...formData, message: e.target.value })
                    }
                  }}
                  required
                  maxLength={MAX_MESSAGE}
                  rows={6}
                  className="mt-2 resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>

              {submitMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    submitMessage.type === "success"
                      ? "bg-green-500/10 text-green-600 border border-green-500/20"
                      : "bg-red-500/10 text-red-600 border border-red-500/20"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-2">Quick Answers</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find solutions to common issues and learn more about our services.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg mb-4">Still need help?</p>
            <Button size="lg" onClick={handleContactClick}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
