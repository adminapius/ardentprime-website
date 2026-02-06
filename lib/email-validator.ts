// Disposable/temporary email domains to block
const DISPOSABLE_DOMAINS = [
  "guerrillamail.com",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "mailinator.com",
  "tempmail.com",
  "throwaway.email",
  "temp-mail.org",
  "10minutemail.com",
  "trashmail.com",
  "trashmail.me",
  "yopmail.com",
  "yopmail.fr",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "dispostable.com",
  "mailnesia.com",
  "maildrop.cc",
  "discard.email",
  "fakeinbox.com",
  "tempail.com",
  "tempr.email",
  "mohmal.com",
  "burnermail.io",
  "mailsac.com",
  "harakirimail.com",
  "getairmail.com",
  "crazymailing.com",
  "trbvm.com",
  "mailforspam.com",
  "mytemp.email",
  "getnada.com",
  "emailondeck.com",
  "mintemail.com",
]

// Client-side validation (format + disposable check + typo suggestions)
export function validateEmail(email: string): { valid: boolean; error?: string; suggestion?: string } {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" }
  }

  const [, domain] = email.split("@")
  const domainLower = domain.toLowerCase()

  // Block disposable email domains
  if (DISPOSABLE_DOMAINS.includes(domainLower)) {
    return { valid: false, error: "Disposable/temporary email addresses are not allowed. Please use a permanent email." }
  }

  // Common domain typo suggestions
  const commonDomains = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "proton.me",
    "zoho.com",
    "mail.com",
    "live.com",
    "msn.com",
    "me.com",
    "mac.com",
    "googlemail.com",
  ]

  function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = []
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i]
    for (let j = 0; j <= str1.length; j++) matrix[0]![j] = j
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i]![j] = matrix[i - 1]![j - 1]!
        } else {
          matrix[i]![j] = Math.min(
            matrix[i - 1]![j - 1]! + 1,
            matrix[i]![j - 1]! + 1,
            matrix[i - 1]![j]! + 1,
          )
        }
      }
    }
    return matrix[str2.length]![str1.length]!
  }

  // Check for typos in common domains
  let closestMatch = ""
  let minDistance = Number.POSITIVE_INFINITY
  for (const validDomain of commonDomains) {
    const distance = levenshteinDistance(domainLower, validDomain)
    if (distance < minDistance) {
      minDistance = distance
      closestMatch = validDomain
    }
  }

  if (minDistance > 0 && minDistance <= 2 && closestMatch) {
    return {
      valid: false,
      error: `Did you mean @${closestMatch}?`,
      suggestion: closestMatch,
    }
  }

  // Format is valid, domain is not disposable, no typos detected
  return { valid: true }
}

// Full name validation: requires first + last, each part min 2 chars
export function validateFullName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: "Full name is required" }
  }

  const parts = trimmed.split(/\s+/)

  if (parts.length < 2) {
    return { valid: false, error: "Please enter both first and last name" }
  }

  for (const part of parts) {
    if (part.length < 2) {
      return { valid: false, error: "Each name must be at least 2 characters (e.g., 'Li Bo' is valid, 'A A' is not)" }
    }
  }

  return { valid: true }
}
