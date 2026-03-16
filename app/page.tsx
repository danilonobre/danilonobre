import { Layout } from '@/components/layout/Layout'
import { WorkList } from '@/components/works/WorkList'
import { getWorks } from '@/lib/works'
import { getHomeContent } from '@/lib/home-content'
import { DevModeProvider } from '@/components/dev/DevModeProvider'
import { DevToolbar } from '@/components/dev/DevToolbar'
import { PageIntro } from '@/components/home/PageIntro'

export default function HomePage() {
  const works = getWorks()
  const homeContent = getHomeContent()
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    return (
      <Layout wrapperClass="page-main" isHome>
        <PageIntro content={homeContent} />
        <WorkList works={works} />
      </Layout>
    )
  }

  return (
    <DevModeProvider works={works} initialContent={homeContent}>
      <Layout wrapperClass="page-main" isHome>
        <PageIntro content={homeContent} />
        <WorkList works={works} />
        <DevToolbar />
      </Layout>
    </DevModeProvider>
  )
}
