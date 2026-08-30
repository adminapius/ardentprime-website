// Shared partner data — used by both the client page (renders the partner
// profile) and the server layout (renders VideoSchema JSON-LD with a real
// CSP nonce).

export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Partner data
export const partnersData: Record<
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
    videoUrl: "https://www.youtube.com/watch?v=KdB4v9ssdIY",
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
    videoUrl: "https://www.youtube.com/watch?v=BejEZFMMBJk",
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
  sectigo: {
    name: "Sectigo",
    description: "Global leader in SSL/TLS certificates, digital identity, and automated web security solutions.",
    logo: "/images/partners/sectigo-logo.png",
    website: "https://www.sectigo.com",
    videoUrl: "https://www.youtube.com/watch?v=X5K6i5r7gz0",
    solutions: [
      "SSL/TLS Certificates",
      "Automated Certificate Management",
      "Web Application Firewall (WAF)",
      "Code Signing Certificates",
    ],
    partnership:
      "Ardent Prime Innovations has partnered with Sectigo to provide our clients with industry-leading SSL/TLS certificates and comprehensive web security solutions. This partnership ensures that our clients' websites, applications, and digital communications are protected with the highest level of encryption and trust.",
    benefits: [
      "Trusted SSL/TLS certificates recognized by all major browsers",
      "Automated certificate lifecycle management",
      "Enhanced web application security with WAF protection",
      "Comprehensive code signing for software integrity",
    ],
  },
  pelco: {
    name: "Pelco",
    description: "Industry leader in security camera systems and video surveillance solutions.",
    logo: "/images/partners/pelco-logo.png",
    website: "https://www.pelco.com",
    videoUrl: "https://www.youtube.com/watch?v=B_lw-lMvQnU",
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
    videoUrl: "https://www.youtube.com/watch?v=_4OWxx9RTPw",
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
    videoUrl: "https://www.youtube.com/watch?v=FnQasRVqI34",
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
    videoUrl: "https://youtu.be/AGmoQOVSPkE?si=oWxuq0Ji9D7Wduzr",
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
    videoUrl: "https://www.youtube.com/watch?v=GbbWVZDUgoI",
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
    videoUrl: "https://www.youtube.com/watch?v=1aXrgLlqdbg",
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
    videoUrl: "https://www.youtube.com/watch?v=fABJuCYMAyY",
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
    videoUrl: "https://www.youtube.com/watch?v=mICW-oLDk2M",
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
    videoUrl: "https://www.youtube.com/watch?v=kKHg74uBg1Q",
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
    videoUrl: "https://www.youtube.com/watch?v=IkRMhWVlFp8",
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
    videoUrl: "https://www.youtube.com/watch?v=o0btrmZcmGI",
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
    videoUrl: "https://www.youtube.com/watch?v=mfWWvpEa3Us",
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
    videoUrl: "https://www.youtube.com/watch?v=DOosZShL-w0",
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
    videoUrl: "https://www.youtube.com/watch?v=X0pZDGMKhsk",
    solutions: ["PowerEdge Servers", "Storage Solutions", "Networking Equipment", "Workstations"],
    partnership:
      "Dell Technologies partnership enables us to deliver enterprise-grade infrastructure solutions backed by world-class support.",
    benefits: ["Enterprise-grade hardware", "Comprehensive support", "Scalable solutions", "Proven reliability"],
  },
}
