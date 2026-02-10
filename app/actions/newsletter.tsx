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
        from: "ARDENT PRIME <info@ardentprime.com>",
        to: [email],
        subject: "Welcome to ARDENT PRIME \u2013 You\u2019re officially on the list \uD83D\uDEE1\uFE0F - You\u2019re on our radar now \u2014 updates, insights & innovations coming your way.",
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Arial, sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 32px 16px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

                    <!-- Header Banner -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a2f 50%, #0f172a 100%); padding: 40px 32px 32px; border-radius: 12px 12px 0 0; text-align: center;">
                        <div style="font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: 2px; margin-bottom: 8px;">ARDENT PRIME</div>
                        <div style="font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 3px;">Innovations LLC</div>
                        <div style="width: 60px; height: 3px; background-color: #22c55e; margin: 20px auto 0;"></div>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="background-color: #ffffff; padding: 40px 36px;">
                        <p style="font-size: 17px; color: #1e293b; margin: 0 0 20px;">Hi ${username},</p>
                        <p style="font-size: 16px; color: #334155; line-height: 1.7; margin: 0 0 24px;">Thanks for subscribing to <strong style="color: #0f172a;">ARDENT PRIME INNOVATIONS LLC</strong>.</p>

                        <p style="font-size: 15px; color: #475569; margin: 0 0 16px;">We'll keep you updated on:</p>
                        <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 28px 8px;">
                          <tr><td style="padding: 6px 0; font-size: 15px; color: #334155;">\uD83D\uDCA1 &nbsp;New product launches & innovations</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 15px; color: #334155;">\uD83D\uDEE0\uFE0F &nbsp;Platform upgrades, security improvements, and engineering insights</td></tr>
                          <tr><td style="padding: 6px 0; font-size: 15px; color: #334155;">\uD83D\uDCE2 &nbsp;Industry highlights, company news, and special announcements</td></tr>
                        </table>

                        <!-- Divider -->
                        <div style="border-top: 1px solid #e2e8f0; margin: 24px 0;"></div>

                        <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 24px;">No fluff. No spam. Just the good stuff, delivered straight to your inbox.</p>
                        <p style="font-size: 14px; color: #64748b; line-height: 1.7; margin: 0 0 28px;">Want to manage your preferences or unsubscribe? You'll always find the link in our footer.</p>

                        <!-- Divider -->
                        <div style="border-top: 1px solid #e2e8f0; margin: 24px 0;"></div>

                        <p style="font-size: 16px; color: #1e293b; margin: 0 0 4px;">Welcome aboard,</p>
                        <p style="font-size: 15px; margin: 0 0 4px;"><strong style="color: #0f172a;">The ARDENT PRIME Team</strong></p>
                        <a href="mailto:info@ardentprime.com" style="font-size: 14px; color: #22c55e; text-decoration: none;">info@ardentprime.com</a>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #0f172a; padding: 24px 36px; border-radius: 0 0 12px 12px; text-align: center;">
                        <p style="font-size: 12px; color: #64748b; margin: 0 0 8px;">Ardent Prime Innovations LLC | Sacramento, CA</p>
                        <a href="https://www.ardentprime.com" style="font-size: 12px; color: #22c55e; text-decoration: none;">www.ardentprime.com</a>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
