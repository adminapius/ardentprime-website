import { headers } from "next/headers"
import { VideoSchema } from "@/components/structured-data"
import { partnersData, getYouTubeVideoId } from "./partners-data"

export default async function PartnerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const partner = partnersData[params.slug]
  const videoId = partner?.videoUrl ? getYouTubeVideoId(partner.videoUrl) : null
  const nonce = (await headers()).get("x-nonce") ?? undefined

  return (
    <>
      {partner?.videoUrl && videoId && (
        <VideoSchema
          name={`${partner.name} Overview Video`}
          description={partner.description}
          thumbnailUrl={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          uploadDate="2024-01-01"
          contentUrl={partner.videoUrl}
          embedUrl={`https://www.youtube.com/embed/${videoId}`}
          nonce={nonce}
        />
      )}
      {children}
    </>
  )
}
