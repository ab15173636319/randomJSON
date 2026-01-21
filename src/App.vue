<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElDrawer,
} from 'element-plus'
import { useFormStore } from './stores/form'
import { computed, reactive, ref } from 'vue'
import type { FormData } from './types'
import { genrateId } from './util/genrateId'
import { DataType } from './types'
const formStore = useFormStore()

const param = reactive<FormData>({
  id: genrateId(),
  name: '',
  type: 'string',
  len: null,
})
const drawer = ref(false)
const rules = {
  name: [
    { required: true, message: '请输入参数名称', trigger: 'blur' },
    { min: 1, max: 16, message: '参数名称长度在 1 到 10 个字符', trigger: ['blur', 'change'] },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '参数名称只能包含字母、数字和下划线',
      trigger: ['blur', 'change'],
    },
  ],
  type: [{ required: true, message: '请选择参数类型', trigger: 'change' }],
}

const needDisable = computed(() => {
  return ['Date', 'boolean', 'ID'].includes(param.type)
})

const addToForm = () => {
  formStore.addForm(param)
}

const removeFromItem = (id: string) => {
  console.log(id)

  formStore.removeForm(id)
}

type ModifyInfo = Partial<FormData>
const modifyId = ref<string | null>(null)
const modifyInfo = ref<ModifyInfo>({})
function modifyItem(id: string) {
  if (!id) return
  modifyId.value = id
  modifyInfo.value = formStore.form.find((item) => item.id === id)!
  drawer.value = true
}

const needDisable2 = computed(() => {
  return ['Date', 'boolean', 'ID'].includes(modifyInfo.value.type!)
})

const updateForm = () => {
  if (!modifyId.value) return
  drawer.value = false
  formStore.updateForm(modifyId.value, modifyInfo.value)
}

const randomCodeHandler = () => {
  console.log(formStore.genrateJSON())
}
</script>

<template>
  <div class="flex flex-col">
    <el-header>
      <div class="flex gap-10 p-5 bg-gray-700 m-2 rounded-xl">
        <el-form :model="param" :inline="true" :rules="rules">
          <el-form-item prop="name">
            <el-input v-model="param.name" placeholder="请输入参数名称" clearable></el-input>
          </el-form-item>
          <el-form-item class="w-50" prop="type">
            <el-select v-model="param.type" placeholder="请选择参数类型">
              <el-option v-for="item in DataType" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input type="number" :min="0" v-model="param.len" placeholder="请输入参数长度"
              :disabled="needDisable"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="addToForm">添加参数</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <div class="_table m-10 my-15 shadow-lg rounded-xl p-5 overflow-y-auto">
      <div class="text-2xl font-bold">属性配置</div>
      <div>
        <el-table :data="formStore.form">
          <el-table-column label="属性名" prop="name"></el-table-column>
          <el-table-column label="数据类型" prop="type"></el-table-column>
          <el-table-column label="长度（可选）" prop="len"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="danger" link @click="removeFromItem(scope.row.id)">删除</el-button>
              <el-button type="primary" link @click="modifyItem(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="w-full fixed bottom-0 right-0 p-10 bg-gray-700 flex justify-center">
      <el-button type="primary" @click="randomCodeHandler">生成代码</el-button>
      <el-button type="danger" @click="">撤销</el-button>
    </div>
  </div>
  <el-drawer v-model="drawer" direction="btt" size="60vh" style="background-color: transparent; box-shadow: none">
    <template #default>
      <div class="flex justify-center items-center flex-col">
        <div class="text-xl font-bold mb-5 bg-white/80 w-full max-w-200 p-5 rounded-2xl">
          属性配置
        </div>
        <div class="bg-white/80 w-full max-w-200 p-10 rounded-2xl">
          <el-form :model="modifyInfo" :rules="rules">
            <el-form-item prop="name">
              <el-input v-model="modifyInfo.name" placeholder="请输入参数名称" clearable></el-input>
            </el-form-item>
            <el-form-item class="w-50" prop="type">
              <el-select v-model="modifyInfo.type" placeholder="请选择参数类型">
                <el-option v-for="item in DataType" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input type="number" :min="0" v-model="modifyInfo.len" placeholder="请输入参数长度"
                :disabled="needDisable2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="updateForm">修改</el-button>
              <el-button type="danger" @click="drawer = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
  </el-drawer>
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
