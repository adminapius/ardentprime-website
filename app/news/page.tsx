import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News & Insights | Ardent Prime Innovations LLC",
  description:
    "Stay updated with the latest technology insights, innovations, and success stories from Ardent Prime Innovations. Industry news and IT trends.",
  keywords: "IT news, technology insights, cybersecurity news, IT trends, case studies, innovation",
}

const newsItems = [
  {
    id: 1,
    title: "AI-Powered Innovation in Enterprise",
    excerpt:
      "Discover how our latest AI-enhanced solutions are revolutionizing business operations and driving unprecedented efficiency.",
    image: "/ai-monitoring-dashboard-technology.jpg",
    date: "October 1, 2025",
    category: "Innovation",
  },
  {
    id: 2,
    title: "Advanced Cybersecurity Solutions",
    excerpt:
      "Explore our cutting-edge cybersecurity infrastructure protecting Fortune 500 companies from evolving digital threats.",
    image: "/cybersecurity-network-protection.png",
    date: "September 28, 2025",
    category: "Cybersecurity",
  },
  {
    id: 3,
    title: "Next-Gen Network Infrastructure",
    excerpt:
      "Exploring cutting-edge technologies that are transforming how businesses build and maintain their IT infrastructure.",
    image: "/modern-data-center-servers.jpg",
    date: "September 25, 2025",
    category: "Infrastructure",
  },
  {
    id: 4,
    title: "Sustainable IT for Tomorrow",
    excerpt:
      "Our commitment to eco-friendly technology solutions that reduce carbon footprint while maximizing efficiency.",
    image: "/green-technology-sustainable-computing.jpg",
    date: "September 20, 2025",
    category: "Sustainability",
  },
  {
    id: 5,
    title: "Comprehensive Physical Security Systems",
    excerpt:
      "Implementing state-of-the-art CCTV, access control, and perimeter security solutions for complete facility protection.",
    image: "/physical-security-cctv-access-control.jpg",
    date: "September 15, 2025",
    category: "Physical Security",
  },
  {
    id: 6,
    title: "Success Story: Digital Transformation",
    excerpt: "How we helped a growing startup scale their operations with enterprise-grade IT solutions.",
    image: "/business-team-technology-success.jpg",
    date: "September 10, 2025",
    category: "Case Study",
  },
]

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Insights</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with our latest insights, innovations, and success stories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {newsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{item.excerpt}</p>
                    <Link
                      href={`/news/${item.id}`}
                      className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
