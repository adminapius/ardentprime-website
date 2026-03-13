import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read our terms of service and conditions. Understand your rights and responsibilities when using Ardent Prime services.",
  keywords: ["terms of service", "terms and conditions", "legal", "user agreement"],
  openGraph: {
    title: "Terms of Service - Ardent Prime Innovations LLC",
    description: "Our terms of service and user agreement.",
    url: "https://ardentprime.com/terms-of-service",
    type: "website",
  },
  alternates: {
    canonical: "https://ardentprime.com/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
