"use server"

import { headers } from "next/headers"
import { createAdminClient } from "@/lib/supabase/admin"

function getClientIP(): string {
  const headersList = headers()
  const forwarded = headersList.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  const realIp = headersList.get("x-real-ip")
  if (realIp) return realIp
  return "unknown"
}

// Check rate limit: max 2 submissions per IP per calendar day
// Also checks for duplicate: same service interest + message on the same day
export async function checkContactRateLimit(
  serviceInterest: string,
  message: string,
): Promise<{ allowed: boolean; error?: string }> {
  try {
    const ip = getClientIP()
    const supabase = createAdminClient()

    // Get start of today (UTC)
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const todayISO = today.toISOString()

    // Count submissions from this IP today
    const { count, error: countError } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayISO)
      .eq("ip_address", ip)

    if (countError) {
      console.error("Rate limit check error:", countError)
      // Allow through if check fails
      return { allowed: true }
    }

    if (count !== null && count >= 2) {
      return {
        allowed: false,
        error:
          "You have reached the maximum of 2 submissions per day. Please try again tomorrow, or email us directly at info@ardentprime.com.",
      }
    }

    // Check for duplicate: same service interest AND similar message today
    const { data: duplicates, error: dupError } = await supabase
      .from("contact_submissions")
      .select("service_interest, message")
      .gte("created_at", todayISO)
      .eq("ip_address", ip)
      .eq("service_interest", serviceInterest)

    if (!dupError && duplicates && duplicates.length > 0) {
      // Check if message is very similar (exact match)
      const isDuplicate = duplicates.some(
        (sub) => sub.message && sub.message.trim().toLowerCase() === message.trim().toLowerCase(),
      )
      if (isDuplicate) {
        return {
          allowed: false,
          error:
            "You have already submitted an identical inquiry today. If you need further assistance, please email info@ardentprime.com or call us directly.",
        }
      }
    }

    return { allowed: true }
  } catch (error) {
    console.error("Rate limit check failed:", error)
    return { allowed: true }
  }
}

// Get client IP for storing with submissions
export async function getSubmissionIP(): Promise<string> {
  return getClientIP()
}

// Support tickets previously had no rate limiting at all, unlike the contact
// form. Each submission also triggers a DNS lookup and two outbound emails,
// so an unthrottled endpoint is both a spam vector and a way to run up
// email/DNS API usage. Cap at 3 tickets per IP per day.
export async function checkSupportRateLimit(): Promise<{ allowed: boolean; error?: string }> {
  try {
    const ip = getClientIP()
    const supabase = createAdminClient()

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const { count, error } = await supabase
      .from("support_tickets")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString())
      .eq("ip_address", ip)

    if (error) {
      console.error("Support rate limit check error:", error)
      return { allowed: true }
    }

    if (count !== null && count >= 3) {
      return {
        allowed: false,
        error:
          "You have reached the maximum of 3 support tickets per day. For urgent issues, please call us directly.",
      }
    }

    return { allowed: true }
  } catch (error) {
    console.error("Support rate limit check failed:", error)
    return { allowed: true }
  }
}
