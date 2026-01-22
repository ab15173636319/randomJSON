<template>
  <div class="_table m-10 my-15 shadow-lg rounded-xl p-5 overflow-y-auto">
    <div class="text-2xl font-bold">属性配置</div>
    <div>
      <el-table :data="data">
        <el-table-column label="属性名" prop="name"></el-table-column>
        <el-table-column label="数据类型" prop="type"></el-table-column>
        <el-table-column label="长度（可选）">
          <template #default="scope">
            <span v-if="['string', 'number', 'float', '中文'].includes(scope.row.type)">
              {{ scope.row.len }}
            </span>
            <span v-if="['Avatar'].includes(scope.row.type)">
              {{ scope.row.size }}
            </span>
            <span v-if="['Image'].includes(scope.row.type)">
              {{ scope.row.width + 'x' + scope.row.height }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" link @click="removeFromItem(scope.row.id)">删除</el-button>
            <el-button type="primary" link @click="modifyItem(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import { useFormStore } from '@/stores/form'
import { genrateId } from '@/util/genrateId'
import { DataType, type IFormData } from '@/types'
import { ref } from 'vue'

const drawer = ref(false)
const formStore = useFormStore()

const props = defineProps<{
  data: IFormData[]
}>()

const emit = defineEmits<{
  (e: 'update:data', id: string, drawer: boolean): void
}>()
const removeFromItem = (id: string) => {
  formStore.removeForm(id)
}

function modifyItem(id: string) {
  if (!id) return
  drawer.value = true
  emit('update:data', id, drawer.value)
}
</script>

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
