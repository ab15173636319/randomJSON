import type { IFormData } from '@/types'
import getRandomName from './generateName'
import { generateDate } from './generateDate'
import { randomString } from './randomString'
import { generateId } from './generateId'
import { generateAvatar, generateImage } from './generateImage'
import randomEmail from './randomEmail'
import { randomPhonenumber } from './randomPhonenumber'
import generateChineseName from './generateChineseName'
import { ElMessage } from 'element-plus'

// 根据类型生成值
async function getRandomValue(item: IFormData): Promise<string | number | boolean | Date> {
  switch (item.type) {
    case '中文':
      return getRandomName(item.len || 2)
    case 'Date':
      return generateDate()
    case 'Number':
      return Math.floor(Math.random() * (Math.pow(10, item.len || 4) - 1))
    case 'Float':
      const integerPart = Math.floor(Math.random() * Math.pow(10, item.integer || 10))
      const decimalPart = Math.floor(Math.random() * Math.pow(10, item.decimal || 2))
      return Number(`${integerPart}.${decimalPart}`)
    case 'Boolean':
      return Math.random() > 0.5
    case 'String':
      return randomString(item.len || 10)
    case 'ID':
      return generateId()
    case 'Image':
      return generateImage(item.height || 200, item.width || 200)
    case 'Avatar':
      return generateAvatar(item.size || 20)
    case 'Email':
      return randomEmail()
    case 'Phone':
      return randomPhonenumber()
    case '中文名':
      return await generateChineseName()
    default:
      return ''
  }
}


/**
 * 生成json数据
 * @param len 生成数量
 * @param form 表单数据
 * @returns 生成结果json字符串
 */
export default async function generateJson(len: number, form: IFormData[]): Promise<string> {
  if (form.length === 0) {
    ElMessage.error('属性不能为空！')
    return ''
  }

  try {
    // 存储所有生成的数据
    const jsonData: Record<string, string | number | boolean | Date>[] = []

    for (let i = 0; i < len; i++) {
      // 创建对象，用于存储当前对象生成的数据
      const obj: Record<string, string | number | boolean | Date> = {}

      // 并行生成当前对象的所有属性值
      const valuePromises = form.map(async (item) => {
        const value = await getRandomValue(item);
        return {
          key: item.name,
          value
        }
      });


      // 等待所有值生成完成
      const values = await Promise.all(valuePromises);

      // 将生成的数据存储到对象中
      values.forEach(item => {
        obj[item.key] = item.value
      })

      jsonData.push(obj)
    }
    return JSON.stringify(jsonData)
  } catch (error) {
    console.error(error)
    throw error
  }
}
