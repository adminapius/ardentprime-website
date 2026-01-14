import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ardentprime.com"
  const currentDate = new Date()

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/support-center`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]

  // Partner pages
  const partners = [
    "hp",
    "ingram-micro",
    "pelco",
    "avigilon",
    "axis",
    "motorola-solutions",
    "cisco",
    "microsoft",
    "paloalto",
    "milestone",
    "vivotek",
    "reolink",
    "fortinet",
    "schneider-electric",
    "td-synnex",
    "dell-technologies",
  ]

  const partnerPages = partners.map((slug) => ({
    url: `${baseUrl}/partners/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // News pages
  const newsIds = ["innovation", "cybersecurity", "infrastructure", "sustainability", "physical-security", "case-study"]

  const newsPages = newsIds.map((id) => ({
    url: `${baseUrl}/news/${id}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...mainPages, ...partnerPages, ...newsPages]
}
