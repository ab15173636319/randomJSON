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
]

const NumberType = [1, 3, 4, 5, 6, 7]

type UUID = (typeof NumberType)[number]

interface IFormData {
  id: string
  name: string
  type: (typeof DataType)[number]
  value?: string | number | boolean | Date
  len?: number | null
  size?: number | null
  width?: number | null
  height?: number | null
  v?: UUID
}

export type { IFormData, UUID }
export { DataType, NumberType }
