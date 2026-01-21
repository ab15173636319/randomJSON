const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 *  随机字符串
 * @param len
 * @returns
 */
export function randomString(len: number): string {
  let randomStr = ''
  for (let i = 0; i < len; i++) {
    randomStr += str[Math.floor(Math.random() * str.length)]
  }
  return randomStr
}

/**
 *  随机字符串，不重复
 * @param len
 * @returns
 */
export function randomStringWithoutRepeat(len: number): string {
  let randomStr = ''
  const arr = str.split('')
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * arr.length)
    randomStr += arr[index]
    arr.splice(index, 1)
  }
  return randomStr
}
