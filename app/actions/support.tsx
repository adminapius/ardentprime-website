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
      .ilike("company_name", `%${formData.company}%`)
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
          "We couldn't find an active service contract associated with your information. Support tickets are exclusively available for clients with active service agreements. Interested in our services? Contact our sales team at sales@ardentprime.com - we'd love to help you get started!",
      }
    }

    const { error } = await supabase.from("support_tickets").insert({
      company_name: formData.company,
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
        from: "Ardent Prime Support <no-reply@ardentprime.com>",
        to: ["support@ardentprime.com"],
        subject: `[${formData.priority.toUpperCase()}] Support Ticket: ${formData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0a0a0a; border-bottom: 2px solid #c8102e; padding-bottom: 10px;">New Support Ticket</h2>
            <div style="display: inline-block; padding: 4px 12px; border-radius: 4px; background: ${priorityColors[formData.priority] || "#999"}; color: white; font-weight: bold; font-size: 14px; margin-bottom: 16px;">
              ${priorityLabels[formData.priority] || formData.priority}
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${formData.company}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${formData.firstName} ${formData.lastName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${formData.phone}">${formData.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px 0;">${formData.subject}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
              <p style="font-weight: bold; color: #555; margin: 0 0 8px 0;">Description:</p>
              <p style="margin: 0; color: #333;">${formData.message}</p>
            </div>
            <p style="margin-top: 16px; font-size: 12px; color: #999;">This ticket was submitted from the Ardent Prime Support Center.</p>
          </div>
        `,
      })

      // Confirmation email to the client
      await sendEmail({
        from: "Ardent Prime Support <no-reply@ardentprime.com>",
        to: [formData.email],
        subject: `Support Ticket Received - ${formData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0a0a0a; border-bottom: 2px solid #c8102e; padding-bottom: 10px;">Support Ticket Confirmation</h2>
            <p>Dear ${formData.firstName},</p>
            <p>Thank you for contacting Ardent Prime Innovations support. We have received your ticket and our team will respond within 24 hours.</p>
            <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
              <p style="margin: 0 0 4px 0;"><strong>Subject:</strong> ${formData.subject}</p>
              <p style="margin: 0 0 4px 0;"><strong>Priority:</strong> ${priorityLabels[formData.priority] || formData.priority}</p>
              <p style="margin: 0;"><strong>Company:</strong> ${formData.company}</p>
            </div>
            <p style="margin-top: 16px;">For urgent matters, you can also reach us at:</p>
            <ul>
              <li>Phone: +1 (219) 999-2867</li>
              <li>Email: support@ardentprime.com</li>
            </ul>
            <p style="margin-top: 16px; font-size: 12px; color: #999;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        `,
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
