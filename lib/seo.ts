import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    url?: string
    siteName?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    locale?: string
    type?: string
  }
}

export function generateMetadata({ title, description, keywords = [], canonical, openGraph }: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://calculadorahub.com.br"

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: openGraph
      ? {
          title: openGraph.title || title,
          description: openGraph.description || description,
          url: openGraph.url ? `${baseUrl}${openGraph.url}` : undefined,
          siteName: openGraph.siteName || "Calculadoras Online",
          images: openGraph.images || [
            {
              url: `${baseUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: "Calculadoras Online",
            },
          ],
          locale: openGraph.locale || "pt_BR",
          type: openGraph.type || "website",
        }
      : undefined,
  }
}
