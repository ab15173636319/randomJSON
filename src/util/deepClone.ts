

export default function deepClone<
  T extends
  | number
  | string
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | Map<unknown, unknown>
  | Set<unknown>
  | unknown[]
  | Record<string, unknown>
  | object,
>(target: T, cache = new WeakMap<object, unknown>()): T {
  // 如果是基本类型或 null，直接返回
  if (typeof target !== 'object' || target === null) {
    return target
  }

  // 这里开始 target 一定是 object，才能安全用于 WeakMap
  if (cache.has(target as object)) {
    return cache.get(target as object) as T
  }

  // 处理Date对象
  if (target instanceof Date) {
    const clone = new Date(target.getTime())
    cache.set(target, clone)
    return clone as T
  }

  // 处理RegExp对象
  if (target instanceof RegExp) {
    const clone = new RegExp(target)
    cache.set(target, clone)
    return clone as T
  }

  // 处理Map对象
  if (target instanceof Map) {
    const clone = new Map<unknown, unknown>()
    cache.set(target as object, clone)

    // 键和值都要深度拷贝，否则会出现引用问题
    for (const [key, value] of target.entries()) {
      clone.set(
        deepClone(
          key as
          | string
          | number
          | boolean
          | object
          | RegExp
          | Date
          | Map<unknown, unknown>
          | Set<unknown>
          | unknown[]
          | Record<string, unknown>
          | null
          | undefined,
          cache,
        ),
        deepClone(
          value as
          | string
          | number
          | boolean
          | object
          | RegExp
          | Date
          | Map<unknown, unknown>
          | Set<unknown>
          | unknown[]
          | Record<string, unknown>
          | null
          | undefined,
          cache,
        ),
      )
    }
    return clone as T
  }

  // 处理Set对象
  if (target instanceof Set) {
    const clone = new Set<unknown>()
    cache.set(target as object, clone)

    target.forEach((item) => {
      clone.add(
        deepClone(
          item as
          | string
          | number
          | boolean
          | object
          | RegExp
          | Date
          | Map<unknown, unknown>
          | Set<unknown>
          | unknown[]
          | Record<string, unknown>
          | null
          | undefined,
          cache,
        ),
      )
    })
    return clone as T
  }

  // 处理数组
  if (Array.isArray(target)) {
    const clone: unknown[] = []
    cache.set(target as object, clone)
    for (const item of target) {
      clone.push(
        deepClone(
          item as
          | string
          | number
          | boolean
          | object
          | RegExp
          | Date
          | Map<unknown, unknown>
          | Set<unknown>
          | unknown[]
          | Record<string, unknown>
          | null
          | undefined,
          cache,
        ),
      )
    }
    return clone as T
  }

  const newObj: Record<string, unknown> = {}
  cache.set(target as object, newObj)

  for (const key in target as Record<string, unknown>) {
    if (!Object.prototype.hasOwnProperty.call(target, key)) continue
    const value = (target as Record<string, unknown>)[key]
    if (typeof value !== 'object' || value === null) {
      newObj[key] = value
      continue
    }
    newObj[key] = deepClone(value, cache)
  }

  return newObj as T

}

