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

const MAX_EMAIL = 100

export async function subscribeToNewsletter(email: string) {
  try {
    if (email.length > MAX_EMAIL) {
      return { success: false, error: `Email must not exceed ${MAX_EMAIL} characters` }
    }

    const validation = validateEmail(email)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // DNS domain validation
    const domainValidation = await validateEmailDomain(email)
    if (!domainValidation.valid) {
      return { success: false, error: domainValidation.error || "Invalid email domain" }
    }

    const supabase = createAdminClient()

    const { data: existing, error: checkError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .maybeSingle()

    if (existing) {
      return { success: false, error: "Email already subscribed" }
    }

    const { data, error } = await supabase.from("newsletter_subscribers").insert({ email }).select()

    if (error) {
      // Handle duplicate key error in case of race condition
      if (error.code === "23505") {
        return { success: false, error: "Email already subscribed" }
      }
      return { success: false, error: "Failed to subscribe" }
    }

    // Send welcome email
    try {
      await sendEmail({
        from: "Ardent Prime Innovations <no-reply@ardentprime.com>",
        to: [email],
        subject: "Welcome to Ardent Prime Newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0a0a0a; border-bottom: 2px solid #c8102e; padding-bottom: 10px;">Welcome to Ardent Prime Innovations!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll receive the latest updates on:</p>
            <ul>
              <li>Technology insights and trends</li>
              <li>Cybersecurity advisories</li>
              <li>Product announcements from our partners</li>
              <li>IT best practices and tips</li>
            </ul>
            <p>Stay tuned for our next update!</p>
            <p style="margin-top: 24px;">Best regards,<br/>The Ardent Prime Innovations Team</p>
            <p style="margin-top: 16px; font-size: 12px; color: #999;">Ardent Prime Innovations LLC | Sacramento, CA</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
    }

    return { success: true }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return { success: false, error: "Failed to subscribe" }
  }
}
