import React, { useEffect, useState } from "react"

export default function PasswordGate({ slug, password, onAuthorized }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  const storageKey = `restricted:${slug}`

  useEffect(() => {
    if (localStorage.getItem(storageKey) === "true") {
      onAuthorized()
    }
  }, [storageKey, onAuthorized])

  function handleSubmit(e) {
    e.preventDefault()

    if (value === password) {
      localStorage.setItem(storageKey, "true")
      onAuthorized()
    } else {
      setError(true)
    }
  }

  return (

    <div className="block-password-gate">
        
      <h1>Restricted page</h1>

      <form onSubmit={handleSubmit} className="password-gate">

        <div className="fields">

          <input
            type="text"
            placeholder="Type password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
          />

          <button type="submit"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          
        </div>

        {error && (
          <p className="password-error">
            Wrong password.
          </p>
        )}

      </form>

    </div>
  )
}
