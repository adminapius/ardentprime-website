"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"
import { validateEmail, validateFullName } from "@/lib/email-validator"
import { validateEmailDomain } from "@/app/actions/validate-email-domain"
import type { Metadata } from "next"

// Note: Metadata must be exported in a server component file
// This component is client-side, but metadata export works here

const MAX_FULL_NAME = 100
const MAX_EMAIL = 100
const MAX_COMPANY = 100
const MAX_PHONE = 20
const MESSAGE_CHAR_LIMIT = 500

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isValidatingEmail, setIsValidatingEmail] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailDomainValid, setEmailDomainValid] = useState<boolean | null>(null)
  const [fullNameError, setFullNameError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [serviceError, setServiceError] = useState<string | null>(null)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setFormData({ ...formData, email })
    setEmailDomainValid(null)

    if (email) {
      const validation = validateEmail(email)
      if (!validation.valid) {
        setEmailError(validation.error || "Invalid email")
      } else {
        setEmailError(null)
      }
    } else {
      setEmailError(null)
    }
  }

  const handleEmailBlur = async () => {
    const email = formData.email
    if (!email) return

    const clientValidation = validateEmail(email)
    if (!clientValidation.valid) return

    // DNS MX record check
    setIsValidatingEmail(true)
    setEmailError(null)
    try {
      const result = await validateEmailDomain(email)
      if (!result.valid) {
        setEmailError(result.error || "Invalid email domain")
        setEmailDomainValid(false)
      } else {
        setEmailDomainValid(true)
        setEmailError(null)
      }
    } catch {
      setEmailDomainValid(true)
    } finally {
      setIsValidatingEmail(false)
    }
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value
    if (fullName.length <= MAX_FULL_NAME) {
      setFormData({ ...formData, fullName })

      if (fullName) {
        const nameValidation = validateFullName(fullName)
        if (!nameValidation.valid) {
          setFullNameError(nameValidation.error || "Invalid name")
        } else {
          setFullNameError(null)
        }
      } else {
        setFullNameError(null)
      }
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value
    if (message.length <= MESSAGE_CHAR_LIMIT) {
      setFormData({ ...formData, message })
    }
  }

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
        setPhoneError(null)
      }
    }
  }

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value })
    setServiceError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus(null)
    setServiceError(null)

    // Name validation
    const nameValidation = validateFullName(formData.fullName)
    if (!nameValidation.valid) {
      setIsLoading(false)
      setFullNameError(nameValidation.error || "Invalid name")
      setSubmitStatus({ type: "error", message: nameValidation.error || "Please enter a valid full name" })
      return
    }

    // Email client validation
    const validation = validateEmail(formData.email)
    if (!validation.valid) {
      setIsLoading(false)
      setEmailError(validation.error || "Invalid email")
      setSubmitStatus({ type: "error", message: validation.error || "Please enter a valid email address" })
      return
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (phoneDigits.length !== 10) {
      setIsLoading(false)
      setPhoneError("Phone number must be exactly 10 digits")
      setSubmitStatus({ type: "error", message: "Please enter a valid 10-digit phone number" })
      return
    }

    // Service Interest validation
    if (!formData.service) {
      setIsLoading(false)
      setServiceError("Please select a Service Interest")
      setSubmitStatus({ type: "error", message: "Please select a Service Interest" })
      return
    }

    // DNS domain validation with loading state
    setIsValidatingEmail(true)
    const domainResult = await validateEmailDomain(formData.email)
    setIsValidatingEmail(false)
    if (!domainResult.valid) {
      setIsLoading(false)
      setEmailError(domainResult.error || "Invalid email domain")
      setSubmitStatus({ type: "error", message: domainResult.error || "Email domain does not exist" })
      return
    }

    const result = await submitContactForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      serviceInterest: formData.service,
      message: formData.message,
    })

    setIsLoading(false)

    if (result.success) {
      setSubmitStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully. Please expect Sales Team's communication within 24 hours.",
      })
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
      })
      setEmailError(null)
      setEmailDomainValid(null)
      setFullNameError(null)
      setPhoneError(null)
      setServiceError(null)
    } else {
      setSubmitStatus({ type: "error", message: result.error || "Failed to send message. Please try again." })
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: "Contact Us" }]} className="mb-8" />
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to elevate your business with smart scalable technology? Connect with our team for a free
                consultation and discover how ARDENT PRIME INNOVATIONS can deliver the tools, strategy, and support you
                need to thrive in a digital world.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-6xl mx-auto items-start">
              {/* Contact Information */}
              <div className="flex-1 max-w-lg space-y-8 lg:ml-[50px]">
                <div>
                  <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                        <a href="mailto:info@ardentprime.com" className="text-primary hover:underline text-lg">
                          info@ardentprime.com
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">Send us an email anytime</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                        <a href="tel:+12199992867" className="text-primary hover:underline text-lg">
                          +1 (219) 999-2867
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">For Active Contract Customers</p>
                        <p className="text-sm text-muted-foreground">Emergency Support Available 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                        <p className="text-foreground/80">ARDENT PRIME INNOVATIONS LLC</p>
                        <p className="text-foreground/80">5015 Madison Ave. Suite A -Unit #370</p>
                        <p className="text-foreground/80 mb-2">Sacramento, CA 95841</p>
                        <p className="text-sm text-muted-foreground mt-2">Mailing Address Only</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                        <p className="text-foreground/80">Mon-Fri: 8AM-6PM PST</p>
                        <p className="text-sm text-muted-foreground mt-1">Emergency support 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="flex-1 max-w-lg bg-card p-8 rounded-xl border border-border shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleFullNameChange}
                      required
                      maxLength={MAX_FULL_NAME}
                      className="mt-2"
                    />
                    {fullNameError && <p className="text-sm text-red-500 mt-1">{fullNameError}</p>}
                  </div>

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
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Your Company (Optional)"
                      value={formData.company}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_COMPANY) {
                          setFormData({ ...formData, company: e.target.value })
                        }
                      }}
                      maxLength={MAX_COMPANY}
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
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      maxLength={MAX_PHONE}
                      className="mt-2"
                    />
                    {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                  </div>

                  <div>
                    <Label htmlFor="service">
                      Service Interest <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={handleServiceChange}
                      required
                    >
                      <SelectTrigger className={`mt-2 w-full ${serviceError ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastructure">IT Infrastructure Services</SelectItem>
                        <SelectItem value="installation">Professional Installation & Integration</SelectItem>
                        <SelectItem value="managed">Managed IT & Web Services</SelectItem>
                      </SelectContent>
                    </Select>
                    {serviceError && <p className="text-sm text-red-500 mt-1">{serviceError}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                      <span className={`text-xs ml-2 ${formData.message.length >= MESSAGE_CHAR_LIMIT ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
                        ({formData.message.length}/{MESSAGE_CHAR_LIMIT} characters)
                      </span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements..."
                      value={formData.message}
                      onChange={handleMessageChange}
                      required
                      rows={5}
                      className="mt-2 resize-none overflow-auto"
                    />
                  </div>

                  {submitStatus && (
                    <div
                      className={`p-4 rounded-lg ${submitStatus.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full text-lg" disabled={isLoading || isValidatingEmail}>
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
