<template>
  <div class="table-container">
    <div class="table-title">属性配置</div>
    <div class="table-wrapper">

      <table class="w-full overflow-hidden">
        <thead>
          <tr class="bg-gray-100 h-15">
            <th>属性名</th>
            <th>数据类型</th>
            <th>配置（可选）</th>
            <th>操作</th>
          </tr>
        </thead>
        <transition-group name="tbody" tag="tbody">
          <tr v-for="item in data" :key="item.id" class=" odd:bg-amber-50 even:bg-green-50 h-15">
            <td class=" text-center ">{{ item.name }}</td>
            <td class="text-center">{{ item.type }}</td>
            <td class="text-center">
              <!-- 使用工具函数简化判断 -->
              <span v-if="isStringType(item.type)">{{ item.len }}</span>
              <span v-else-if="isFloatType(item.type)">{{ item.integer + 'x' + item.decimal }}</span>
              <span v-else-if="isImageType(item.type)">{{ item.width + 'x' + item.height }}</span>
              <span v-else-if="isAvatarType(item.type)">{{ item.size }}</span>
              <span v-else>————</span>
            </td>
            <td>
              <div class="flex justify-center items-center">
                <el-button type="primary" link @click="modifyItem(item.id)" class="action-link">修改</el-button>
                <el-button type="danger" link @click="removeFromItem(item.id)" class="action-link">删除</el-button>
              </div>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useFormStore } from '@/stores/form'
import { type IFormData } from '@/types'
import { ref, TransitionGroup, watch } from 'vue'
import { isStringType, isFloatType, isAvatarType, isImageType } from '@/util/typeUtils'

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
.tbody-enter-active,
.tbody-leave-active {
  transition: all 0.5s ease;
}

.tbody-enter-from,
.tbody-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.table-container {
  margin: 20px;
  margin-top: 20px;
  background: linear-gradient(135deg, rgba(255, 254, 249, 0.95) 0%, rgba(250, 246, 237, 0.95) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.table-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--soft-warm-gray);
}

.table-wrapper {
  overflow-x: auto;
}

.soft-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.soft-table :deep(.el-table__header) {
  background: linear-gradient(135deg, var(--soft-amber) 0%, var(--soft-yellow) 100%);
}

.soft-table :deep(.el-table__header th) {
  background: transparent;
  color: var(--text-primary);
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
  padding: 12px 8px;
}

.soft-table :deep(.el-table__body tr) {
  transition: background-color 0.2s ease;
}

.soft-table :deep(.el-table__body tr:hover) {
  background-color: var(--soft-yellow) !important;
}

.soft-table :deep(.el-table__body tr.el-table__row--striped) {
  background-color: rgba(255, 248, 225, 0.4);
}

.soft-table :deep(.el-table__body td) {
  padding: 12px 8px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.value-text {
  color: var(--text-secondary);
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-link {
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.action-link:hover {
  background-color: var(--soft-warm-gray);
  transform: translateY(-1px);
}

/* 移动端响应式样式 */
@media (max-width: 768px) {
  .table-container {
    margin: 12px;
    margin-top: 12px;
    padding: 16px;
    border-radius: 12px;
  }

  .table-title {
    font-size: 18px;
    margin-bottom: 16px;
    padding-bottom: 8px;
  }

  .soft-table :deep(.el-table__header th),
  .soft-table :deep(.el-table__body td) {
    padding: 8px 4px !important;
    font-size: 0.875rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .action-link {
    width: 100%;
    text-align: center;
    padding: 6px;
  }

  .el-input,
  .el-select {
    width: 100% !important;
  }

  .el-drawer {
    --el-drawer-padding-primary: 0.5rem !important;
  }

  .el-form-item__content {
    flex-wrap: nowrap !important;
  }
}

@media (max-width: 480px) {
  .table-container {
    margin: 8px;
    padding: 12px;
  }

  .table-title {
    font-size: 16px;
  }

  .soft-table :deep(.el-table__header th),
  .soft-table :deep(.el-table__body td) {
    padding: 6px 2px !important;
    font-size: 0.8rem;
  }

  .el-form--inline .el-form-item {
    margin-right: 0 !important;
  }

  .el-button {
    font-size: 0.875rem !important;
    padding: 8px 12px !important;
  }
}
</style>
