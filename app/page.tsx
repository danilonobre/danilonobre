import { Layout } from '@/components/layout/Layout'
import { WorkList } from '@/components/works/WorkList'
import { getWorks } from '@/lib/works'

export default function HomePage() {
  const works = getWorks()
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
    </Layout>
  )
}
