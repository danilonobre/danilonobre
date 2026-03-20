import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PRIVATE_SLUGS } from '@/lib/private-slugs'

/**
 * Proteção de rotas privadas.
 * Redireciona /<slug> para /<slug>/password quando o post tem private: true e não há cookie válido.
 * /<slug>/password não é interceptada para evitar loop.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exemplo: /vr-gerenciadora ou /outsystems-push-notification-composer
  const slugMatch = pathname.match(/^\/([^/]+)\/?$/)
  if (!slugMatch) return NextResponse.next()

  const slug = slugMatch[1]
  if (!PRIVATE_SLUGS.includes(slug)) return NextResponse.next()

  const cookie = request.cookies.get('portfolio_auth')
  if (cookie?.value) return NextResponse.next()

  const redirectUrl = new URL(pathname + '/password', request.url)
  redirectUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)'],
}
