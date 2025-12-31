import {
  Network,
  Wrench,
  Headset,
  RotateCcw,
  Video,
  Radio,
  Lock,
  Zap,
  Settings,
  MapPin,
  Cable,
  Shield,
  Server,
  Boxes,
  MonitorCheck,
  AlertCircle,
  Laptop,
  Globe,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function WhatWeDo() {
  const services = [
    {
      icon: Network,
      title: "IT Infrastructure Services",
      description: "Enterprise-grade network infrastructure and security systems tailored to your business needs.",
      image: "/modern-data-center-server-racks-with-blue-lighting.jpg",
      items: [
        { icon: RotateCcw, text: "Technology Refresh & Lifecycle Modernization" },
        { icon: Video, text: "Network CCTV Systems" },
        { icon: Radio, text: "Network Audio Systems" },
        { icon: Lock, text: "Network Physical Access Control System" },
        { icon: Zap, text: "Power Management Systems & UPS" },
        { icon: Settings, text: "Custom Infrastructure Solutions" },
      ],
    },
    {
      icon: Wrench,
      title: "Professional Installation & Integration",
      description:
        "Expert deployment and integration services ensuring seamless implementation of your IT infrastructure.",
      image: "/it-technician-installing-network-cables-in-server-.jpg",
      items: [
        { icon: MapPin, text: "Site Surveys & Infrastructure Planning" },
        { icon: Cable, text: "Structured Cabling Installations" },
        { icon: Shield, text: "Install Firewalls, Routers, Switches, WAPs" },
        { icon: Boxes, text: "Rack & Stack Hardware Deployments" },
        { icon: Server, text: "Physical Security Systems & Low-Voltage" },
        { icon: Settings, text: "Specialized Integration Projects" },
      ],
    },
    {
      icon: Headset,
      title: "Managed IT & Web Services",
      description:
        "Comprehensive 24/7 monitoring, support, and maintenance ensuring your systems run smoothly and securely.",
      image: "/it-support-team-monitoring-systems-on-multiple-scr.jpg",
      items: [
        { icon: MonitorCheck, text: "24/7 IT Infrastructure Monitoring, Support & Incident Response" },
        { icon: AlertCircle, text: "24/7 Remote Security System Monitoring" },
        { icon: Radio, text: "Preventive Maintenance for IT Devices" },
        { icon: Globe, text: "Business Website Design & Implementation" },
        { icon: Laptop, text: "Laptop, Office Computer and Printer Purchase or Rental" },
        { icon: Settings, text: "Custom Managed Services" },
      ],
    },
  ]

  return (
    <section id="what-we-do" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
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
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-foreground/80">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
