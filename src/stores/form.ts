import { defineStore } from 'pinia'
import { ref } from 'vue'
import { genrateId } from '@/util/genrateId'
import type { FormData } from '@/types/index'
import getRandomName from '@/util/genrateName'
import { genrateDate } from '@/util/genrateDate'
import { randomString } from '@/util/randomString'
import { genrateAvatar, genrateImage } from '@/util/genrateImage'

export const useFormStore = defineStore('form', () => {
  const form = ref<FormData[]>([])

  function addForm(data: FormData) {
    form.value.push({
      ...data,
    })
  }

  function removeForm(id: string) {
    form.value = form.value.filter((item) => item.id !== id)
  }

  function updateForm(id: string, data: Partial<FormData>) {
    const index = form.value.findIndex((item) => item.id === id)
    if (index !== -1 && form.value[index]) {
      form.value[index] = {
        ...form.value[index],
        ...data,
      }
    }
  }

  function genrateJSON(len: number = 10, type: object | string = 'object') {
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
            item.value = Math.floor(Math.random() * (item.len || 100))
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
          case 'Image':
            item.value = genrateImage()
            break
          case 'Avatar':
            item.value = genrateAvatar()
            break
        }
        obj[item.name] = item.value!
      }
      json.push(obj)
    }

    if (type === 'object') return json
    if (type === 'string') return JSON.stringify(json, null, 2)
  }

  return {
    form,
    addForm,
    removeForm,
    updateForm,
    genrateJSON,
  }
})
