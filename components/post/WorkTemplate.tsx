import React from 'react'
import { FigmaEmbed } from './FigmaEmbed'
import { MoreWorks } from './MoreWorks'
import type { WorkFrontmatter } from '@/lib/works'

interface WorkTemplateProps {
  frontmatter: WorkFrontmatter
  /** Conteúdo MDX (opcional quando figma está preenchido) */
  children?: React.ReactNode
  /** Slug da URL (pasta do work) para MoreWorks e assets */
  pathSlug: string
  cover?: string
  intro?: string
  /** Base path para imagens (ex: /works-asset/slug) */
  assetBasePath?: string
}

const IconCompany = () => (
  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.67885 0.407986C8.40801 0.197338 8.02877 0.197338 7.75794 0.407986L0.539544 6.02229C0.356855 6.16438 0.25 6.38286 0.25 6.61431V15.4368C0.25 16.0611 0.498019 16.6599 0.939496 17.1014C1.38097 17.5429 1.97974 17.7909 2.60409 17.7909L5.8122 17.7909H10.6245L13.8327 17.7909C14.457 17.7909 15.0558 17.5429 15.4973 17.1014C15.9388 16.6599 16.1868 16.0611 16.1868 15.4368V6.61431C16.1868 6.38286 16.0799 6.16438 15.8972 6.02229L8.67885 0.407986ZM11.3745 16.2909H13.8327C14.0592 16.2909 14.2765 16.2009 14.4366 16.0407C14.5968 15.8805 14.6868 15.6633 14.6868 15.4368V6.98112L8.21839 1.95015L1.75 6.98112V15.4368C1.75 15.6633 1.83998 15.8805 2.00016 16.0407C2.16033 16.2009 2.37757 16.2909 2.60409 16.2909H5.0622V9.02044C5.0622 8.60622 5.39798 8.27044 5.8122 8.27044H10.6245C11.0387 8.27044 11.3745 8.60622 11.3745 9.02044V16.2909ZM6.5622 16.2909V9.77044H9.87446V16.2909H6.5622Z" fill="black"/>
  </svg>
)

const IconTimeline = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0227 0.818176C13.0227 0.403963 12.6869 0.0681763 12.2727 0.0681763C11.8585 0.0681763 11.5227 0.403963 11.5227 0.818176V1.70454H6.47726V0.818176C6.47726 0.403963 6.14148 0.0681763 5.72726 0.0681763C5.31305 0.0681763 4.97726 0.403963 4.97726 0.818176V1.70454H3.27272C1.95476 1.70454 0.886353 2.77295 0.886353 4.0909V7.36363V15.5454C0.886353 16.8634 1.95476 17.9318 3.27272 17.9318H14.7273C16.0452 17.9318 17.1136 16.8634 17.1136 15.5454V7.36363V4.0909C17.1136 2.77295 16.0452 1.70454 14.7273 1.70454H13.0227V0.818176ZM15.6136 6.61363V4.0909C15.6136 3.60138 15.2168 3.20454 14.7273 3.20454H13.0227V4.0909C13.0227 4.50512 12.6869 4.8409 12.2727 4.8409C11.8585 4.8409 11.5227 4.50512 11.5227 4.0909V3.20454H6.47726V4.0909C6.47726 4.50512 6.14148 4.8409 5.72726 4.8409C5.31305 4.8409 4.97726 4.50512 4.97726 4.0909V3.20454H3.27272C2.78319 3.20454 2.38635 3.60138 2.38635 4.0909V6.61363H15.6136ZM2.38635 8.11363H15.6136V15.5454C15.6136 16.035 15.2168 16.4318 14.7273 16.4318H3.27272C2.78319 16.4318 2.38635 16.035 2.38635 15.5454V8.11363Z" fill="black"/>
  </svg>
)

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66667 7.33331V4.66665C4.66667 3.78259 5.01786 2.93474 5.64298 2.30962C6.2681 1.6845 7.11595 1.33331 8 1.33331C8.88406 1.33331 9.7319 1.6845 10.357 2.30962C10.9821 2.93474 11.3333 3.78259 11.3333 4.66665V7.33331M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="#0C0C0C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
)

export function WorkTemplate({ frontmatter, children, pathSlug, cover, intro, assetBasePath }: WorkTemplateProps) {
  const { title, project, timeline, private: isPrivate, figma, figmaMobile } = frontmatter

  if (figma) {
    return <FigmaEmbed url={figma} urlMobile={figmaMobile} />
  }

  return (
    <section className="block-works block-works-full">
      <article className="work">
        <header className="work-header">
          {isPrivate && (
            <div className="restricted-indicator">
              <a href="javascript:void(0);" className="indicator">
                <IconLock /> <span>Restricted page</span>
              </a>
              <div className="tooltip">
                This study case aims to design demonstration only and does not intend to breach any NDA agreements or disclose sensitive information.
              </div>
            </div>
          )}
          <h1 className="work-title">{title}</h1>
          <div className="work-info">
            {project && (
              <div className="work-company">
                <i aria-hidden><IconCompany /></i>
                <span>{project}</span>
              </div>
            )}
            {timeline && (
              <div className="work-timeline">
                <i aria-hidden><IconTimeline /></i>
                <span>{timeline}</span>
              </div>
            )}
          </div>
        </header>

        {cover && (
          <div className="work-cover">
            {assetBasePath ? (
              <img
                src={`${assetBasePath}/${cover.startsWith('./') ? cover.slice(2) : cover}`}
                alt=""
              />
            ) : (
              <img src={cover} alt="" />
            )}
          </div>
        )}
        {intro && (
          <div className="work-intro">
            <p>{intro}</p>
          </div>
        )}
        {children != null && <div className="work-body">{children}</div>}
      </article>
      <MoreWorks exclude={pathSlug} />
    </section>
  )
}
