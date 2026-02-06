"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Network, Wrench, Headset, Zap, DollarSign, Shield, Users, Cpu, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const partners = [
  { id: 1, name: "HP", logo: `/images/partners/hp-logo.png`, slug: "hp" },
  { id: 2, name: "Ingram Micro", logo: `/images/partners/ingram-micro-logo.png`, slug: "ingram-micro" },
  { id: 3, name: "Pelco", logo: `/images/partners/pelco-logo.png`, slug: "pelco" },
  { id: 4, name: "Avigilon", logo: `/images/partners/avigilon-logo.png`, slug: "avigilon" },
  { id: 5, name: "Axis", logo: `/images/partners/axis-logo.png`, slug: "axis" },
  {
    id: 6,
    name: "Motorola Solutions",
    logo: `/images/partners/motorola-solutions-logo.png`,
    slug: "motorola-solutions",
  },
  { id: 7, name: "Cisco", logo: `/images/partners/cisco-logo.png`, slug: "cisco" },
  { id: 8, name: "Microsoft", logo: `/images/partners/microsoft-logo.png`, slug: "microsoft" },
  { id: 9, name: "Palo Alto Networks", logo: `/images/partners/paloalto-logo.png`, slug: "paloalto" },
  { id: 10, name: "Milestone", logo: `/images/partners/milestone-logo.png`, slug: "milestone" },
]

const services = [
  {
    icon: Network,
    title: "IT Infrastructure Services",
    description: "Enterprise-grade network infrastructure and security systems tailored to your business needs.",
    href: "/services/it-infrastructure",
  },
  {
    icon: Wrench,
    title: "Professional Installation & Integration",
    description:
      "Expert deployment and integration services ensuring seamless implementation of your IT infrastructure.",
    href: "/services/installation-integration",
  },
  {
    icon: Headset,
    title: "Managed IT & Web Services",
    description:
      "Comprehensive 24/7 monitoring, support, and maintenance ensuring your systems run smoothly and securely.",
    href: "/services/managed-it-web",
  },
]

const reasons = [
  { icon: Zap, title: "Rapid Deployment", description: "Quick turnaround times without compromising quality." },
  { icon: DollarSign, title: "Cost-Effective", description: "Competitive pricing with transparent costs." },
  { icon: Shield, title: "Enterprise Security", description: "Bank-level security protocols protect your data." },
  { icon: Users, title: "Dedicated Support", description: "Personal attention from our expert team." },
  { icon: Cpu, title: "Cutting-Edge Tech", description: "Latest technologies and best practices." },
  { icon: TrendingUp, title: "Proven Results", description: "Track record of successful implementations." },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-accent/10" />
          <img
            src="/modern-data-center-server-room-with-green-lighting.jpg"
            alt="Data Center Background"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
        </div>

        <Header />

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-up">
              Shaping the Future of <span className="text-primary">Business Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 animate-fade-in-up animation-delay-200">
              Your Trusted Technology Innovation Partner
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-400">
              From ambitious startups to enterprise clients worldwide, we deliver tailored IT solutions designed to
              solve real-world challenges and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT solutions designed to transform and elevate your business operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={service.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine technical excellence with personal service to deliver solutions that truly make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-card border border-border hover:border-primary transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <reason.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/about">
                Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Trusted Partners</h2>
            <p className="text-xl text-muted-foreground">
              Collaborating with industry leaders to deliver exceptional solutions
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              {partners.slice(0, 5).map((partner) => (
                <Link
                  key={partner.id}
                  href={`/partners/${partner.slug}`}
                  className="flex items-center justify-center p-6 bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg grayscale hover:grayscale-0 cursor-pointer w-full h-[130px]"
                >
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-[173px] h-[98px] object-contain"
                  />
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              {partners.slice(5, 10).map((partner) => (
                <Link
                  key={partner.id}
                  href={`/partners/${partner.slug}`}
                  className="flex items-center justify-center p-6 bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg grayscale hover:grayscale-0 cursor-pointer w-full h-[130px]"
                >
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-[173px] h-[98px] object-contain"
                  />
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/partners">
                  View All Partners <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Connect with our team for a free consultation and discover how ARDENT PRIME INNOVATIONS can deliver the
            tools, strategy, and support you need to thrive in a digital world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/support-center">Support Center</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
