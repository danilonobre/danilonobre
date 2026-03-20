import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ORDER_FILE = path.join(process.cwd(), 'content/works-order.json')

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: { slugs?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { slugs } = body
  if (!Array.isArray(slugs) || slugs.some((s) => typeof s !== 'string')) {
    return NextResponse.json({ error: 'slugs must be an array of strings' }, { status: 400 })
  }

  fs.writeFileSync(ORDER_FILE, JSON.stringify(slugs, null, 2) + '\n', 'utf-8')

  return NextResponse.json({ success: true })
}
