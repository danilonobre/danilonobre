import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  wrapperClass?: string
  /** true = home (logo 160), false = work (logo 80) */
  isHome?: boolean
  /** true = add .page-work to the wrapper (post/work pages) */
  pageWork?: boolean
}

export function Layout({ children, wrapperClass, isHome = false, pageWork = false }: LayoutProps) {
  const wrapperClassName = pageWork ? 'page-wrapper page-work' : 'page-wrapper'
  return (
    <div className={wrapperClassName}>
      <div className="container">
      <Header isHome={isHome} />
      <main className={wrapperClass ?? 'page-main'}>
        {children}
      </main>
      <Footer />
      </div>
    </div>
  )
}
