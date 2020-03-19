import { createHash } from 'crypto'

export const generateId = (s: string) => {
  const hash = createHash('sha512')
  hash.update(s)
  return hash.digest().toString('hex')
}
