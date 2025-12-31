export function validateEmail(email: string): { valid: boolean; error?: string; suggestion?: string } {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" }
  }

  const [, domain] = email.split("@")
  const domainLower = domain.toLowerCase()

  const validDomains = [
    // Major providers
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
    "yandex.com",
    "gmx.com",
    "live.com",
    "msn.com",
    "me.com",
    "mac.com",
    // Regional Yahoo domains
    "yahoo.co.uk",
    "yahoo.ca",
    "yahoo.com.au",
    "yahoo.co.in",
    // Regional Gmail/Google domains
    "googlemail.com",
    // Regional Outlook/Hotmail domains
    "outlook.co.uk",
    "outlook.ca",
    "outlook.com.au",
    "hotmail.co.uk",
    "hotmail.fr",
    "hotmail.de",
    // Business email providers
    "fastmail.com",
    "tutanota.com",
    "hushmail.com",
    "runbox.com",
    // Corporate domains (can be expanded)
    "ardentprime.com",
  ]

  function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0]![j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i]![j] = matrix[i - 1]![j - 1]!
        } else {
          matrix[i]![j] = Math.min(
            matrix[i - 1]![j - 1]! + 1, // substitution
            matrix[i]![j - 1]! + 1, // insertion
            matrix[i - 1]![j]! + 1, // deletion
          )
        }
      }
    }

    return matrix[str2.length]![str1.length]!
  }

  if (validDomains.includes(domainLower)) {
    return { valid: true }
  }

  let closestMatch = ""
  let minDistance = Number.POSITIVE_INFINITY

  for (const validDomain of validDomains) {
    const distance = levenshteinDistance(domainLower, validDomain)
    if (distance < minDistance) {
      minDistance = distance
      closestMatch = validDomain
    }
  }

  if (minDistance <= 2 && closestMatch) {
    return {
      valid: false,
      error: `Invalid domain. Did you mean @${closestMatch}?`,
      suggestion: closestMatch,
    }
  }

  return {
    valid: false,
    error: "Please use a recognized email provider (Gmail, Outlook, Yahoo, etc.)",
  }
}
