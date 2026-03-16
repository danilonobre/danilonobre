'use client'

import { useCallback } from 'react'
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
import { useDevMode } from '@/components/dev/DevModeProvider'
import { WorkCard } from './WorkCard'
import type { WorkItem } from '@/lib/works'
import devStyles from '@/components/dev/DevMode.module.scss'

function SortableWorkCard({ work }: { work: WorkItem }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: work.pathSlug,
  })

  return (
    <WorkCard
      ref={setNodeRef}
      work={work}
      devMode
      dragListeners={listeners}
      dragHandleClass={devStyles.dragHandle}
      sortableStyle={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
      sortableAttributes={attributes}
    />
  )
}

export function WorkListSortable() {
  const ctx = useDevMode()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!ctx) return
      const { active, over } = event
      if (over && active.id !== over.id) {
        const oldIndex = ctx.items.findIndex((i) => i.pathSlug === active.id)
        const newIndex = ctx.items.findIndex((i) => i.pathSlug === over.id)
        ctx.setItems(arrayMove(ctx.items, oldIndex, newIndex))
      }
    },
    [ctx]
  )

  if (!ctx) return null

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ctx.items.map((i) => i.pathSlug)} strategy={verticalListSortingStrategy}>
        <section className="block-works block-works-banner">
          {ctx.items.map((work) => (
            <SortableWorkCard key={work.pathSlug} work={work} />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  )
}
