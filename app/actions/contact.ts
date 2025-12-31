"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { validateEmail } from "@/lib/email-validator"

const MAX_FULL_NAME = 100
const MAX_EMAIL = 100
const MAX_PHONE = 20
const MAX_COMPANY = 100
const MAX_MESSAGE = 1000

export async function submitContactForm(formData: {
  fullName: string
  email: string
  phone?: string
  company?: string
  serviceInterest?: string
  message: string
}) {
  try {
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

    if (!formData.fullName.trim().includes(" ")) {
      return { success: false, error: "Please enter both first and last name" }
    }

    const validation = validateEmail(formData.email)
    if (!validation.valid) {
      return { success: false, error: validation.error || "Invalid email address" }
    }

    if (formData.phone) {
      const phoneDigits = formData.phone.replace(/\D/g, "")
      if (phoneDigits.length !== 10) {
        return { success: false, error: "Phone number must be exactly 10 digits" }
      }
    } else {
      return { success: false, error: "Phone number is required" }
    }

    const supabase = createAdminClient()

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
        isDuplicate: true, // Added flag to identify duplicate submissions for form clearing
      }
    }

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone || null,
      company: formData.company || null,
      service_interest: formData.serviceInterest || null,
      message: formData.message,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}
