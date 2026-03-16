'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './DevPanel.module.scss'

interface WorkItem {
  slug: string
  title: string
  project: string | null
  published: boolean
}

function SortableItem({ item, index }: { item: WorkItem; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.slug,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className={styles.item} {...attributes} {...listeners}>
      <span className={styles.index}>{index + 1}</span>
      <div className={styles.info}>
        <span className={styles.title}>{item.title}</span>
        {item.project && <span className={styles.project}>{item.project}</span>}
      </div>
      {!item.published && <span className={styles.draft}>Draft</span>}
      <span className={styles.handle}>⠿</span>
    </div>
  )
}

interface DevPanelProps {
  initialItems: WorkItem[]
}

export function DevPanel({ initialItems }: DevPanelProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initialItems)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [dirty, setDirty] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.slug === active.id)
        const newIndex = prev.findIndex((i) => i.slug === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
      setDirty(true)
      setStatus('idle')
    }
  }, [])

  const handleSave = async () => {
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs: items.map((i) => i.slug) }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setStatus('saved')
      setDirty(false)
      router.refresh()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Reorder works"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.66667 7.33331V4.66665C4.66667 3.78259 5.01786 2.93474 5.64298 2.30962C6.2681 1.6845 7.11595 1.33331 8 1.33331C8.88406 1.33331 9.7319 1.6845 10.357 2.30962C10.9821 2.93474 11.3333 3.78259 11.3333 4.66665V7.33331M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Reorder works</h2>
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close panel">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => i.slug)} strategy={verticalListSortingStrategy}>
            <div className={styles.list}>
              {items.map((item, index) => (
                <SortableItem key={item.slug} item={item} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave} disabled={!dirty || status === 'saving'}>
            {status === 'saving' ? 'Saving…' : 'Save order'}
          </button>
          {status === 'saved' && <span className={styles.feedback}>Saved!</span>}
          {status === 'error' && <span className={styles.feedbackError}>Error saving. Try again.</span>}
        </div>
      </aside>
    </>
  )
}
