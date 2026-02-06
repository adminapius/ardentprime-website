"use server"

import { promises as dns } from "dns"

export async function validateEmailDomain(email: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const [, domain] = email.split("@")
    if (!domain) {
      return { valid: false, error: "Invalid email format" }
    }

    const domainLower = domain.toLowerCase()

    // Try MX record lookup first
    try {
      const mxRecords = await dns.resolveMx(domainLower)
      if (mxRecords && mxRecords.length > 0) {
        return { valid: true }
      }
    } catch {
      // MX lookup failed, try A record as fallback
    }

    // Fallback: try A record lookup (some domains accept email without MX records)
    try {
      const aRecords = await dns.resolve4(domainLower)
      if (aRecords && aRecords.length > 0) {
        return { valid: true }
      }
    } catch {
      // A record lookup also failed
    }

    return {
      valid: false,
      error: "This email domain does not appear to exist. Please enter a valid email address.",
    }
  } catch {
    // If DNS lookup fails entirely, allow it through (don't block legitimate users)
    return { valid: true }
  }
}
