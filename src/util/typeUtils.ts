export const isStringType = (type: string) => ['String', 'Number', '中文'].includes(type)

export const isFloatType = (type: string) => ['Float'].includes(type)

export const isAvatarType = (type: string) => ['Avatar'].includes(type)

export const isImageType = (type: string) => ['Image'].includes(type)

export const getInitialFieldValues = (type: string) => {
  if (isStringType(type)) {
    return { len: 10 }
  }
  if (isFloatType(type)) {
    return { integer: 10, decimal: 2 }
  }
  if (isAvatarType(type)) {
    return { size: 100 }
  }
  if (isImageType(type)) {
    return { width: 400, height: 300 }
  }
  return {}
}
