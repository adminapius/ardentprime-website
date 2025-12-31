"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

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

export function ArdentPrimeNews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= newsItems.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, newsItems.length - itemsPerPage) : prev - itemsPerPage,
    )
  }

  const visibleItems = newsItems.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ardent Prime News</h2>
          <p className="text-xl text-muted-foreground">
            Stay updated with our latest insights, innovations, and success stories
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {visibleItems.map((item) => (
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
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
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

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-12 w-12 bg-transparent"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(newsItems.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerPage) === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerPage >= newsItems.length}
              className="h-12 w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
