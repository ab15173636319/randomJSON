<template>
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
        <el-form-item v-if="['string', 'number', 'float', '中文'].includes(param.type)">
          <el-input type="number" :min="0" v-model="param.len" placeholder="请输入参数长度"></el-input>
        </el-form-item>
        <el-form-item v-if="['Avatar'].includes(param.type)">
          <el-input type="number" :min="10" v-model="param.size" placeholder="请输入头像尺寸"></el-input>
        </el-form-item>
        <el-form-item v-if="['Image'].includes(param.type)">
          <div class="flex gap-5">
            <el-input type="number" :min="10" v-model="param.width" placeholder="请输入图片宽度"></el-input>
            <el-input type="number" :min="10" v-model="param.height" placeholder="请输入图片高度"></el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="warning" @click="addToForm">添加参数</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElHeader,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
} from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useFormStore } from '@/stores/form'
import { genrateId } from '@/util/genrateId'
import { DataType, NumberType, type IFormData } from '@/types'
const formStore = useFormStore()

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

const param = reactive<IFormData>({
  id: genrateId(),
  name: '',
  type: 'string',
  len: null,
  size: 10,
  width: 10,
  height: 10,
  v: 4,
})

const needDisable = computed(() => {
  return ['Date', 'boolean', 'ID'].includes(param.type)
})

const addToForm = () => {
  formStore.addForm(param)
}
</script>

<style scoped></style>
