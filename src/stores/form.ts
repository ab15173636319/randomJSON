import { defineStore } from 'pinia'
import { ref } from 'vue'
import { genrateId } from '@/util/genrateId'
import type { IFormData, UUID } from '@/types/index'
import getRandomName from '@/util/genrateName'
import { genrateDate } from '@/util/genrateDate'
import { randomString } from '@/util/randomString'
import { generateAvatar, generateImage } from '@/util/genrateImage'
import { ElMessage } from 'element-plus'

export const useFormStore = defineStore('form', () => {
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

  function genrateJSON(len: number = 10) {
    if (!form.value.length) {
      ElMessage.error('属性不能为空！')
      return
    }
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
          case 'number':
            item.value = Math.floor(Math.random() * 10 ** (item.len! || 4))
            break
          case 'float':
            item.value = Math.random() * (item.len || 100)
            break
          case 'boolean':
            item.value = Math.random() > 0.5
            break
          case 'string':
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
        }
        obj[item.name] = item.value!
      }
      json.push(obj)
    }

    return JSON.stringify(json)
  }

  return {
    form,
    addForm,
    removeForm,
    updateForm,
    genrateJSON,
  }
})
