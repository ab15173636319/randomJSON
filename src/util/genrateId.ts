import { v4 } from 'uuid'

export function genrateId(): string {
  return v4()
}
