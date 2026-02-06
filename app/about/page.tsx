import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Eye, Award, Lightbulb, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Who We Are | Ardent Prime Innovations LLC",
  description:
    "Learn about Ardent Prime Innovations LLC - your trusted technology innovation partner. Discover our mission, vision, and core values that drive our commitment to excellence.",
  keywords: "about ardent prime, IT company, technology partner, mission, vision, core values",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h1>
              <p className="text-xl text-primary font-semibold mb-4">Your Trusted Technology Innovation Partner</p>
            </div>

            <div className="max-w-4xl mx-auto mb-16 space-y-12">
              {/* Ardent Prime */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">Ardent Prime</h2>
                <div className="prose prose-lg max-w-none text-foreground/80">
                  <p className="text-lg leading-relaxed mb-6">
                    At <span className="font-semibold text-foreground">ARDENT PRIME INNOVATIONS</span>, we're more than
                    an IT solutions provider — we're a family-built company fueled by technical excellence and
                    entrepreneurial drive. Founded by a passionate team with a shared vision, our mission is rooted in a
                    simple belief: technology should simplify business, not complicate it.
                  </p>
                  <p className="text-lg leading-relaxed">
                    From ambitious startups to enterprise clients worldwide, we deliver tailored IT solutions designed
                    to solve real-world challenges and accelerate growth. We recognize that no two businesses are alike
                    — that's why we take the time to understand your goals, adapt to your needs, and implement
                    strategies that deliver measurable impact.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Mission</h2>
                </div>
                <p className="text-lg leading-relaxed text-foreground/80">
                  To empower businesses through innovative technology solutions that drive growth, efficiency, and
                  digital transformation. We are committed to delivering exceptional service, fostering long-term
                  partnerships, and making enterprise-grade IT accessible to organizations of all sizes.
                </p>
              </div>

              {/* Vision */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Vision</h2>
                </div>
                <p className="text-lg leading-relaxed text-foreground/80">
                  To be the most trusted technology partner for businesses seeking to thrive in the digital age. We
                  envision a future where every organization, regardless of size, has access to world-class IT
                  infrastructure and support that enables them to compete, innovate, and succeed in an increasingly
                  connected world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Mission-Driven */}
                <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Mission-Driven</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Guided by integrity, professionalism, and empowerment, we conduct business with unwavering honesty
                    and ethical standards while enabling clients to achieve their goals.
                  </p>
                </div>

                {/* Excellence */}
                <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We maintain the highest standards through precision, quality, and safety in every project, while
                    promoting sustainability and long-term value for our clients and communities.
                  </p>
                </div>

                {/* Innovation */}
                <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We stay ahead of technology trends through continuous improvement with purpose, delivering
                    cutting-edge solutions that address real business challenges.
                  </p>
                </div>

                {/* Partnership */}
                <div className="bg-card p-8 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Partnership</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your success is our priority. We build relationships through customer-first service, impactful
                    collaboration, and a shared commitment to long-term value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Discover how Ardent Prime Innovations can help transform your business with innovative technology
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
