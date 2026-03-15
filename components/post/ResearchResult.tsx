import React from 'react'

export function ResearchResults({ children }: { children: React.ReactNode }) {
  return <div className="research-results">{children}</div>
}

export function ResearchResult({ percentage, text }: { percentage: string; text: string }) {
  const pct = Number(percentage) || 0
  return (
    <div className="research-result">
      <div className="research-result__bar-wrapper">
        <div
          className="research-result__bar"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="research-result-wrapper">
        <span className="research-result__value">{pct}%</span>
        <span className="research-result__text">{text}</span>
      </div>
    </div>
  )
}
