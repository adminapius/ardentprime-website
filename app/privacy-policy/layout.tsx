import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Ardent Prime Innovations protects your data and privacy. Read our comprehensive privacy policy.",
  keywords: ["privacy policy", "data protection", "GDPR", "privacy", "personal data"],
  openGraph: {
    title: "Privacy Policy - Ardent Prime Innovations LLC",
    description: "Our privacy policy and data protection commitment.",
    url: "https://ardentprime.com/privacy-policy",
    type: "website",
  },
  alternates: {
    canonical: "https://ardentprime.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
