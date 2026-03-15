'use client'

import { useState, useCallback } from 'react'
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
import styles from './admin.module.scss'

interface WorkItem {
  slug: string
  title: string
  project: string | null
  published: boolean
}

interface SortableItemProps {
  item: WorkItem
  index: number
}

function SortableItem({ item, index }: SortableItemProps) {
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

interface AdminSortableListProps {
  initialItems: WorkItem[]
}

export function AdminSortableList({ initialItems }: AdminSortableListProps) {
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
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.wrapper}>
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
    </div>
  )
}
