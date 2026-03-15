'use client'

import React from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'

interface HighlightProps {
  icon: string
  title?: string
  children: React.ReactNode
}

/**
 * Highlight — bloco de destaque com ícone Phosphor e texto.
 *
 * HTML gerado:
 *   <div class="highlight">
 *     <div class="highlight__icon"><PhosphorIcon /></div>
 *     <div class="highlight__content">
 *       <span class="highlight__title">TÍTULO</span>
 *       <p>Texto do destaque</p>
 *     </div>
 *   </div>
 *
 * Uso no MDX:
 *   <Highlight icon="Target">
 *     Texto em destaque aqui.
 *   </Highlight>
 *
 *   <Highlight icon="CheckCircle" title="Opportunity #1">
 *     Texto com título opcional.
 *   </Highlight>
 *
 * Props:
 *   icon  — nome do ícone Phosphor em PascalCase (ex: "Target", "CheckCircle", "Lightbulb")
 *   title — texto opcional exibido acima do conteúdo, em uppercase
 *
 * Classes CSS: `.highlight`, `.highlight__icon`, `.highlight__content`, `.highlight__title`
 * — definidas em `styles/_works.scss`.
 */
export function Highlight({ icon, title, children }: HighlightProps) {
  const IconComponent = (PhosphorIcons as unknown as Record<string, React.ComponentType<{ size?: number; weight?: string }>>)[icon]

  return (
    <div className="highlight">
      {IconComponent && (
        <div className="highlight__icon">
          <IconComponent size={40} weight="light" />
        </div>
      )}
      <div className="highlight__content">
        {title && <span className="highlight__title">{title}</span>}
        {children}
      </div>
    </div>
  )
}
