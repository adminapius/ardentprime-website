"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { validateEmail } from "@/lib/email-validator"
import { validateEmailDomain } from "@/app/actions/validate-email-domain"
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

const MAX_COMPANY_NAME = 100
const MAX_FIRST_NAME = 50
const MAX_LAST_NAME = 50
const MAX_EMAIL = 100
const MAX_SUBJECT = 100
const MAX_MESSAGE = 2000

export async function submitSupportTicket(formData: {
  company: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  priority: string
  message: string
}) {
  try {
    if (!formData.company || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      }
    }

    // Character limit validation
    if (formData.company.length > MAX_COMPANY_NAME) {
      return { success: false, error: `Company name must not exceed ${MAX_COMPANY_NAME} characters` }
    }
    if (formData.firstName.length > MAX_FIRST_NAME) {
      return { success: false, error: `First name must not exceed ${MAX_FIRST_NAME} characters` }
    }
    if (formData.lastName.length > MAX_LAST_NAME) {
      return { success: false, error: `Last name must not exceed ${MAX_LAST_NAME} characters` }
    }
    if (formData.email.length > MAX_EMAIL) {
      return { success: false, error: `Email must not exceed ${MAX_EMAIL} characters` }
    }
    if (formData.subject.length > MAX_SUBJECT) {
      return { success: false, error: `Subject must not exceed ${MAX_SUBJECT} characters` }
    }
    if (formData.message.length > MAX_MESSAGE) {
      return { success: false, error: `Message must not exceed ${MAX_MESSAGE} characters` }
    }

    // First name minimum 2 chars
    if (formData.firstName.trim().length < 2) {
      return { success: false, error: "First name must be at least 2 characters" }
    }
    // Last name minimum 2 chars
    if (formData.lastName.trim().length < 2) {
      return { success: false, error: "Last name must be at least 2 characters" }
    }

    // Priority required
    if (!formData.priority || !formData.priority.trim()) {
      return { success: false, error: "Please select a Priority level" }
    }

    // Email validation (format + disposable)
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error || "Invalid email address" }
    }

    // DNS MX record validation
    const domainValidation = await validateEmailDomain(formData.email)
    if (!domainValidation.valid) {
      return { success: false, error: domainValidation.error || "Invalid email domain" }
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (phoneDigits.length !== 10) {
      return { success: false, error: "Phone number must be exactly 10 digits" }
    }

    const supabase = createAdminClient()

    const { data: contractCustomers, error: searchError } = await supabase
      .from("contract_customers")
      .select("customer_id, company_name, status")
      .ilike("company_name", formData.company.trim())
      .eq("status", "active")

    if (searchError) {
      console.error("Error searching contract customers:", searchError)
      return { success: false, error: "Unable to verify company information. Please try again." }
    }

    if (!contractCustomers || contractCustomers.length === 0) {
      return {
        success: false,
        error: "company_not_found",
        message:
          "Company not found. Please enter the full registered company name exactly as it appears in your contract with Ardent Prime.",
      }
    }

    const { error } = await supabase.from("support_tickets").insert({
      company_name: formData.company.trim().toUpperCase(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      priority: formData.priority,
      description: formData.message,
    })

    if (error) throw error

    // Send notification email to support team via Resend
    const priorityLabels: Record<string, string> = {
      low: "Low - General inquiry",
      medium: "Medium - Non-urgent issue",
      high: "High - Urgent issue",
      critical: "Critical - System down",
    }
    const priorityColors: Record<string, string> = {
      low: "#22c55e",
      medium: "#f59e0b",
      high: "#f97316",
      critical: "#ef4444",
    }

    try {
      // Email to support team
      await sendEmail({
        from: "ARDENT PRIME (No-Reply) <no-reply@ardentprime.com>",
        to: ["support@ardentprime.com"],
        subject: `[ArdentPrime Support] [${formData.priority.toUpperCase()}] ${formData.subject}`,
        html: `<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 600px;">
<p><strong>New support ticket received:</strong></p>

<table style="border-collapse: collapse; margin: 16px 0;">
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Priority:</td><td style="padding: 4px 0;"><span style="color: ${priorityColors[formData.priority] || "#555"}; font-weight: bold;">${priorityLabels[formData.priority] || formData.priority}</span></td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Subject:</td><td style="padding: 4px 0;">${formData.subject}</td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Company:</td><td style="padding: 4px 0;">${formData.company}</td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Name:</td><td style="padding: 4px 0;">${formData.firstName} ${formData.lastName}</td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Email:</td><td style="padding: 4px 0;"><a href="mailto:${formData.email}" style="color: #1a73e8;">${formData.email}</a></td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Phone:</td><td style="padding: 4px 0;"><a href="tel:${formData.phone}" style="color: #1a73e8;">${formData.phone}</a></td></tr>
</table>

<p><strong>Message:</strong></p>
<p style="margin: 4px 0 0; padding: 10px; background: #f7f7f7; border-left: 3px solid ${priorityColors[formData.priority] || "#1a73e8"};">${formData.message}</p>

<br/>
<p style="font-size: 12px; color: #999;">Submitted from the Ardent Prime Support Center.</p>
</div>`,
      })

      // Confirmation email to the client
      await sendEmail({
        from: "ARDENT PRIME (No-Reply) <no-reply@ardentprime.com>",
        to: [formData.email],
        subject: `Support Ticket Received - ${formData.subject}`,
        html: `<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 600px;">
<p>Hi ${formData.firstName},</p>

<p>Thank you for contacting <strong><span style="background-color: #fff3a8;">ARDENT PRIME</span></strong> support. We have received your ticket and our team will respond within 24 hours.</p>

<p><strong>Your ticket details:</strong></p>
<table style="border-collapse: collapse; margin: 8px 0 16px;">
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Subject:</td><td style="padding: 4px 0;">${formData.subject}</td></tr>
  <tr><td style="padding: 4px 16px 4px 0; font-weight: bold; color: #555; vertical-align: top;">Priority:</td><td style="padding: 4px 0;">${priorityLabels[formData.priority] || formData.priority}</td></tr>
</table>

<p><strong>Your message:</strong></p>
<p style="margin: 4px 0 0; padding: 10px; background: #f7f7f7; border-left: 3px solid #1a73e8;">${formData.message}</p>

<p style="margin-top: 20px;">For urgent matters, you can also reach us at:<br/>
Phone: +1 (219) 999-2867</p>

<br/>
<p>The <strong><span style="background-color: #fff3a8;">ARDENT PRIME</span> Support Team</strong><br/>
<a href="https://www.ardentprime.com/support-center" style="color: #1a73e8;">www.ardentprime.com/support-center</a></p>

<p style="font-size: 12px; color: #999;">This is an automated confirmation. Please do not reply to this email.</p>
</div>`,
      })
    } catch (emailError) {
      console.error("Failed to send support emails:", emailError)
      // Don't fail the ticket submission if email fails
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting support ticket:", error)
    return { success: false, error: "Failed to submit support ticket. Please try again." }
  }
}
