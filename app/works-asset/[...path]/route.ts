import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * Serve static assets from content/works/[slug]/ (imagens referenciadas no MDX).
 * URL: /works-asset/slug/image.png → content/works/slug/image.png
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const pathSegments = (await params).path
  if (!pathSegments || pathSegments.length < 2) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const [slug, ...fileParts] = pathSegments
  const filePath = path.join(process.cwd(), 'content/works', slug, ...fileParts)
  const normalized = path.normalize(filePath)
  const worksDir = path.join(process.cwd(), 'content/works')
  if (!normalized.startsWith(worksDir) || !fs.existsSync(normalized) || !fs.statSync(normalized).isFile()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const buffer = fs.readFileSync(normalized)
  const ext = path.extname(normalized).toLowerCase()
  const types: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  const contentType = types[ext] ?? 'application/octet-stream'
  return new NextResponse(buffer, {
    headers: { 'Content-Type': contentType },
  })
}
