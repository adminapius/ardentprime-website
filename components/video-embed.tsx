"use client"

interface VideoEmbedProps {
  url: string
  title: string
}

export function VideoEmbed({ url, title }: VideoEmbedProps) {
  // Extract video ID and determine platform
  const getEmbedUrl = (url: string) => {
    // YouTube patterns
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ]

    // Vimeo pattern
    const vimeoPattern = /vimeo\.com\/(\d+)/

    // Check YouTube
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern)
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }

    // Check Vimeo
    const vimeoMatch = url.match(vimeoPattern)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    // Return original URL if no pattern matches
    return url
  }

  const embedUrl = getEmbedUrl(url)

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted border border-border">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}
