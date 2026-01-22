<template>
  <el-drawer v-model="localDrawer" direction="btt" size="60vh" class="modify-drawer" :show-close="false"
    @close="closeHandler">
    <template #default>
      <div class="drawer-content">
        <div class="drawer-title">
          属性配置
        </div>
        <div class="drawer-form-wrapper">
          <el-form :model="modifyInfo" class="modify-form">
            <el-form-item prop="name" class="form-item">
              <el-input v-model="modifyInfo.name" placeholder="请输入参数名称" clearable class="soft-input"></el-input>
            </el-form-item>
            <el-form-item class="w-50 form-item" prop="type">
              <el-select v-model="modifyInfo.type" placeholder="请选择参数类型" class="soft-select">
                <el-option v-for="item in DataType" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="['string', 'number', 'float', '中文'].includes(modifyInfo.type!)" class="form-item">
              <el-input type="number" :min="0" v-model="modifyInfo.len" placeholder="请输入参数长度"
                class="soft-input"></el-input>
            </el-form-item>
            <el-form-item v-if="['Avatar'].includes(modifyInfo.type!)" class="form-item">
              <el-input type="number" :min="10" v-model="modifyInfo.size" placeholder="请输入头像尺寸"
                class="soft-input"></el-input>
            </el-form-item>
            <el-form-item v-if="['Image'].includes(modifyInfo.type!)" class="form-item image-form-item">
              <div class="image-inputs">
                <el-input type="number" :min="10" v-model="modifyInfo.width" placeholder="宽度"
                  class="soft-input"></el-input>
                <el-input type="number" :min="10" v-model="modifyInfo.height" placeholder="高度"
                  class="soft-input"></el-input>
              </div>
            </el-form-item>
            <el-form-item class="form-item button-form-item">
              <div class="button-group">
                <el-button type="warning" @click="updateForm" class="action-btn">修改</el-button>
                <el-button type="danger" @click="localDrawer = false" class="action-btn">关闭</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption, ElDrawer } from 'element-plus'
import { DataType, type IFormData } from '@/types'
import { computed, ref, watch } from 'vue'
import { useFormStore } from '@/stores/form'
const formStore = useFormStore()

const props = defineProps<{
  modifyInfo: Partial<IFormData>
  modifyId: string
  modelValue: boolean
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const localDrawer = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

const closeHandler = () => {
  localDrawer.value = false
}

const needDisable2 = computed(() => {
  return ['Date', 'boolean', 'ID'].includes(props.modifyInfo.type!)
})

const updateForm = () => {
  if (!props.modifyId) return
  localDrawer.value = false
  formStore.updateForm(props.modifyId, props.modifyInfo)
}
</script>

<style scoped>
.modify-drawer :deep(.el-drawer) {
  background-color: transparent;
  box-shadow: none;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  gap: 16px;
}

.drawer-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  background: linear-gradient(135deg, rgba(255, 254, 249, 0.95) 0%, rgba(250, 246, 237, 0.95) 100%);
  backdrop-filter: blur(10px);
  width: 100%;
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-color);
  text-align: center;
}

.drawer-form-wrapper {
  background: linear-gradient(135deg, rgba(255, 254, 249, 0.95) 0%, rgba(250, 246, 237, 0.95) 100%);
  backdrop-filter: blur(10px);
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-color);
}

.modify-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  margin-bottom: 0;
  margin-right: 0;
}

.soft-input,
.soft-select {
  width: 100%;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.soft-input:hover,
.soft-select:hover {
  box-shadow: var(--shadow-soft);
}

.image-inputs {
  display: flex;
  gap: 12px;
  width: 100%;
}

.button-form-item {
  margin-top: 8px;
}

.button-group {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
}

.action-btn {
  flex: 1;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
  max-width: 200px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .drawer-content {
    padding: 16px;
    gap: 12px;
  }

  .drawer-title {
    font-size: 18px;
    padding: 12px 16px;
    border-radius: 12px;
  }

  .drawer-form-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .modify-form {
    gap: 12px;
  }

  .image-inputs {
    flex-direction: column;
    gap: 8px;
  }

  .button-group {
    flex-direction: column;
  }

  .action-btn {
    max-width: 100%;
    width: 100%;
  }

  .el-drawer {
    --el-drawer-padding-primary: 0.5rem !important;
  }

  .el-input,
  .el-select {
    width: 100% !important;
  }
}

@media (max-width: 480px) {
  .drawer-content {
    padding: 12px;
  }

  .drawer-title {
    font-size: 16px;
    padding: 10px 12px;
  }

  .drawer-form-wrapper {
    padding: 16px;
  }

  .modify-form {
    gap: 10px;
  }
}
</style>
