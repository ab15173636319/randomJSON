/**
 * 生成随机图片URL（可固定图片，避免每次刷新都变）
 * @param width 图片宽度，默认为200
 * @param height 图片高度，默认为200
 * @param grayscale 是否为灰度图，默认为false
 * @param blur 模糊程度 (1-10)，可选
 * @param fixedId 是否使用固定随机ID（true则每次生成同一张，false则每次不同），默认为false
 * @returns 图片URL字符串
 */
export function generateImage(
  width: number = 200,
  height: number = 200,
  grayscale: boolean = false,
  blur?: number,
  fixedId: boolean = false,
): string {
  // 参数边界校验
  const validWidth = Math.max(1, Math.min(9999, width))
  const validHeight = Math.max(1, Math.min(9999, height))
  const validBlur = blur !== undefined ? Math.max(1, Math.min(10, blur)) : undefined

  // 基础URL
  let url = `https://picsum.photos/${validWidth}/${validHeight}`

  // 存储参数的查询字符串数组
  const params: string[] = []

  // 1. 固定图片ID（随机生成1-1000的ID，fixedId为true时使用固定ID）
  const imageId = fixedId ? Math.floor(Math.random() * 1000) + 1 : undefined
  if (imageId) {
    params.push(`image=${imageId}`)
  }

  // 2. 灰度图参数
  if (grayscale) {
    params.push('grayscale')
  }

  // 3. 模糊参数
  if (validBlur) {
    params.push(`blur=${validBlur}`)
  }

  // 拼接查询字符串
  if (params.length > 0) {
    url += `?${params.join('&')}`
  }

  return url
}

/**
 * 生成随机人像头像URL（限定picsum的人像ID范围：1000-1079）
 * @param size 头像尺寸，默认为200
 * @param fixedId 是否使用固定随机ID（true则每次生成同一个人像，false则每次不同），默认为false
 * @returns 人像头像URL字符串
 */
export function generateAvatar(size: number = 200, fixedId: boolean = false): string {
  // 校验尺寸
  const validSize = Math.max(1, Math.min(9999, size))

  // 人像ID范围：1000-1079（picsum官方人像分类）
  const avatarIdRange = { min: 1000, max: 1079 }
  const imageId = fixedId
    ? Math.floor(Math.random() * (avatarIdRange.max - avatarIdRange.min + 1)) + avatarIdRange.min
    : undefined

  // 基础URL（默认灰度+人像）
  let url = `https://picsum.photos/${validSize}/${validSize}`
  const params: string[] = []

  if (imageId) {
    params.push(`image=${imageId}`)
  }
  params.push('grayscale') // 头像默认灰度

  return `${url}?${params.join('&')}`
}


