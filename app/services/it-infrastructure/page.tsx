import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceSchema } from "@/components/structured-data"
import { headers } from "next/headers"
import { Network, RotateCcw, Video, Radio, Lock, Zap, Settings, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IT Infrastructure Services | Ardent Prime Innovations LLC",
  description:
    "Enterprise-grade IT infrastructure services including network systems, CCTV, audio systems, access control, and power management. Custom solutions for your business.",
  keywords: "IT infrastructure, network systems, CCTV, access control, power management, UPS, enterprise IT",
}

const services = [
  {
    icon: RotateCcw,
    title: "Technology Refresh & Lifecycle Modernization",
    description:
      "Keep your systems current with planned hardware and software upgrades that minimize disruption and maximize ROI.",
  },
  {
    icon: Video,
    title: "Network CCTV Systems",
    description:
      "Advanced IP-based video surveillance solutions with high-definition cameras and intelligent analytics.",
  },
  {
    icon: Radio,
    title: "Network Audio Systems",
    description: "Professional audio distribution systems for paging, background music, and emergency notifications.",
  },
  {
    icon: Lock,
    title: "Network Physical Access Control System",
    description: "Secure access management with card readers, biometrics, and centralized administration.",
  },
  {
    icon: Zap,
    title: "Power Management Systems & UPS",
    description: "Reliable power protection and management to keep your critical systems running during outages.",
  },
  {
    icon: Settings,
    title: "Custom Infrastructure Solutions",
    description: "Tailored infrastructure designs that address your unique business requirements and growth plans.",
  },
]

export default async function ITInfrastructurePage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined
  return (
    <>
      <ServiceSchema
        name="IT Infrastructure Services"
        description="Enterprise-grade IT infrastructure services including network systems, CCTV, audio systems, access control, and power management. Custom solutions for your business."
        url="https://ardentprime.com/services/it-infrastructure"
        nonce={nonce}
      />
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Network className="h-10 w-10 text-primary-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">IT Infrastructure Services</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Enterprise-grade network infrastructure and security systems tailored to your business needs. We
                  design, implement, and maintain robust IT foundations that power your success.
                </p>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/modern-data-center-server-racks-with-blue-lighting.jpg"
                  alt="IT Infrastructure"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Infrastructure Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Infrastructure Services?</h2>
              <div className="space-y-4">
                {[
                  "Scalable solutions that grow with your business",
                  "24/7 monitoring and support available",
                  "Industry-leading security standards",
                  "Certified technicians and engineers",
                  "Competitive pricing with transparent costs",
                  "Proven track record of successful implementations",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Upgrade Your Infrastructure?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Contact us today for a free assessment of your current infrastructure and discover how we can help you
              build a more reliable, secure, and efficient IT foundation.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">
                Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
