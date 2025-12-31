"use server"

import { createAdminClient } from "@/lib/supabase/admin"

const MAX_COMPANY_NAME = 100
const MAX_FIRST_NAME = 50
const MAX_LAST_NAME = 50
const MAX_EMAIL = 100
const MAX_SUBJECT = 200
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
          "We could not find your company in our active contract records. Support tickets are available only for clients with active service contracts. Please contact sales@ardentprime.com to inquire about our services.",
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

    // TODO: Send email notification to support@ardentprime.com
    // This will require email service integration (e.g., Resend, SendGrid)

    return { success: true }
  } catch (error) {
    console.error("Error submitting support ticket:", error)
    return { success: false, error: "Failed to submit support ticket. Please try again." }
  }
}
