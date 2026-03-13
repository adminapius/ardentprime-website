import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support Center - Contract Customer Support",
  description: "Access our support center for contract customers. Submit support tickets, get technical assistance, and manage your IT infrastructure with Ardent Prime Innovations.",
  keywords: ["support center", "technical support", "support tickets", "IT support", "customer support", "contract customers", "FAQ", "troubleshooting"],
  openGraph: {
    title: "Support Center - Ardent Prime Innovations LLC",
    description: "Contract customer support center. Submit tickets and get technical assistance.",
    url: "https://ardentprime.com/support-center",
    type: "website",
  },
  alternates: {
    canonical: "https://ardentprime.com/support-center",
  },
}

export default function SupportCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
