<template>
  <el-drawer v-model="localDrawer" direction="btt" size="60vh" style="background-color: transparent; box-shadow: none"
    :show-close="false" @close="closeHandler">
    <template #default>
      <div class="flex justify-center items-center flex-col">
        <div class="text-xl font-bold mb-5 bg-white/80 w-full max-w-200 p-5 rounded-2xl">
          属性配置
        </div>
        <div class="bg-white/80 w-full max-w-200 p-10 rounded-2xl">
          <el-form :model="modifyInfo">
            <el-form-item prop="name">
              <el-input v-model="modifyInfo.name" placeholder="请输入参数名称" clearable></el-input>
            </el-form-item>
            <el-form-item class="w-50" prop="type">
              <el-select v-model="modifyInfo.type" placeholder="请选择参数类型">
                <el-option v-for="item in DataType" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="['string', 'number', 'float', '中文'].includes(modifyInfo.type!)">
              <el-input type="number" :min="0" v-model="modifyInfo.len" placeholder="请输入参数长度"></el-input>
            </el-form-item>
            <el-form-item v-if="['Avatar'].includes(modifyInfo.type!)">
              <el-input type="number" :min="10" v-model="modifyInfo.size" placeholder="请输入头像尺寸"></el-input>
            </el-form-item>
            <el-form-item v-if="['Image'].includes(modifyInfo.type!)">
              <div class="flex gap-5">
                <el-input type="number" :min="10" v-model="modifyInfo.width" placeholder="请输入图片宽度"></el-input>
                <el-input type="number" :min="10" v-model="modifyInfo.height" placeholder="请输入图片高度"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="updateForm">修改</el-button>
              <el-button type="danger" @click="localDrawer = false">关闭</el-button>
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

<style scoped></style>
