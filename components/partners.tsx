"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

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
  { id: 11, name: "Vivotek", logo: `/images/partners/vivotek-logo.png`, slug: "vivotek" },
  { id: 12, name: "Reolink", logo: `/images/partners/reolink-logo.png`, slug: "reolink" },
  { id: 13, name: "Fortinet", logo: `/images/partners/fortinet-logo.png`, slug: "fortinet" },
  {
    id: 14,
    name: "Schneider Electric",
    logo: `/images/partners/schneider-electric-logo.png`,
    slug: "schneider-electric",
  },
  { id: 15, name: "TD SYNNEX", logo: `/images/partners/td-synnex-logo.png`, slug: "td-synnex" },
  { id: 16, name: "Dell Technologies", logo: `/images/partners/dell-technologies-logo.png`, slug: "dell-technologies" },
]

export function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 5

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= partners.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, partners.length - itemsPerPage) : prev - itemsPerPage,
    )
  }

  const visiblePartners = partners.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section id="partners" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Trusted Partners</h2>
          <p className="text-xl text-muted-foreground">
            Collaborating with industry leaders to deliver exceptional solutions
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            {visiblePartners.map((partner) => (
              <Link
                key={partner.id}
                href={`/partners/${partner.slug}`}
                className="flex items-center justify-center p-6 bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg grayscale hover:grayscale-0 cursor-pointer"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="w-[173px] h-[98px] object-contain"
                />
              </Link>
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
              {Array.from({ length: Math.ceil(partners.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerPage) === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to partners page ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerPage >= partners.length}
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
