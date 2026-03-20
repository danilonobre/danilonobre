'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Layout } from '@/components/layout/Layout'

export default function PasswordPage() {
  const router = useRouter()
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, slug }),
      })
      const data = await res.json()
      if (data.success && data.redirect) {
        router.push(data.redirect)
        return
      }
      setError(data.error ?? 'Wrong password')
    } catch {
      setError('Erro ao validar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout wrapperClass="page-main" isHome={false} pageWork>
      <div className="block-password-gate">
        <form className="password-gate" onSubmit={handleSubmit}>
          <h1>This content is protected</h1>
          <div className="fields">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              disabled={loading}
              aria-label="Password"
            />
            <button type="submit" disabled={loading} aria-label="Submit">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {error && <p className="password-error" role="alert">{error}</p>}
        </form>
      </div>
    </Layout>
  )
}
