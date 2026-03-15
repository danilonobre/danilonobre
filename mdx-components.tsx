import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { Gallery } from '@/components/post/Gallery'
import { GalleryNarrow } from '@/components/post/GalleryNarrow'
import { Slideshow } from '@/components/post/Slideshow'
import { GalleryImage } from '@/components/post/GalleryImage'
import { FigmaEmbed } from '@/components/post/FigmaEmbed'
import { Cover } from '@/components/post/Cover'
import { WorkVideo } from '@/components/post/WorkVideo'
import { ResearchBlock } from '@/components/post/ResearchBlock'
import { HypothesisStatement } from '@/components/post/HypothesisStatement'
import { Highlight } from '@/components/post/Highlight'
import { ResearchResults, ResearchResult } from '@/components/post/ResearchResult'

function resolveImageSrc(src: string | undefined, pathSlug: string): string {
  if (!src) return ''
  if (src.startsWith('./')) return `/works-asset/${pathSlug}/${src.slice(2)}`
  if (src.startsWith('/')) return src
  return `/works-asset/${pathSlug}/${src}`
}

/**
 * mdx-components.tsx — mapeamento global de componentes MDX.
 *
 * LÓGICA CENTRAL:
 * No Contentful, o WorkContent.jsx recebia `work.body` (rich text)
 * e renderizava Gallery/Slideshow com arrays de assets resolvidos.
 * Aqui, os componentes recebem imagens markdown como children,
 * e o `img` padrão é substituído por GalleryImage quando dentro
 * de Gallery/Slideshow.
 *
 * COMPONENTES DISPONÍVEIS NOS MDX:
 *
 * <Gallery>
 *   ![Descrição da imagem](./img.png)
 * </Gallery>
 *
 * <Gallery narrow>
 *   ![Descrição](./img.png)
 *   ![Descrição](./img2.png)
 * </Gallery>
 *
 * <Gallery shadows>
 *   ![Descrição](./img.png)
 * </Gallery>
 *
 * <Gallery className="gallery--meu-slug">
 *   ...
 * </Gallery>
 *
 * <Slideshow>
 *   ![Descrição](./img1.png)
 *   ![Descrição](./img2.png)
 *   ![Descrição](./img3.png)
 * </Slideshow>
 *
 * <Slideshow shadows>
 *   ...
 * </Slideshow>
 *
 * <FigmaEmbed url="..." urlMobile="..." />
 * ↑ Normalmente não necessário no MDX — o WorkTemplate injeta
 *   automaticamente quando frontmatter.figma está preenchido.
 *
 * NOTAS:
 * - O `img` global é sobrescrito por GalleryImage, que gera
 *   `figure.gallery__item` com `--image-max-width` calculado via onLoad.
 *   Isso replica exatamente o comportamento do Gallery.jsx do Contentful.
 * - Imagens fora de Gallery/Slideshow também passam por GalleryImage,
 *   produzindo `figure.gallery__item`. Se necessário criar uma exceção
 *   para imagens standalone (ex: cover), fazer via WorkTemplate diretamente.
 */
const assetBasePath = (pathSlug: string) => `/works-asset/${pathSlug}`

/** Componentes MDX com resolução de imagens relativas para um work (pathSlug). */
export function getMDXComponents(pathSlug: string): MDXComponents {
  const basePath = assetBasePath(pathSlug)
  return {
    p: ({ children }: { children?: React.ReactNode }) => {
      const childArray = React.Children.toArray(children)
      const hasBlockElement = childArray.some(
        (child) => React.isValidElement(child) && typeof child.type !== 'string'
      )
      if (hasBlockElement) return <>{children}</>
      return <p>{children}</p>
    },
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <GalleryImage src={resolveImageSrc(src, pathSlug)} alt={alt} />
    ),
    GalleryImage: ({ src, alt }: { src?: string; alt?: string }) => (
      <div className="gallery has-shadows">
        <GalleryImage src={resolveImageSrc(src, pathSlug)} alt={alt} />
      </div>
    ),
    Gallery,
    GalleryNarrow,
    Slideshow,
    FigmaEmbed,
    Cover: (props: { src: string; alt: string }) => (
      <Cover src={props.src} alt={props.alt} basePath={basePath} />
    ),
    WorkVideo,
    Highlight,
    ResearchResults,
    ResearchResult,
    HypothesisStatement,
    ResearchBlock,
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <GalleryImage src={src ?? ''} alt={alt} />
    ),
    GalleryImage: ({ src, alt }: { src?: string; alt?: string }) => (
      <div className="gallery has-shadows">
        <GalleryImage src={src ?? ''} alt={alt} />
      </div>
    ),
    Gallery,
    GalleryNarrow,
    Slideshow,
    FigmaEmbed,
    Cover,
    WorkVideo,
    Highlight,
    ResearchResults,
    ResearchResult,
    HypothesisStatement,
    ResearchBlock,
    ...components,
  }
}
