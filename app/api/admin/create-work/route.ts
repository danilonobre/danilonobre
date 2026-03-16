import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const WORKS_DIR = path.join(process.cwd(), 'content/works')
const ORDER_FILE = path.join(process.cwd(), 'content/works-order.json')

interface CreateWorkBody {
  title?: string
  slug?: string
  published?: boolean
  project?: string
  timeline?: string
  private?: boolean
  intro?: string
  cover?: string
  figma?: string
  figmaMobile?: string
  body?: string
  overwrite?: boolean
}

function buildFrontmatter(data: CreateWorkBody): string {
  const lines: string[] = []

  lines.push(`title: "${data.title}"`)
  lines.push(`slug: "${data.slug}"`)
  lines.push(`published: ${data.published ?? false}`)

  if (data.project) lines.push(`project: "${data.project}"`)
  if (data.timeline) lines.push(`timeline: '${data.timeline}'`)
  if (data.private) lines.push(`private: true`)
  if (data.intro) lines.push(`intro: "${data.intro}"`)
  if (data.cover) lines.push(`cover: "${data.cover}"`)
  if (data.figma) lines.push(`figma: "${data.figma}"`)
  if (data.figmaMobile) lines.push(`figmaMobile: "${data.figmaMobile}"`)

  return `---\n${lines.join('\n')}\n---`
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: CreateWorkBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { title, slug, overwrite } = body

  if (!title || typeof title !== 'string' || !title.trim()) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  if (!slug || typeof slug !== 'string' || !slug.trim()) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json(
      { error: 'slug must contain only lowercase letters, numbers, and hyphens' },
      { status: 400 }
    )
  }

  const workDir = path.join(WORKS_DIR, slug)
  const mdxFile = path.join(workDir, 'index.mdx')

  if (fs.existsSync(workDir) && !overwrite) {
    return NextResponse.json({ error: 'Work already exists' }, { status: 409 })
  }

  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir, { recursive: true })
  }

  const frontmatter = buildFrontmatter(body)
  const mdxBody = body.body?.trim() || ''
  const content = mdxBody ? `${frontmatter}\n\n${mdxBody}\n` : `${frontmatter}\n`

  fs.writeFileSync(mdxFile, content, 'utf-8')

  let order: string[] = []
  try {
    order = JSON.parse(fs.readFileSync(ORDER_FILE, 'utf-8'))
  } catch {
    // file doesn't exist or is invalid
  }

  if (!order.includes(slug)) {
    order.unshift(slug)
    fs.writeFileSync(ORDER_FILE, JSON.stringify(order, null, 2) + '\n', 'utf-8')
  }

  return NextResponse.json({ slug }, { status: 201 })
}
