"use server"

export async function validateEmailDomain(
  email: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    const [, domain] = email.split("@")
    if (!domain) {
      return { valid: false, error: "Invalid email format" }
    }

    const domainLower = domain.toLowerCase()

    // Use Google DNS-over-HTTPS API to check MX records
    try {
      const mxResponse = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domainLower)}&type=MX`,
        { signal: AbortSignal.timeout(5000) }
      )
      if (mxResponse.ok) {
        const mxData = await mxResponse.json()
        // Status 0 = NOERROR, Answer array contains records
        if (mxData.Status === 0 && mxData.Answer && mxData.Answer.length > 0) {
          return { valid: true }
        }
      }
    } catch {
      // MX lookup failed, try A record as fallback
    }

    // Fallback: check A record (some domains accept email without MX records)
    try {
      const aResponse = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domainLower)}&type=A`,
        { signal: AbortSignal.timeout(5000) }
      )
      if (aResponse.ok) {
        const aData = await aResponse.json()
        if (aData.Status === 0 && aData.Answer && aData.Answer.length > 0) {
          return { valid: true }
        }
      }
    } catch {
      // A record lookup also failed
    }

    return {
      valid: false,
      error:
        "This email domain does not appear to exist. Please enter a valid email address.",
    }
  } catch {
    // If DNS lookup fails entirely, allow it through (don't block legitimate users)
    return { valid: true }
  }
}
