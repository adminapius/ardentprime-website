"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { VideoEmbed } from "@/components/video-embed"
import { useEffect } from "react"

// Partner data - you can move this to a database later
const partnersData: Record<
  string,
  {
    name: string
    description: string
    logo: string
    website: string
    videoUrl?: string
    solutions: string[]
    partnership: string
    benefits: string[]
  }
> = {
  hp: {
    name: "HP",
    description: "Global leader in personal computing and printing solutions for businesses.",
    logo: "/images/partners/hp-logo.png",
    website: "https://www.hp.com",
    videoUrl: "",
    solutions: [
      "Enterprise Workstations",
      "Business Laptops & Desktops",
      "Commercial Printers",
      "Managed Print Services",
    ],
    partnership:
      "Ardent Prime Innovations has partnered with HP to deliver reliable computing and printing solutions to our clients. This partnership enables us to provide enterprise-grade hardware with comprehensive support and maintenance.",
    benefits: [
      "Access to latest HP technologies",
      "Priority technical support",
      "Competitive pricing for our clients",
      "Joint training and certification programs",
    ],
  },
  "ingram-micro": {
    name: "Ingram Micro",
    description: "World's largest technology distributor and supply chain solutions provider.",
    logo: "/images/partners/ingram-micro-logo.png",
    website: "https://www.ingrammicro.com",
    videoUrl: "",
    solutions: ["Technology Distribution", "Supply Chain Services", "Cloud Solutions", "Lifecycle Services"],
    partnership:
      "Our strategic partnership with Ingram Micro ensures we have access to a comprehensive portfolio of technology products and services to meet all client needs.",
    benefits: [
      "Extensive product portfolio",
      "Flexible financing options",
      "Expert technical resources",
      "Global logistics support",
    ],
  },
  pelco: {
    name: "Pelco",
    description: "Industry leader in security camera systems and video surveillance solutions.",
    logo: "/images/partners/pelco-logo.png",
    website: "https://www.pelco.com",
    videoUrl: "",
    solutions: ["IP Security Cameras", "Video Management Systems", "Analytics Software", "PTZ Camera Systems"],
    partnership:
      "Through our partnership with Pelco, we provide comprehensive video surveillance solutions to protect your facilities and assets with cutting-edge technology.",
    benefits: [
      "High-quality imaging technology",
      "Advanced video analytics",
      "Scalable solutions",
      "Integration capabilities",
    ],
  },
  avigilon: {
    name: "Avigilon",
    description: "Advanced AI-powered video security and analytics solutions provider.",
    logo: "/images/partners/avigilon-logo.png",
    website: "https://www.avigilon.com",
    videoUrl: "",
    solutions: [
      "AI-Powered Video Analytics",
      "High-Definition Cameras",
      "Access Control Integration",
      "Cloud Video Management",
    ],
    partnership:
      "Avigilon collaboration allows us to deliver state-of-the-art AI-powered video security that enhances threat detection and response capabilities.",
    benefits: [
      "Advanced AI analytics",
      "Proactive threat detection",
      "Cloud-native architecture",
      "Seamless integration",
    ],
  },
  axis: {
    name: "Axis Communications",
    description: "Global leader in network video and access control solutions.",
    logo: "/images/partners/axis-logo.png",
    website: "https://www.axis.com",
    videoUrl: "",
    solutions: ["Network Cameras", "Video Encoders", "Access Control Systems", "Audio Systems"],
    partnership:
      "Our alliance with Axis brings enterprise-grade network video solutions that provide exceptional image quality and reliability.",
    benefits: [
      "Industry-leading image quality",
      "Open platform architecture",
      "Cybersecurity features",
      "Wide product range",
    ],
  },
  "motorola-solutions": {
    name: "Motorola Solutions",
    description: "Trusted provider of mission-critical communication and security solutions.",
    logo: "/images/partners/motorola-solutions-logo.png",
    website: "https://www.motorolasolutions.com",
    videoUrl: "",
    solutions: [
      "Two-Way Radio Systems",
      "Video Security Solutions",
      "Command Center Software",
      "Emergency Response Systems",
    ],
    partnership:
      "Partner with Motorola Solutions ensures your critical communications and security systems are reliable and interoperable.",
    benefits: [
      "Mission-critical reliability",
      "Integrated communication",
      "Advanced dispatch solutions",
      "Proven track record",
    ],
  },
  cisco: {
    name: "Cisco",
    description: "Global technology leader in networking, security, and collaboration.",
    logo: "/images/partners/cisco-logo.png",
    website: "https://www.cisco.com",
    videoUrl: "",
    solutions: ["Network Infrastructure", "Cybersecurity Solutions", "Collaboration Tools", "Data Center Technologies"],
    partnership:
      "Together with Cisco, we offer comprehensive networking and security solutions that form the backbone of modern IT infrastructure.",
    benefits: [
      "Industry-leading networking",
      "Advanced security features",
      "Scalable architecture",
      "Global support network",
    ],
  },
  microsoft: {
    name: "Microsoft",
    description: "Leading technology company providing cloud, productivity, and AI solutions.",
    logo: "/images/partners/microsoft-logo.png",
    website: "https://www.microsoft.com",
    videoUrl: "",
    solutions: ["Microsoft 365", "Azure Cloud Services", "Windows Server", "Dynamics 365"],
    partnership:
      "Our Microsoft partnership enables us to deliver powerful productivity and cloud solutions that transform how businesses operate.",
    benefits: [
      "Complete productivity suite",
      "Enterprise cloud platform",
      "Advanced AI capabilities",
      "Seamless integration",
    ],
  },
  paloalto: {
    name: "Palo Alto Networks",
    description: "Cybersecurity leader providing next-generation firewall and cloud security.",
    logo: "/images/partners/paloalto-logo.png",
    website: "https://www.paloaltonetworks.com",
    videoUrl: "",
    solutions: ["Next-Generation Firewalls", "Cloud Security", "Threat Intelligence", "Security Operations"],
    partnership:
      "Palo Alto Networks advanced security solutions protect your network and cloud infrastructure from sophisticated cyber threats.",
    benefits: [
      "AI-powered threat prevention",
      "Zero Trust architecture",
      "Cloud-native security",
      "Automated response",
    ],
  },
  milestone: {
    name: "Milestone Systems",
    description: "Open platform video management software for IP video surveillance.",
    logo: "/images/partners/milestone-logo.png",
    website: "https://www.milestonesys.com",
    videoUrl: "",
    solutions: ["XProtect VMS", "Video Analytics", "Camera Integration", "Mobile Client Solutions"],
    partnership:
      "Through Milestone partnership, we provide flexible and scalable video management solutions that work with hundreds of camera types.",
    benefits: ["Open platform flexibility", "Unlimited scalability", "Extensive integrations", "Mobile accessibility"],
  },
  vivotek: {
    name: "Vivotek",
    description: "Professional IP surveillance solutions with high-quality network cameras.",
    logo: "/images/partners/vivotek-logo.png",
    website: "https://www.vivotek.com",
    videoUrl: "",
    solutions: ["Network Cameras", "Video Servers", "Recording Solutions", "Software Integration"],
    partnership:
      "Vivotek collaboration enables us to offer cost-effective IP surveillance solutions with professional-grade features.",
    benefits: ["High-quality imaging", "Weatherproof designs", "Smart stream technology", "Value pricing"],
  },
  reolink: {
    name: "Reolink",
    description: "Innovative security camera systems for home and business applications.",
    logo: "/images/partners/reolink-logo.png",
    website: "https://www.reolink.com",
    videoUrl: "",
    solutions: ["PoE Camera Systems", "Wireless Security Cameras", "NVR Solutions", "Solar-Powered Cameras"],
    partnership:
      "Our partnership with Reolink provides accessible and reliable security solutions for small to medium-sized businesses.",
    benefits: ["Easy installation", "Affordable pricing", "Mobile app access", "Local storage options"],
  },
  fortinet: {
    name: "Fortinet",
    description: "Global leader in cybersecurity solutions and unified threat management.",
    logo: "/images/partners/fortinet-logo.png",
    website: "https://www.fortinet.com",
    videoUrl: "",
    solutions: ["FortiGate Firewalls", "Secure SD-WAN", "Endpoint Security", "Security Fabric"],
    partnership:
      "Fortinet partnership delivers comprehensive cybersecurity solutions that protect your network with industry-leading threat protection.",
    benefits: [
      "Integrated security fabric",
      "High-performance firewalls",
      "AI-powered detection",
      "Centralized management",
    ],
  },
  "schneider-electric": {
    name: "Schneider Electric",
    description: "Global specialist in energy management and industrial automation.",
    logo: "/images/partners/schneider-electric-logo.png",
    website: "https://www.se.com",
    videoUrl: "",
    solutions: ["UPS Systems", "Power Distribution", "Data Center Infrastructure", "Building Automation"],
    partnership:
      "Through Schneider Electric, we provide reliable power management and automation solutions for critical infrastructure.",
    benefits: ["Energy efficiency", "Reliable power protection", "Smart building integration", "Sustainability focus"],
  },
  "td-synnex": {
    name: "TD SYNNEX",
    description: "Leading IT distributor and solutions aggregator for technology ecosystem.",
    logo: "/images/partners/td-synnex-logo.png",
    website: "https://www.tdsynnex.com",
    videoUrl: "",
    solutions: ["Technology Distribution", "Cloud Services", "Endpoint Solutions", "Business Process Services"],
    partnership:
      "Our alliance with TD SYNNEX provides access to comprehensive technology solutions and value-added services for our clients.",
    benefits: ["Broad product portfolio", "Cloud marketplace", "Financial services", "Technical expertise"],
  },
  "dell-technologies": {
    name: "Dell Technologies",
    description: "Global technology leader in computing, storage, and infrastructure solutions.",
    logo: "/images/partners/dell-technologies-logo.png",
    website: "https://www.delltechnologies.com",
    videoUrl: "",
    solutions: ["PowerEdge Servers", "Storage Solutions", "Networking Equipment", "Workstations"],
    partnership:
      "Dell Technologies partnership enables us to deliver enterprise-grade infrastructure solutions backed by world-class support.",
    benefits: ["Enterprise-grade hardware", "Comprehensive support", "Scalable solutions", "Proven reliability"],
  },
}

export default function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = partnersData[params.slug]
  const router = useRouter()

  if (!partner) {
    notFound()
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleBackToPartners = () => {
    router.push("/?scrollTo=partners")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <Button onClick={handleBackToPartners} variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partners
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
                <VideoEmbed url={partner.videoUrl} title={`${partner.name} Overview Video`} />
              ) : (
                <div className="bg-muted/50 rounded-lg border-2 border-dashed border-border p-12 text-center">
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

            {/* CTA */}
            <div className="mt-12 text-center p-8 bg-primary/10 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Interested in these solutions?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Contact us to learn how we can leverage our partnership with {partner.name} to benefit your business.
              </p>
              <Button size="lg" onClick={() => router.push("/?scrollTo=contact")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
