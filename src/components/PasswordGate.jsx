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
    <form onSubmit={handleSubmit} className="password-gate">
        
      <h1>Restrict page</h1>

      <input
        type="text"
        placeholder="Digite a senha"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setError(false)
        }}
      />

      <button type="submit">
        Acessar
      </button>

      {error && (
        <p className="password-error">
          Senha incorreta
        </p>
      )}

    </form>
  )
}
