import React from 'react'

interface FigmaEmbedProps {
  url: string
  urlMobile?: string
}

/**
 * FigmaEmbed — embed de protótipo Figma em tela cheia.
 * Replica o componente figma.js do Gatsby/Contentful.
 *
 * HTML gerado (idêntico ao original):
 *   <div class="block-figma">
 *     <iframe src="..." />
 *   </div>
 *   <div class="block-figma-mobile">   ← só se urlMobile fornecida
 *     <iframe src="..." />
 *   </div>
 *
 * Usado de duas formas:
 * 1. Automaticamente pelo WorkTemplate quando frontmatter tem `figma` — igual ao original
 * 2. Diretamente no MDX se necessário:
 *    <FigmaEmbed url="https://figma.com/proto/..." urlMobile="..." />
 *
 * Classes CSS: `.block-figma`, `.block-figma-mobile`
 * — definidas em `styles/_works.scss`. Não modificar.
 */
export function FigmaEmbed({ url, urlMobile }: FigmaEmbedProps) {
  return (
    <>
      <div className="block-figma">
        <iframe src={url} title="Figma prototype" allowFullScreen />
      </div>

      {urlMobile && (
        <div className="block-figma-mobile">
          <iframe src={urlMobile} title="Figma prototype mobile" allowFullScreen />
        </div>
      )}
    </>
  )
}
