"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { notFound } from "next/navigation"
import { articlesData } from "./articles-data"


export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = articlesData[params.id]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  if (!article) {
    notFound()
  }

  return (
    <>
      {/* Article Schema is rendered server-side in layout.tsx with a real CSP nonce */}
      <Header />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Link>
          </Button>

          <article>
            <div className="mb-8">
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{article.author}</span>
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-xl mb-8 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${article.image}')`,
                }}
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                {article.content.intro}
              </p>

              {article.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-3xl font-bold mb-4 mt-8">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-foreground/80 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              <h2 className="text-3xl font-bold mb-4 mt-8">Key Highlights</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-8">
                {article.content.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <p className="text-foreground/90 leading-relaxed font-medium">
                  {article.content.conclusion}
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
