import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getWorkFrontmatter, getWorkContent, getWorks } from '@/lib/works'
import { Layout } from '@/components/layout/Layout'
import { WorkTemplate } from '@/components/post/WorkTemplate'
import { getMDXComponents } from '@/mdx-components'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const works = getWorks()
  return works.map((w) => ({ slug: w.pathSlug }))
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params
  const frontmatter = getWorkFrontmatter(slug)
  const rawContent = getWorkContent(slug)

  const isDev = process.env.NODE_ENV === 'development'
  if (!frontmatter || (!frontmatter.published && !isDev)) notFound()

  const assetBasePath = `/works-asset/${slug}`

  if (frontmatter.figma) {
    return (
      <WorkTemplate frontmatter={frontmatter} pathSlug={slug} />
    )
  }

  if (!rawContent) {
    return (
      <Layout wrapperClass="page-main" isHome={false} pageWork>
        <WorkTemplate frontmatter={frontmatter} pathSlug={slug} assetBasePath={assetBasePath} intro={frontmatter.intro} cover={frontmatter.cover} />
      </Layout>
    )
  }

  const components = getMDXComponents(slug)

  return (
    <Layout wrapperClass="page-main" isHome={false} pageWork>
      <WorkTemplate
        frontmatter={frontmatter}
        pathSlug={slug}
        assetBasePath={assetBasePath}
        intro={frontmatter.intro}
        cover={frontmatter.cover}
      >
        <MDXRemote source={rawContent} components={components} />
      </WorkTemplate>
    </Layout>
  )
}
