"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1 text-sm ${className}`}>
      <ol className="flex items-center space-x-1" itemScope itemType="https://schema.org/BreadcrumbList">
        <li 
          className="flex items-center"
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center"
            itemProp="item"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only" itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" aria-hidden="true" />
            {item.href ? (
              <Link 
                href={item.href} 
                className="text-muted-foreground hover:text-primary transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-foreground font-medium" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Schema.org BreadcrumbList JSON-LD generator for use in page metadata
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = "https://ardentprime.com") {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  ]

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  }
}
