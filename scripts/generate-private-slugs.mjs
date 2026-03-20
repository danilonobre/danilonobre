import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WORKS_DIR = path.join(process.cwd(), 'content/works')
const OUT_FILE = path.join(process.cwd(), 'lib/private-slugs.ts')

let slugs = []
if (fs.existsSync(WORKS_DIR)) {
  slugs = fs.readdirSync(WORKS_DIR).filter((name) => {
    const dir = path.join(WORKS_DIR, name)
    const mdx = path.join(dir, 'index.mdx')
    return fs.statSync(dir).isDirectory() && fs.existsSync(mdx)
  })
}

const privateSlugs = []
for (const slug of slugs) {
  const raw = fs.readFileSync(path.join(WORKS_DIR, slug, 'index.mdx'), 'utf-8')
  const { data } = matter(raw)
  if (data.private === true) privateSlugs.push(slug)
}

const content = `/**
 * Lista de slugs de posts privados. Usado pelo middleware (Edge).
 * Gerado em build por: node scripts/generate-private-slugs.mjs
 * Não usar fs aqui — este arquivo é importado pelo middleware.
 */
export const PRIVATE_SLUGS: string[] = ${JSON.stringify(privateSlugs)}
`

fs.writeFileSync(OUT_FILE, content, 'utf-8')
console.log('Generated lib/private-slugs.ts with', privateSlugs.length, 'private slug(s)')
