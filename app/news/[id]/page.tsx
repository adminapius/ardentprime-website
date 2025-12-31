"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>

          <article>
            <div className="mb-8">
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                Technology
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Article Title - News Item {params.id}</h1>

            <div className="flex items-center gap-4 text-muted-foreground mb-8">
              <Calendar className="h-5 w-5" />
              <span>October 2, 2025</span>
            </div>

            <div className="aspect-video bg-muted rounded-xl mb-8 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('/technology-innovation-article.jpg')`,
                }}
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                This is a placeholder for the full article content. In a real implementation, you would fetch the
                article data from a database or CMS based on the article ID.
              </p>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>

              <h2 className="text-3xl font-bold mb-4 mt-8">Key Highlights</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-6">
                <li>Advanced technology solutions for modern businesses</li>
                <li>Proven track record of successful implementations</li>
                <li>24/7 support and monitoring services</li>
                <li>Scalable infrastructure for growing companies</li>
              </ul>

              <p className="text-foreground/80 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
