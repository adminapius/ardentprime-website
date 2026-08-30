import { headers } from "next/headers"
import { ArticleSchema } from "@/components/structured-data"
import { articlesData, toISODate } from "./articles-data"

export default async function NewsArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const article = articlesData[params.id]
  const nonce = (await headers()).get("x-nonce") ?? undefined

  return (
    <>
      {article && (
        <ArticleSchema
          headline={article.title}
          description={article.excerpt}
          image={article.image}
          datePublished={toISODate(article.date)}
          author={article.author}
          url={`https://ardentprime.com/news/${params.id}`}
          nonce={nonce}
        />
      )}
      {children}
    </>
  )
}
