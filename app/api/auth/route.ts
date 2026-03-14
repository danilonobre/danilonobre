import { NextRequest, NextResponse } from 'next/server'
import { validatePassword } from '@/lib/auth'

const COOKIE_NAME = 'portfolio_auth'
const MAX_AGE = 7 * 24 * 60 * 60 // 7 dias em segundos

export async function POST(request: NextRequest) {
  let body: { password?: string; slug?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }

  const { password, slug } = body
  if (typeof password !== 'string' || typeof slug !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Missing password or slug' },
      { status: 400 }
    )
  }

  if (!validatePassword(password)) {
    return NextResponse.json(
      { success: false, error: 'Senha incorreta' },
      { status: 401 }
    )
  }

  const redirect = `/${slug.replace(/^\/+/, '')}`
  const res = NextResponse.json({ success: true, redirect })

  res.cookies.set(COOKIE_NAME, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  })

  return res
}
