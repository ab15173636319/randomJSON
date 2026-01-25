<template>
  <el-header class="header-wrapper">
    <div class="header-container">
      <div class="header-title">添加新参数</div>
      <el-form ref="formRef" :model="param" :inline="true" :rules="rules" class="header-form">
        <el-form-item prop="name" class="form-item">
          <el-input v-model="param.name" placeholder="请输入参数名称" clearable class="soft-input"></el-input>
        </el-form-item>
        <el-form-item class="w-50 form-item" prop="type">
          <el-select v-model="param.type" placeholder="请选择参数类型" class="soft-select">
            <el-option v-for="item in DataType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="['String', 'Number', '中文'].includes(param.type)" class="form-item">
          <el-input type="number" :min="0" v-model="param.len" placeholder="请输入参数长度" class="soft-input"></el-input>
        </el-form-item>
        <el-form-item v-if="['Float'].includes(param.type)" class="form-item">
          <div class="flex gap-10">
            <el-input type="number" :min="1" v-model="param.integer" placeholder="请输入浮点数整数长度"
              class="soft-input"></el-input>
            <el-input type="number" :min="1" v-model="param.decimal" placeholder="请输入浮点数小鼠长度"
              class="soft-input"></el-input>
          </div>
        </el-form-item>
        <el-form-item v-if="['Avatar'].includes(param.type)" class="form-item">
          <el-input type="number" :min="10" v-model="param.size" placeholder="请输入头像尺寸" class="soft-input"></el-input>
        </el-form-item>
        <el-form-item v-if="['Image'].includes(param.type)" class="form-item image-form-item">
          <div class="image-inputs">
            <el-input type="number" :min="10" v-model="param.width" placeholder="宽度" class="soft-input"></el-input>
            <el-input type="number" :min="10" v-model="param.height" placeholder="高度" class="soft-input"></el-input>
          </div>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button type="warning" @click="addToForm" class="add-btn">添加参数</el-button>
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
  type FormInstance,
  ElMessage
} from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'
import { useFormStore } from '@/stores/form'
import { genrateId } from '@/util/genrateId'
import { DataType, type IFormData } from '@/types'
import { getInitialFieldValues, isStringType, isFloatType, isAvatarType, isImageType } from '@/util/typeUtils'

const formRef = ref<FormInstance | null>()
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
  type: 'String',
  len: 10,
  width: undefined,
  height: undefined,
  size: undefined,
  integer: undefined,
  decimal: undefined,
})

watch(() => param.type, (newVal, _) => {
  Object.assign(param, getInitialFieldValues(newVal))
})


// 重置表单
const reset = () => {
  Object.assign(param, {
    id: param.id,
    name: '',
    type: 'String',
    len: 10,
  })
}

const addToForm = async () => {
  const res = await formRef.value?.validate()
  if (!res) return
  const index = formStore.form.findIndex(item => item.name === param.name)
  if (index > 0) {
    ElMessage.error('属性名称已存在')
    return
  }
  formStore.addForm({ ...param })
  reset()
}
</script>

<style scoped>
.header-wrapper {
  padding: 0;
  height: auto !important;
  background: transparent;
}

.header-container {
  background: linear-gradient(135deg, rgba(255, 254, 249, 0.95) 0%, rgba(250, 246, 237, 0.95) 100%);
  backdrop-filter: blur(10px);
  margin: 12px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-color);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--soft-warm-gray);
}

.header-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
}

.form-item {
  margin-bottom: 0;
  margin-right: 0;
}

.soft-input,
.soft-select {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.soft-input:hover,
.soft-select:hover {
  box-shadow: var(--shadow-soft);
}

.image-inputs {
  display: flex;
  gap: 8px;
}

.add-btn {
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .header-container {
    margin: 8px;
    padding: 16px;
    border-radius: 12px;
  }

  .header-title {
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .header-form {
    flex-direction: column;
    gap: 12px;
  }

  .form-item {
    width: 100%;
    margin-right: 0;
  }

  .image-inputs {
    flex-direction: column;
    gap: 8px;
  }

  .add-btn {
    width: 100%;
    padding: 12px 20px;
  }

  .el-input,
  .el-select {
    width: 100% !important;
  }
}

@media (max-width: 480px) {
  .header-container {
    margin: 6px;
    padding: 12px;
  }

  .header-title {
    font-size: 14px;
  }
}
</style>
