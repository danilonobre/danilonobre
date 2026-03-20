import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  /** true = home (logo 160x160), false = work (logo 80x80) */
  isHome?: boolean
}

const logoSize = { home: 160, work: 80 }

export function Header({ isHome = false }: HeaderProps) {
  const size = logoSize[isHome ? 'home' : 'work']
  return (
    <header className="page-header">
      <Link href="/" className="page-logo" aria-label="Danilo Nobre - Home">
        <Image
          src="/images/danilonobre-ui-designer.png"
          alt=""
          width={size}
          height={size}
          priority
        />
      </Link>
    </header>
  )
}
