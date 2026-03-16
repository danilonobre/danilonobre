'use client'

import { useState, useCallback, useRef, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import styles from './DevMode.module.scss'

export interface PostData {
  title: string
  slug: string
  published: boolean
  project: string
  timeline: string
  private: boolean
  intro: string
  cover: string
  figma: string
  figmaMobile: string
  body: string
}

const INITIAL_DATA: PostData = {
  title: '',
  slug: '',
  published: false,
  project: '',
  timeline: '',
  private: false,
  intro: '',
  cover: '',
  figma: '',
  figmaMobile: '',
  body: '',
}

interface CreatePostFormProps {
  initialData?: Partial<PostData>
  children?: ReactNode
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const IconCompany = () => (
  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.67885 0.407986C8.40801 0.197338 8.02877 0.197338 7.75794 0.407986L0.539544 6.02229C0.356855 6.16438 0.25 6.38286 0.25 6.61431V15.4368C0.25 16.0611 0.498019 16.6599 0.939496 17.1014C1.38097 17.5429 1.97974 17.7909 2.60409 17.7909L5.8122 17.7909H10.6245L13.8327 17.7909C14.457 17.7909 15.0558 17.5429 15.4973 17.1014C15.9388 16.6599 16.1868 16.0611 16.1868 15.4368V6.61431C16.1868 6.38286 16.0799 6.16438 15.8972 6.02229L8.67885 0.407986ZM11.3745 16.2909H13.8327C14.0592 16.2909 14.2765 16.2009 14.4366 16.0407C14.5968 15.8805 14.6868 15.6633 14.6868 15.4368V6.98112L8.21839 1.95015L1.75 6.98112V15.4368C1.75 15.6633 1.83998 15.8805 2.00016 16.0407C2.16033 16.2009 2.37757 16.2909 2.60409 16.2909H5.0622V9.02044C5.0622 8.60622 5.39798 8.27044 5.8122 8.27044H10.6245C11.0387 8.27044 11.3745 8.60622 11.3745 9.02044V16.2909ZM6.5622 16.2909V9.77044H9.87446V16.2909H6.5622Z" fill="black"/>
  </svg>
)

const IconTimeline = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0227 0.818176C13.0227 0.403963 12.6869 0.0681763 12.2727 0.0681763C11.8585 0.0681763 11.5227 0.403963 11.5227 0.818176V1.70454H6.47726V0.818176C6.47726 0.403963 6.14148 0.0681763 5.72726 0.0681763C5.31305 0.0681763 4.97726 0.403963 4.97726 0.818176V1.70454H3.27272C1.95476 1.70454 0.886353 2.77295 0.886353 4.0909V7.36363V15.5454C0.886353 16.8634 1.95476 17.9318 3.27272 17.9318H14.7273C16.0452 17.9318 17.1136 16.8634 17.1136 15.5454V7.36363V4.0909C17.1136 2.77295 16.0452 1.70454 14.7273 1.70454H13.0227V0.818176ZM15.6136 6.61363V4.0909C15.6136 3.60138 15.2168 3.20454 14.7273 3.20454H13.0227V4.0909C13.0227 4.50512 12.6869 4.8409 12.2727 4.8409C11.8585 4.8409 11.5227 4.50512 11.5227 4.0909V3.20454H6.47726V4.0909C6.47726 4.50512 6.14148 4.8409 5.72726 4.8409C5.31305 4.8409 4.97726 4.50512 4.97726 4.0909V3.20454H3.27272C2.78319 3.20454 2.38635 3.60138 2.38635 4.0909V6.61363H15.6136ZM2.38635 8.11363H15.6136V15.5454C15.6136 16.035 15.2168 16.4318 14.7273 16.4318H3.27272C2.78319 16.4318 2.38635 16.035 2.38635 15.5454V8.11363Z" fill="black"/>
  </svg>
)

const LockClosed = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66667 7.33331V4.66665C4.66667 3.78259 5.01786 2.93474 5.64298 2.30962C6.2681 1.6845 7.11595 1.33331 8 1.33331C8.88406 1.33331 9.7319 1.6845 10.357 2.30962C10.9821 2.93474 11.3333 3.78259 11.3333 4.66665V7.33331M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LockOpen = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3333 4.66665C11.3333 3.78259 10.9821 2.93474 10.357 2.30962C9.7319 1.6845 8.88406 1.33331 8 1.33331C7.11595 1.33331 6.2681 1.6845 5.64298 2.30962C5.01786 2.93474 4.66667 3.78259 4.66667 4.66665M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function parseBodyPreview(body: string): React.ReactNode[] {
  if (!body.trim()) return []

  const lines = body.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    const componentMatch = line.match(/^<(\w+)[\s/>]/)
    if (componentMatch) {
      const componentName = componentMatch[1]
      const isSelfClosing = line.includes('/>')
      let endLine = i

      if (!isSelfClosing) {
        while (endLine < lines.length && !lines[endLine].includes(`</${componentName}>`)) {
          endLine++
        }
      }

      elements.push(
        <div key={`comp-${i}`} className={styles.mdxPlaceholder}>
          <span className={styles.mdxPlaceholderIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 3L2 8L5.5 13M10.5 3L14 8L10.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.mdxPlaceholderLabel}>{`<${componentName}>`}</span>
        </div>
      )
      i = endLine + 1
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${i}`}>{line.slice(4)}</h3>)
    } else if (line.startsWith('#### ')) {
      elements.push(<h4 key={`h4-${i}`}>{line.slice(5)}</h4>)
    } else if (line.startsWith('###### ')) {
      elements.push(<h6 key={`h6-${i}`}>{line.slice(7)}</h6>)
    } else if (line.trim()) {
      elements.push(<p key={`p-${i}`}>{line}</p>)
    }

    i++
  }

  return elements
}

export function CreatePostForm({ initialData, children }: CreatePostFormProps) {
  const isExisting = !!initialData
  const router = useRouter()
  const [data, setData] = useState<PostData>({ ...INITIAL_DATA, ...initialData })
  const [mode, setMode] = useState<'edit' | 'preview'>(isExisting ? 'preview' : 'edit')
  const [saving, setSaving] = useState(false)
  const [hasSaved, setHasSaved] = useState(isExisting)
  const [error, setError] = useState('')
  const slugManuallyEdited = useRef(isExisting)

  const updateField = useCallback(<K extends keyof PostData>(field: K, value: PostData[K]) => {
    setData((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && !slugManuallyEdited.current) {
        next.slug = slugify(value as string)
      }
      return next
    })
  }, [])

  const handleSlugChange = useCallback((value: string) => {
    slugManuallyEdited.current = true
    setData((prev) => ({ ...prev, slug: value }))
  }, [])

  const save = useCallback(async () => {
    if (!data.title.trim() || !data.slug.trim()) {
      setError('Title and slug are required.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/admin/create-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, overwrite: hasSaved }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error || 'Failed to save')
        setSaving(false)
        return
      }

      setHasSaved(true)
      setMode('preview')
      if (isExisting) {
        router.refresh()
      }
    } catch {
      setError('Network error. Try again.')
    } finally {
      setSaving(false)
    }
  }, [data, hasSaved, isExisting, router])

  const handleLockClick = useCallback(() => {
    if (mode === 'edit') {
      save()
    } else {
      setMode('edit')
    }
  }, [mode, save])

  if (mode === 'preview') {
    const previewContent = children ?? (
      <section className="block-works block-works-full">
        <article className="work">
          <header className="work-header">
            {!data.published && (
              <div className="draft-indicator">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 2.25L15.75 5.25M1.5 16.5L2.18 13.44C2.22 13.26 2.31 13.1 2.44 12.97L11.69 3.72C12.08 3.33 12.71 3.33 13.1 3.72L14.28 4.9C14.67 5.29 14.67 5.92 14.28 6.31L5.03 15.56C4.9 15.69 4.74 15.78 4.56 15.82L1.5 16.5Z" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Draft</span>
              </div>
            )}
            <h1 className="work-title">{data.title || 'Untitled'}</h1>
            <div className="work-info">
              {data.project && (
                <div className="work-company">
                  <i aria-hidden><IconCompany /></i>
                  <span>{data.project}</span>
                </div>
              )}
              {data.timeline && (
                <div className="work-timeline">
                  <i aria-hidden><IconTimeline /></i>
                  <span>{data.timeline}</span>
                </div>
              )}
            </div>
          </header>
          {data.intro && (
            <div className="work-intro">
              <p>{data.intro}</p>
            </div>
          )}
          {data.body && (
            <div className="work-body">
              {parseBodyPreview(data.body)}
            </div>
          )}
        </article>
      </section>
    )

    return (
      <>
        {previewContent}

        <div className={styles.devToolbar}>
          <div className={styles.toggleWrapper}>
            <button
              className={styles.toggle}
              onClick={handleLockClick}
              aria-label="Edit post"
            >
              <LockClosed />
            </button>
            <span className={styles.tooltipWhite}>Edit</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <section className="block-works block-works-full">
        <article className="work">
          <header className="work-header">
            <input
              type="text"
              className={`work-title ${styles.formFieldTitle}`}
              placeholder="Post title"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
            <div className="work-info">
              <div className="work-company">
                <i aria-hidden><IconCompany /></i>
                <input
                  type="text"
                  className={styles.formFieldInline}
                  placeholder="Company / Project"
                  value={data.project}
                  onChange={(e) => updateField('project', e.target.value)}
                />
              </div>
              <div className="work-timeline">
                <i aria-hidden><IconTimeline /></i>
                <input
                  type="text"
                  className={styles.formFieldInline}
                  placeholder="Timeline (e.g. 2024 - 2025)"
                  value={data.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                />
              </div>
            </div>
          </header>

          <div className={styles.formMetaSection}>
            <div className={styles.formMetaRow}>
              <label className={styles.formMetaLabel}>
                Slug
                <input
                  type="text"
                  className={styles.formMetaInput}
                  placeholder="post-slug"
                  value={data.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  readOnly={isExisting}
                  style={isExisting ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
                />
              </label>
              <label className={styles.formMetaLabel}>
                Cover filename
                <input
                  type="text"
                  className={styles.formMetaInput}
                  placeholder="cover.png"
                  value={data.cover}
                  onChange={(e) => updateField('cover', e.target.value)}
                />
              </label>
            </div>
            <div className={styles.formMetaRow}>
              <label className={styles.formMetaLabel}>
                Figma URL
                <input
                  type="text"
                  className={styles.formMetaInput}
                  placeholder="https://www.figma.com/proto/..."
                  value={data.figma}
                  onChange={(e) => updateField('figma', e.target.value)}
                />
              </label>
              <label className={styles.formMetaLabel}>
                Figma Mobile URL
                <input
                  type="text"
                  className={styles.formMetaInput}
                  placeholder="https://www.figma.com/proto/..."
                  value={data.figmaMobile}
                  onChange={(e) => updateField('figmaMobile', e.target.value)}
                />
              </label>
            </div>
            <div className={styles.formMetaRow}>
              <label className={styles.formCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={data.published}
                  onChange={(e) => updateField('published', e.target.checked)}
                />
                Published
              </label>
              <label className={styles.formCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={data.private}
                  onChange={(e) => updateField('private', e.target.checked)}
                />
                Private (password-protected)
              </label>
            </div>
          </div>

          <div className="work-intro">
            <textarea
              className={styles.formFieldIntro}
              placeholder="Introduction text (optional)"
              value={data.intro}
              onChange={(e) => updateField('intro', e.target.value)}
              rows={3}
            />
          </div>

          <div className="work-body">
            <textarea
              className={styles.formFieldBody}
              placeholder="Post body (MDX content)&#10;&#10;Write markdown and use components like:&#10;<Gallery>&#10;  ![Image](image.png)&#10;</Gallery>"
              value={data.body}
              onChange={(e) => updateField('body', e.target.value)}
              rows={20}
            />
          </div>
        </article>
      </section>

      {error && (
        <div className={styles.formError}>{error}</div>
      )}

      <div className={styles.devToolbar}>
        <div className={styles.toggleWrapper}>
          <button
            className={`${styles.toggle} ${styles.toggleActive}`}
            onClick={handleLockClick}
            disabled={saving}
            aria-label="Save and preview"
          >
            {saving ? <span className={styles.spinner} /> : <LockOpen />}
          </button>
          <span className={styles.tooltip}>Save changes</span>
        </div>
      </div>
    </>
  )
}
