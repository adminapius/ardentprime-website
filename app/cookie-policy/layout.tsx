import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about how Ardent Prime Innovations uses cookies and tracking technologies on our website.",
  keywords: ["cookie policy", "cookies", "tracking", "analytics", "user preferences"],
  openGraph: {
    title: "Cookie Policy - Ardent Prime Innovations LLC",
    description: "Our cookie policy and tracking information.",
    url: "https://ardentprime.com/cookie-policy",
    type: "website",
  },
  alternates: {
    canonical: "https://ardentprime.com/cookie-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
