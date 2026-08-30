"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { VideoEmbed } from "@/components/video-embed"
import { useEffect } from "react"
import Link from "next/link"
import { partnersData } from "./partners-data"


export default function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = partnersData[params.slug]
  const router = useRouter()

  if (!partner) {
    notFound()
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <>
      {/* Video Schema is rendered server-side in layout.tsx with a real CSP nonce */}
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/partners">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Partners
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto">
            {/* Partner Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="w-64 h-32 bg-card rounded-lg border border-border flex items-center justify-center p-6">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-w-[200px] max-h-[80px] w-auto h-auto object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4">{partner.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{partner.description}</p>
                <Button asChild>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Partner Overview</h2>
              {partner.videoUrl ? (
                <>
                  <VideoEmbed url={partner.videoUrl} title={`${partner.name} Overview Video`} />
                  <p className="text-xs text-muted-foreground mt-3 text-center italic">
                    Video content courtesy of {partner.name}. All trademarks belong to their respective owners.
                  </p>
                </>
              ) : (
                <div className="bg-muted/50 rounded-lg border-2 border-dashed border-border p-12 text-center aspect-video flex flex-col items-center justify-center max-w-3xl mx-auto">
                  <p className="text-muted-foreground text-lg">Video content coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check back later for an overview video from {partner.name}
                  </p>
                </div>
              )}
            </div>

            {/* Solutions */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Solutions & Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {partner.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{solution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership Details */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Partnership</h2>
              <div className="bg-card p-8 rounded-lg border border-border">
                <p className="text-lg leading-relaxed text-muted-foreground">{partner.partnership}</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Partnership Benefits</h2>
              <div className="space-y-4">
                {partner.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA - Updated to link to /contact */}
            <div className="mt-12 text-center p-8 bg-primary/10 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Interested in these solutions?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Contact us to learn how we can leverage our partnership with {partner.name} to benefit your business.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
