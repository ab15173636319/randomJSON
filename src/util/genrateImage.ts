/**
 * 生成随机图片URL
 * @param width 图片宽度，默认为200
 * @param height 图片高度，默认为200
 * @param grayscale 是否为灰度图，默认为false
 * @param blur 模糊程度 (1-10)，可选
 * @returns 图片URL字符串
 */
export function genrateImage(
  width: number = 200,
  height: number = 200,
  grayscale: boolean = false,
  blur?: number,
): string {
  let url = `https://picsum.photos/${width}/${height}`

  if (grayscale) {
    url += '?grayscale'
  }

  if (blur !== undefined && blur >= 1 && blur <= 10) {
    const separator = grayscale ? '&' : '?'
    url += `${separator}blur=${blur}`
  }

  return url
}

/**
 * 生成随机头像URL
 * @param size 头像尺寸，默认为200
 * @returns 头像URL字符串
 */
export function genrateAvatar(size: number = 200): string {
  return `https://picsum.photos/${size}/${size}?grayscale`
}
