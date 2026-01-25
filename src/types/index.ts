const DataType = [
  'String',
  'Number',
  'Boolean',
  'Float',
  'Date',
  '中文',
  'ID',
  'Image',
  'Avatar',
  'Email',
  'Phone',
  '中文名',
]

interface IFormData {
  id: string
  name: string
  type: (typeof DataType)[number]
  value?: string | number | boolean | Date
  len?: number | null
  size?: number | null
  width?: number | null
  height?: number | null
  integer?: number
  decimal?: number
}

export type { IFormData }
export { DataType }
