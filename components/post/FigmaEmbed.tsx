import React from 'react'

interface FigmaEmbedProps {
  url: string
  urlMobile?: string
}

function toEmbedUrl(url: string): string {
  if (url.includes('embed.figma.com')) return url

  const embedded = url.replace('www.figma.com', 'embed.figma.com')
  const parsed = new URL(embedded)
  if (!parsed.searchParams.has('embed-host')) {
    parsed.searchParams.set('embed-host', 'share')
  }
  return parsed.toString()
}

export function FigmaEmbed({ url, urlMobile }: FigmaEmbedProps) {
  return (
    <>
      <div className="block-figma">
        <iframe src={toEmbedUrl(url)} title="Figma prototype" allowFullScreen />
      </div>

      {urlMobile && (
        <div className="block-figma-mobile">
          <iframe src={toEmbedUrl(urlMobile)} title="Figma prototype mobile" allowFullScreen />
        </div>
      )}
    </>
  )
}
