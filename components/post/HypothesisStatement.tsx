import React from 'react'

interface HypothesisStatementProps {
  action: string
  alignment: string
  value: string
  outcome: string
  impact: string
  success: string
}

export function HypothesisStatement({
  action,
  alignment,
  value,
  outcome,
  impact,
  success,
}: HypothesisStatementProps) {
  return (
    <div className="hypothesis">
      <p className="hypothesis__text">
        We believe that{' '}
        <span className="hypothesis__highlight hypothesis__highlight--purple">
          {action}
        </span>{' '}
        will align with{' '}
        <span className="hypothesis__highlight hypothesis__highlight--purple">
          {alignment}
        </span>{' '}
        by{' '}
        <span className="hypothesis__highlight hypothesis__highlight--purple">
          {value}
        </span>
        . This solution is expected to{' '}
        <span className="hypothesis__highlight hypothesis__highlight--blue">
          {outcome}
        </span>
        , thereby{' '}
        <span className="hypothesis__highlight hypothesis__highlight--blue">
          {impact}
        </span>
        . We will know we are successful when{' '}
        <span className="hypothesis__highlight hypothesis__highlight--green">
          {success}
        </span>
        .
      </p>
    </div>
  )
}
