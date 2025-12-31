"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { validateEmail } from "@/lib/email-validator"

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

    return { success: true }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return { success: false, error: "Failed to subscribe" }
  }
}
