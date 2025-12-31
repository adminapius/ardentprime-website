import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export function HeroSection() {
  return (
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

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-up">
            Shaping the Future of <span className="text-primary">Business Technology</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 animate-fade-in-up animation-delay-200">
            Your Trusted Technology Innovation Partner
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-400">
            From ambitious startups to enterprise clients worldwide, we deliver tailored IT solutions designed to solve
            real-world challenges and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="#contact">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="#what-we-do">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  )
}
