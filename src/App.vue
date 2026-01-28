<script setup lang="ts">
import { ElButton, ElInput, ElForm, ElFormItem, ElMessage } from 'element-plus'
import { useFormStore } from './stores/form'
import { computed, ref, watch } from 'vue'
import type { IFormData } from './types'
import Table from './components/Table.vue'
import Header from './components/Header.vue'
import Modify from './components/Modify.vue'
import deepClone from './util/deepClone'
import copyToClipboard from './util/copyToClipboard'
import { getInitialFieldValues } from '@/util/typeUtils'

const formStore = useFormStore()

type ModifyInfo = Partial<IFormData>
const modifyId = ref<string | null>(null)
const modifyInfo = ref<ModifyInfo>({})
const drawer = ref(false)
const code = ref<string | undefined>('')
const maxLen = ref<number>(10)
const loading = ref(false)
// const maxLenStr = ref<number>(1000)

const disable = computed(() => {
  return formStore.form.length <= 0
})

watch(() => modifyInfo.value.type, (newVal, oldVal) => {
  if (!newVal || newVal === oldVal) return
  // 使用工具函数简化逻辑
  Object.assign(modifyInfo.value, getInitialFieldValues(newVal))
})

const modifyHandler = (id: string, show: boolean) => {
  modifyId.value = id
  drawer.value = show
  modifyInfo.value = deepClone(formStore.form.find((item: IFormData) => item.id === id)!)
  console.log(modifyInfo.value)
}

const randomCodeHandler = async () => {
  loading.value = true
  try {
    code.value = await formStore.generateJSON(maxLen.value)
  } catch (error) {
    ElMessage.error('生成失败！')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const copyCodeHandler = () => {
  if (!code.value) return
  copyToClipboard(code.value)
}

const revoke = () => {
  code.value = ''
  formStore.revoke()
}
</script>

<template>

  <div class=" fixed inset-0 bg-black/50 z-99 flex justify-center items-center" v-show="loading">
    <img class="size-15 animate-spin" src="/loading.svg" alt="" srcset="">
  </div>

  <div class="app-container">
    <Header />
    <Table :data="formStore.form" @update:data="modifyHandler" />

    <Transition mode="in-out">
      <div class="code-display relative" v-show="code">
        <pre class="code-wrapper">
          <code class="code-content">{{ code }}</code>
      </pre>
        <div class="absolute top-5 right-5">
          <img src="/copy.svg" alt="" srcset="" class="size-5" @click="copyCodeHandler" />
        </div>
      </div>
    </Transition>

    <div class="bottom-panel">
      <div class="form-wrapper">
        <el-form :inline="true" class="form-inline">
          <el-form-item label="数据长度">
            <el-input type="number" :min="1" v-model="maxLen" />
          </el-form-item>
        </el-form>
      </div>
      <div class="button-group">
        <el-button :disabled="disable" type="primary" @click="randomCodeHandler" class="action-btn">生成代码</el-button>
        <el-button :disabled="disable" type="danger" @click="revoke()" class="action-btn"
          style="margin: 0;">撤销</el-button>
      </div>
    </div>
  </div>
  <Modify :modify-id="modifyId!" :modify-info="modifyInfo" v-model="drawer" />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 180px;
}

.code-display {
  margin: 20px;
  margin-bottom: 200px;
  box-shadow: var(--shadow-medium);
  border-radius: 16px;
  overflow: hidden;
}

.code-wrapper {
  background: linear-gradient(135deg, #2d3e2d 0%, #1a2a1a 100%);
  padding: 24px;
  border-radius: 16px;
  margin: 0;
  overflow-x: auto;
}

.code-content {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #a8d5a8;
  display: block;
  white-space: pre-wrap;
  word-break: break-all;
}

.bottom-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(255, 254, 249, 0.98) 0%, rgba(250, 248, 243, 0.98) 100%);
  backdrop-filter: blur(10px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 -4px 20px rgba(74, 74, 58, 0.08);
  border-top: 1px solid var(--border-color);
  z-index: 5;
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
}

.form-inline {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

/* 移动端响应式样式 */
@media (max-width: 768px) {
  .app-container {
    padding-bottom: 220px;
  }

  .code-display {
    margin: 12px;
    margin-bottom: 240px;
  }

  .code-wrapper {
    padding: 16px;
    border-radius: 12px;
  }

  .code-content {
    font-size: 12px;
  }

  .bottom-panel {
    padding: 16px;
    gap: 12px;
  }

  .form-wrapper {
    width: 100%;
    max-width: 100%;
  }

  .form-inline {
    flex-direction: column;
    width: 100%;
  }

  .button-group {
    width: 100%;
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    padding: 12px 20px;
  }

  .el-input,
  .el-select {
    width: 100% !important;
  }

  .el-table {
    font-size: 0.875rem;
  }

  .el-table th,
  .el-table td {
    padding: 8px 4px !important;
  }

  .el-drawer {
    --el-drawer-padding-primary: 0.5rem !important;
  }

  .el-form-item__content {
    flex-wrap: nowrap !important;
  }
}

@media (max-width: 480px) {
  .code-content {
    font-size: 11px;
  }

  .bottom-panel {
    padding: 12px;
  }

  .el-form--inline .el-form-item {
    margin-right: 0 !important;
    width: 100%;
  }

  .el-button {
    font-size: 0.875rem !important;
    padding: 10px 16px !important;
  }
}
</style>
