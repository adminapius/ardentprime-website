"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ExternalLink, Loader2, Rss, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchPartnerNews, type RSSItem } from "@/app/actions/fetch-rss"

export function PartnerNews() {
  const [items, setItems] = useState<RSSItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNews() {
      try {
        const result = await fetchPartnerNews()
        setItems(result.items)
        setCategories(result.categories)
        if (result.error) {
          setError(result.error)
        }
      } catch {
        setError("Unable to load partner news at this time.")
      } finally {
        setIsLoading(false)
      }
    }
    loadNews()
  }, [])

  const filteredItems =
    selectedCategory === "All" ? items : items.filter((item) => item.category === selectedCategory)

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      if (Number.isNaN(date.getTime())) return ""
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return ""
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Rss className="h-4 w-4" />
            Live Feed
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner News & Advisories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest news, security advisories, and product updates from our technology partners.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading partner news feeds...</p>
          </div>
        ) : error && items.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
            <Rss className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Partner news feeds are periodically refreshed. Please check back soon.
            </p>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("All")}
                className={selectedCategory !== "All" ? "bg-transparent" : ""}
              >
                All ({items.length})
              </Button>
              {categories.map((cat) => {
                const count = items.filter((i) => i.category === cat).length
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory !== cat ? "bg-transparent" : ""}
                  >
                    {cat} ({count})
                  </Button>
                )
              })}
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredItems.map((item, index) => (
                <Card key={`${item.source}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {item.source}
                      </span>
                    </div>
                    {item.pubDate && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(item.pubDate)}</span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary text-sm font-semibold hover:gap-2 transition-all"
                    >
                      Read on {item.source} <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No news articles found for this category.</p>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-8 italic">
              News content is sourced from our technology partners' official feeds. All trademarks belong to their respective owners.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
