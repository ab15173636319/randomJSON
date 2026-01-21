const DataType = ['string', 'number', 'boolean', 'float', 'Date', '中文', 'ID', 'Image', 'Avatar']

interface FormData {
  id: string
  name: string
  type: (typeof DataType)[number]
  value?: string | number | boolean | Date
  len?: number | null
}

export type { FormData }
export { DataType }
