import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceSchema } from "@/components/structured-data"
import {
  Wrench,
  MapPin,
  Cable,
  Shield,
  Boxes,
  Server,
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
  title: "Professional Installation & Integration Services | Ardent Prime Innovations LLC",
  description:
    "Expert IT installation and integration services including cabling, hardware deployment, firewall installation, and site surveys. Seamless implementation guaranteed.",
  keywords:
    "IT installation, network integration, structured cabling, hardware deployment, firewall installation, site survey",
}

const services = [
  {
    icon: MapPin,
    title: "Site Surveys & Infrastructure Planning",
    description:
      "Comprehensive assessments and detailed planning to ensure optimal placement and configuration of your IT systems.",
  },
  {
    icon: Cable,
    title: "Structured Cabling Installations",
    description: "Professional Cat6/Cat6a cabling installations with proper cable management and documentation.",
  },
  {
    icon: Shield,
    title: "Install Firewalls, Routers, Switches, WAPs",
    description: "Expert installation and configuration of network devices with security best practices.",
  },
  {
    icon: Boxes,
    title: "Rack & Stack Hardware Deployments",
    description: "Efficient data center and server room deployments with proper organization and airflow management.",
  },
  {
    icon: Server,
    title: "Physical Security Systems & Low-Voltage",
    description: "Integration of security cameras, access control, and other low-voltage systems.",
  },
  {
    icon: Settings,
    title: "Specialized Integration Projects",
    description: "Custom integration solutions for unique business requirements and legacy system migrations.",
  },
]

export default function InstallationIntegrationPage() {
  return (
    <>
      <ServiceSchema
        name="Professional Installation & Integration Services"
        description="Expert IT installation and integration services including cabling, hardware deployment, firewall installation, and site surveys. Seamless implementation guaranteed."
        url="https://ardentprime.com/services/installation-integration"
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
                  <Wrench className="h-10 w-10 text-primary-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Installation & Integration</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Expert deployment and integration services ensuring seamless implementation of your IT infrastructure.
                  Our certified technicians deliver quality installations on time and on budget.
                </p>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/it-technician-installing-network-cables-in-server-.jpg"
                  alt="Installation & Integration"
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
            <h2 className="text-3xl font-bold text-center mb-12">Our Installation & Integration Services</h2>
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
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Installation Services?</h2>
              <div className="space-y-4">
                {[
                  "Certified and experienced installation technicians",
                  "Comprehensive project documentation and handover",
                  "Minimal disruption to your daily operations",
                  "Post-installation testing and verification",
                  "Warranty and support on all installations",
                  "On-time project delivery guaranteed",
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
            <h2 className="text-4xl font-bold mb-6">Need Professional Installation?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Contact us today for a site survey and detailed quote. Our team will ensure your IT systems are installed
              correctly the first time.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">
                Request a Site Survey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
