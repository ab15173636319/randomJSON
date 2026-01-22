import { ElMessage } from 'element-plus'

const copyToClipboard = async (value: string) => {
  try {
    // 检查是否支持现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value as string)
      ElMessage.success('已复制到剪贴板')
    } else {
      // 降级方案：使用 execCommand
      fallbackCopyTextToClipboard(value as string)
    }
  } catch (err) {
    console.error('无法复制文本: ', err)
    // 最终降级方案
    fallbackCopyTextToClipboard(value as string)
  }
}

const fallbackCopyTextToClipboard = (text: string) => {
  // 创建临时 textarea 元素
  const textArea = document.createElement('textarea')
  textArea.value = text

  // 避免滚动到底部
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      ElMessage.success('已复制到剪贴板')
    } else {
      ElMessage.error('复制失败')
    }
  } catch (err) {
    console.error('execCommand 复制失败', err)
    ElMessage.error('复制失败')
  }

  // 清理临时元素
  document.body.removeChild(textArea)
}

export default copyToClipboard
