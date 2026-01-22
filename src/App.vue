<script setup lang="ts">
import { ElButton, ElInput, ElForm, ElFormItem } from 'element-plus'
import { useFormStore } from './stores/form'
import { ref } from 'vue'
import type { IFormData } from './types'
import Table from './components/Table.vue'
import Header from './components/Header.vue'
import Modify from './components/Modify.vue'
import deepClone from './util/deepClone'
import copyToClipboard from './util/copyToClipboard'
const formStore = useFormStore()

type ModifyInfo = Partial<IFormData>
const modifyId = ref<string | null>(null)
const modifyInfo = ref<ModifyInfo>({})
const drawer = ref(false)
const code = ref<string | object>('')
const maxLen = ref<number>(10)

const modifyHandler = (id: string, show: boolean) => {
  modifyId.value = id
  drawer.value = show
  modifyInfo.value = deepClone(formStore.form.find((item: IFormData) => item.id === id)!)
  console.log(modifyInfo.value)
}

const randomCodeHandler = () => {
  code.value = formStore.genrateJSON(maxLen.value)!
  if (code.value) copyToClipboard(JSON.stringify(code.value).trim())
}
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <Table :data="formStore.form" @update:data="modifyHandler" />

    <div class="m-10 mb-[200px] shadow-2xl" v-if="code">
      <pre class="bg-gray-900 p-5 rounded-2xl text-green-400">
          <code class="font-mono text-sm md:text-base break-all whitespace-pre-wrap">{{ code }}</code>
      </pre>
    </div>

    <div class="flex-col w-full fixed bottom-0 right-0 p-10 bg-gray-700 flex justify-center items-center gap-5">
      <div class="w-1/3">
        <el-form :inline="true" class="flex gap-5">
          <el-form-item label="数据长度">
            <el-input type="number" :min="1" v-model="maxLen" />
          </el-form-item>
        </el-form>
      </div>
      <div class="flex">
        <el-button type="primary" @click="randomCodeHandler">生成代码</el-button>
        <el-button type="danger" @click="">撤销</el-button>
      </div>
    </div>
  </div>
  <Modify :modify-id="modifyId!" :modify-info="modifyInfo" v-model="drawer" />
</template>

<style scoped>
/* 全局响应式样式 */
@media (max-width: 768px) {

  .el-input,
  .el-select {
    width: 100% !important;
  }

  ._table {
    margin-top: 200px;
  }

  .el-table {
    font-size: 0.875rem;
  }

  .el-table th,
  .el-table td {
    padding: 4px 0 !important;
  }

  .el-drawer {
    --el-drawer-padding-primary: 0.5rem !important;
  }

  .el-form-item__content {
    flex-wrap: nowrap !important;
  }
}

@media (max-width: 480px) {
  .el-form--inline .el-form-item {
    margin-right: 0 !important;
  }

  .el-button {
    font-size: 0.875rem !important;
    padding: 8px 12px !important;
  }
}
</style>
