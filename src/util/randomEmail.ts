const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function randomPrefix(len: number): string {
  let prefix = ''
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * str.length)
    prefix += str[index]
  }
  return prefix
}

function randomSuffix(): string {
  let suffix = ''
  const index = Math.min(Math.floor(Math.random() * 6), 2)
  for (let i = 0; i < index; i++) {
    const _index = Math.floor(Math.random() * 4)
    suffix += str[_index]
  }
  return suffix
}

export default function randomEmail(): string {
  const len = Math.min(Math.floor(Math.random() * 16), 5)
  return randomPrefix(len) + '@' + randomSuffix() + '.com'
}
