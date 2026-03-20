/**
 * Validação de senha para posts privados.
 * A senha vem de process.env.PORTFOLIO_PASSWORD (apenas Server/API).
 */

export function validatePassword(password: string): boolean {
  const envPassword = process.env.PORTFOLIO_PASSWORD
  if (!envPassword) return false
  return password === envPassword
}
