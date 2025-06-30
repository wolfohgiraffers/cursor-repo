import { onMounted, onUnmounted } from 'vue'

export function useKeyboard(callbacks = {}) {
  const handleKeyPress = (event) => {
    // 입력 필드에서는 단축키 비활성화
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return
    }

    switch (event.code) {
      case 'Space':
        event.preventDefault()
        if (callbacks.onToggle) {
          callbacks.onToggle()
        }
        break
      case 'KeyR':
        event.preventDefault()
        if (callbacks.onReset) {
          callbacks.onReset()
        }
        break
      case 'KeyL':
        event.preventDefault()
        if (callbacks.onLap) {
          callbacks.onLap()
        }
        break
      default:
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress)
  })

  return {
    handleKeyPress
  }
} 