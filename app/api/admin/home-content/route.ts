import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONTENT_FILE = path.join(process.cwd(), 'content/home-content.json')

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const allowed = ['name', 'description', 'role', 'company', 'companyUrl']
  const sanitized: Record<string, string> = {}
  for (const key of allowed) {
    if (typeof body[key] === 'string') {
      sanitized[key] = body[key]
    }
  }

  fs.writeFileSync(CONTENT_FILE, JSON.stringify(sanitized, null, 2) + '\n', 'utf-8')

  return NextResponse.json({ success: true })
}
