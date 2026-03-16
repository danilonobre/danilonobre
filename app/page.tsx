import { Layout } from '@/components/layout/Layout'
import { WorkList } from '@/components/works/WorkList'
import { getWorks } from '@/lib/works'
import { DevPanel } from '@/components/dev/DevPanel'

export default function HomePage() {
  const works = getWorks()
  const isDev = process.env.NODE_ENV === 'development'

  const devItems = isDev
    ? works.map((w) => ({
        slug: w.pathSlug,
        title: w.title,
        project: w.project ?? null,
        published: w.published,
      }))
    : []

  return (
    <Layout wrapperClass="page-main" isHome>
      <div className="page-intro">
        <h1>
          Hi, I&apos;m <span>Danilo Nobre</span>, a product designer focused on bringing results from user-centered experiences.
        </h1>
        <p>
          Currently <span className="role">Lead Product Designer</span> at{' '}
          <a className="outsystems" href="https://outsystems.com" target="_blank" rel="noopener noreferrer">
            OutSystems
          </a>.
        </p>
      </div>
      <WorkList works={works} />
      {isDev && <DevPanel initialItems={devItems} />}
    </Layout>
  )
}
