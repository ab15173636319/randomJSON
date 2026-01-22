export default function deepClone<T>(obj: T, visited = new WeakMap<object, any>()): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (visited.has(obj)) {
    return visited.get(obj)
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as any
  }

  if (Array.isArray(obj)) {
    const clonedArray = obj.map((item) => deepClone(item, visited))
    visited.set(obj, clonedArray)
    return clonedArray as any
  }

  const copyObj: any = {}
  visited.set(obj, copyObj)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copyObj[key] = deepClone(obj[key], visited)
    }
  }

  return copyObj
}
