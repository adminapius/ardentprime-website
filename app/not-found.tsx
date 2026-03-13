import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  description: "The page you are looking for doesn't exist or has been moved. Return to Ardent Prime Innovations homepage for IT solutions and services.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved. Let us help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/?scrollTo=contact">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-8">
          Looking for something specific? Visit our{" "}
          <Link href="/?scrollTo=partners" className="text-primary hover:underline">
            Partners
          </Link>
          ,{" "}
          <Link href="/?scrollTo=whatwedo" className="text-primary hover:underline">
            Services
          </Link>
          , or{" "}
          <Link href="/support-center" className="text-primary hover:underline">
            Support Center
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
