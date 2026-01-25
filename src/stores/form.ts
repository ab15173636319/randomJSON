import { defineStore } from 'pinia'
import { ref } from 'vue'
import { genrateId } from '@/util/genrateId'
import type { IFormData } from '@/types/index'
import getRandomName from '@/util/genrateName'
import { genrateDate } from '@/util/genrateDate'
import { randomString } from '@/util/randomString'
import { generateAvatar, generateImage } from '@/util/genrateImage'
import { ElMessage } from 'element-plus'
import randomEmail from '@/util/randomEmail.ts'
import { randomPhonenumber } from '@/util/randomPhonenumber'

export const useFormStore = defineStore('form', () => {
  const loading = ref(false)
  const form = ref<IFormData[]>([])

  function addForm(data: IFormData) {
    form.value.push({
      ...data,
    })
  }

  function removeForm(id: string) {
    form.value = form.value.filter((item) => item.id !== id)
  }

  function updateForm(id: string, data: Partial<IFormData>) {
    const index = form.value.findIndex((item) => item.id === id)
    if (index !== -1 && form.value[index]) {
      form.value[index] = {
        ...form.value[index],
        ...data,
      }
    }
  }

  async function genrateJSON(len: number = 10): Promise<string> {
    if (!form.value.length) {
      ElMessage.error('属性不能为空！')
      return ''
    }
    return new Promise(async (resolve, reject) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const json = []
        for (let i = 0; i < len; i++) {
          const obj: Record<string, string | number | boolean | Date> = {}
          for (const item of form.value) {
            switch (item.type) {
              case '中文':
                item.value = getRandomName(item.len || 2)
                break
              case 'Date':
                item.value = genrateDate()
                break
              case 'Number':
                item.value = Math.floor(Math.random() * 10 ** (item.len! || 4))
                break
              case 'Float':
                const integer = Math.ceil(Math.random() * 10 ** item.integer!)
                const decimal = Math.ceil(Math.random() * 10 ** item.decimal!)
                item.value = Number(`${integer}.${decimal}`)
                break
              case 'Boolean':
                item.value = Math.random() > 0.5
                break
              case 'String':
                item.value = randomString(item.len || 10)
                break
              case 'ID':
                item.value = genrateId()
                break
              case 'Image':
                item.value = generateImage(item.height || 200, item.width || 200)
                break
              case 'Avatar':
                item.value = generateAvatar(item.size || 20)
                break
              case 'Email':
                item.value = randomEmail()
                break
              case 'Phone':
                item.value = randomPhonenumber()
                break
            }
            obj[item.name] = item.value!
          }
          json.push(obj)
        }
        resolve(JSON.stringify(json))
      } catch (error) {
        reject(error)
      }
    })
  }

  function revoke() {
    form.value.splice(0)
  }

  return {
    form,
    loading,
    addForm,
    removeForm,
    updateForm,
    genrateJSON,
    revoke,
  }
})
