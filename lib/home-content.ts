import fs from 'fs'
import path from 'path'

export interface HomeContent {
  name: string
  description: string
  role: string
  company: string
  companyUrl: string
}

const CONTENT_FILE = path.join(process.cwd(), 'content/home-content.json')

const DEFAULTS: HomeContent = {
  name: 'Danilo Nobre',
  description: 'a product designer focused on bringing results from user-centered experiences.',
  role: 'Lead Product Designer',
  company: 'OutSystems',
  companyUrl: 'https://outsystems.com',
}

export function getHomeContent(): HomeContent {
  if (!fs.existsSync(CONTENT_FILE)) return DEFAULTS
  try {
    return { ...DEFAULTS, ...JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8')) }
  } catch {
    return DEFAULTS
  }
}
