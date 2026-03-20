import React from 'react'
import { Contacts } from './Contacts'

export function Footer() {
  return (
    <footer className="page-footer">
      <div className="intro-text">
        <h2>Get in touch</h2>
        <p>Want to discuss a project, collaborate or say hello?</p>
      </div>
      <Contacts />
    </footer>
  )
}
