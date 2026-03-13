import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Network, Wrench, Headset, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - IT Solutions & Infrastructure",
  description:
    "Explore our comprehensive IT services including infrastructure, installation, integration, and managed IT services. Enterprise-grade solutions for businesses of all sizes.",
  keywords: ["IT services", "IT infrastructure", "network installation", "managed IT services", "technology solutions", "cybersecurity", "cloud services"],
  openGraph: {
    title: "Our Services - Ardent Prime Innovations LLC",
    description: "Comprehensive IT services: infrastructure, installation, integration, and managed IT support.",
    url: "https://ardentprime.com/services",
    type: "website",
  },
  alternates: {
    canonical: "https://ardentprime.com/services",
  },
}

const services = [
  {
    icon: Network,
    title: "IT Infrastructure Services",
    description: "Enterprise-grade network infrastructure and security systems tailored to your business needs.",
    image: "/modern-data-center-server-racks-with-blue-lighting.jpg",
    href: "/services/it-infrastructure",
    items: [
      "Technology Refresh & Lifecycle Modernization",
      "Network CCTV Systems",
      "Network Audio Systems",
      "Network Physical Access Control System",
      "Power Management Systems & UPS",
      "Custom Infrastructure Solutions",
    ],
  },
  {
    icon: Wrench,
    title: "Professional Installation & Integration",
    description:
      "Expert deployment and integration services ensuring seamless implementation of your IT infrastructure.",
    image: "/it-technician-installing-network-cables-in-server-.jpg",
    href: "/services/installation-integration",
    items: [
      "Site Surveys & Infrastructure Planning",
      "Structured Cabling Installations",
      "Install Firewalls, Routers, Switches, WAPs",
      "Rack & Stack Hardware Deployments",
      "Physical Security Systems & Low-Voltage",
      "Specialized Integration Projects",
    ],
  },
  {
    icon: Headset,
    title: "Managed IT & Web Services",
    description:
      "Comprehensive 24/7 monitoring, support, and maintenance ensuring your systems run smoothly and securely.",
    image: "/it-support-team-monitoring-systems-on-multiple-scr.jpg",
    href: "/services/managed-it-web",
    items: [
      "24/7 IT Infrastructure Monitoring, Support & Incident Response",
      "24/7 Remote Security System Monitoring",
      "Preventive Maintenance for IT Devices",
      "Business Website Design & Implementation",
      "Laptop, Office Computer and Printer Purchase or Rental",
      "Custom Managed Services",
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: "Services" }]} className="mb-8" />
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive IT solutions designed to transform and elevate your business operations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-shadow border-2 hover:border-primary/50 overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  </div>

                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.items.slice(0, 4).map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-primary" />
                          <span className="text-sm text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={service.href}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Every business is unique. Contact us to discuss your specific requirements and let us design a tailored IT
              solution for you.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">
                Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
