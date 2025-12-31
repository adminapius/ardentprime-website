import { Zap, DollarSign, Shield, Users, Cpu, TrendingUp } from "lucide-react"
import Image from "next/image"

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Quick turnaround times without compromising quality. Get your solutions faster.",
      image: "/agile-team-sprint-fast-deployment-collaboration.jpg",
    },
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "Competitive pricing with transparent costs. No hidden fees and maximum value.",
      image: "/business-growth-profit-chart-cost-savings-financia.jpg",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security protocols protect your data and systems.",
      image: "/cybersecurity-shield-network-protection-data-secur.jpg",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal attention from our expert team. You're not just a ticket number.",
      image: "/it-operations-command-center-monitoring-dedicated.jpg",
    },
    {
      icon: Cpu,
      title: "Cutting-Edge Tech",
      description: "Latest technologies and best practices ensure future-proof solutions.",
      image: "/advanced-technology-innovation-ai-circuit-board-mo.jpg",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Track record of successful implementations and satisfied clients.",
      image: "/success-growth-chart-business-achievement-upward-t.jpg",
    },
  ]

  return (
    <section id="why-choose-us" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine technical excellence with personal service to deliver solutions that truly make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group rounded-xl bg-card border border-border hover:border-primary transition-all hover:shadow-xl overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={reason.image || "/placeholder.svg"}
                  alt={reason.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
              </div>

              <div className="p-8 relative">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <reason.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
