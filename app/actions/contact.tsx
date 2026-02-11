"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { validateEmail, validateFullName } from "@/lib/email-validator"
import { validateEmailDomain } from "@/app/actions/validate-email-domain"
import { checkContactRateLimit, getSubmissionIP } from "@/app/actions/rate-limit"

async function sendEmail(params: { from: string; to: string[]; subject: string; html: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Resend API error: ${res.status} ${errorBody}`)
  }
  return res.json()
}

const MAX_FULL_NAME = 100
const MAX_EMAIL = 100
const MAX_PHONE = 20
const MAX_COMPANY = 100
const MAX_MESSAGE = 500

export async function submitContactForm(formData: {
  fullName: string
  email: string
  phone?: string
  company?: string
  serviceInterest?: string
  message: string
}) {
  try {
    // Name validation (min 2 chars per part)
    const nameValidation = validateFullName(formData.fullName)
    if (!nameValidation.valid) {
      return { success: false, error: nameValidation.error || "Invalid name" }
    }

    if (formData.fullName.length > MAX_FULL_NAME) {
      return { success: false, error: `Full name must not exceed ${MAX_FULL_NAME} characters` }
    }
    if (formData.email.length > MAX_EMAIL) {
      return { success: false, error: `Email must not exceed ${MAX_EMAIL} characters` }
    }
    if (formData.company && formData.company.length > MAX_COMPANY) {
      return { success: false, error: `Company name must not exceed ${MAX_COMPANY} characters` }
    }
    if (formData.message.length > MAX_MESSAGE) {
      return { success: false, error: `Message must not exceed ${MAX_MESSAGE} characters` }
    }

    // Service Interest required
    if (!formData.serviceInterest || !formData.serviceInterest.trim()) {
      return { success: false, error: "Please select a Service Interest" }
    }

    // Client-side email validation (format + disposable block)
    const validation = validateEmail(formData.email)
    if (!validation.valid) {
      return { success: false, error: validation.error || "Invalid email address" }
    }

    // Server-side DNS MX record validation
    const domainValidation = await validateEmailDomain(formData.email)
    if (!domainValidation.valid) {
      return { success: false, error: domainValidation.error || "Invalid email domain" }
    }

    // Phone validation
    if (formData.phone) {
      const phoneDigits = formData.phone.replace(/\D/g, "")
      if (phoneDigits.length !== 10) {
        return { success: false, error: "Phone number must be exactly 10 digits" }
      }
    } else {
      return { success: false, error: "Phone number is required" }
    }

    // Rate limiting: 2 per IP per day + duplicate check
    const rateCheck = await checkContactRateLimit(
      formData.serviceInterest || "",
      formData.message,
    )
    if (!rateCheck.allowed) {
      return { success: false, error: rateCheck.error || "Rate limit exceeded" }
    }

    const supabase = createAdminClient()
    const ip = await getSubmissionIP()

    // Check for duplicate within past week (existing logic)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const { data: existingSubmissions, error: checkError } = await supabase
      .from("contact_submissions")
      .select("*")
      .gte("created_at", oneWeekAgo.toISOString())
      .or(`email.eq.${formData.email},phone.eq.${formData.phone},full_name.eq.${formData.fullName}`)

    if (checkError) {
      console.error("Error checking for duplicate submissions:", checkError)
    }

    if (existingSubmissions && existingSubmissions.length > 0) {
      return {
        success: false,
        error:
          "Thank you for your interest! Our records show you recently submitted an inquiry. A member of our Sales Team should contact you within 24 hours of your submission. If you haven't heard from us or need immediate assistance, please email info@ardentprime.com or call us directly.",
        isDuplicate: true,
      }
    }

    // Insert into database with IP address
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone || null,
      company: formData.company || null,
      service_interest: formData.serviceInterest || null,
      message: formData.message,
      ip_address: ip,
    })

    if (error) throw error

    // Send notification email to sales team via Resend
    const serviceLabels: Record<string, string> = {
      infrastructure: "IT Infrastructure Services",
      installation: "Professional Installation & Integration",
      managed: "Managed IT & Web Services",
    }
    const serviceName = serviceLabels[formData.serviceInterest || ""] || formData.serviceInterest || "Not specified"

    try {
      await sendEmail({
        from: "ARDENT PRIME <no-reply@ardentprime.com>",
        to: ["info@ardentprime.com"],
        subject: `[ArdentPrime] New Contact Inquiry - ${serviceName}`,
        html: `<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 600px;">
<p><strong>New contact form submission received:</strong></p>

<table style="border-collapse: collapse; margin: 16px 0;">
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Name:</td><td style="padding: 4px 0;">${formData.fullName}</td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Email:</td><td style="padding: 4px 0;"><a href="mailto:${formData.email}" style="color: #1a73e8;">${formData.email}</a></td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Phone:</td><td style="padding: 4px 0;"><a href="tel:${formData.phone}" style="color: #1a73e8;">${formData.phone}</a></td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Company:</td><td style="padding: 4px 0;">${formData.company || "Not provided"}</td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Service:</td><td style="padding: 4px 0;">${serviceName}</td></tr>
</table>

<p><strong>Message:</strong></p>
<p style="margin: 4px 0 0; padding: 10px; background: #f7f7f7; border-left: 3px solid #1a73e8;">${formData.message}</p>

<br/>
<p style="font-size: 12px; color: #999;">Sent from the Ardent Prime website contact form.</p>
</div>`,
      })
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Don't fail the form submission if email fails
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}
