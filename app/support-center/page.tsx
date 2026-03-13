"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { FAQSchema } from "@/components/faq-schema"
import { useRouter } from "next/navigation"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { submitSupportTicket } from "@/app/actions/support"
import { validateEmail } from "@/lib/email-validator"
import { validateEmailDomain } from "@/app/actions/validate-email-domain"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support Center - Contract Customer Support",
  description:
    "Access our support center for contract customers. Submit support tickets, get technical assistance, and manage your IT infrastructure with Ardent Prime Innovations.",
  keywords: ["support center", "technical support", "support tickets", "IT support", "customer support", "contract customers", "FAQ", "troubleshooting"],
  openGraph: {
    title: "Support Center - Ardent Prime Innovations LLC",
    description: "Contract customer support center. Submit tickets and get technical assistance.",
    url: "https://ardentprime.com/support-center",
    type: "website",
  },
  alternates: {
    canonical: "https://ardentprime.com/support-center",
  },
}

const MAX_COMPANY_NAME = 100
const MAX_FIRST_NAME = 50
const MAX_LAST_NAME = 50
const MAX_EMAIL = 100
const MAX_SUBJECT = 100
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
  const [isValidatingEmail, setIsValidatingEmail] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [companyError, setCompanyError] = useState<string>("")
  const [phoneError, setPhoneError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [emailDomainValid, setEmailDomainValid] = useState<boolean | null>(null)
  const [priorityError, setPriorityError] = useState<string>("")
  const [firstNameError, setFirstNameError] = useState<string>("")
  const [lastNameError, setLastNameError] = useState<string>("")

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    if (email.length <= MAX_EMAIL) {
      setFormData({ ...formData, email })
      setEmailDomainValid(null)

      if (email) {
        const validation = validateEmail(email)
        if (!validation.valid) {
          setEmailError(validation.error || "Invalid email")
        } else {
          setEmailError("")
        }
      } else {
        setEmailError("")
      }
    }
  }

  const handleEmailBlur = async () => {
    const email = formData.email
    if (!email) return

    const clientValidation = validateEmail(email)
    if (!clientValidation.valid) return

    setIsValidatingEmail(true)
    setEmailError("")
    try {
      const result = await validateEmailDomain(email)
      if (!result.valid) {
        setEmailError(result.error || "Invalid email domain")
        setEmailDomainValid(false)
      } else {
        setEmailDomainValid(true)
        setEmailError("")
      }
    } catch {
      setEmailDomainValid(true)
    } finally {
      setIsValidatingEmail(false)
    }
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.length <= MAX_FIRST_NAME) {
      setFormData({ ...formData, firstName: val })
      if (val && val.trim().length < 2) {
        setFirstNameError("First name must be at least 2 characters")
      } else {
        setFirstNameError("")
      }
    }
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.length <= MAX_LAST_NAME) {
      setFormData({ ...formData, lastName: val })
      if (val && val.trim().length < 2) {
        setLastNameError("Last name must be at least 2 characters")
      } else {
        setLastNameError("")
      }
    }
  }

  const handlePriorityChange = (value: string) => {
    setFormData({ ...formData, priority: value })
    setPriorityError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)
    setCompanyError("")
    setPhoneError("")
    setPriorityError("")

    // Name validation
    if (formData.firstName.trim().length < 2) {
      setIsSubmitting(false)
      setFirstNameError("First name must be at least 2 characters")
      return
    }
    if (formData.lastName.trim().length < 2) {
      setIsSubmitting(false)
      setLastNameError("Last name must be at least 2 characters")
      return
    }

    // Email client validation
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) {
      setIsSubmitting(false)
      setEmailError(emailValidation.error || "Invalid email")
      return
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (phoneDigits.length !== 10) {
      setIsSubmitting(false)
      setPhoneError("Phone number must be exactly 10 digits")
      return
    }

    // Priority required
    if (!formData.priority) {
      setIsSubmitting(false)
      setPriorityError("Please select a Priority level")
      return
    }

    // DNS domain validation
    setIsValidatingEmail(true)
    const domainResult = await validateEmailDomain(formData.email)
    setIsValidatingEmail(false)
    if (!domainResult.valid) {
      setIsSubmitting(false)
      setEmailError(domainResult.error || "Invalid email domain")
      return
    }

    const result = await submitSupportTicket(formData)

    if (result.success) {
      setSubmitMessage({
        type: "success",
        text: "Thank you! Your support ticket has been submitted successfully. Our team will respond within 24 hours. A confirmation email has been sent to your inbox.",
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
      setEmailError("")
      setEmailDomainValid(null)
      setFirstNameError("")
      setLastNameError("")
    } else {
      if (result.error === "company_not_found") {
        setCompanyError(
          result.message ||
            "We couldn't find an active service contract associated with your information.",
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Support Center" }]} className="mb-8" />
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ARDENT PRIME Support Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {"We're here to help! Submit a ticket, find answers to common questions, or get in touch with our support team."}
          </p>
        </div>
      </section>

      {/* Support Ticket Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Submit a Support Ticket</h2>
            <p className="text-muted-foreground mb-8">{"Fill out the form below and we'll get back to you shortly."}</p>

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
                    onChange={handleFirstNameChange}
                    required
                    maxLength={MAX_FIRST_NAME}
                    className="mt-2"
                  />
                  {firstNameError && <p className="text-sm text-red-500 mt-1">{firstNameError}</p>}
                </div>

                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleLastNameChange}
                    required
                    maxLength={MAX_LAST_NAME}
                    className="mt-2"
                  />
                  {lastNameError && <p className="text-sm text-red-500 mt-1">{lastNameError}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                    {isValidatingEmail && (
                      <span className="text-muted-foreground text-xs ml-2 inline-flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Validating domain...
                      </span>
                    )}
                    {emailDomainValid === true && !isValidatingEmail && !emailError && formData.email && (
                      <span className="text-green-600 text-xs ml-2">Domain verified</span>
                    )}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    required
                    maxLength={MAX_EMAIL}
                    className="mt-2"
                  />
                  {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
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
                    <span className={`text-xs ml-2 ${formData.subject.length >= MAX_SUBJECT ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
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
                    onValueChange={handlePriorityChange}
                    required
                  >
                    <SelectTrigger className={`mt-2 w-full ${priorityError ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General inquiry</SelectItem>
                      <SelectItem value="medium">Medium - Non-urgent issue</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                      <SelectItem value="critical">Critical - System down</SelectItem>
                    </SelectContent>
                  </Select>
                  {priorityError && <p className="text-sm text-red-500 mt-1">{priorityError}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                  <span className={`text-xs ml-2 ${formData.message.length >= MAX_MESSAGE ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
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

              <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting || isValidatingEmail}>
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Ticket"
                )}
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

          {/* Inject FAQ Schema for search results */}
          <FAQSchema faqs={faqs} />

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
            <Button size="lg" onClick={() => router.push("/contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
