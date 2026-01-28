import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IFormData } from '@/types/index'
import generateJson from '@/util/generateJson'

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

  // 更新表单数据
  function updateForm(id: string, data: Partial<IFormData>) {
    const index = form.value.findIndex((item) => item.id === id)
    if (index !== -1 && form.value[index]) {
      form.value[index] = {
        ...form.value[index],
        ...data,
      }
    }
  }

  async function generateJSON(len: number = 10): Promise<string> {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await generateJson(len, form.value)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    } catch (error) {
      console.error(error)
      throw new Error('生成失败！')
    }
  }

  function revoke() {
    form.value.splice(0)
  }

  return {
    form,
    addForm,
    removeForm,
    updateForm,
    generateJSON,
    revoke,
  }
})
