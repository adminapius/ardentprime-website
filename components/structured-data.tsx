// JSON-LD Structured Data for SEO
// Helps search engines understand the business and display rich results

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ardent Prime Innovations LLC",
    alternateName: "Ardent Prime",
    url: "https://ardentprime.com",
    logo: "https://ardentprime.com/logo.png",
    description:
      "Enterprise IT solutions, infrastructure services, and managed IT support. From startups to Fortune 500 companies, we deliver technology that drives growth.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2803 Pheasant Run",
      addressLocality: "South Bend",
      addressRegion: "IN",
      postalCode: "46628",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-574-855-1117",
        contactType: "sales",
        email: "sales@ardentprime.com",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-574-855-1117",
        contactType: "customer support",
        email: "support@ardentprime.com",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      // Add social media profiles here when available
      // "https://www.linkedin.com/company/ardentprime",
      // "https://twitter.com/ardentprime",
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    knowsAbout: [
      "IT Infrastructure",
      "Network Security",
      "Managed IT Services",
      "Cloud Computing",
      "Cybersecurity",
      "Technology Consulting",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ardentprime.com/#localbusiness",
    name: "Ardent Prime Innovations LLC",
    image: "https://ardentprime.com/og-image.jpg",
    url: "https://ardentprime.com",
    telephone: "+1-574-855-1117",
    email: "info@ardentprime.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2803 Pheasant Run",
      addressLocality: "South Bend",
      addressRegion: "IN",
      postalCode: "46628",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.6764,
      longitude: -86.2520,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    servesCuisine: undefined,
    aggregateRating: undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ardentprime.com/#website",
    url: "https://ardentprime.com",
    name: "Ardent Prime Innovations LLC",
    description: "Enterprise IT solutions and managed services",
    publisher: {
      "@id": "https://ardentprime.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ardentprime.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ServiceSchemaProps {
  name: string
  description: string
  url: string
}

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Ardent Prime Innovations LLC",
      url: "https://ardentprime.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "IT Services",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Video Schema for partner pages with YouTube embeds
interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl: string
  embedUrl: string
  duration?: string
}

export function VideoSchema({ 
  name, 
  description, 
  thumbnailUrl, 
  uploadDate, 
  contentUrl, 
  embedUrl,
  duration 
}: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    embedUrl,
    duration: duration || "PT5M", // Default 5 minutes if not specified
    publisher: {
      "@type": "Organization",
      name: "Ardent Prime Innovations LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://ardentprime.com/logo.png",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Article Schema for news/blog posts
interface ArticleSchemaProps {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
  url: string
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Ardent Prime Team",
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: `https://ardentprime.com${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Ardent Prime Innovations LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://ardentprime.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
