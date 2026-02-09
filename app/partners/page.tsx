import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Partners | Ardent Prime Innovations LLC",
  description:
    "Discover our trusted technology partners including HP, Cisco, Microsoft, Dell, and more. We collaborate with industry leaders to deliver exceptional IT solutions.",
  keywords: "technology partners, HP partner, Cisco partner, Microsoft partner, Dell partner, IT partners",
}

const partners = [
  {
    id: 1,
    name: "HP",
    logo: `/images/partners/hp-logo.png`,
    slug: "hp",
    description: "Global leader in personal computing and printing solutions.",
  },
  {
    id: 2,
    name: "Ingram Micro",
    logo: `/images/partners/ingram-micro-logo.png`,
    slug: "ingram-micro",
    description: "World's largest technology distributor.",
  },
  {
    id: 3,
    name: "Sectigo",
    logo: `/images/partners/sectigo-logo.png`,
    slug: "sectigo",
    description: "Global leader in SSL/TLS certificates and web security.",
  },
  {
    id: 4,
    name: "Pelco",
    logo: `/images/partners/pelco-logo.png`,
    slug: "pelco",
    description: "Industry leader in security camera systems.",
  },
  {
    id: 5,
    name: "Avigilon",
    logo: `/images/partners/avigilon-logo.png`,
    slug: "avigilon",
    description: "AI-powered video security solutions.",
  },
  {
    id: 6,
    name: "Axis Communications",
    logo: `/images/partners/axis-logo.png`,
    slug: "axis",
    description: "Global leader in network video solutions.",
  },
  {
    id: 7,
    name: "Motorola Solutions",
    logo: `/images/partners/motorola-solutions-logo.png`,
    slug: "motorola-solutions",
    description: "Mission-critical communication solutions.",
  },
  {
    id: 8,
    name: "Cisco",
    logo: `/images/partners/cisco-logo.png`,
    slug: "cisco",
    description: "Global technology leader in networking and security.",
  },
  {
    id: 9,
    name: "Microsoft",
    logo: `/images/partners/microsoft-logo.png`,
    slug: "microsoft",
    description: "Leading cloud, productivity, and AI solutions.",
  },
  {
    id: 10,
    name: "Palo Alto Networks",
    logo: `/images/partners/paloalto-logo.png`,
    slug: "paloalto",
    description: "Cybersecurity leader in firewalls and cloud security.",
  },
  {
    id: 11,
    name: "Milestone Systems",
    logo: `/images/partners/milestone-logo.png`,
    slug: "milestone",
    description: "Open platform video management software.",
  },
  {
    id: 12,
    name: "Vivotek",
    logo: `/images/partners/vivotek-logo.png`,
    slug: "vivotek",
    description: "Professional IP surveillance solutions.",
  },
  {
    id: 13,
    name: "Reolink",
    logo: `/images/partners/reolink-logo.png`,
    slug: "reolink",
    description: "Innovative security camera systems.",
  },
  {
    id: 14,
    name: "Fortinet",
    logo: `/images/partners/fortinet-logo.png`,
    slug: "fortinet",
    description: "Global leader in cybersecurity solutions.",
  },
  {
    id: 15,
    name: "Schneider Electric",
    logo: `/images/partners/schneider-electric-logo.png`,
    slug: "schneider-electric",
    description: "Global specialist in energy management.",
  },
  {
    id: 16,
    name: "TD SYNNEX",
    logo: `/images/partners/td-synnex-logo.png`,
    slug: "td-synnex",
    description: "Leading IT distributor and solutions aggregator.",
  },
  {
    id: 17,
    name: "Dell Technologies",
    logo: `/images/partners/dell-technologies-logo.png`,
    slug: "dell-technologies",
    description: "Global leader in computing and infrastructure.",
  },
]

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Trusted Partners</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We collaborate with industry-leading technology providers to deliver exceptional solutions for your
                business
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {partners.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/partners/${partner.slug}`}
                  className="group flex flex-col items-center p-6 bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-center w-full h-[100px] mb-4 grayscale group-hover:grayscale-0 transition-all">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-[173px] h-[98px] object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">{partner.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Interested in Partner Solutions?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Contact us to learn how we can leverage our partnerships to benefit your business with best-in-class
              technology solutions.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
