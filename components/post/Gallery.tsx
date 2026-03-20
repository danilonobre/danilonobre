import React from 'react'

interface GalleryProps {
  children: React.ReactNode
  shadows?: boolean
  narrow?: boolean
  className?: string
}

/**
 * Gallery — exibe imagens em linha, replicando o Gallery.jsx do Contentful.
 *
 * HTML gerado:
 *   <div class="gallery [gallery-narrow] [has-shadows] [gallery--slug]">
 *     <figure class="gallery__item" style="--image-max-width: Xpx">
 *       <img ... />
 *       <figcaption>alt</figcaption>
 *     </figure>
 *     ...
 *   </div>
 *
 * O `gallery__item` e `--image-max-width` são responsabilidade do GalleryImage,
 * que é registrado como o `img` padrão dentro deste contexto via mdx-components.tsx.
 *
 * Uso no MDX:
 *   <Gallery>
 *     ![Descrição](./imagem.png)
 *     ![Descrição](./imagem2.png)
 *   </Gallery>
 *
 *   <Gallery narrow>          ← class="gallery gallery-narrow"
 *   <Gallery shadows>         ← class="gallery has-shadows"
 *   <Gallery className="gallery--minha-galeria">
 *
 * Classes CSS: `.gallery`, `.gallery-narrow`, `.has-shadows`
 * — definidas em `styles/_works.scss`. Não modificar.
 */
export function Gallery({ children, shadows, narrow, className }: GalleryProps) {
  const classes = [
    'gallery',
    narrow ? 'gallery-narrow' : '',
    shadows ? 'has-shadows' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const unwrappedChildren = React.Children.toArray(children)
    .flatMap((child) => {
      if (React.isValidElement(child) && child.type === 'p') {
        return React.Children.toArray((child.props as { children: React.ReactNode }).children)
      }
      return child
    })
    .filter((child) => !(typeof child === 'string' && child.trim() === ''))

  return <div className={classes}>{unwrappedChildren}</div>
}
