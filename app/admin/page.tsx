import { getWorks } from '@/lib/works'
import { notFound } from 'next/navigation'
import { AdminSortableList } from './AdminSortableList'

export default function AdminPage() {
  if (process.env.NODE_ENV !== 'development') return notFound()

  const works = getWorks()
  const items = works.map((w) => ({
    slug: w.pathSlug,
    title: w.title,
    project: w.project ?? null,
    published: w.published,
  }))

  return (
    <div className="admin-page">
      <h1>Reorder works</h1>
      <p>Drag to reorder. Click save to persist to <code>works-order.json</code>.</p>
      <AdminSortableList initialItems={items} />
    </div>
  )
}
