import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getWorkFrontmatter, getWorkContent, getWorks } from '@/lib/works'
import { Layout } from '@/components/layout/Layout'
import { WorkTemplate } from '@/components/post/WorkTemplate'
import { CreatePostForm } from '@/components/dev/CreatePostForm'
import { getMDXComponents } from '@/mdx-components'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const works = getWorks()
  return works.map((w) => ({ slug: w.pathSlug }))
}

function buildInitialData(frontmatter: ReturnType<typeof getWorkFrontmatter>, slug: string, body: string | null) {
  return {
    title: frontmatter!.title,
    slug,
    published: frontmatter!.published,
    project: frontmatter!.project ?? '',
    timeline: frontmatter!.timeline ?? '',
    private: frontmatter!.private ?? false,
    intro: frontmatter!.intro ?? '',
    cover: frontmatter!.cover ?? '',
    figma: frontmatter!.figma ?? '',
    figmaMobile: frontmatter!.figmaMobile ?? '',
    body: body ?? '',
  }
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

  const components = getMDXComponents(slug)

  const template = (
    <WorkTemplate
      frontmatter={frontmatter}
      pathSlug={slug}
      assetBasePath={assetBasePath}
      intro={frontmatter.intro}
      cover={frontmatter.cover}
    >
      {rawContent ? <MDXRemote source={rawContent} components={components} /> : undefined}
    </WorkTemplate>
  )

  if (!isDev) {
    return (
      <Layout wrapperClass="page-main" isHome={false} pageWork>
        {template}
      </Layout>
    )
  }

  return (
    <Layout wrapperClass="page-main" isHome={false} pageWork>
      <CreatePostForm initialData={buildInitialData(frontmatter, slug, rawContent)}>
        {template}
      </CreatePostForm>
    </Layout>
  )
}
