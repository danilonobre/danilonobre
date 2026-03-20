import { notFound } from 'next/navigation'
import { Layout } from '@/components/layout/Layout'
import { CreatePostForm } from '@/components/dev/CreatePostForm'

export default function NewPostPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <Layout wrapperClass="page-main" isHome={false} pageWork>
      <CreatePostForm />
    </Layout>
  )
}
