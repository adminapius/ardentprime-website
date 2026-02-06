"use server"

export interface RSSItem {
  title: string
  link: string
  pubDate: string
  description: string
  source: string
  sourceUrl: string
  category: string
}

interface RSSFeedConfig {
  name: string
  url: string
  category: string
  website: string
}

// Partner RSS/Blog feeds grouped by category
const RSS_FEEDS: RSSFeedConfig[] = [
  // Cybersecurity
  {
    name: "Palo Alto Networks",
    url: "https://www.paloaltonetworks.com/blog/feed",
    category: "Cybersecurity",
    website: "https://www.paloaltonetworks.com",
  },
  {
    name: "Fortinet",
    url: "https://www.fortinet.com/blog/threat-research.xml",
    category: "Cybersecurity",
    website: "https://www.fortinet.com",
  },
  {
    name: "Cisco Security",
    url: "https://blogs.cisco.com/security/feed",
    category: "Cybersecurity",
    website: "https://www.cisco.com",
  },
  // Infrastructure & Cloud
  {
    name: "Microsoft",
    url: "https://blogs.microsoft.com/feed/",
    category: "Infrastructure & Cloud",
    website: "https://www.microsoft.com",
  },
  {
    name: "Dell Technologies",
    url: "https://www.dell.com/en-us/blog/feed/",
    category: "Infrastructure & Cloud",
    website: "https://www.delltechnologies.com",
  },
  // Physical Security
  {
    name: "Axis Communications",
    url: "https://www.axis.com/blog/secure-insights/feed/",
    category: "Physical Security",
    website: "https://www.axis.com",
  },
  {
    name: "Motorola Solutions",
    url: "https://blog.motorolasolutions.com/feed/",
    category: "Physical Security",
    website: "https://www.motorolasolutions.com",
  },
]

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim()
}

function parseRSSXml(xml: string, feedConfig: RSSFeedConfig): RSSItem[] {
  const items: RSSItem[] = []

  // Simple XML parser for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match: RegExpExecArray | null

  match = itemRegex.exec(xml)
  while (match !== null) {
    const itemXml = match[1]

    const titleMatch = /<title><!\[CDATA\[([\s\S]*?)\]\]>|<title>([\s\S]*?)<\/title>/i.exec(itemXml)
    const linkMatch = /<link>([\s\S]*?)<\/link>/i.exec(itemXml)
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/i.exec(itemXml)
    const descMatch =
      /<description><!\[CDATA\[([\s\S]*?)\]\]>|<description>([\s\S]*?)<\/description>/i.exec(itemXml)

    const title = (titleMatch?.[1] || titleMatch?.[2] || "").trim()
    const link = (linkMatch?.[1] || "").trim()
    const pubDate = (pubDateMatch?.[1] || "").trim()
    const rawDesc = (descMatch?.[1] || descMatch?.[2] || "").trim()
    const description = stripHtmlTags(rawDesc).substring(0, 200)

    if (title && link) {
      items.push({
        title,
        link,
        pubDate,
        description: description || "Read more on the partner website.",
        source: feedConfig.name,
        sourceUrl: feedConfig.website,
        category: feedConfig.category,
      })
    }

    match = itemRegex.exec(xml)
  }

  return items.slice(0, 3) // Max 3 items per feed
}

export async function fetchPartnerNews(): Promise<{
  items: RSSItem[]
  categories: string[]
  error?: string
}> {
  const allItems: RSSItem[] = []
  const categories = [...new Set(RSS_FEEDS.map((f) => f.category))]

  const feedPromises = RSS_FEEDS.map(async (feedConfig) => {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000) // 5s timeout

      const response = await fetch(feedConfig.url, {
        signal: controller.signal,
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          "User-Agent": "ArdentPrime/1.0 (News Aggregator)",
        },
      })

      clearTimeout(timeout)

      if (!response.ok) {
        return []
      }

      const xml = await response.text()
      return parseRSSXml(xml, feedConfig)
    } catch {
      // Feed unavailable, skip silently
      return []
    }
  })

  const results = await Promise.allSettled(feedPromises)

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.length > 0) {
      allItems.push(...result.value)
    }
  }

  // Sort by date (newest first)
  allItems.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime()
    const dateB = new Date(b.pubDate).getTime()
    if (Number.isNaN(dateA) && Number.isNaN(dateB)) return 0
    if (Number.isNaN(dateA)) return 1
    if (Number.isNaN(dateB)) return -1
    return dateB - dateA
  })

  return {
    items: allItems,
    categories,
    error: allItems.length === 0 ? "Unable to load partner news at this time. Please check back later." : undefined,
  }
}
