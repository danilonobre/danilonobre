'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import type { WorkItem } from '@/lib/works'
import type { HomeContent } from '@/lib/home-content'

interface DevModeContextValue {
  devMode: boolean
  hasPendingChanges: boolean
  saving: boolean
  openDevMode: () => void
  saveAndClose: () => Promise<void>

  items: WorkItem[]
  setItems: (items: WorkItem[]) => void

  homeContent: HomeContent
  updateHomeField: (field: keyof HomeContent, value: string) => void
}

const DevModeContext = createContext<DevModeContextValue | null>(null)

export function useDevMode() {
  return useContext(DevModeContext)
}

interface DevModeProviderProps {
  works: WorkItem[]
  initialContent: HomeContent
  children: ReactNode
}

export function DevModeProvider({ works, initialContent, children }: DevModeProviderProps) {
  const router = useRouter()
  const [devMode, setDevMode] = useState(false)
  const [saving, setSaving] = useState(false)

  const [items, setItemsState] = useState(works)
  const [orderDirty, setOrderDirty] = useState(false)

  const [homeContent, setHomeContent] = useState(initialContent)
  const [contentDirty, setContentDirty] = useState(false)

  const hasPendingChanges = orderDirty || contentDirty

  const openDevMode = useCallback(() => setDevMode(true), [])

  const setItems = useCallback((newItems: WorkItem[]) => {
    setItemsState(newItems)
    setOrderDirty(true)
  }, [])

  const updateHomeField = useCallback((field: keyof HomeContent, value: string) => {
    setHomeContent((prev) => ({ ...prev, [field]: value }))
    setContentDirty(true)
  }, [])

  const saveAndClose = useCallback(async () => {
    setSaving(true)
    try {
      const promises: Promise<Response>[] = []

      if (orderDirty) {
        promises.push(
          fetch('/api/admin/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slugs: items.map((i) => i.pathSlug) }),
          })
        )
      }

      if (contentDirty) {
        promises.push(
          fetch('/api/admin/home-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(homeContent),
          })
        )
      }

      const results = await Promise.all(promises)
      if (results.some((r) => !r.ok)) throw new Error('Failed to save')

      setOrderDirty(false)
      setContentDirty(false)
      setDevMode(false)
      router.refresh()
    } catch {
      // keep dev mode open on error so user can retry
    } finally {
      setSaving(false)
    }
  }, [orderDirty, contentDirty, items, homeContent, router])

  return (
    <DevModeContext.Provider
      value={{
        devMode,
        hasPendingChanges,
        saving,
        openDevMode,
        saveAndClose,
        items,
        setItems,
        homeContent,
        updateHomeField,
      }}
    >
      {children}
    </DevModeContext.Provider>
  )
}
