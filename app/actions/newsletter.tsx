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
    const username = email.split("@")[0]
    try {
      await sendEmail({
        from: "ARDENT PRIME <no-reply@ardentprime.com>",
        to: [email],
        subject: "Welcome to ARDENT PRIME \u2013 You\u2019re officially on the list \uD83D\uDEE1\uFE0F - You\u2019re on our radar now \u2014 updates, insights & innovations coming your way.",
        html: `<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 600px;">
<p>Hi ${username},</p>

<p>Thanks for subscribing to <strong><span style="background-color: #fff3a8;">ARDENT PRIME</span> INNOVATIONS LLC</strong>.</p>

<p>We'll keep you updated on:</p>

<ul style="padding-left: 20px; margin: 12px 0;">
  <li style="margin-bottom: 6px;">\uD83D\uDCA1 New product launches &amp; innovations</li>
  <li style="margin-bottom: 6px;">\uD83D\uDEE0\uFE0F Platform upgrades, security improvements, and engineering insights</li>
  <li style="margin-bottom: 6px;">\uD83D\uDCE2 Industry highlights, company news, and special announcements</li>
</ul>

<p>No fluff. No spam. Just the good stuff, delivered straight to your inbox.</p>

<p>Want to manage your preferences or unsubscribe? You'll always find the link in our footer.</p>

<br/>
<p>Welcome aboard,</p>
<p><strong>The <span style="background-color: #fff3a8;">ARDENT PRIME</span> Team</strong><br/>
<a href="mailto:info@ardentprime.com" style="color: #1a73e8;">info@ardentprime.com</a></p>
</div>`,
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
