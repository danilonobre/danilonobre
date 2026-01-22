import React, { lazy, Suspense } from "react"

export default function LazyContent({ importFn, fallback }) {
  const Component = lazy(importFn)

  return (
    <Suspense fallback={fallback || <p>Carregando conteúdo…</p>}>
      <Component />
    </Suspense>
  )
}