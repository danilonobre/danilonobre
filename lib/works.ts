/**
 * Listagem e leitura de works a partir de /content/works/.
 * PRIVATE_SLUGS é exportado de lib/private-slugs.ts (gerado no build) para uso no middleware.
 */

import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export { PRIVATE_SLUGS } from './private-slugs'

const WORKS_DIR = path.join(process.cwd(), 'content/works')

export interface WorkFrontmatter {
  title: string
  slug: string
  published: boolean
  project?: string
  timeline?: string
  private?: boolean
  figma?: string
  figmaMobile?: string
  /** Texto de introdução exibido no header do post (work-intro) */
  intro?: string
  /** Nome do arquivo da imagem de capa (na pasta do work), ex: "delivery-truck.jpg" */
  cover?: string
}

function getWorkSlugs(): string[] {
  if (!fs.existsSync(WORKS_DIR)) return []
  return fs.readdirSync(WORKS_DIR).filter((name) => {
    const dir = path.join(WORKS_DIR, name)
    return fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'index.mdx'))
  })
}

/** Frontmatter + path slug (pasta do work) usado na URL /<pathSlug> */
export interface WorkItem extends WorkFrontmatter {
  pathSlug: string
}

export function getWorks(): WorkItem[] {
  const slugs = getWorkSlugs()
  const works: WorkItem[] = []
  for (const pathSlug of slugs) {
    const frontmatter = getWorkFrontmatter(pathSlug)
    const isDev = process.env.NODE_ENV === 'development'
    if (!frontmatter || (!frontmatter.published && !isDev)) continue
    works.push({ ...frontmatter, pathSlug })
  }
  let slugOrder: string[] = []
  const orderFile = path.join(process.cwd(), 'content/works-order.json')
  if (fs.existsSync(orderFile)) {
    slugOrder = JSON.parse(fs.readFileSync(orderFile, 'utf-8'))
  }

  works.sort((a, b) => {
    if (slugOrder.length === 0) return 0
    const ai = slugOrder.indexOf(a.pathSlug)
    const bi = slugOrder.indexOf(b.pathSlug)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return works
}

export function getWorkFrontmatter(slug: string): WorkFrontmatter | null {
  const filePath = path.join(WORKS_DIR, slug, 'index.mdx')
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return data as WorkFrontmatter
}

export function getWorkContent(slug: string): string | null {
  const filePath = path.join(WORKS_DIR, slug, 'index.mdx')
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return content
}
