import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceSchema } from "@/components/structured-data"
import {
  Headset,
  MonitorCheck,
  AlertCircle,
  Radio,
  Globe,
  Laptop,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Managed IT & Web Services | Ardent Prime Innovations LLC",
  description:
    "Comprehensive 24/7 managed IT services including monitoring, support, maintenance, and web services. Keep your systems running smoothly and securely.",
  keywords: "managed IT services, 24/7 IT support, IT monitoring, web services, website design, IT maintenance",
}

const services = [
  {
    icon: MonitorCheck,
    title: "24/7 IT Infrastructure Monitoring, Support & Incident Response",
    description: "Round-the-clock monitoring and rapid response to keep your systems running at peak performance.",
  },
  {
    icon: AlertCircle,
    title: "24/7 Remote Security System Monitoring",
    description: "Continuous surveillance monitoring with immediate alert notifications and response coordination.",
  },
  {
    icon: Radio,
    title: "Preventive Maintenance for IT Devices",
    description: "Scheduled maintenance to prevent issues before they impact your business operations.",
  },
  {
    icon: Globe,
    title: "Business Website Design & Implementation",
    description: "Professional web design and development services to establish your online presence.",
  },
  {
    icon: Laptop,
    title: "Laptop, Office Computer and Printer Purchase or Rental",
    description: "Hardware procurement and rental options to meet your equipment needs.",
  },
  {
    icon: Settings,
    title: "Custom Managed Services",
    description: "Tailored managed service packages designed around your specific business requirements.",
  },
]

export default function ManagedITWebPage() {
  return (
    <>
      <ServiceSchema
        name="Managed IT & Web Services"
        description="Comprehensive 24/7 managed IT services including monitoring, support, maintenance, and web services. Keep your systems running smoothly and securely."
        url="https://ardentprime.com/services/managed-it-web"
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
                  <Headset className="h-10 w-10 text-primary-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Managed IT & Web Services</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Comprehensive 24/7 monitoring, support, and maintenance ensuring your systems run smoothly and
                  securely. Focus on your business while we handle your IT.
                </p>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/it-support-team-monitoring-systems-on-multiple-scr.jpg"
                  alt="Managed IT Services"
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
            <h2 className="text-3xl font-bold text-center mb-12">Our Managed Services</h2>
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
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Managed Services?</h2>
              <div className="space-y-4">
                {[
                  "24/7/365 monitoring and support availability",
                  "Predictable monthly costs with no surprises",
                  "Proactive issue detection and resolution",
                  "Dedicated account manager for your business",
                  "Regular reporting and performance reviews",
                  "Flexible service level agreements (SLAs)",
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
            <h2 className="text-4xl font-bold mb-6">Ready for Peace of Mind?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Let us handle your IT so you can focus on growing your business. Contact us today to learn about our
              managed service plans.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">
                Explore Managed Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
